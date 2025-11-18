
# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/Batch-22UCYS-gold) ![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject-Blockchain-blue) <br/>

## BT#22 UniVeritas: Blockchain-Based Identity and Trust Framework for Universities

![](https://img.shields.io/badge/Member-Rajith_S-gold) ![](https://img.shields.io/badge/Member-T_Ragulraj-gold) ![](https://img.shields.io/badge/Member-Mithun_Chakkarawarthy_S-gold)  <br/>
![](https://img.shields.io/badge/SDG-1-darkgreen) ![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

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



### Architectural Diagram


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







