<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## BT#09 - Digital Twin Ownership and Data Integrity Using Blockchain

![](https://img.shields.io/badge/Member-K_B_Vishal-gold)  <br/>
![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-11-darkgreen) ![](https://img.shields.io/badge/SDG-12-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen) ![](https://img.shields.io/badge/SDG-17-darkgreen)  <br/>
![](https://img.shields.io/badge/Reviewed-17th_Nov_2025-brown) <br/>

------

### Problem Statement
A Digital twin is a virtual copy of a physical asset like a machine, sensor or any device (all the functionaliites of the physical asset can be done by the virtual one - simulate the behavior of the real one). It is mainly used to monitor and analyse the real-world physical asset. Thus by analysing the behavior of the virtual copy, we can analyse the current status of the device and make decisions that could improve performance and also prevent future failures in the system. 

The major challenges faced in these systems are:
    1. Digital twin data can be modified or tampered. Ex: The reading from a temperature sensor can be changed from the original.
    2. Ownership issues like which party own the Digital twin, when the asset is shared among different stakeholders. 

Therefore the problem is to provide a secure,transperant and immutable data logging for the Digital Twin, so the the data cannot be tampered providing data integrity where the ownership is protected.

-----

### Literature Survey 
Many studies have been done on Digital Twin systems to improve trust and security. The two main challenges most of the papers talk about are how to protect the twin data from tampering and how to show who owns the Digital Twin. Some papers use blockchain to secure the data while others use NFT for ownership.

The first paper by Nielsen et al. (2020) explains how blockchain can be used for data integrity in digital Twin. In this paper, they made a prototype where the real asset and its digital twin are connected. Whenever the physical asset sends new data (like temperature, or any reading), the update is stored in the blockchain as a transaction. Each transaction stores time, type of data and hash value which helps to verify that the data is not changed later. In This way, blockchain makes the data tamper proof and gives trust that the data is original. But this work only focuses on securing data, not about who owns the Digital Twin or how ownership can be shared.

The second paper by Teisserenc and Sepasgozar (2021) talks about ownership using tokens called Digital Twin Non-Fungible Token (DT-NFT). In this model, each Digital Twin is linked with an NFT token which represents the ownership. The NFT is stored in the blockchain and contains a link or hash to the twin data which is stored outside the blockchain. The owner of the wallet address which holds the NFT is considered the owner of that Digital Twin. Ownership can also be transferred easily by sending the NFT to another wallet. This method helps in verifying ownership but it does not focus on securing the twin data from changes or attacks.

From the two papers, we can see that one is solving the data integrity problem and the other is solving the ownership problem. In my project, I am combining both these ideas into one single system so that the Digital Twin data is not only secure but also has a clear ownership.

-----
### Proposed System
#### Proposed System (Detailed Explanation)

In the proposed system, Digital Twin (DT) data generated from the physical asset is processed through a secure, blockchain-integrated framework designed to ensure data integrity, ownership verification, and tamper-proof historical tracking. The system uses a combination of cryptographic hashing, permissioned blockchain technology, Digital Twin NFTs (DT-NFTs), and off-chain storage to achieve a balanced architecture that is both secure and efficient.

#### 1. Digital Twin Data Acquisition and Hashing
The process begins at the physical asset, which continuously generates real-time data such as sensor readings, performance logs, operational metrics, and environmental information.  
Instead of sending raw data directly to the blockchain, the system applies a hashing function (such as SHA-256) to convert the Digital Twin data into a unique, fixed-length hash value. This hash acts as a digital fingerprint of the original data. Even the smallest modification in data would generate an entirely different hash, ensuring that any tampering is immediately detectable.

This design choice significantly reduces storage requirements and preserves privacy, because the actual data never leaves the off-chain environment.

#### 2. Smart Contract for Secure Data Anchoring
After generating the hash, the system sends it to a smart contract responsible for anchoring or recording the update on the blockchain.  
The smart contract manages:
- Storage of the Digital Twin’s hash  
- Metadata related to the update  
- Timestamp of the update  
- The wallet address that submitted the update  

This mechanism ensures that every Digital Twin update is immutably recorded and time-stamped, enabling full traceability across the twin’s lifecycle.

#### 3. Deployment in a Permissioned Blockchain (PoA Consensus)
The smart contract operates within a permissioned blockchain network governed by the Proof of Authority (PoA) consensus mechanism.  
This type of network allows only approved and trusted validators to participate, offering several advantages:
- High transaction speed  
- Low operational cost  
- Strong security due to controlled access  
- Suitability for enterprise and industrial applications  

Using PoA ensures that the network is resilient, efficient, and capable of supporting continuous real-time updates from Digital Twin systems.

#### 4. Off-Chain Storage of Digital Twin Data
Because storing large data sets on the blockchain is impractical and expensive, the design uses off-chain storage systems such as:
- IPFS  
- Distributed file storage  
- Local databases  
- Cloud platforms  

The blockchain stores only the hash, while the full Digital Twin data is securely stored off-chain.  
This hybrid model ensures:
- Lightweight blockchain usage  
- Scalability  
- Easier data retrieval  
- Efficient storage for high-volume datasets  

By separating hash storage (on-chain) from real data storage (off-chain), the system fulfills both performance and security requirements.

#### 5. Ownership Management Using DT-NFT (Digital Twin NFT)
To address asset ownership tracking, each Digital Twin is represented using a DT-NFT, a unique token generated on the blockchain.  
The DT-NFT contains:
- The identity of the Digital Twin  
- The wallet address of the current owner  
- A link to the twin’s on-chain records  

Ownership of the Digital Twin is represented through this token, which can be securely transferred between users using standard blockchain wallet transactions.  
This creates a transparent and verifiable ownership mechanism, eliminating disputes and preventing unauthorized access or modification.

#### 6. Features Enabled by Blockchain + DT-NFT Integration

#### 6.1 Data Integrity
Every update to the Digital Twin is recorded as an immutable blockchain transaction.  
Even if someone tries to alter the off-chain data, the mismatch in hash values will reveal tampering.  
The blockchain ledger becomes a trustable source of truth.

#### 6.2 Ownership Verification
Since every Digital Twin is tied to a unique DT-NFT linked to a verified wallet address, ownership is clear, provable, and transferable.  
Unauthorized parties cannot update or access the Digital Twin history.

#### 7. Benefits of the Proposed Integrated Framework
The overall system provides a robust Digital Twin management environment capable of serving industrial, urban, and multi-stakeholder ecosystems.  
Specifically, it supports:
- Secure asset management  
- Transparent update history  
- Trusted data exchange  
- Multi-party collaboration  
- Scalable data storage  
- Reduced risks of tampering or fraud  


-----
### Architectural Diagram

<p align="center">
  <img width="700" alt="image" src="https://github.com/user-attachments/assets/056d9ce7-ef78-4641-86a1-339a38de0def" />
</p>

The architecture contains four main parts: the physical asset, digital twin, blockchain, and off-chain storage. The physical asset sends data to the twin, which generates a hash and sends it to blockchain for verification. The blockchain records this hash with time and metadata using a smart contract. The off-chain storage keeps the actual twin data. Each digital twin is linked to an NFT which shows its ownership.

#### 1. Architectural Design (What Was Proposed)

In the architectural diagram, a complete Digital Twin ecosystem was proposed, integrating Digital Twin data flows with a permissioned blockchain and off-chain storage. The design includes the following major components:

#### 1.1 Physical Asset as Data Source
A real-world physical asset (such as equipment or IoT-enabled machinery) generates operational data such as sensor values, performance metrics, and status information.  
This serves as the foundation for creating the Digital Twin.

#### 1.2 Smart Contract Layer
The architecture introduces a smart contract as the entry point for Digital Twin updates.  
The physical asset (or an IoT gateway) sends processed data to this contract deployed on a permissioned blockchain network.  
The contract is responsible for:
- Receiving update requests  
- Validating identity  
- Recording hashes of Digital Twin data  

#### 1.3 On-Chain Storage (Hash and Metadata Only)
To ensure data integrity while maintaining blockchain efficiency, only specific elements are stored on-chain:
- Hash of the Digital Twin data  
- Metadata  
- Timestamp of the update  
- Ownership details  

This provides tamper-proof verification while avoiding the cost and limitations of storing large data on the blockchain.

#### 1.4 Off-Chain Storage of Actual Digital Twin Data
The full Digital Twin dataset (logs, sensor history, large documents, or files) is stored off-chain in:
- A database  
- Distributed storage  
- Cloud storage  

The on-chain hash acts as a verification reference for these off-chain files.

#### 1.5 Ownership and Access Control
Each digital twin is associated with an owner wallet address.  
Only the owner is allowed to:
- Push updates  
- Transfer ownership  

This adds an identity and authorization layer to the Digital Twin ecosystem.

#### 1.6 Permissioned Blockchain (PoA)
The proposed architecture uses a Permissioned Blockchain based on Proof-of-Authority (PoA).  
This ensures:
- Authorized validators  
- High throughput  
- Low transaction cost  
- Enterprise-grade security and control  

This permissioned network forms the secure foundation for the Digital Twin system.

#### 2. Smart Contract Implementation (What Was Actually Built)

The implementation focuses on the on-chain logic for Digital Twin registration, update logging, and ownership management.  
It is a simplified and blockchain-agnostic version of the architecture.

#### 2.1 Twin Registration
The contract allows registering a Digital Twin using a unique ID.  
This creates a blockchain identity for each twin and links it to the registering wallet.

#### 2.2 Adding Digital Twin Data (Hash-Based Logging)
Instead of storing large data, the contract stores:
- A hash of the Digital Twin data  
- Metadata  
- Timestamp  
- The address of the updater  

Each update is appended as a new record, creating an immutable timeline of the twin's lifecycle.

#### 2.3 Immutable Update History
Every Digital Twin maintains a history of `TwinRecord` entries.  
This history is tamper-proof and can be used to verify data authenticity and traceability.

#### 2.4 Ownership Transfer
The contract includes functionality for securely transferring ownership of a Digital Twin from one wallet to another.

#### 2.5 Read Functions (Querying Twin Data)
The code provides functions to:
- Retrieve the number of update records  
- Retrieve individual records by index  

This allows external applications or dashboards to display the full update history.

#### 2.6 What Is Not Implemented
Compared to the architectural design, the following elements are not implemented in the contract:
- Permissioned blockchain network setup (PoA)  
- Off-chain storage integration  
- IoT gateway or data ingestion pipeline  
- NFT-based ownership tokens  
- Automatic verification mechanisms  

The smart contract only implements the on-chain portion of the architecture in a simplified form.

------

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner  | [0x1a0e645b47b4bedd350164aeaab9818a1c19455d](https://sepolia.etherscan.io/address/0x1a0e645b47b4bedd350164aeaab9818a1c19455d) |
| User 1 | [0x7cceafa81b4f2f5ccb3424cb3550629a724bea31](https://sepolia.etherscan.io/address/0x7cceafa81b4f2f5ccb3424cb3550629a724bea31) |
| User 2 | [0xfe55f4524b7f018ad981cb46966b0e28b1abdaa1](https://sepolia.etherscan.io/address/0xfe55f4524b7f018ad981cb46966b0e28b1abdaa1) | 

#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts | [0x27825b546dbfc27bb1cdcc0cca5f7232d5300aeaa21fe31cb6cfc7526c700cb0](https://sepolia.etherscan.io/tx/0x27825b546dbfc27bb1cdcc0cca5f7232d5300aeaa21fe31cb6cfc7526c700cb0) |
| Register Twin | [0x03a12b9a572021c508885c1f3bc0b1f9d14608c6c8f0c1d6d6ad40f902686209](https://sepolia.etherscan.io/tx/0x03a12b9a572021c508885c1f3bc0b1f9d14608c6c8f0c1d6d6ad40f902686209)  |
| Add Twin data(1) | [0x6e93fe4355d9f7afb5e4107f5287417ce3582c73593705cc44d7e1a43c2d99ef](https://sepolia.etherscan.io/tx/0x6e93fe4355d9f7afb5e4107f5287417ce3582c73593705cc44d7e1a43c2d99ef) |
| Add Twin data(2) | [0x678c52d1e743489d52397fa2e56b6d23e330f26d2107ba8b7f3aec2ea53d525d](https://sepolia.etherscan.io/tx/0x678c52d1e743489d52397fa2e56b6d23e330f26d2107ba8b7f3aec2ea53d525d) |
| Ownership Transfer | [0x07f559b196353f516ee80fdedc4245dac8a5609dc2c6c9df77b8f8b429747822](https://sepolia.etherscan.io/tx/0x07f559b196353f516ee80fdedc4245dac8a5609dc2c6c9df77b8f8b429747822) |

#### Demo Video
The Demo Video is available [here](https://www.youtube.com/watch?v=vUbUnmFjodM)

------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)
# Contribution to UN Sustainable Development Goals (SDGs)

| **SDG Goal** | **Description of Contribution** |
|--------------|---------------------------------|
| **SDG 9: Industry, Innovation, and Infrastructure** | Fosters industrial innovation and resilient infrastructure through predictive maintenance and optimized asset management. |
| **SDG 11: Sustainable Cities and Communities** | Enables sustainable cities by creating trusted Digital Twins for efficiently managing smart grids, utilities, and transport systems. |
| **SDG 12: Responsible Consumption and Production** | Promotes responsible production by providing a verifiable lifecycle history for assets, supporting a circular economy and reducing waste. |
| **SDG 16: Peace, Justice, and Strong Institutions** | Strengthens institutional trust by creating immutable records of ownership and data, reducing disputes and enhancing transparency. |
| **SDG 17: Partnerships for the Goals** | Facilitates partnerships by providing a secure, trusted platform for multiple stakeholders to collaborate on managing shared assets. |


-----

### References

- Nielsen, C. P., Andersen, S. B., & Pop, O. (2020). Digital twin and blockchain: Proof of concept. Procedia CIRP, 93, 291–296. https://doi.org/10.1016/j.procir.2020.04.045

- Teisserenc, B., & Sepasgozar, S. (2021). Digital twin non-fungible token (DT-NFT): A token-based data ownership model for the AEC industry. Automation in Construction, 132, 103940. https://doi.org/10.1016/j.autcon.2021.103940



