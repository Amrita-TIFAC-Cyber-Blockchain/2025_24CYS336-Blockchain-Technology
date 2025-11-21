# 24CYS336 - Blockchain-Technology 

## BT#12 -  Food Safety Traceability System using Blockchain and EPCIS

![](https://img.shields.io/badge/Name-VIYAS_K-gold)  <br/> 
![](https://img.shields.io/badge/SDG-1-darkgreen) ![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-20th_Nov_2025-brown) <br/>

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

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Food Safety Department (Deployer)  | [0x3a5344c3084bd5ebe99bdb253ed55b702ff08846](https://sepolia.etherscan.io/address/0x3a5344c3084bd5ebe99bdb253ed55b702ff08846) |
| Manufacturer | [0x72d0a1000e49e0137ab7863348703d4cda5c82f8](https://sepolia.etherscan.io/address/0x72d0a1000e49e0137ab7863348703d4cda5c82f8)  |
| Distributor | [0xb99ae4ca0ee0d75162ac1fc0288d43b6fc31a225](https://sepolia.etherscan.io/address/0xb99ae4ca0ee0d75162ac1fc0288d43b6fc31a225) | 
| Wholesaler | [0x6823b143be3c545dde8575f0a1eab4ef9f8e0b7b](https://sepolia.etherscan.io/address/0x6823b143be3c545dde8575f0a1eab4ef9f8e0b7b) | 
| Retailer | [0xc2442576542fbaffc3f629136fcb357b0f41f401](https://sepolia.etherscan.io/address/0xc2442576542fbaffc3f629136fcb357b0f41f401) | 
| Customer | [0xf326e3a35f278396ea632813818be1a261b05c82](https://sepolia.etherscan.io/address/0xf326e3a35f278396ea632813818be1a261b05c82) | 

#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts |      |
| 

These transactions are as shown in the [YouTube Demo Video]() 

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)


-----

### References














