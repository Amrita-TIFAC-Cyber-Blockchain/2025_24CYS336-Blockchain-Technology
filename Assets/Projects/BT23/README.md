# 24CYS336 - Blockchain-Technology 

## BT#23 - 

![](https://img.shields.io/badge/Vasantha_Kumar_G_R-gold) ![](https://img.shields.io/badge/Ashwin_Kumar_K_S-gold) ![](https://img.shields.io/badge/Karthick_A-gold)  <br/>
![](https://img.shields.io/badge/SDG_9-Industry,_Innovation,_and_Infrastructure-darkgreen) <br/>
![](https://img.shields.io/badge/SDG_12-Responsible_Consumption_and_Production-darkgreen) <br/>
![](https://img.shields.io/badge/SDG_16-Peace,_Justice,_and_Strong_Institutions-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-19th_Nov_2025-brown) <br/>


------

### Problem Statement
The rapid expansion of digital ecosystems such as Steam (gaming) and Pinterest (creative content sharing) has resulted in a vast exchange of digital assets — including in-game items, images, artworks, and user-generated content.
In current systems, asset ownership and control are centralized within the platform’s database.
Although these platforms allow users to purchase or create assets, the ownership is effectively licensed rather than absolute, as all metadata and transaction history are stored on a central server controlled by the provider.This centralized structure introduces multiple technical and security challenges:
1. **Lack of Verifiable Ownership:**
Asset metadata  is stored in a centralized database. Users cannot independently verify asset ownership without trusting the service provider.
2. **Single Point of Failure and Data Integrity Risks:**
Centralized databases are vulnerable to unauthorized modifications, data corruption, or shutdown of services.
3. **Duplication and Authenticity Issues:**
Digital assets can be easily copied or re-uploaded under different accounts.
4. **Lack of Transparency in Asset Transactions:**
Users cannot trace the full transaction history of an asset (creation, transfer, resale). This creates distrust and enables fraudulent trading activities.

To address these limitations, this project proposes the integration of blockchain to establish a decentralized, tamper-proof digital ownership system for content and in-game assets. By utilizing smart contracts deployed on a blockchain, ownership information such as asset ID, content hash , current owner’s wallet address, and timestamp of registration can be recorded immutably on the ledger.

**This enables:**

**Proof of existence:** content authenticity can be verified through hash comparison.

**Proof of ownership:** smart contracts associate each asset with a specific blockchain address.

**Transferability:** ownership can be securely transferred via contract functions without intermediary control.

**Traceability:** all transactions are permanently recorded, ensuring transparent provenance.

To overcome blockchain’s storage limitations, large media files are stored off-chain in IPFS, while only the file hash and reference link are stored on-chain to preserve efficiency.


-----
### Literature Survey 

**Paper - 1 : Non-Fungible Token Enhanced Blockchain-Based Online Social Network**

The authors propose a model where every social media post can be converted into an NFT, enabling it to be sold, traded, and owned by users. The paper addresses limitations in existing social networks such as centralization, censorship, lack of user ownership, fake posts, and digital rights management issues.

**Major Components:**
1. **IPFS** for storing posts.
2. Posts are minted as **NFTs** and **Smart Contracts** to handle registration and Ownership.
3. The authours propose Reputation Score Algorithm for the users.



-----
### Architectural Diagram

<img width="500" height="389" alt="image" src="https://github.com/user-attachments/assets/d0af2b50-6883-4338-a8dd-40106a6a6e1a" />

_Image taken from paper-1_

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner  |  |
| User 1 |  |
| User 2 |  | 

#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts |      |
| 

These transaction are as shown in the [https://youtu.be/Xfo6L_V9xIE](https://youtu.be/Xfo6L_V9xIE) 

------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| **SDG**    | **Goal Title**                           | **Project Contribution**                                                              |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------------------------- |
| **SDG 9**  | Industry, Innovation, and Infrastructure | Promotes innovative, decentralized digital infrastructure for ownership verification. |
| **SDG 12** | Responsible Consumption and Production   | Encourages ethical creation, ownership, and sharing of digital assets.                |
| **SDG 16** | Peace, Justice, and Strong Institutions  | Enhances transparency and fairness in online transactions and ownership management.   |



-----

### References

S. Jadon, K. Bhat, K. R. Jenni, K. Vedantha, L. R R and P. B. Honnavalli, "Non-Fungible Token Enhanced Blockchain-Based Online Social Network," in IEEE Access, vol. 12, pp. 92368-92385, 2024, doi: 10.1109/ACCESS.2024.3422530.




















