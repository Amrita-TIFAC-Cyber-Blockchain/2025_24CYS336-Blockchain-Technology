<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## BT#20 - Healthcare Data Ownership

![](https://img.shields.io/badge/Member-Eeshwar_E-gold) ![](https://img.shields.io/badge/Member-Tarun_Sri_Vathsan-gold) ![](https://img.shields.io/badge/Member-Sharath-gold)  <br/>
![](https://img.shields.io/badge/SDG-3-darkgreen) ![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-16th_Nov_2025-brown) <br/>

------

### Problem Statement
In today’s digital healthcare environment, patient data is frequently stored and controlled by healthcare providers, limiting patients' ownership, transparency, and access. The lack of a unified, secure, and tamper-proof system often results in privacy concerns, and inefficient information exchange between institutions. This project aims to implement a blockchain-based framework that empowers patients with complete ownership and control over their healthcare data. By leveraging blockchain’s decentralized, immutable, and transparent nature, the system ensures secure data sharing, tamper detection, and selective access, thereby promoting trust, privacy, and interoperability in healthcare data management.

-----
### Literature Survey 

We studied the paper “A System for the Promotion of Traceability and Ownership of Health Data Using Blockchain” by Rui P. Pinto and colleagues (2022), and it shows how blockchain can be used to give patients greater control over their health information without sacrificing privacy or performance. Using Hyperledger Fabric, the authors created a system that stores personal details separately from medical records, linking them through secure, blockchain-based IDs. This makes it possible to track who owns and accesses the data while keeping identities hidden. In our project, this idea led us to use hashed on-chain identities to protect user privacy, along with smart contracts that automatically log and monitor access - putting privacy and transparency at the heart of the design.

We studied the paper “A Patient-Centric Health Information Exchange Framework Using Blockchain Technology” by Yan Zhuang and team (2020), and the paper takes the approach a step further by putting patients fully in charge of how their data is shared. They introduced blockchain-generated global IDs that allow secure, anonymous sharing across different healthcare providers, and a “touchpoint” method where patients can share just the specific pieces of their records needed for a given purpose. Inspired by this, we built our system to use pseudonymous blockchain IDs and smart contracts that enforce selective sharing rules. We also store documents securely off-chain with only essential details on-chain, so users have full control over exactly what they share and with whom.

-----
### Architectural Diagram

<p align="center">
  <img src="https://github.com/user-attachments/assets/6c95bcda-1727-480d-8ebe-3b78ed6c2e0c" width=500 />
</p>

-----

### Results 

#### Stakeholder Details

| Role               | Address                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **Contract Owner** | [`0x5bD54880bF4d01bc69F04e0e591c5019512f37B7`](https://sepolia.etherscan.io/address/0x5bD54880bF4d01bc69f04e0e591c5019512f37b7) |
| **Hospital 1**     | [`0xEF09Bb98B5B3B3F285eb05356c6938F23f616904`](https://sepolia.etherscan.io/address/0xEF09Bb98B5B3B3F285eb05356c6938F23f616904) |
| **Hospital 2**     | [`0xC5578AFc6782F7be49b2F32c92d7B6F496a766Aa`](https://sepolia.etherscan.io/address/0xC5578AFc6782F7be49b2F32c92d7B6F496a766Aa) |
| **Patient**        | [`0x9a9Eb409c23015aD438e6C1a32B044A2CbcA5945`](https://sepolia.etherscan.io/address/0x9a9Eb409c23015aD438e6C1a32B044A2CbcA5945) |

#### Transaction Details
| Action                                  | Transaction Hash                                                                                                                                                           |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registering Hospital 1                  | [`0xc0a7378f600d9115fcc02a39598ab6187a8eec36647234de052aeed3d73f0302`](https://sepolia.etherscan.io/tx/0xc0a7378f600d9115fcc02a39598ab6187a8eec36647234de052aeed3d73f0302) |
| Registering Hospital 2                  | [`0x7446c685e5a7af66adf6702d985b3b147504e1a445525e30bec05a271a23afbc`](https://sepolia.etherscan.io/tx/0x7446c685e5a7af66adf6702d985b3b147504e1a445525e30bec05a271a23afbc) |
| Register Patient from Hospital 1        | [`0x46737906286f498e7ed39ac4df5c57185ade1eb31fe1a00f821a03a523cfb668`](https://sepolia.etherscan.io/tx/0x46737906286f498e7ed39ac4df5c57185ade1eb31fe1a00f821a03a523cfb668) |
| Upload Record by Hospital 1             | [`0x4fc8d00a672f54f25e35afd15629e8edc8735669b47934e04de949e66ccb0696`](https://sepolia.etherscan.io/tx/0x4fc8d00a672f54f25e35afd15629e8edc8735669b47934e04de949e66ccb0696) |
| Log Access by Hospital 1                | [`0xe4f604fbd4492cb28ab5a93ce8b50cb87f24c2d721c296f4e2fc542dbd8874cd`](https://sepolia.etherscan.io/tx/0xe4f604fbd4492cb28ab5a93ce8b50cb87f24c2d721c296f4e2fc542dbd8874cd) |
| Invalid Record Access                   | [`0xfe6d3c84611860b0be51eba22e99dc3cec7b5e5aa3c2f431787bc598722c582e`](https://sepolia.etherscan.io/tx/0xfe6d3c84611860b0be51eba22e99dc3cec7b5e5aa3c2f431787bc598722c582e) |
| Access Granted to Hospital 2 by Patient | [`0xa874962a9520faa0c6a7c961d80b6ab3c3daad237e35aef48188c769750880c6`](https://sepolia.etherscan.io/tx/0xa874962a9520faa0c6a7c961d80b6ab3c3daad237e35aef48188c769750880c6) |
| Revoke Access from Hospital 1           | [`0xeeafbbd36ab8eb7e01c54491759304ca3a8d6c9f1c9316f7a9bc540c7851a03f`](https://sepolia.etherscan.io/tx/0xeeafbbd36ab8eb7e01c54491759304ca3a8d6c9f1c9316f7a9bc540c7851a03f) |

#### Demo Video
The Demo Video is available [here](https://youtu.be/1I7A_QbPOfM)

------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)
**SDG 3:** Good Health and Well-Being: Achieve universal health coverage, including access to quality healthcare services and access to safe, effective, and affordable medicines and vaccines for everyone. The project supports universal health coverage by improving access to individual health records and making data exchange between institutions secure, and transparent, allowing better informed care for patients. This project ensures data privacy and ownership enables trust in digital healthcare systems and supports adoption.

**SDG 9:**  Industry, Innovation, and Infrastructure: Enhance scientific research, upgrade technological capabilities of industrial sectors, and encourage innovation. This project leverages latest blockchain technology to modernize healthcare infrastructure, enable interoperability, and promote solutions for health data management.

**SDG 16:** Peace, Justice, and Strong Institutions: Develops effective, accountable, and transparent institutions at all levels. The system’s decentralized and tamper-proof architecture involves transparency and accountability in the management of sensitive healthcare data, reducing the risk of abuse or fraud and ensuring that patients’ rights over their data are protected. This project gives patients control over their data, the project upholds principles of justice and empowerment.

-----

### References
[1] Pinto, R. P., Silva, B. M., & Inacio, P. R. (2022). A system for the promotion of traceability and ownership of health data using blockchain. IEEE Access, 10, 92760-92773.

[2] Zhuang, Y., Sheets, L. R., Chen, Y. W., Shae, Z. Y., Tsai, J. J., & Shyu, C. R. (2020). A patient-centric health information exchange framework using blockchain technology. IEEE journal of biomedical and health informatics, 24(8), 2169-2176.








