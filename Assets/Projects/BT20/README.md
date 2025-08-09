
# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/Batch-22UCYS-gold) ![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject-Blockchain-blue) <br/>

## BT#20 - Healthcare Data Ownership

![](https://img.shields.io/badge/Member-Eeshwar_E-gold)  <br/>
![](https://img.shields.io/badge/Member-Tarun_Sri_Vathsan-gold)  <br/> 
![](https://img.shields.io/badge/Member-Sharath-gold)  <br/> 
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

------

### Problem Statement
In today’s digital healthcare environment, patient data is frequently stored and controlled by healthcare providers, limiting patients' ownership, transparency, and access. The lack of a unified, secure, and tamper-proof system often results in privacy concerns, and inefficient information exchange between institutions. This project aims to implement a blockchain-based framework that empowers patients with complete ownership and control over their healthcare data. By leveraging blockchain’s decentralized, immutable, and transparent nature, the system ensures secure data sharing, tamper detection, and selective access, thereby promoting trust, privacy, and interoperability in healthcare data management.

-----
### Literature Survey 

We studied the paper “A System for the Promotion of Traceability and Ownership of Health Data Using Blockchain” by Rui P. Pinto and colleagues (2022), and it shows how blockchain can be used to give patients greater control over their health information without sacrificing privacy or performance. Using Hyperledger Fabric, the authors created a system that stores personal details separately from medical records, linking them through secure, blockchain-based IDs. This makes it possible to track who owns and accesses the data while keeping identities hidden. In our project, this idea led us to use hashed on-chain identities to protect user privacy, along with smart contracts that automatically log and monitor access - putting privacy and transparency at the heart of the design.

We studied the paper “A Patient-Centric Health Information Exchange Framework Using Blockchain Technology” by Yan Zhuang and team (2020), and the paper takes the approach a step further by putting patients fully in charge of how their data is shared. They introduced blockchain-generated global IDs that allow secure, anonymous sharing across different healthcare providers, and a “touchpoint” method where patients can share just the specific pieces of their records needed for a given purpose. Inspired by this, we built our system to use pseudonymous blockchain IDs and smart contracts that enforce selective sharing rules. We also store documents securely off-chain with only essential details on-chain, so users have full control over exactly what they share and with whom.

-----
### Architectural Diagram

![WhatsApp Image 2025-08-09 at 16 04 31_ac6f7676](https://github.com/user-attachments/assets/6c95bcda-1727-480d-8ebe-3b78ed6c2e0c)




------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)
**SDG 3:** Good Health and Well-Being: Achieve universal health coverage, including access to quality healthcare services and access to safe, effective, and affordable medicines and vaccines for everyone. The project supports universal health coverage by improving access to individual health records and making data exchange between institutions secure, and transparent, allowing better informed care for patients. This project ensures data privacy and ownership enables trust in digital healthcare systems and supports adoption.

**SDG 9:**  Industry, Innovation, and Infrastructure: Enhance scientific research, upgrade technological capabilities of industrial sectors, and encourage innovation. This project leverages latest blockchain technology to modernize healthcare infrastructure, enable interoperability, and promote solutions for health data management.

**SDG 16:** Peace, Justice, and Strong Institutions: Develops effective, accountable, and transparent institutions at all levels. The system’s decentralized and tamper-proof architecture involves transparency and accountability in the management of sensitive healthcare data, reducing the risk of abuse or fraud and ensuring that patients’ rights over their data are protected. This project gives patients control over their data, the project upholds principles of justice and empowerment.

-----

### References
[1] Pinto, R. P., Silva, B. M., & Inacio, P. R. (2022). A system for the promotion of traceability and ownership of health data using blockchain. IEEE Access, 10, 92760-92773.

[2] Zhuang, Y., Sheets, L. R., Chen, Y. W., Shae, Z. Y., Tsai, J. J., & Shyu, C. R. (2020). A patient-centric health information exchange framework using blockchain technology. IEEE journal of biomedical and health informatics, 24(8), 2169-2176.


