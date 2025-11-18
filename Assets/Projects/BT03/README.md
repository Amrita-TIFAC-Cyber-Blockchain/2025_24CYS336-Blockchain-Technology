# 24CYS336 - Blockchain-Technology 

## BT#03 - Decentralized Academic Credential Verification System (DCDVS)

![](https://img.shields.io/badge/Member-Deepak_Kumar_S-gold)  <br/> 
![](https://img.shields.io/badge/SDG--darkgreen) ![](https://img.shields.io/badge/SDG--darkgreen)  <br/>
![](https://img.shields.io/badge/Reviewed-18th_Nov_2025-brown) <br/>

------

### Problem Statement
The traditional system for managing and verifying academic credentials in India is characterized by significant inefficiencies and vulnerabilities. Manual verification processes are not only time-consuming, causing prolonged delays in student admissions and employment, but are also costly for educational institutions and employers. More critically, the use of physical documents and centralized databases makes the system highly susceptible to forgery and fraud, undermining trust in the authenticity of qualifications. This project aims to address these issues by developing a **Decentralized Academic Credential Verification System (DCDVS)** that provides a secure, instant, and privacy-preserving solution for managing academic qualifications.

-----
### Literature Survey 
The application of blockchain technology to academic credential management is a growing field of research aimed at overcoming the limitations of traditional systems. The following literature review is based on an analysis of relevant research, with a particular focus on solutions that prioritize privacy and efficiency, as outlined in the paper "Enhancing Academic Certificate Privacy with a Hyperledger Fabric Blockchain-Based Access Control Approach" by Saleh, Ghazali, and Idris (2023).

#### Existing Solutions
- **Blockchain-Based Systems:** Early blockchain projects in education, such as Blockcert (MIT) and solutions built on Ethereum, enhance traceability and data integrity by storing cryptographic hashes of certificates on a decentralized ledger. While these systems successfully empower students with greater control, they often rely on public blockchains that can have scalability and privacy limitations for a large-scale, institutional network.

- **Permissioned Blockchain Models:** Later prototypes, as cited in the Saleh et al. paper, moved to permissioned platforms like Hyperledger Fabric. These models offer the necessary controls for enterprise use, including fine-grained access control and privacy through features such as Private Data Collections. However, many of these systems are proof-of-concept and have yet to achieve widespread adoption across multiple institutions.

- **Centralized Authentication Services:** Some proposed systems, like VECefblock, use permissioned blockchains but still rely on a centralized authentication service. This creates a single point of vulnerability, and in some cases, the data storage could be susceptible to surveillance, compromising the core principle of decentralization.

#### Research Gaps
- **Holistic, Multi-Stakeholder Approach:** While many projects focus on one or two stakeholders (e.g., student-to-verifier), there is a gap in a holistic, multi-stakeholder framework that clearly defines the roles and permissions for ministries, universities, students, and employers in a single, cohesive system.

- **Scalable and Cost-Effective Institutional Solutions:** Public blockchain solutions often face challenges with transaction costs and throughput for large-scale issuance events (e.g., graduation ceremonies). The research confirms the need for a system with predictable, near-zero costs and high performance, which is where Hyperledger Fabric offers a clear advantage.

- **Directly Address Indian Market Needs:** While a global problem, the specific challenges in the Indian context—such as the high prevalence of fraud and the sheer volume of graduates—require a tailored solution. My project focuses on demonstrating the viability of a system designed to meet these specific needs.

-----
### Architectural Diagram

- The DCDVS operates on a standard Full-Stack DApp architecture, utilizing a local Ethereum Virtual Machine (EVM) for smart contract execution and IPFS for off-chain document storage.

**Key Data Flow (CRUD):**

1.  **Creation (Admin):** The Admin uploads a certificate file (PDF/Image). The **Frontend** calculates the file's hash (CID) via the **IPFS API (5001)**. The CID is then sent to the **Smart Contract** via **Ethers.js**, and the CID is stored immutably on the **Ganache EVM**.
2.  **Verification (User):** A Verifier uses the DApp to read the record. The DApp retrieves the CID from the Smart Contract and creates a public link to the file on the **IPFS Gateway (8080)**, proving the certificate's existence and content integrity. (Future Work)
------

### DCDVS Project Directory Structure
```bash
dcdvs-project/
├── contracts/
│   ├── CertificateVerifier.sol
│   └── Migrations.sol
│
├── migrations/
│   ├── 1_initial_migration.js
│   └── 2_deploy_contract.js
│
├── test/
│
├── client/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminView.js
│   │   │   ├── Header.js
│   │   │   └── UserView.js
│   │   │
│   │   ├── contracts/
│   │   │   ├── CertificateVerifier.json
│   │   │   └── Migrations.json
│   │   │
│   │   ├── utils/
│   │   │   └── web3Service.js
│   │   │
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   │
│   ├── package.json
│   └── README.md
│
├── .env
└── truffle-config.js
```
------
## Project Setup and Execution

This project requires Node.js, Truffle, MetaMask, and a local IPFS Daemon.

### Prerequisites

* Node.js (v18+)
* MetaMask Browser Extension (latest)
* Truffle & `ganache` CLI (`npm install -g truffle ganache`)
* IPFS Daemon (Ensure `go-ipfs` or `js-ipfs` is installed and the `ipfs` command is available).

---

### Step 1: Start Blockchain Node (Ganache)

Start the local EVM node with the configuration required by the DApp:

```bash
# We use Chain ID 31337 and Port 8545 for stability with modern MetaMask/Ethers.js
ganache --server.port 8545 --chain.networkId 31337 --chain.chainId 31337 --wallet.mnemonic "debris excess tuna napkin comfort erase liberty drama goat fun bubble giggle"
```
### Step 2: Configure IPFS CORS

* Configure your IPFS daemon to allow connections from your React app (localhost:3000).

* Stop Daemon: Press Ctrl + C if your ipfs daemon is running.

Apply CORS Policy (Run these 3 commands in PowerShell):

```bash
ipfs config API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "[http://127.0.0.1:5001](http://127.0.0.1:5001)"]'
ipfs config API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
ipfs config API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
````
Start IPFS Daemon:

```bash
ipfs daemon
```

### Step 3: Deploy Smart Contracts

* Navigate to the project root (dcdvs-project/) and deploy the contracts.
```bash
# Navigate to the root directory
truffle migrate --network development --reset
```
### Step 4: Run Frontend
```bash
cd client
npm start
```
### Step 5: MetaMask Connection
* Add Network: In MetaMask, add a custom network pointing to RPC URL: http://127.0.0.1:8545 and Chain ID: 31337. Set Currency Symbol to ETH.
* Connect: Click "Connect MetaMask" on the DApp. The Admin account will load, and you can begin testing the CRUD and IPFS upload features.
------


### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner  |  |
| User 1 |  |
| User 2 |  | 

#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts |      |

These transaction are as shown in the [YouTube Demo Video]() 

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| SDG | Alignment |
|:---|:----------|
| Goal 4 - Quality Education| By making credentials tamper-proof and instantly verifiable, my project upholds the integrity of academic qualifications, ensuring a fairer and more credible educational system for all. |
| Goal 8 - Decent Work and Economic Growth | The DCDVS reduces verification time and cost, streamlining hiring and promoting a productive, merit-based workforce. |
| Goal 16 - Peace, Justice and Strong Institutions | By creating a permissioned blockchain network, the system builds a framework for greater accountability and transparency, strengthening institutional integrity and providing a verifiable record of individual achievements.  |

-----

### References
- Saleh, O. S., Ghazali, O., & Idris, N. B. (2023). Enhancing academic certificate privacy with a hyperledger fabric blockchain-based access control approach. SN Computer Science, 4(5), 602.






