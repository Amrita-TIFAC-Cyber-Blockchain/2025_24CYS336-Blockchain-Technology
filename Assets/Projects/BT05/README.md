<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## BT#05 - BlockVote: Enterprise E-Voting System

![](https://img.shields.io/badge/Member-Jose_Rohit_M-gold)  <br/> 
![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen)  <br/>
![](https://img.shields.io/badge/Reviewed-18th_Nov_2025-brown) <br/>

------

### Problem Statement
Traditional electronic voting systems face major challenges such as centralized control, security loopholes, and lack of transparency.  
This project, **BlockVote**, aims to solve these issues by building an **Enterprise E-Voting System** on the blockchain using **Ethereum and Ganache**.  
It ensures **voter anonymity**, **prevents double voting**, and maintains **transparency** and **immutability** through the use of **smart contracts** and **decentralized storage**.

------
## Literature Survey

Traditional electronic voting systems suffer from centralization, security vulnerabilities, and limited transparency, making it difficult to ensure trustworthy and tamper-proof elections. Early blockchain research by Nakamoto [1], Swan [2], and Zyskind et al. [3] demonstrated that decentralized ledgers provide immutability, trustless verification, and secure data handling, forming a strong foundation for blockchain-based e-voting.

Later studies, such as those by McCorry et al. [4], Hardwick et al. [5], and Zhao & Chan [6], showed that Ethereum-based voting protocols and privacy-preserving cryptographic techniques can prevent double voting, improve auditability, and maintain voter anonymity. These works highlight how blockchain significantly enhances election integrity while removing reliance on centralized authorities.

Recent enterprise-oriented research, including González et al. [7], introduced architectures with smart contracts, role-based controls, and immutable audit trails—principles that align directly with BlockVote. This project adopts these proven research concepts by using Solidity, Ganache, and Web3.js to build a transparent, secure, and tamper-proof enterprise e-voting system.

---
## Project Overview

This project demonstrates a simple **Enterprise E-Voting System** built using:
- **Solidity** – Smart contract logic for handling voting securely on the blockchain.  
- **HTML + JavaScript (Web3.js)** – Frontend interface to interact with the smart contract.  
- **Ganache** – A local blockchain used for testing and deploying the smart contract.

---

## Components Used

1. **Smart Contract (`Voting.sol`)**  
   - Written in Solidity.  
   - Handles election setup, vote casting, and result calculation.  
   - Ensures each voter can vote only once and only the owner can end the election.

2. **Frontend (`index.html`)**  
   - Connects to the blockchain using Web3.js.  
   - Allows users to cast their votes and view results through a simple UI.  
   - Ensures that only the owner can start and end the elections.

3. **Ganache Blockchain**  
   - **Ganache** is a personal Ethereum blockchain used for local development and testing.  
   - It simulates Ethereum behavior without using real Ether or connecting to public testnets.  
   - Ganache automatically provides **10 pre-funded Ethereum accounts**, each loaded with **100 ETH** to deploy contracts and test transactions.

---

##  How Ganache Is Used in This Project

- The Solidity contract is deployed on the **Ganache local network**.  
- Each Ganache account represents a **voter** or the **election owner**.  
- Transactions like casting votes or deploying contracts are processed locally with zero cost.  
- The frontend connects to Ganache via **MetaMask**, using the RPC URL and chain ID provided by Ganache.

---

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner  | 0x324be22fc359fdd498ca692524c1dc347c6a4f22 |
| User 1 | 0x729b70d3e557409660df0a4d096eb68ff93d5472  |
| User 2 | 0x08b5e4459f767aa99c323b69cf2035092a2f84f2 | 

#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts | 0xf46d54f6809DBB9867E0E130FF09E18Ba76174fe |

#### Demo Video
The Demo Video is available [here](https://youtu.be/t6vp9mm-YIQ)

---

## Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| **SDG** | **Description** | **Relevance to Project** |
|--------|-----------------|-------------------------|
| **SDG 16 – Peace, Justice and Strong Institutions** | Promote peaceful and inclusive societies with effective, accountable institutions | Provides a **transparent and tamper-proof electronic voting system** to enhance trust in elections |
| **SDG 9 – Industry, Innovation, and Infrastructure** | Build resilient infrastructure and foster innovation | Uses **blockchain technology** to create a **modern and secure digital election infrastructure** | 

---
## References

[1] Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System.  
[2] Swan, M. (2015). Blockchain: Blueprint for a New Economy. O’Reilly Media.  
[3] Zyskind, G., Nathan, O., & Pentland, A. (2015). Decentralizing Privacy: Using Blockchain to Protect Personal Data. IEEE Security and Privacy Workshops.  
[4] McCorry, P., Shahandashti, S. F., & Hao, F. (2017). A Smart Contract for Boardroom Voting with Maximum Voter Privacy. Financial Cryptography and Data Security.  
[5] Hardwick, F. S., Chua, S., & Asokan, N. (2018). Blockchain-based Electronic Voting System. IEEE CloudCom.  
[6] Zhao, Z., & Chan, A. (2019). How to Vote Privately Using Blockchain: Privacy-Preserving Voting Protocols. Journal of Information Security and Applications.  
[7] González, C. D., García, M., & Pacheco, J. (2022). Electronic Voting System Using an Enterprise Blockchain. Journal of Systems Architecture.  

------





