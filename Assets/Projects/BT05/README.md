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

Electronic voting systems have evolved over the past two decades, but the majority continue to face challenges related to centralized control, data integrity, and verifiability. Early pioneering work by Satoshi Nakamoto (2008) introduced blockchain as a decentralized, immutable ledger, proving that distributed consensus could eliminate the need for centralized authorities. Following this, Swan (2015) expanded on blockchain applications, suggesting voting as a high-impact use case due to blockchain’s transparency and trustless architecture.

Research by Zyskind et al. (2015) demonstrated that blockchain could decentralize personal data management while supporting privacy-preserving mechanisms. This work established that blockchain can ensure secure data storage—crucial for sensitive information like votes.

In the context of voting, McCorry et al. (2017) introduced a smart-contract-based boardroom voting system that ensured maximum privacy and eliminated the possibility of double voting. Their design highlighted the potential of Ethereum-based solutions for real-world elections.

Further studies, including Hardwick et al. (2018), explored blockchain-based e-voting models that improved transparency, auditability, and resistance to tampering. Zhao and Chan (2019) proposed privacy-preserving blockchain voting protocols, addressing the key challenge of maintaining voter anonymity while keeping the vote count verifiable.

Most recently, enterprise-focused research by González et al. (2022) introduced a robust architecture combining blockchain, smart contracts, and role-based access control. Their model emphasized real-world adaptability, system scalability, and tamper-proof audit logs—principles that align directly with the design goals of BlockVote.

This project builds upon these foundational works by implementing a blockchain-based election system using Solidity, Web3.js, and Ganache to create a transparent, secure, and enterprise-ready electronic voting platform.

---
## Proposed Solution
1. **Decentralized Voting Using Smart Contracts**  
    - The entire voting process is handled by a Solidity smart contract deployed on the Ethereum blockchain.
    - It manages election creation, candidate registration, vote casting, and result calculation.
    - The contract ensures tamper-proof data, immutability, and prevents double voting by verifying each voter’s address.
      
2. **Transparent and Secure Frontend Interface**  
    - A simple HTML and JavaScript (Web3.js) interface allows users to securely interact with the blockchain.
    - Voters connect their MetaMask wallet to cast a vote, and each vote is recorded as a blockchain transaction.
    - The interface displays live election results directly from the smart contract, ensuring complete transparency.  
    
3. **Local Blockchain Deployment Using Ganache**  
    - The smart contract is deployed on Ganache, which acts as a local Ethereum test network.
    - Ganache provides multiple pre-funded accounts to simulate voters and the election administrator.
    - All blockchain operations—deployment, voting, and fetching results—are executed safely without spending real Ether.  
    
4. **Security and Integrity Mechanisms**  
    - Every vote is a verified blockchain transaction, ensuring that it cannot be altered or deleted.
    - The system implements role-based permissions, allowing only the election owner to start or end the election.
    - Voter anonymity is protected using blockchain wallet addresses, without revealing personal identity.  
    
5. **End-to-End Tamper-Proof Election Workflow**  
    - The election owner initiates the election.
    - Voters cast their votes using MetaMask.
    - All votes are stored immutably on the blockchain.
    - The smart contract automatically tallies the results.
    - The frontend displays final results with full transparency and accuracy.
---
## Modules
1. **Smart Contract Module**  ``Voting.sol``
    - Handles election creation, candidate registration, vote casting, and result tallying.  
    - Stores all votes immutably on the blockchain.  
    - Prevents double voting and enforces owner-only administrative functions.
      
2. **Frontend Module** ``voting_ganache.html``  
   - Provides a user interface for voters and the election owner.
   - Connects to the blockchain using Web3.js.
   - Allows users to cast votes, view candidates, and check live results.
     
3. **Blockchain Network Module** ``Ganache``
    - Acts as a local Ethereum test network.
    - Provides pre-funded accounts for voters and the owner.
    - Executes all smart contract interactions and stores blockchain data.
      
4. **MetaMask Wallet Module**
    - Connects users to the blockchain securely.
    - Signs and submits transactions (voting, starting/ending election).
    - Ensures user authentication using wallet addresses.
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

González, C. D., García, M., & Pacheco, J. (2022). Electronic voting system using an enterprise blockchain. *Journal of Systems Architecture*, 128, 102–143. https://doi.org/10.1016/j.sysarc.2022.102643  

Hardwick, F. S., Chua, S., & Asokan, N. (2018). Blockchain-based electronic voting system. *2018 IEEE International Conference on Cloud Computing Technology and Science (CloudCom)*, 341–346. https://doi.org/10.1109/CloudCom2018.2018.00060  

McCorry, P., Shahandashti, S. F., & Hao, F. (2017). A smart contract for boardroom voting with maximum voter privacy. *Financial Cryptography and Data Security*, 357–375. https://doi.org/10.1007/978-3-319-70972-7_20  

Nakamoto, S. (2008). Bitcoin: *A peer-to-peer electronic cash system*. https://bitcoin.org/bitcoin.pdf  
Swan, M. (2015). *Blockchain: Blueprint for a new economy*. O’Reilly Media.  

Zhao, Z., & Chan, A. (2019). How to vote privately using blockchain: Privacy-preserving voting protocols. *Journal of Information Security and Applications*, 48, 102–116. https://doi.org/10.1016/j.jisa.2019.04.003  

Zyskind, G., Nathan, O., & Pentland, A. (2015). Decentralizing privacy: Using blockchain to protect personal data. *2015 IEEE Security and Privacy Workshops (SPW)*, 180–184. https://doi.org/10.1109/SPW.2015.27  

------






