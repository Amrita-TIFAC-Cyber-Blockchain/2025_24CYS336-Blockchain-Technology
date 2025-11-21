# 24CYS336 - Blockchain-Technology 

## BT#12 -  Food Safety Traceability System using Blockchain and EPCIS

![](https://img.shields.io/badge/Member-VIYAS_K-gold)  <br/> 
![](https://img.shields.io/badge/SDG--1-No%20Poverty-red)
![](https://img.shields.io/badge/SDG--9-Sustainable%20Industrial%20Innovation-white)
![](https://img.shields.io/badge/SDG--16-Peace%2C%20Justice%20%26%20Strong%20Institutions-green)<br/>
![](https://img.shields.io/badge/Reviewed-20th_Nov_2025-brown) <br/>

------

### Problem Statement

The food supply chain involves multiple stakeholders, including manufacturers, processors, distributors, wholesalers & retailers. Ensuring food safety and product authenticity throughout this chain has become challenging. 

-    #### Multiple Intermediaries <br>
-    #### Lack of Transparency <br>
-    #### Insufficient Consumer Trust <br>
-    #### Data Tampering Risks <br>
-    #### Inefficient Information Flow <br>

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
1. Food Safety Department (FSD) deploys the contract and becomes the authority for registering all roles.

2. FSD registers Manufacturer, Distributor, Wholesaler, Retailer, and Customer with company details and wallet addresses.

3. The manufacturer creates a new product using EPC and stores product master data.

4. Manufacturer logs first event with batch, storage type, temperature, and receiver details.

5. Distributor logs transport and transfer details for the same EPC.

6. Wholesaler records bulk movement, transport mode, and handover details.

7. Retailer logs final receipt before sales.

8. All events are stored in separate mappings per role for each EPC.

9. Anyone can check the product's existence and its journey using the EPC
-----
### Block Diagram
<br>
<img width="1090" height="511" alt="Screenshot 2025-11-21 at 11 27 36 PM" src="https://github.com/user-attachments/assets/35a8b2ff-917a-4409-8fb7-fb7d2ad4072f" />

-----

### Information
#### For registering the Product requires -
EPC ID, Product Name, Batch ID, Storage Type, and Temperature to be maintained.
#### For registration, the Company requires - 
Company Name & GSTIN, FSSAI ID, Location, and Wallet Address. 
#### Each EVENT Contains - 
EPC ID, Product Name, From Company & GSTIN, To Company & GSTIN, Transport Details, Wallet Address.

-----
### Details of Stakeholders of the Smart Contract

| Stakeholder | Address | 
|:---------------------------:|:-------:|
| Food Safety Department (Deployer)  | [0x3a5344c3084bd5ebe99bdb253ed55b702ff08846](https://sepolia.etherscan.io/address/0x3a5344c3084bd5ebe99bdb253ed55b702ff08846) |
| Manufacturer | [0x72d0a1000e49e0137ab7863348703d4cda5c82f8](https://sepolia.etherscan.io/address/0x72d0a1000e49e0137ab7863348703d4cda5c82f8)  |
| Distributor | [0xb99ae4ca0ee0d75162ac1fc0288d43b6fc31a225](https://sepolia.etherscan.io/address/0xb99ae4ca0ee0d75162ac1fc0288d43b6fc31a225) | 
| Wholesaler | [0x6823b143be3c545dde8575f0a1eab4ef9f8e0b7b](https://sepolia.etherscan.io/address/0x6823b143be3c545dde8575f0a1eab4ef9f8e0b7b) | 
| Retailer | [0xc2442576542fbaffc3f629136fcb357b0f41f401](https://sepolia.etherscan.io/address/0xc2442576542fbaffc3f629136fcb357b0f41f401) | 
| Customer | [0xf326e3a35f278396ea632813818be1a261b05c82](https://sepolia.etherscan.io/address/0xf326e3a35f278396ea632813818be1a261b05c82) | 

### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Contract Deployment | [0x6FA8aB8e784bE71Ca5e22BF55Fc275d25e5A1654](https://sepolia.etherscan.io/address/0x6fa8ab8e784be71ca5e22bf55fc275d25e5a1654) |


These transactions are as shown in the [YouTube Demo Video]() 


### Mapping the Project to Relevant Sustainable Development Goals (SDGs)
| **SDG Goal**                                         | **Alignment with the Project**                                                                                                                                                                      |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Goal 1 – No Poverty** | Ensures safe food supply chains, reducing losses and improving fair market access |
| **Goal 9 – Industry, Innovation & Infrastructure**| Uses Blockchain for transparent, digitised, and traceable food logistics infrastructure |
| **Goal 16 – Peace, Justice and Strong Institutions** | Promotes trust, accountability, and regulatory compliance through tamper-proof traceability records |

-----

### References




















