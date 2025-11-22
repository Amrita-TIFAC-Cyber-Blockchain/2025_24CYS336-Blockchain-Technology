# 24CYS336 - Blockchain-Technology 

## BT#22 UniVeritas: Blockchain-Based Identity and Trust Framework for Universities

![](https://img.shields.io/badge/Member-Rajith_S-gold) ![](https://img.shields.io/badge/Member-T_Ragulraj-gold) ![](https://img.shields.io/badge/Member-Mithun_Chakkarawarthy_S-gold)  <br/>
![](https://img.shields.io/badge/SDG-1,8,9,16-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-20th_Nov_2025-brown) <br/>

------

### Problem Statement
Current digital identity management within university ecosystems suffers from significant vulnerabilities inherent in traditional, centralised systems. Physical identity documents, such as student ID cards, are susceptible to loss, theft, and fraud, making them unreliable proofs of identity. Similarly, existing digital accounts reliant on passwords for accessing university resources (e.g., grades, learning platforms) lack the robust security of cryptographic private keys and are prone to identity theft and data breaches. This centralisation creates single points of failure, exposing sensitive student data to manipulation and compromise.

Furthermore, universities often contend with fragmented identity records across various departments and services, leading to redundant and inefficient manual verification processes for student enrolment, academic credential validation, and resource access. This bureaucratic overhead burdens both students and administrative staff. Crucially, the current model provides a lack of user control over their personal data, limiting transparency on who accesses their information and preventing individuals from effectively revoking consent. The vulnerability to forgery of academic accomplishments also compromises the integrity and global trust of qualifications.

Therefore, there is a pressing need for a decentralised, privacy-focused, and user-controlled digital identity verification model specifically designed for university environments. A blockchain-based solution can address these challenges by enabling the digitalisation and automation of identification processes, reducing bureaucracy and enhancing efficiency. By leveraging cryptographic signatures (e.g., ECDSA) and hash functions (e.g., SHA3/Keccak256), coupled with smart contracts, such a system can ensure the privacy, validity, and integrity of personal user data. This empowers students with self-sovereign control over their digital identities, fostering trust, transparency, and interoperability across university services.


-----


### Literature Survey 
### Paper 1: Digital Identity Management System Using Blockchain  
**Authors:** Sulochana Devi, Shrineeth Kotian, Manish Kumavat, Dixit Patel  

**Key Insights:**  
- Utilizes **IPFS** for secure off-chain document storage.  
- Employs **Zero-Knowledge Proofs (ZKPs)** for privacy-preserving authentication.  
- Promotes **self-sovereign identity** with full user control.  
- Implements **smart contracts** for automated access and revocation.  

**Project Impact:**  
- Guided our **off-chain + blockchain** design approach.  
- Inspired the use of **hashed data** for privacy protection.  
- Reinforced our model for **user-controlled consent**.

### Paper 2: Digital Identity Using Blockchain Technology  
**Authors:** Alexandru-Cristian Careja, Nicolae Tapus  

**Key Insights:**  
- Utilizes **ECDSA** for identity signature and verification.  
- Employs **Ethereum smart contracts** to validate without revealing sensitive data.  
- Focuses on **digital identity wallets** for user empowerment.  

**Project Impact:**  
- Influenced our use of **cryptographic signatures**.  
- Guided the decision to store only **references/hashes** on-chain.

### Paper 3: How Digital Identity on Blockchain Can Contribute in a Smart City Environment  
**Authors:** Robledo, Rivera, Avalos, Larios  
**Affiliation:** Universidad de Guadalajara, IBM Mexico  

**Key Insights:**  
- Maps **smart city use cases** for blockchain-based identity.  
- Highlights **real-world implementations** such as Estonia’s e-ID.  
- Identifies gaps in **cross-platform identity** and **legal standards**.  

**Project Impact:**  
- Expanded our focus to **urban governance** applications.  
- Validated the **system-level impact** and **long-term relevance** of our work.  


------


### Architectural Diagram

<img width="2816" height="1444" alt="flowchart" src="https://github.com/user-attachments/assets/1420c936-0311-48a7-81f1-319fcc549828" />


------


### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | Role |
|:---------------------------:|:-------:|:----:|
| Dean  | [0xba760f1119fce562098bbc0616fed1006b6c4bfc](https://sepolia.etherscan.io/address/0xba760f1119fce562098bbc0616fed1006b6c4bfc) | Highest authority who approves certificates, assigns HODs, and manages governance decisions |
| Registrar | [0xeba3cfd5c26e91e087b3b8dbbef57ed1dbc72383](https://sepolia.etherscan.io/address/0xeba3cfd5c26e91e087b3b8dbbef57ed1dbc72383) | Administrative authority who co-approves certificates and handles official academic validations |
| HOD (CCE) | [0x4efea71b0640c499885ebfae8a34418a7982e454](https://sepolia.etherscan.io/address/0x4efea71b0640c499885ebfae8a34418a7982e454) | Department-level authority responsible for assigning marks, uploading question papers, and managing coordinators |
| Coordinator (CCE) | [0x64e9857a789d6719c156b420dc355d9b0c9d8400](https://sepolia.etherscan.io/address/0x64e9857a789d6719c156b420dc355d9b0c9d8400) | Department coordinator who registers students, uploads gradesheets, and manages academic workflows |
| Student (CCE) | [0x6481514b61b4e4ea258c2027e0d768865c383386](https://sepolia.etherscan.io/address/0x6481514b61b4e4ea258c2027e0d768865c383386) | Registered learner who can view their own marks, certificates, and gradesheets stored on-chain |
| Employer | [0xd4ed8886073f5cfab223992c3b4a538c632f15e2](https://sepolia.etherscan.io/address/0xd4ed8886073f5cfab223992c3b4a538c632f15e2) | A third-party verifier who can instantly validate the authenticity of a student's certificate on-chain using the certificate hash |

#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts | [0x9895dAEF06D734525dd33B08725EF2232af36f1d](https://sepolia.etherscan.io/address/0x9895dAEF06D734525dd33B08725EF2232af36f1d) |
| Dean adds HOD | [0x3d20779aeace65a850aecdb4cea20429f7e8c85a3ce60f375c2b47c87e50d9c5](https://sepolia.etherscan.io/tx/0x3d20779aeace65a850aecdb4cea20429f7e8c85a3ce60f375c2b47c87e50d9c5) |
| HOD assign Coordinator | [0x439b25fc8761802ae065c0067f3e7a8b5e61aa136e6abde6702d7b04bc9b597f](https://sepolia.etherscan.io/tx/0x439b25fc8761802ae065c0067f3e7a8b5e61aa136e6abde6702d7b04bc9b597f) |
| Coordinator adds Course (DSA) | [0x32eeaf2de1445b6bd9688f2f8a42558b9aa80917d28281c1aca1b117ceca6d60](https://sepolia.etherscan.io/tx/0x32eeaf2de1445b6bd9688f2f8a42558b9aa80917d28281c1aca1b117ceca6d60) |
| Coordinator adds Course (OS) | [0x8b47774a2c2afaff4a63e65eb71a3777498331881920537a21a23087a60dab44](https://sepolia.etherscan.io/tx/0x8b47774a2c2afaff4a63e65eb71a3777498331881920537a21a23087a60dab44) |
| Coordinator registers student | [0xc52ad59b356ee3c11da67522dd746af0f32cbdac453ed3173142d54ab6e461c4](https://sepolia.etherscan.io/tx/0xc52ad59b356ee3c11da67522dd746af0f32cbdac453ed3173142d54ab6e461c4) |
| HOD uploads Question Paper | [0xd7e73bcf76a1b68d1f1c345005b7ae1ef9fbe97a8e2a71b81308febd73078207](https://sepolia.etherscan.io/tx/0xd7e73bcf76a1b68d1f1c345005b7ae1ef9fbe97a8e2a71b81308febd73078207) |
| HOD assign Marks | [0x424e5744a71abefcb1f6522cddb8b281f6eeec73e1674453d306a2cbef4a6364](https://sepolia.etherscan.io/tx/0x424e5744a71abefcb1f6522cddb8b281f6eeec73e1674453d306a2cbef4a6364) |
| Coordinator uploads Gradesheets | [0xb0c231d7dcd64bd9e5bb0aaa4457d283082aa42e34b8c1818cd11e496d85439d](https://sepolia.etherscan.io/tx/0xb0c231d7dcd64bd9e5bb0aaa4457d283082aa42e34b8c1818cd11e496d85439d) |
| Dean uploads certificates | [0x51b25e55ac0a5e00b967775a27b2947ae3842cab47badd11af3d042c64d7b1c8](https://sepolia.etherscan.io/tx/0x51b25e55ac0a5e00b967775a27b2947ae3842cab47badd11af3d042c64d7b1c8) |
| Dean revokes a certificate | [0xadf2ea16daf385ee1016b285a79336cd2cb4478345b334066dc3e621e9e68999](https://sepolia.etherscan.io/tx/0xadf2ea16daf385ee1016b285a79336cd2cb4478345b334066dc3e621e9e68999) |
| Dean changes Registrar | [0x10a3977f0fd056db33e15ef0319aebff2d26586383bef9cbc8f5ed29f1cf60b6](https://sepolia.etherscan.io/tx/0x10a3977f0fd056db33e15ef0319aebff2d26586383bef9cbc8f5ed29f1cf60b6) |
| Dean can only change Dean | [0x45395b82c4a1cdf6e49bdb6f0fa579cfd99c4385c96a36bba1dd6db5371ec105](https://sepolia.etherscan.io/tx/0x45395b82c4a1cdf6e49bdb6f0fa579cfd99c4385c96a36bba1dd6db5371ec105) |

These transaction are as shown in the [YouTube Demo Video](https://youtu.be/_LLnanOCrpU?si=Mo1TR-GtxKPGIFTT) 

------


### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| SDG | Alignment |
|:---|:----------|
| Goal 16 - Peace, Justice and Strong Institutions| By creating a decentralized and immutable system for identity, the project directly supports SDG Target 16.9 (provide legal identity for all). It strengthens institutional integrity by reducing fraud and corruption, building a foundation of trust between citizens and service providers. |
| Goal 9 - Industry, Innovation, and Infrastructure | This project represents a significant innovation in digital infrastructure. It provides a secure, resilient, and user-centric foundation upon which industries like finance, healthcare, and e-governance can build next-generation services, fostering a robust digital economy. |
| Goal 8 - Decent Work and Economic Growth | A Self-Sovereign Identity (SSI) system streamlines hiring and credential verification, reducing friction in the labor market. It empowers individuals to easily prove their qualifications, promoting a merit-based workforce and enabling smoother participation in the modern and gig economies.  |
| Goal 1 - No Poverty | A secure and accessible digital identity is crucial for financial inclusion. It enables marginalized populations to access bank accounts, credit, and government social safety nets securely and efficiently, ensuring that aid reaches the intended recipients and providing a pathway out of poverty.  |


-----


### References

1. Sulochana Devi, Shrineeth Kotian, Manish Kumavat, Dixit Patel.  
   *Digital Identity Management System Using Blockchain.*  
   [Details: Uses IPFS for off-chain storage, ZKPs for authentication, self-sovereign identity, and smart contract automation.]  

2. Alexandru-Cristian Careja, Nicolae Tapus.  
   *Digital Identity Using Blockchain Technology.*  
   [Details: ECDSA for signatures, Ethereum smart contracts for privacy, and digital identity wallets for empowerment.]  

3. Robledo, Rivera, Avalos, Larios. Universidad de Guadalajara, IBM Mexico.  
   *How Digital Identity on Blockchain Can Contribute in a Smart City Environment.*  
   [Details: Smart city use cases, Estonia e-ID example, and gaps in cross-platform/legal standards.]  











