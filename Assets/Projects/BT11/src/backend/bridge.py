from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd, numpy as np, joblib, os
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)

CSV_FILE = "user_feedback.csv"
PREFERENCE_CHOICES = ["sports","music","tech","food"]

encoder = LabelEncoder()
encoder.fit(PREFERENCE_CHOICES)

def encode_location(x): return hash(x) % 100
def encode_gender(x): return 1 if x.lower().startswith('m') else 0
def encode_pref(x): return hash(x) % 100

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    age = int(data["age"])
    loc = data["location"]
    gender = data["gender"]
    prev = data["prev_pref"]

    X = pd.DataFrame([{
        "age": age,
        "loc_enc": encode_location(loc),
        "gender_enc": encode_gender(gender),
        "prev_enc": encode_pref(prev)
    }])

    if not os.path.exists("model.pkl"):
        return jsonify({"error": "Model not trained yet"}), 400
    model = joblib.load("model.pkl")

    y_pred = int(model.predict(X)[0])
    possible_pref = encoder.inverse_transform([y_pred])[0]


    # Append to CSV
    df = pd.DataFrame([{
        "age": age,
        "location": loc,
        "gender": gender,
        "previous_pref": prev,
        "possible_pref": possible_pref,
        "user_feedback": ""
    }])
    df.to_csv(CSV_FILE, mode='a', header=not os.path.exists(CSV_FILE), index=False)

    return jsonify({"possible_pref": possible_pref})  


@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.json
    df = pd.read_csv(CSV_FILE)
    mask = (df["age"] == int(data["age"])) & (df["location"] == data["location"]) & \
           (df["gender"] == data["gender"]) & (df["previous_pref"] == data["previous_pref"])
    df.loc[mask, "user_feedback"] = data["user_feedback"]
    df.to_csv(CSV_FILE, index=False)
    return jsonify({"status": "feedback recorded"})


if __name__ == "__main__":
    app.run(port=5000)

