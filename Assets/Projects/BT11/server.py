import pandas as pd, numpy as np, json, hashlib, joblib, os, time
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import LabelEncoder
from web3 import Web3

# ---------- Blockchain config ----------
INFURA_URL = "https://sepolia.infura.io/v3/b13daeeae6704b4eab6348de4a24933d"
CONTRACT_ADDRESS = "0x2b23CA876e4666C493fdc07Db5FE2BBEebe428D5"
OWNER_ADDRESS = "0x75Dd20566F7A622C799D6929CdA1CB4b5E76c1Ea"
PRIVATE_KEY = "0xbbf468ac537617edf191f8e1e8d103adf737e027b11321e4d757aeea0c01d379"    # use a throwaway test key(used original here)
ABI = json.load(open("abi.json"))

w3 = Web3(Web3.HTTPProvider(INFURA_URL))
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)

CSV_FILE = "user_feedback.csv"

# ---------- Helpers ----------
def encode_location(x): return hash(x) % 100
def encode_gender(x):   return 1 if x.lower().startswith("m") else 0
def encode_pref(x):     return hash(x) % 100

PREFERENCE_CHOICES = ["sports","music","tech","food"]
encoder = LabelEncoder()
encoder.fit(PREFERENCE_CHOICES)


def hash_model(model):
    params = {
    "coef": model.coef_.ravel().tolist(),
    "intercept": float(np.ravel(model.intercept_)[0]) if np.ndim(model.intercept_) else float(model.intercept_)
    }
    return hashlib.sha256(json.dumps(params).encode()).hexdigest()

def synthesize_data(n=20):
    data = pd.DataFrame({
        "age": np.random.randint(18,50,n),
        "location": np.random.choice(["India","USA","UK","Germany"],n),
        "gender": np.random.choice(["M","F"],n),
        "prev_pref": np.random.choice(["sports","music","tech","food"],n),
        "liked": np.random.choice([0,1],n)
    })
    data["loc_enc"] = data["location"].apply(encode_location)
    data["gender_enc"] = data["gender"].apply(encode_gender)
    data["prev_enc"] = data["prev_pref"].apply(encode_pref)
    return data

# ---------- Model init ----------
if os.path.exists(CSV_FILE):
    df = pd.read_csv(CSV_FILE).dropna()
else:
    df = pd.DataFrame({
        "age": np.random.randint(18, 50, 20),
        "location": np.random.choice(["India","USA","UK","Germany"], 20),
        "gender": np.random.choice(["M","F"], 20),
        "previous_pref": np.random.choice(PREFERENCE_CHOICES, 20),
        "possible_pref": np.random.choice(PREFERENCE_CHOICES, 20),
        "user_feedback": np.random.choice(["yes","no"], 20)
    })
    df.to_csv(CSV_FILE, index=False)


df = df.dropna()
X = pd.DataFrame({
    "age": df["age"],
    "loc_enc": df["location"].apply(encode_location),
    "gender_enc": df["gender"].apply(encode_gender),
    "prev_enc": df["previous_pref"].apply(encode_pref)
})
y = encoder.transform(df["possible_pref"])

if os.path.exists("model.pkl"):
    model = joblib.load("model.pkl")
else:
    model = SGDClassifier(max_iter=1, learning_rate="constant", eta0=0.01, warm_start=True)
    model.partial_fit(X, y, classes=np.arange(len(PREFERENCE_CHOICES)))

joblib.dump(model, "model.pkl")

# ---------- Loop ----------
seen = set()
print("Server running... press Ctrl+C to stop")

while True:
    count = contract.functions.updateCount().call()
    for i in range(count):
        if i in seen: 
            continue
        user, userHash, modelHash, ts = contract.functions.getUpdate(i).call()
        if modelHash != "":     # already processed
            seen.add(i)
            continue

        print(f"New feedback index {i} from {user}")
        new_df = pd.read_csv(CSV_FILE)
        df_train = new_df[new_df["user_feedback"] == "yes"].dropna()
        if not df_train.empty:
            X_new = pd.DataFrame({
                "age": df_train["age"],
                "loc_enc": df_train["location"].apply(encode_location),
                "gender_enc": df_train["gender"].apply(encode_gender),
                "prev_enc": df_train["previous_pref"].apply(encode_pref)
            })
            y_new = encoder.transform(df_train["possible_pref"])
            model.partial_fit(X_new, y_new)
            joblib.dump(model, "model.pkl")
        
        
        model_hash = hash_model(model)
        print(f"Updated model hash: {model_hash[:12]}...  attaching to index {i}")

        nonce = w3.eth.get_transaction_count(OWNER_ADDRESS)
        tx = contract.functions.attachModelHash(i, model_hash).build_transaction({
            "from": OWNER_ADDRESS,
            "nonce": nonce,
            "gas": 200000,
            "maxFeePerGas": w3.to_wei("20", "gwei"),
            "maxPriorityFeePerGas": w3.to_wei("1", "gwei")
        })
        signed = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
        txh = w3.eth.send_raw_transaction(signed.raw_transaction)
        print("Logged tx:", txh.hex())

        seen.add(i)
    time.sleep(1)  # check every second
