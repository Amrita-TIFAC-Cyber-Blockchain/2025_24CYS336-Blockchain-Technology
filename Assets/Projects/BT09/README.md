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
In the proposed system, the Digital Twin data which comes from the physical asset will first be converted into a hash value using a hashing function. This hash value is then stored in the blockchain through a smart contract. The smart contract will be deployed in a permissioned blockchain network which uses the Proof of Authority (PoA) consensus method. This helps in fast and secure transactions between trusted nodes. The blockchain will store the hash, timestamp, and some metadata of the update. The real data will not be stored in the blockchain but in an off-chain storage like IPFS or a local database. This makes the system light and secure.

To solve the ownership issue, each Digital Twin will be represented by a unique DT-NFT (Digital Twin Non-Fungible Token). This token will show who owns the twin and will be linked to the owner’s wallet address. The ownership can also be transferred from one user to another by sending this token.

By using both blockchain and DT-NFT, the system provides two important features:
Data Integrity: because all data updates are recorded as immutable transactions.
Ownership Verification: because every twin is linked to a verified wallet address through DT-NFT.

This way, the proposed integration provides a secure, transparent, and trustable framework for Digital Twin data management where both data and ownership are protected.

-----
### Architectural Diagram

<p align="center">
  <img width="700" alt="image" src="https://github.com/user-attachments/assets/056d9ce7-ef78-4641-86a1-339a38de0def" />
</p>

The architecture contains four main parts: the physical asset, digital twin, blockchain, and off-chain storage. The physical asset sends data to the twin, which generates a hash and sends it to blockchain for verification. The blockchain records this hash with time and metadata using a smart contract. The off-chain storage keeps the actual twin data. Each digital twin is linked to an NFT which shows its ownership.

------

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner  | 0x1a0e645b47b4bedd350164aeaab9818a1c19455d |
| User 1 | 0x7cceafa81b4f2f5ccb3424cb3550629a724bea31 |
| User 2 | 0xfe55f4524b7f018ad981cb46966b0e28b1abdaa1 | 

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
SDG 9: Industry, Innovation, and Infrastructure: Fosters industrial innovation and resilient infrastructure through predictive maintenance and optimized asset management.

SDG 11: Sustainable Cities and Communities: Enables sustainable cities by creating trusted Digital Twins for efficiently managing smart grids, utilities, and transport systems.

SDG 12: Responsible Consumption and Production: Promotes responsible production by providing a verifiable lifecycle history for assets, which supports a circular economy and reduces waste.

SDG 16: Peace, Justice, and Strong Institutions: Strengthens institutional trust by creating immutable records of ownership and data, which reduces disputes and enhances transparency.

SDG 17: Partnerships for the Goals: Facilitates partnerships by providing a secure, trusted platform for multiple stakeholders to collaborate on managing shared assets.

-----

### References

- Nielsen, C. P., Andersen, S. B., & Pop, O. (2020). Digital twin and blockchain: Proof of concept. Procedia CIRP, 93, 291–296. https://doi.org/10.1016/j.procir.2020.04.045

- Teisserenc, B., & Sepasgozar, S. (2021). Digital twin non-fungible token (DT-NFT): A token-based data ownership model for the AEC industry. Automation in Construction, 132, 103940. https://doi.org/10.1016/j.autcon.2021.103940


