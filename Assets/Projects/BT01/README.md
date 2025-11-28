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
| Owner  | 0x8D3838b5eE34AA59Bd98Df03F07aF2CA8758C064 |


These transactions are as shown in the 
[YouTube Demo Video](https://youtu.be/EPGPfOTBl3E)

[![Demo Video](https://img.youtube.com/vi/EPGPfOTBl3E/maxresdefault.jpg)](https://youtu.be/EPGPfOTBl3E)


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













