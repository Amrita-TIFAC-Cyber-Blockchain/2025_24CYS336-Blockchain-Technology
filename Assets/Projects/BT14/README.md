# 24CYS336 - Blockchain-Technology 

## BT#14 - PatientManagementSystem
![](https://img.shields.io/badge/Member-Duvvuru_Akshaya_Saketh_Reddy-gold) ![](https://img.shields.io/badge/Member-Shyam-gold)  <br/> 
![](https://img.shields.io/badge/SDG-3-darkgreen)  ![](https://img.shields.io/badge/SDG-9-darkgreen)  ![](https://img.shields.io/badge/SDG-16-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-17th_Nov_2025-brown) <br/>

------

### Problem Statement :-

#### Vulnerability to Hacking and Database Breaches :
Most hospitals store patient data in centralized electronic databases, which are prime targets for cyberattacks. Real-world incidents (e.g., the 2017 Cosmetic Institute and medical Amazon database breaches) show how unauthorized parties can hack and leak sensitive medical records.

#### Mutable and Alterable Medical Records :
Traditional systems allow users with sufficient privileges to alter or delete medical records, often without a clear audit trail. This increases the risk of data tampering and medical fraud.

#### Lack of Trust in Data Provenance :
When doctors upload medical records, there's often no robust, tamper-evident way to verify when, how, or by whom the data was entered. This lack of transparency undermines trust in data authenticity.

#### No True Patient Ownership or Immediate Access :
Hospitals legally own and control medical records. Patients often face slow, complicated, and incomplete processes when trying to access their own data.

#### Fragmented, Siloed, and Non-Interoperable Data :
Medical records are scattered across institutions using different data standards and formats. This fragmentation prevents a unified view of a patient's medical history and leads to redundant testing and missed critical information.

#### Restricted Data Sharing and Lack of Patient Control :
Patients have little control over who can access their data. Record sharing between hospitals is cumbersome, rarely automated, and often blocked by policy or cost constraints.

#### Data Integrity Risks and Lack of Audit Trail :
There is limited ability to track who accessed or modified records, making compliance verification and security audits difficult and unreliable.

-----
### Literature Survey :-

Centralized storage of medical records is common in most hospitals today. This approach makes sensitive patient data a target for hacking and unauthorized access. There have been real cases where databases have been breached, exposing confidential records. Additionally, in traditional systems, those with special access can alter or delete records without leaving a clear trace, making it hard to prove data integrity or trace any changes made to patient information.

Another major issue is lack of patient ownership and control. Usually, hospitals legally own and manage the records, and patients must follow slow and complicated processes to access their own medical information. The fragmentation of health data—where records are spread across different hospitals and systems—further complicates access and makes it difficult for patients and doctors to get a complete picture of medical history. Sharing this data between medical providers is often slow, not secure, and sometimes impossible due to incompatible systems.

Blockchain technology offers an effective solution to these problems. It enables decentralized data storage, meaning information is not held in just one place and does not have a single point of failure. Any action, like creating or sharing a record, is permanently recorded, making the system transparent and auditable. Once written, data cannot be secretly changed or removed, ensuring integrity. Patients can finally have true control over who views their records, with permissions managed through blockchain smart contracts. By combining blockchain with secure storage methods like IPFS, patient data remains both private and securely accessible, addressing many of the shortcomings of current healthcare record systems.


-----
### Architectural Diagram :-

<img width="700" alt="image" src="https://github.com/user-attachments/assets/5f4f2cfc-e258-4126-b3c3-1f6b5984a865" />

------



### Mapping the Project to Relevant Sustainable Development Goals (SDGs)
This project aligns primarily with SDG 3: Good Health and Well-Being, as it enhances healthcare delivery by ensuring secure, reliable, and tamper-proof access to medical records. By improving accuracy, reducing medical errors, and increasing patient access to their own data, the system supports better clinical outcomes and patient empowerment.

It further contributes to SDG 9: Industry, Innovation, and Infrastructure by introducing a modern, decentralized data management architecture using advanced technologies such as blockchain and cryptographic identity management. This promotes innovation and modernization within the healthcare infrastructure.

The project also supports SDG 16: Peace, Justice, and Strong Institutions, as it increases transparency, auditability, and accountability within medical record management. Immutable logs, access controls, and verifiable data integrity reduce fraud, unauthorized access, and corruption in healthcare systems.

------

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner  | 0x8005dc8b2ebbfac096e26d6650f6b49fc535a35f |
| Docter | 0xfec4485cd3228067022137044afbb232fb005699 |
| Patient | 0x9640338c1b3cc2aa1322fcb6f777dda5f806ac65 | 

#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts |      |

These transaction are as shown in the [YouTube Demo Video]() 

------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs) :-

#### Vulnerability to Hacking and Database Breaches :
Our system stores data off-chain on the IPFS network, which is a distributed, peer-to-peer system. The data is encrypted before being uploaded, meaning even if an attacker gains access to the files on IPFS, they are unreadable without the patient's private key. The Polygon blockchain only holds the secure, unhackable reference to the data, not the data itself, eliminating the risk of a single database breach leaking all patient information.

#### Mutable and Alterable Medical Records :
The Polygon blockchain provides a permanent, immutable record of every transaction. Once a hash of a medical record is written to the blockchain, it cannot be changed or deleted. Any subsequent changes require a new transaction, creating a verifiable and transparent audit trail. This design makes data tampering nearly impossible and instantly detectable.

#### Lack of Trust in Data Provenance :
The blockchain's public ledger provides a cryptographically secure timestamp and a clear record of who uploaded the data (using their wallet address) and when. This verifiable provenance ensures that every record is authentic, building trust in the data's origin and integrity.

#### No True Patient Ownership or Immediate Access :
The blockchain's public ledger provides a cryptographically secure timestamp and a clear record of who uploaded the data (using their wallet address) and when. This verifiable provenance ensures that every record is authentic, building trust in the data's origin and integrity.

#### Fragmented, Siloed, and Non-Interoperable Data :
By using a single, unified system, patients can aggregate all of their medical records in one place. The decentralized nature of IPFS and the consistent data referencing on the Polygon blockchain creates a single, comprehensive view of the patient's health history, making the data interoperable across different healthcare providers and eliminating information silos.

#### Restricted Data Sharing and Lack of Patient Control :
Patients have granular control over their data. Using their wallet, they can grant a doctor, a specialist, or even a researcher temporary, specific access to their records. The process is entirely automated and controlled by the patient, giving them full autonomy.

#### Data Integrity Risks and Lack of Audit Trail :
The blockchain's immutable ledger serves as a perfect, verifiable audit trail. Every action from adding a new record to granting a doctor access is logged as a transaction. This provides a transparent history of all data access, making compliance checks and security audits straightforward and reliable.


-----

### References :-

1) Chen, Y., Ding, S., Xu, Z., Zheng, H., & Yang, S. (2019). Blockchain-based medical records secure storage and medical service framework. Journal of medical systems, 43(1), 5.
2) Azaria, A., Ekblaw, A., Vieira, T., & Lippman, A. (2016, August). Medrec: Using blockchain for medical data access and permission management. In 2016 2nd international conference on open and big data (OBD) (pp. 25-30). IEEE.







