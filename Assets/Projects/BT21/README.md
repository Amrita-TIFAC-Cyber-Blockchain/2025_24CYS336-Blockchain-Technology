# 24CYS336 - Blockchain-Technology 

## BT#21 - 
![](https://img.shields.io/badge/Member-Mithra_K-gold) ![](https://img.shields.io/badge/Member-K_Sree_Charitha-gold) ![](https://img.shields.io/badge/Member-Teena_Chowdri-gold)  <br/> 
![](https://img.shields.io/badge/SDG-11-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen) ![](https://img.shields.io/badge/SDG-17-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-17th_Nov_2025-brown) <br/>

------

### Problem Statement
In India, the process of adopting stray dogs is often informal, unregulated, and lacks 
transparency. There is no unified, verifiable digital registry to track the adoption status, 
vaccination records, or ownership history of rescued dogs. This gap leads to critical issues such 
as: 

1.Re-abandonment of adopted dogs (without consequences) 

2.Fake or unverifiable vaccination/sterilization claims

3.Duplicate dog registrations across multiple NGOs 

4.Illegal dog trade and resale of adopted animals 

5.Lack of accountability and traceability in the system

These challenges not only reduce public trust in adoption systems but also harm the welfare of street dogs. There is a pressing need for a decentralized, tamper-proof, and privacy-respecting solution that allows NGOs, adopters, and the public to interact with the system securely and transparently.

-----
### Literature Survey 
1. We studied the paper titled “Provoke and Approach for Developing PET DApp using 
Blockchain-Based Technology”, which provides a foundation for integrating Privacy-Enhancing 
Technologies (PETs) in Decentralized Applications (DApps). 
Insights and Relevance: 
• Emphasizes privacy-first designs in blockchain systems 
•  Explores Zero-Knowledge Proofs (ZKPs) to ensure user identity protection 
•  Proposes modular DApp architecture using smart contracts and off-chain storage (IPFS) 
•  Encourages user-controlled data access 
How It Informed Our Project: 
• On-chain hashed identities protect adopter privacy while ensuring traceable ownership 
• IPFS used for storing documents securely, metadata on-chain 
• Smart contracts automate dog registration, adoption verification, and rewards 
• NFT-based certificates and ERC-20 tokens incentivize responsible adoption

2. We explored the paper titled “Adoption of pets in distributed network using blockchain 
technology” which showcases how blockchain can be leveraged to create a secure, transparent, 
and decentralized framework for pet adoption. 
Key Takeaways: 
• Demonstrates how Ethereum smart contracts can automate pet adoption and payment 
processes. 
• Highlights the benefits of a decentralized P2P network to eliminate single points of 
failure. 
• Explains gas costs, transaction execution, and security features of blockchain. 
• Emphasizes the immutability of data and secure record-keeping through hash values.  
Project Influence: 
• -Inspired the use of smart contracts for automated pet registration and adoption 
transactions. 
• -Encouraged the integration of a decentralized ledger for tracking ownership and 
preventing fraud. 
• -Guided us to leverage Metamask and Ether for secure, verifiable payments. 
• -Motivated the design of a transparent adoption process where all transactions are 
immutable and traceable.

3.  We explored the paper titled “Applications of Blockchain Techniques in Pet Adoption 
Industry” 
Highlights: 
• Traditional adoption processes are complex and time-consuming, discouraging potential 
adopters. 
• Smart contracts can automate the adoption process, manage data securely, and ensure 
trustless transactions between pet owners and adopters. 
• Involves creating a web interface that displays pet profiles with search, registration, and 
adoption 
• buttons 
• Includes a Lost & Found system to report, locate, and return lost pets with 
incentives for finders. 
Limitations: 
• No way to verify authenticity of pet data (e.g., vaccination). 
• No eligibility checks for adopters (unlike shelters), risking pet safety. 
• Lost pets may go unreported if found by someone not using the app.
-----
### Architectural Diagram
<img width="804" height="461" alt="image" src="https://github.com/user-attachments/assets/9e5ec5d3-a5e3-4e32-bdf0-93106441c58b" />

### Role Structure of the Adoption System
#### 1. Admin (Contract Owner)
The Admin is the owner of the main smart contracts (PETToken, Leaderboard, Adoption contracts).

  Responsibilities:
  - Deploys all contracts.
  - Owns permissions for all onlyOwner functions.
  - Mints PET Tokens.
  - Registers Adoption Managers.
  - Updates system settings (leaderboard, token contract, etc.).
  - Performs restricted and high-privilege actions.

  Interaction Level:
  - Interacts directly with blockchain (Remix, or later MetaMask).
  - Not accessible to normal users.
    

#### 2. Adoption Manager
The Adoption Manager is the layer through which regular users communicate with the blockchain.

  Responsibilities:
  - Handles all user requests.
  - Performs safe, non-admin blockchain transactions.
  - Calls smart contract functions on behalf of the user.
  - Manages user adoption actions.
  - Can trigger PETToken rewards for user activity.
    
  Purpose:
  To ensure regular users do not access admin-level functions.


#### 3. Users (Non-Contract Role)
Users are not part of the contract’s permission system but interact through the Adoption Manager.

  User Activities:
  - Viewing available dogs.
  - Requesting adoption manager for adoption.
  - Checking certificates.
  - Checking leaderboard.
  - Earning PET tokens.

Users do not have direct interaction with the admin functions.


### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Admin  | 0x650933554e06a8e02f2e28df3bb805d7a8206cb4 |
| Adoption Manager  | 0x650933554e06a8e02f2e28df3bb805d7a8206cb4 |
| Token Minting | 0x1f55baa6fd375e254084e27c59f7142f328bb593 |

| Dog register 1 |(https://sepolia.etherscan.io/address/0x650933554e06A8e02f2e28Df3bb805d7A8206cB4)|

| Dog register 2 |(https://sepolia.etherscan.io/tx/0xaf5c0a9b7ee1122fb14b4819fca28c8a458021b7f7e5cada961a4766838042cb)|

| Dog register 3 |(https://sepolia.etherscan.io/tx/0x324f162f75d3b8ef1a6b8970a65e831e52d2416cf6dc8e13e3e94a35da1fdb49)|

| Dog register 4 |(https://sepolia.etherscan.io/tx/0x030a86636bde53e67911b057f910403485cf55c2625d23daa53702913fe4b041)|

| Dog request 1 |(https://sepolia.etherscan.io/tx/0xbd19b2e764c24f5994d3e7e8eacbf26ce48650c14fd9eea49bba03d40f624f05)|

| Dog request 2 |(https://sepolia.etherscan.io/tx/0xbd19b2e764c24f5994d3e7e8eacbf26ce48650c14fd9eea49bba03d40f624f05)|

| Accept request | (https://sepolia.etherscan.io/tx/0x45bee5cadcb7a9a0d0577bdf503d91fd08e9c86b9a65dff7c8779e001dfb6270)|

| Decline request |(https://sepolia.etherscan.io/tx/0x64fac4045d7da11506dd259a45c9b927d09af155f050813d29cb5c81fe8177cb)|



#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contract 1 |(https://sepolia.etherscan.io/address/0x650933554e06A8e02f2e28Df3bb805d7A8206cB4)|
| Deployment of Contract 2 |(https://sepolia.etherscan.io/address/0xC35712e7F50cfEF21aAC357A5462f945c4055a13)|
| Deployment of Contract 3 |(https://sepolia.etherscan.io/address/0xb1e4F67521De8B89F79c5674cc993351B19e9807)|
| Deployment of Contract 4 |(https://sepolia.etherscan.io/address/0x5c38393171732f32e61a0860683a97a41EaE3a58)|
| Deployment of Contract 5 |(https://sepolia.etherscan.io/address/0x2140136b95CA7f5c6817754D061976Ec4195c023)|


These transaction are as shown in the [https://youtu.be/mAR-Yb5Ps4Q] 

------
### Mapping the Project to Relevant Sustainable Development Goals (SDGs)
SDG 11: Sustainable Cities and Communities: The project's goal to formalize and bring transparency to the adoption of stray dogs in India could contribute to creating safer and more inclusive urban environments for both animals and people. By addressing issues like re-abandonment and illegal trade, it promotes a more responsible and humane approach to managing stray animal populations in communities.

SDG 16: Peace, Justice and Strong Institutions: The project aims to build a transparent and accountable system for dog adoption. By using a decentralized, tamper-proof blockchain system, it creates a verifiable digital registry for tracking adoption status, vaccination records, and ownership history, which reduces fraud and increases public trust. The system's immutability ensures that all adoptions and actions are permanent and traceable.

SDG 17: Partnerships for the Goals: The project's design facilitates interaction between NGOs, adopters, and the public within a secure and transparent framework. This collaborative model, powered by a decentralized network, encourages different stakeholders to work together towards the common goal of improving dog welfare and adoption practices.

-----

### References
[1] Shakila, M. (2024, December). Provoke and Approach for Developing PET DApp Using Blockchain Based Technology. In 2024 International Conference on IoT Based Control Networks and Intelligent Systems (ICICNIS) (pp. 245-250). IEEE.

[2]Gururaj, H. L., Manoj, A. A., Kumar, A. A., Nagarajath, S. M., & Kumar, V. R. (2020). Adoption of pets in distributed network using blockchain technology. International Journal of Blockchains and Cryptocurrencies, 1(2), 107-120.

[3]Zhou, Y. Applications of Blockchain Techniques in Pet Adoption Industry.















