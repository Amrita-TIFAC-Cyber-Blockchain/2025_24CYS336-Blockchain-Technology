
# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/Batch-22UCYS-gold) ![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject-Blockchain-blue) <br/>

## BT#23

![](https://img.shields.io/badge/Member-TBD-gold)  <br/> 
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

------

### Problem Statement
The rapid expansion of digital ecosystems such as Steam (gaming) and Pinterest (creative content sharing) has resulted in a vast exchange of digital assets — including in-game items, images, artworks, and user-generated content.
In current systems, asset ownership and control are centralized within the platform’s database.
Although these platforms allow users to purchase or create assets, the ownership is effectively licensed rather than absolute, as all metadata and transaction history are stored on a central server controlled by the provider.This centralized structure introduces multiple technical and security challenges:
**Lack of Verifiable Ownership:**
Asset metadata (creator ID, timestamp, ownership record) is stored in a mutable centralized database. Users cannot independently verify asset ownership without trusting the service provider.
**Single Point of Failure and Data Integrity Risks:**
Centralized databases are vulnerable to unauthorized modifications, data corruption, or shutdown of services, leading to loss or alteration of ownership information.
**Duplication and Authenticity Issues:**
Digital assets can be easily copied or re-uploaded under different accounts.
Lack of Transparency in Asset Transactions:
Users cannot trace the full transaction history of an asset (creation, transfer, resale). This creates distrust and enables fraudulent trading activities.

To address these limitations, this project proposes the integration of blockchain technology to establish a decentralized, tamper-proof digital ownership system for content and in-game assets. By utilizing smart contracts deployed on a blockchain, ownership information such as asset ID, content hash (SHA-256 or Keccak-256), current owner’s wallet address, and timestamp of registration can be recorded immutably on the ledger.

**This enables:**
**Proof of existence:** content authenticity can be verified through hash comparison.
**Proof of ownership:** smart contracts associate each asset with a specific blockchain address.
**Transferability:** ownership can be securely transferred via contract functions without intermediary control.
**Traceability:** all transactions are permanently recorded, ensuring transparent provenance.

To overcome blockchain’s storage limitations, large media files are stored off-chain in a distributed file system (IPFS), while only the file hash and reference link are stored on-chain to preserve efficiency.


-----
### Literature Survey 


-----
### Architectural Diagram


------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)


-----

### References



