
# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject_-_BLOCKCHAIN_-blue) ![](https://img.shields.io/badge/Batch_-23CYS336-gold) <br/>

## BT#12 -  Food Safety Traceability System using Blockchain and EPCIS

![](https://img.shields.io/badge/_Name_-_VIYAS_K_-blue) ![](https://img.shields.io/badge/_Roll_Number_-_CB.EN.U4ECE23254_-blue)  <br/> 
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

------

### Problem Statement

The food supply chain involves multiple stakeholders, including manufacturers, processors, distributors, wholesalers & retailers. Ensuring food safety and product authenticity throughout this chain has become challenging. 

-    #### Multiple Intermediaries <br/>
-    #### Lack of Transparency <br/>
-    #### Insufficient Consumer Trust <br/>
-    #### Data Tampering Risks <br/>
-    #### Inefficient Information Flow <br/>

-----
### Abstract

In recent years, food safety has become a major concern. To ensure food’s safety and
authenticity, there must be a reliable and secure data system. This report introduces a
system that uses Blockchain & Electronic Product Code Information Services (EPCIS) to
fix the mentioned problems. By using blockchain’s decentralised, immutable ledger,
the system ensures secure, tamper-proof recording and sharing of traceability data. It is
built using Ethereum, which uses smart contracts and stores only important information
on the blockchain, while keeping other data off-chain. Ensures efficient supply chain
traceability

-----
### Dataflow of the System
 1. The manufacturer assigns a unique ID (e.g., EPC via RFID) to the food batch.
Event data is collected and stored in the cloud.
 2. Traceability info is extracted and sent to the Manufacturer’s smart contract via the Blockchain
module. Once the P2P network confirms the transaction, the goods are shipped.
 3. Distributor verifies product legitimacy with the Manufacturer’s smart contract.
 4. Contract checks distributor’s identity & returns the manufacturer server’s details if valid.
 5. Distributor requests access to the Manufacturer’s server for product event information.
 6. Manufacturer checks if the Distributor is part of its supply chain via the smart contract. If
valid, the Manufacturer’s server shares event information with the Distributor.
 7. Distributor verifies authenticity by comparing the blockchain hash with the received data
hash.
<br/> <br/> <img width="420" height="299" alt="Screenshot 2025-11-10 at 11 26 47 AM" src="https://github.com/user-attachments/assets/c6b8d2fe-4fcc-4907-89ef-48c5728bcf6a" />

---

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)


-----

### References












