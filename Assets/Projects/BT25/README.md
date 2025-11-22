# 24CYS336 - Blockchain-Technology 

## BT#25 – Blockchain Applications in Defence Logistics
 

<p align="left">
  <img src="https://img.shields.io/badge/MEMBER-RAHUL-KRISHNA-J_-_CB.EN.U4ECE23238-gold">
  <img src="https://img.shields.io/badge/MEMBER-AKILESH-SENTHIL-KUMAR_-_CB.EN.U4ECE23203-gold">
</p>


![](https://img.shields.io/badge/SDG-9-darkgreen)
![](https://img.shields.io/badge/SDG-12-darkgreen)
![](https://img.shields.io/badge/SDG-16-darkgreen)

![](https://img.shields.io/badge/Reviewed-20th_Nov_2025-brown)


------

### PROBLEM STATEMENT

Defence logistics chains are complex, distributed, and rely on multiple intermediaries (suppliers, transporters, depots, customs). This leads to delays, lack of verifiable provenance for critical parts, counterfeit risk, and poor auditability. The project investigates whether a permissioned blockchain (or hybrid approach) can provide tamper-evident supply records, automated compliance checks, secure asset provenance, and auditable transactions while meeting defence confidentiality and performance requirements.

-----
### LITERATURE SURVEY 

Existing logistics systems in defense suffer from lack of transparency, auditability, and are susceptible to data manipulation.
Blockchain technology, especially through the use of smart contracts , provides a secure, tamper-proof, and transparent method for registering, transferring, and tracking defense assets.Military logistics systems face persistent problems lack of transparency, fragmented supply chain records, counterfeit risks, and extensive manual reconciliation. Traditional centralized databases cannot provide real-time tracking or guarantee tamper-proof delivery records, leading to inefficiency and data manipulation risks.

Every transaction—registering, transferring, or confirming the delivery of defense assets—is permanently recorded on a decentralized blockchain ledger. This record is instantly visible to all authorized participants, making it extremely difficult to alter or falsify. As a result, defense organizations can confidently monitor the lifecycle and movement of every asset in the supply chain.
Traceable, tamper-proof records: Every transaction such as asset registration, transfer, and delivery is recorded immutably, reducing fraud and simplifying audits.​

Real-world pilots: NATO, UK Ministry of Defence, and US DoD have piloted blockchain solutions for procurement, weapons/equipment tracking, and audit logging, reporting improved efficiency, transparency, and reduced counterfeiting.​

-----

### PROPOSED SOLUTION

The proposed solution is a **permissioned blockchain-based Defence Logistics Management System** that ensures tamper-proof asset tracking, authenticated role-based operations, and a fully auditable trail across the defence supply chain.  
This system replaces traditional paper-based or centralized database workflows with a **smart-contract–driven, secure, and decentralized approach** deployed on the Ethereum (Sepolia) Test Network.

## **1. Blockchain-Backed Asset Registration**

Traditional defence logistics rely on siloed records that can be altered, lost, or manipulated.  
Your system solves this by enabling the **Logistics Officer** to register every new defence asset directly on the blockchain.

### Key Features of `registerAsset()`:
- ✔ Only the **authorized Logistics Officer wallet** can register assets.  
- ✔ Each asset is assigned a **unique ID**.  
- ✔ Supplier details, timestamp, and IPFS document hash are recorded.  
- ✔ Every registration triggers an **immutable `AssetRegistered` event**.  
- ✔ Duplicate assets are prevented through on-chain checks.  

### Impact:
- Eliminates counterfeit or unauthorized equipment entries.  
- Provides a **single trusted source of truth** for all military assets.

## **2. Supplier Authenticity Through Immutable Provenance**

A major defence risk is corruption in procurement and counterfeit spare parts.  
Your system ensures supplier authenticity through transparent, uneditable provenance.

### Using `changeSupplier()`:
- ✔ Only the Logistics Officer can update a supplier.  
- ✔ Old supplier information is *never overwritten*—it remains permanently on-chain.  
- ✔ Every supplier change is logged as a `SupplierChanged` event.  

### Impact:
- Ensures verifiable supply chain provenance.  
- Prevents fraudulent supplier substitution.  
- Facilitates audits during inspections or investigations.

## **3. Secure, Controlled Asset Transfer Between Defence Entities**

Movement of weapons, optic systems, ammunition, drones, and communication gear often lacks real-time tracking.

Using `transferAsset()`:
- ✔ Only the **Depot Manager** can transfer assets.  
- ✔ New holder address, movement status, notes, and timestamp are recorded.  
- ✔ Every transfer logs an immutable `AssetTransferred` event.  

### Impact:
- Provides real-time clarity on **“Where is the asset right now?”**  
- Prevents unauthorized or unrecorded movement of sensitive equipment.  
- Reduces loss/theft during transportation or depot rotation.

## **4. Independent Audit Trail by Agency Auditor**

Auditing is critical, but traditional defence audit logs can be manipulated or destroyed.

Using `auditAsset()`:
- ✔ Only the authorized **Agency Auditor** wallet can perform audits.  
- ✔ All inspection notes are permanently added to the asset’s history.  
- ✔ Every audit triggers an `AssetAudited` event.  

### Impact:
- Ensures transparent and accountable audit trails.  
- Prevents fake audits or forged inspection reports.  
- Strengthens institutional trust and compliance.

## **5. Integrated IPFS Storage for Defence Documentation**

Storing documents directly on blockchain is costly.  
Your solution offloads documents to IPFS while keeping their hashes on-chain.

### Documents stored in IPFS may include:
- Weapon certifications & safety reports  
- Maintenance logs  
- Procurement invoices  
- Customs & transport clearance documents  
- Serial number verification documents  

### Benefits:
- ✔ Immutable document integrity (any tampering changes the hash).  
- ✔ Decentralized storage with no central server dependency.  
- ✔ Quick retrieval via any IPFS gateway.  

## **6. Complete Asset Lifecycle Visibility**

Your system provides a full, end-to-end timeline of each asset’s existence.

### Key functions:
- `getAsset()` → Returns major details.  
- `getAssetHistory()` → Returns every registered, changed, transferred, or audited event.  

### Impact:
- Entire lifecycle is transparent and tamper-proof.  
- No missing or manipulated records.  
- Commanders, auditors, and logistics teams gain **complete operational visibility**.

## **7. Role-Based Security and Identity Assurance**

Your smart contract enforces strong **Role-Based Access Control (RBAC)** using hardcoded Ethereum addresses.

Unauthorized attempts automatically revert with clear error messages such as:
- “Only logistics officer”  
- “Only depot manager”  
- “Only auditor”  

### Impact:
- Prevents internal misuse (e.g., fake asset registration).  
- Ensures accountability because all actions are signed with user wallets.  
- Every action is verifiable via Etherscan, ensuring transparency.

## **Conclusion**

The proposed solution provides a **fully secure, transparent, and tamper-proof defence logistics management system**, leveraging:

- Blockchain immutability  
- Smart contract–based workflow automation  
- IPFS decentralized document storage  
- Role-based access control  
- Complete and auditable asset lifecycle tracking  

This system significantly improves defence supply chain integrity, prevents fraud, and strengthens national security logistics.

-----

### ARCHITECTURAL DIAGRAM

<img width="1011" height="351" alt="ARCHITECTURAL BLOCK" src="https://github.com/user-attachments/assets/9cef12a7-4cff-453a-90ab-89a16ea0119e" />

------
# RESULTS

## STAKEHOLDER DETAILS

| **SMART CONTRACT STAKEHOLDERS** | **ADDRESS** | 
|:-------------------------------:|:-----------:|
| **OWNER (DEPLOYER)** | [`0x120837db0c8e662875082055eb2195bab5b66c0e`](https://sepolia.etherscan.io/address/0x120837db0c8e662875082055eb2195bab5b66c0e) |
| **DEPOT MANAGER** | [`0x8434BCC016dF78CAF6f1D469D44714334229d232`](https://sepolia.etherscan.io/address/0x8434bcc016df78caf6f1d469d44714334229d232) |
| **AGENCY AUDITOR** | [`0xAc4336fa91E6b2B849115C0C5F9F0A37C47594d7`](https://sepolia.etherscan.io/address/0xac4336fa91e6b2b849115c0c5f9f0a37c47594d7) |

## TRANSACTION DETAILS

| **TRANSACTION ACTION** | **HASH / ADDRESS** |
|:----------------------:|:------------------:|
| **DEPLOYMENT OF CONTRACT** | `0xCa3E12DcADCA6cc8278854ceDa7fcdD0e1d10D73` |

 
👉 **[YOUTUBE DEMO VIDEO](https://youtu.be/tsMrDYhSHNo)**


### MAPPING THE PROJECT TO RELEVANT SUSTAINABLE DEVELOPMENT GOALS (SDGS)

| SDG No. | Goal Name | Relevance to Project |
|--------|----------|---------------------|
| **SDG 9** | Industry, Innovation and Infrastructure | Improves defence supply chain infrastructure with tamper-evident, resilient, and verifiable logistics workflows. |
| **SDG 16** | Peace, Justice and Strong Institutions | Ensures transparent procurement, prevents fraud/corruption in logistics, and increases trust in defence asset tracking. |
| **SDG 12** | Responsible Consumption and Production | Ensures authentic, traceable spare parts to reduce counterfeits and wastage throughout the defence lifecycle. |


-----

## References (APA Format)

1. Sudhan, A., & Nene, M. (2017). *Employability of blockchain technology in defence applications.* In 2017 International Conference on Intelligent Sustainable Systems (ICISS). IEEE.  
   https://ieeexplore.ieee.org/document/8273168

2. Nguyen, D., & Tran, H. (2022). *A framework for blockchain-enabled smart contract management system of arms and ammunition for the defence industry.* IEEE.  
   https://ieeexplore.ieee.org/document/9869598

3. Patel, D. S. (2022). *Blockchain for challenges in logistics and supply chain.* In International Conference on Computing, Communication and Energy Systems (ICCES). IEEE.  
   https://ieeexplore.ieee.org/document/10037294

### Additional Reference Articles

4. Covert Access Team. (2024). *Military-grade equipment keeps disappearing.*  
   https://covertaccessteam.substack.com/p/military-grade-equipment-keeps-disappearing

5. Cyber SRCC. (2024). *Indian military and police data breach.*  
   https://cybersrcc.com/2024/07/24/indian-military-and-police-data-breach/

6. Times of India. (2024). *High-security ordnance factory theft: 3 AK-47s and 2 Galil rifles stolen in Jalgaon.*  
   https://timesofindia.indiatimes.com/city/pune/high-security-ordnance-factory-theft-3-ak-47s-and-2-galil-rifles-stolen-in-jalgaon/articleshow/114559395.cms

7. Times of India. (2024). *$40M worth of arms stolen by corrupt officials in Ukraine.*  
   https://timesofindia.indiatimes.com/world/rest-of-world/40m-for-arms-stolen-by-corrupt-officials-ukraine/articleshow/107211044.cms

8. Economic Times. (2024). *Over 4800 stolen weapons remain unrecovered in Manipur.*  
   https://economictimes.indiatimes.com/news/defence/over-4800-stolen-weapons-remain-unrecovered-in-ethnic-strife-torn-manipur/articleshow/113555478.cms







































