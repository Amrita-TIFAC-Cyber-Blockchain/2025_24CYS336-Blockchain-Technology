# 24CYS336 - Blockchain Technology

## MidTerm Examination - Answer Key
![](https://img.shields.io/badge/Date-26th_August-blue) <br/>

### Part-A: Theory 
#### 1.  Define Blockchain Technology. (3 Marks)

**Answer:** Blockchain Technology is a decentralized computation, and distributed ledger platform that efficiently immutably stores transactions in a verifiable manner through a rational decision-making process among multiple parties in an open and public system.

#### 2. Analyze and identify the suitability and type of blockchain for the given scenarios as per the decision tree method. Justify your decision.
##### a) Migrant workers send money from abroad to their families in India. The current process involves banks and money transfer agencies that charge high fees and cause delays. Families want a faster, transparent, and cheaper system that works across borders without relying on a single central authority. (2 Marks)
 - Need: Fast, low-cost, transparent, and decentralized international transactions.
 - Decision Tree Path:
   - Multiple participants involved? → Yes
   - Trusted authority available? → No
   - Data public or private? → Public
 - **Type of Blockchain: Public Blockchain**
 - _Justification:_ A public blockchain (like Bitcoin or Ripple) allows permissionless access, ensuring transparency and decentralized validation. It eliminates intermediaries such as banks, enabling cheaper and faster remittances.

##### b)  large retail chain wants to modernize its employee attendance system. Since the process is entirely internal to the organization, only one party is involved and there is no external trust requirement. The company simply needs an efficient way to log attendance data across its branches. (2 Marks)
 - Need: Internal logging, no external participants, centralized control.
 - Decision Tree Path:
   - Multiple participants involved? → No
   - Internal organization only? → Yes
   - Need immutability/audit trail? → Optional
 - **Type of Blockchain: Private Blockchain**
 - _Justification:_ Since only one organization is involved, a private blockchain (like Hyperledger Fabric) is suitable. It provides internal transparency and tamper-proof records but allows central control and access restriction.

##### c)  A large food company wants to track produce from farms to wholesalers, retailers, and finally to consumers. With multiple stakeholders in the supply chain, it is difficult to detect points of contamination or pilferage. All participants need a shared and tamper-proof record of food movement for safety, transparency, and accountability. (2 Marks)
 - Need: Transparency, traceability, and shared visibility among many stakeholders.
 - Decision Tree Path:
 - Multiple participants? → Yes
 - Trusted authority exists? → Partially
 - Data sensitivity? → Moderate
 - T**ype of Blockchain: Consortium (Federated) Blockchain**
 - _Justification:_ A consortium blockchain (e.g., IBM Food Trust using Hyperledger Fabric) enables controlled access among participants (farmers, distributors, retailers). It ensures traceability and accountability while maintaining efficiency and confidentiality.

#### 3. Ramya chooses two prime numbers p = 17, q = 23, and a public key e = 5. (5 Marks)
(a) Compute the private key d. **Answer:** 141
(b) Using the key pair, sign the message M = 12. **Answer:** 223

#### 4. Explain the architecture of a blockchain system with the help of a neat diagram. Briefly describe the role of each layer. (7 Marks)
<p align="center">
  <img src=" " alt="arch" width=850 />
</p>

#### 5. Which of the following is a **cold wallet**? (1 Mark)
(a) Web Wallet <br/> 
(b) **Hardware Wallet** <br/> 
(c) Mobile Wallet <br/> 
(d) Desktop Wallet <br/> 

_Justification:_ Cold Wallet are wallets not connected to internet. 

#### 6. **Identify the error and redraw the correct Merkle Tree.** (3 Mark)
**Answer:** _Error: _The leaf nodes of the Merkle tree will contain the hashes of the transaction (rather than the transaction itself).
<p align="center">
  <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220105203400/Screenshot20220105203335.png" alt="merkle" width=600 />
</p>

---- 

### Part - B: Lab

- Use the [Mnemonic Generator for Indian Classical Languages](https://namchain-open-initiative-research-lab.github.io/Mnemonic-Generator-for-Indian-Classical-Languages/bip39-standalone-tamil-scripts.html#english) to generate 24 English Word Seed Phrase. (2 Marks)
- Select ”_Ethereum_” in the Coin, to generate Ethereum Public and Private Keys with the addresses. (2 Marks)
- Pick the address that matches your Roll Number ”m/44’/60’/0’/0/ROLLNUMBER”. (1 Mark)
- Import the address into your Metamask Wallet. (2 Marks)
- Request for Testnet Ether from the [Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia). (2 Marks)
- Perform a Transfer transaction of 000260820251230 ETH to [0xc6Fea06FdBe2c780Db5bcc155b789D5463f50D62](https://etherscan.io/address/0xc6Fea06FdBe2c780Db5bcc155b789D5463f50D62). (2 Marks)
- Analyze the transaction made through the Blockchain Explorer to identify the _Block_, _Gas Fees_, and _Gas Price_. (3 Marks)
- Analyze the Ethereum [Token](https://etherscan.io/token/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e) to find the below: (4 Marks)
  - Max Supply: **10,000 DOODLE**
  - Contract Address: **0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e**
  - Visit Holders Tab, and then pick the holder with Rank as your ROll Number. Now find the Token Balance for this holder.
- Analyze the [Bitcoin transaction](https://learnmeabitcoin.com/explorer/block/00000000000000000000e08bcbbffad7e0a88c87f41c15c3741bc1c4cf7d4b52) to identify the below: (2 Marks)
  - Prev Hash: **000000000000000000005f1dc8d5c7a2816d569208baa304d6a2463b5882a9cb**
  - Merkle Root: **a2b0b3ab43343d8404063684e0a98b6edda51f94e123b14e38970b33e8f68992**
  - Coinbase Transaction ID: **bffd2cef0d51ac379cf04431d2f047f361d8f4ad12391ad378ac8c5f6ff7ff3d**
- Complete the code _mt_gen.py_ to generate the Bitcoin Address. (5 Marks)
  - import base58
  - ripemd160 = hashlib.new('ripemd160')
  - checksum = hashlib.sha256(hashlib.sha256(versioned_payload).digest()).digest()[:4]
  - printing the value: print(versioned_payload.hex()), print(checksum.hex()), print(full_payload.hex()), print(address)
  - calling the function in the main: generate_bitcoin_address()
  ```
  import os
  import hashlib
  import base58
  
  def generate_bitcoin_address():
  
      # Step 2: Public Key 
      public_key_hex = "0250863ad64a87ae8a2fe83c1af1a8403cb53f53e486d8511dad8a04887e5b2352"
      public_key_bytes = bytes.fromhex(public_key_hex)
      
      # Step 3: SHA-256 of Public Key
      sha256_pk = hashlib.sha256(public_key_bytes).digest()
      print("\nStep 3: SHA-256(public key):")
      print(sha256_pk.hex())
  
      # Step 4: RIPEMD-160 of SHA-256
      ripemd160 = hashlib.new('ripemd160')
      ripemd160.update(sha256_pk)
      pubkey_hash = ripemd160.digest()
      print("\nStep 4: RIPEMD-160(SHA-256(public key)):")
      print(pubkey_hash.hex())
      
      # Step 5: Add version byte
      versioned_payload = b'\x00' + pubkey_hash
      print("\nStep 5: Version + RIPEMD-160 hash:")
      print(versioned_payload.hex())
      
      # Step 6 & 7: Calculate checksum (Double SHA2-256)
      sha256checksum = hashlib.sha256(hashlib.sha256(versioned_payload).digest()).digest()
      print("\nStep 6: SHA256(versioned payload):")
      checksum = hashlib.sha256(hashlib.sha256(versioned_payload).digest()).digest()[:4]
      print("\nSHA256(versioned payload):")
      print(checksum.hex())
      
      # Step 8: Append checksum
      full_payload = versioned_payload + checksum
      print("\nStep 7: Full payload (with checksum):")
      print(full_payload.hex())
  
      # Step 9: Base58Check encoding to get Bitcoin Address
      address = base58.b58encode(full_payload).decode()
      print("\nStep 8: Final Bitcoin Address:")
      print(address)

  if __name__ == "__main__":
      generate_bitcoin_address()
    ```
