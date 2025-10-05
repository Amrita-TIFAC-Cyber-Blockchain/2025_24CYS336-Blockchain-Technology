
# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/Batch-22UCYS-gold) ![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject-Blockchain-blue) <br/>

## BT#14

![](https://img.shields.io/badge/Member-Duvvuru_Akshaya_Saketh_Reddy-g)  <br/> 
![](https://img.shields.io/badge/Member-Shyam-gold)  <br/> 
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

------

### Problem Statement

Vulnerability to Hacking and Database Breaches
Most hospitals store patient data in centralized electronic databases, which are prime targets for cyberattacks. Real-world incidents (e.g., the 2017 Cosmetic Institute and medical Amazon database breaches) show how unauthorized parties can hack and leak sensitive medical records.

#### Mutable and Alterable Medical Records:
Traditional systems allow users with sufficient privileges to alter or delete medical records, often without a clear audit trail. This increases the risk of data tampering and medical fraud.

#### Lack of Trust in Data Provenance:
When doctors upload medical records, there's often no robust, tamper-evident way to verify when, how, or by whom the data was entered. This lack of transparency undermines trust in data authenticity.

#### No True Patient Ownership or Immediate Access:
Hospitals legally own and control medical records. Patients often face slow, complicated, and incomplete processes when trying to access their own data.

#### Fragmented, Siloed, and Non-Interoperable Data:
Medical records are scattered across institutions using different data standards and formats. This fragmentation prevents a unified view of a patient's medical history and leads to redundant testing and missed critical information.

#### Restricted Data Sharing and Lack of Patient Control:
Patients have little control over who can access their data. Record sharing between hospitals is cumbersome, rarely automated, and often blocked by policy or cost constraints.

#### Data Integrity Risks and Lack of Audit Trail:
There is limited ability to track who accessed or modified records, making compliance verification and security audits difficult and unreliable.

-----
### Literature Survey 

Centralized storage of medical records is common in most hospitals today. This approach makes sensitive patient data a target for hacking and unauthorized access. There have been real cases where databases have been breached, exposing confidential records. Additionally, in traditional systems, those with special access can alter or delete records without leaving a clear trace, making it hard to prove data integrity or trace any changes made to patient information.

Another major issue is lack of patient ownership and control. Usually, hospitals legally own and manage the records, and patients must follow slow and complicated processes to access their own medical information. The fragmentation of health data—where records are spread across different hospitals and systems—further complicates access and makes it difficult for patients and doctors to get a complete picture of medical history. Sharing this data between medical providers is often slow, not secure, and sometimes impossible due to incompatible systems.

Blockchain technology offers an effective solution to these problems. It enables decentralized data storage, meaning information is not held in just one place and does not have a single point of failure. Any action, like creating or sharing a record, is permanently recorded, making the system transparent and auditable. Once written, data cannot be secretly changed or removed, ensuring integrity. Patients can finally have true control over who views their records, with permissions managed through blockchain smart contracts. By combining blockchain with secure storage methods like IPFS, patient data remains both private and securely accessible, addressing many of the shortcomings of current healthcare record systems.


-----
### Architectural Diagram

<img width="1105" height="690" alt="image" src="https://github.com/user-attachments/assets/5f4f2cfc-e258-4126-b3c3-1f6b5984a865" />


------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

This decentralized medical records system addresses critical issues of data ownership, security, and interoperability by leveraging the Polygon blockchain and IPFS. The system is architected to give patients complete control over their health information. When a doctor creates a new record, the actual, encrypted file is stored off-chain on the decentralized IPFS network, which makes it resilient and secure against a single point of failure. Simultaneously, an immutable, tamper-proof reference (a hash) to that encrypted file is permanently stored on the Polygon blockchain. This on-chain reference ensures the integrity and verifiability of the record, while the high speed and low cost of the Polygon network make the system efficient for real-world use.

The core of the system’s security and privacy model lies with the patient’s blockchain wallet. This wallet acts as the patient’s digital identity and the sole key to their medical data. Patients can use their wallet to explicitly grant and revoke access to their encrypted records, giving them granular control over who can view their information and for how long. This design not only makes it incredibly difficult for unauthorized parties to access sensitive data but also empowers patients to seamlessly share their complete medical history with any healthcare provider, regardless of their native EHR system. By placing data ownership directly in the hands of the patient, this system fundamentally shifts the paradigm from institutional control to individual sovereignty.


-----

### References

1) Chen, Y., Ding, S., Xu, Z., Zheng, H., & Yang, S. (2019). Blockchain-based medical records secure storage and medical service framework. Journal of medical systems, 43(1), 5.
2) Azaria, A., Ekblaw, A., Vieira, T., & Lippman, A. (2016, August). Medrec: Using blockchain for medical data access and permission management. In 2016 2nd international conference on open and big data (OBD) (pp. 25-30). IEEE.


