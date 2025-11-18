# 24CYS336 - Blockchain-Technology 

## BT#01 - Evidence Protection System using Blockchain Technology

![](https://img.shields.io/badge/Member-Agilprasanna_P-gold)  <br/> 
![](https://img.shields.io/badge/SDG--darkgreen) ![](https://img.shields.io/badge/SDG--darkgreen)  <br/>
![](https://img.shields.io/badge/Reviewed-18th_Nov_2025-brown) <br/>

------

### Problem Statement
Traditional evidence management systems are highly susceptible to tampering, unauthorized access, theft, and human error, which can compromise the integrity and admissibility of both digital and physical evidence in legal proceedings. These systems often lack transparency, real-time tracking, and secure audit mechanisms, leading to difficulties in maintaining accountability and trust within law enforcement and judicial processes. As digital evidence continues to grow in volume and importance, there is a critical need for a secure and tamper-proof solution. This project addresses these challenges by implementing a blockchain-based evidence protection system that ensures immutable record-keeping, role-based access control, and real-time audit trails-maintaining the authenticity, traceability, and legal validity of evidence throughout its entire lifecycle.



-----
### Literature Survey 
Traditional digital evidence management systems suffer from major issues such as tampering, loss of files, unauthorized access, and broken chain-of-custody due to manual or paper-based recording methods. Research consistently highlights the need for a system that ensures integrity, transparency, and verifiable tracking of evidence handling.

Blockchain technology is widely studied as a solution because it provides immutability, decentralization, and a tamper-proof audit trail. Several works propose using smart contracts to record evidence metadata—such as timestamps, handlers, and evidence IDs—ensuring that once information is added, it cannot be altered. However, literature also notes that storing large digital files directly on a blockchain is inefficient and costly.

To overcome this, modern research adopts a hybrid blockchain + IPFS architecture, where evidence files are stored off-chain in IPFS and only the file hash (CID) is stored on-chain for verification. This approach enables secure, scalable, and efficient evidence handling. The referenced paper “Evidence Protection System Using Blockchain Technology” follows this model, demonstrating that combining blockchain for metadata and IPFS for file storage creates a robust, tamper-proof digital evidence management system suitable for law enforcement and forensic applications.

-----
### Architectural Diagram
![Architecture Diagram](https://github.com/Amrita-TIFAC-Cyber-Blockchain/2025_24CYS336-Blockchain-Technology/blob/main/Assets/Projects/BT01/architecture.png?raw=true)

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner  | 0xF5c3938cC94B1fdE9170920F2B3f86b196A35163 |

#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts - Migrations | 0x956e28f48e902571306e939c10c669593f54b24b2f5f4896c627df2762b4a213 |
| Deployment of Contracts - AssetNFT | 0xc6f9d124b1c1b5229bf47ac5c62a3f303b38906f0737d07d1e34e683682da4df |
| Deployment of Contracts - Fractionalizer | 0x9e494c53a3c5c86a80b6ca179034b389464042d5f2e2b8bfb20a092e2504cc4e |
| Deployment of Contracts - Marketplace | 0x3c0386ee72c053183bf3c40242e363036fc39fed398272560e0fd2c99a860058 |
| Deployment of Contracts - Registry | 0xba4e356150a9b226050d77bead27e85c868f890143159149972582c9c538dc73 |

These transaction are as shown in the [YouTube Demo Video]() 

------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)
| **SDG Goal** | **Alignment with the Project** |
|---------------|--------------------------------|
| **SDG 9: Industry, Innovation, and Infrastructure** | Builds resilient digital infrastructure using blockchain to modernize evidence management and enhance reliability. |
| **SDG 12: Responsible Consumption and Production** | Reduces paper use by digitizing custody records, supporting eco-friendly, sustainable justice systems. |
| **SDG 16: Peace, Justice, and Strong Institutions** | Ensures transparency, trust, and tamper-proof evidence handling, strengthening judicial and law enforcement integrity. |

-----

### References

**Pandiyaraj, A., & Narayanan, P. (2023). Evidence Protection System Using Blockchain Technology.  
Amrita Vishwa Vidyapeetham.**












