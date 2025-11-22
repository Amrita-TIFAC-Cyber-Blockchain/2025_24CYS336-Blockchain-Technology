# 24CYS336 - Blockchain-Technology 

## BT#23 - 

![](https://img.shields.io/badge/Vasantha_Kumar_G_R-gold) ![](https://img.shields.io/badge/Ashwin_Kumar_K_S-gold) ![](https://img.shields.io/badge/Karthick_A-gold)  <br/>
![](https://img.shields.io/badge/SDG_9-Industry,_Innovation,_and_Infrastructure-darkgreen) <br/>
![](https://img.shields.io/badge/SDG_12-Responsible_Consumption_and_Production-darkgreen) <br/>
![](https://img.shields.io/badge/SDG_16-Peace,_Justice,_and_Strong_Institutions-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-19th_Nov_2025-brown) <br/>


------

### Problem Statement
Centralized social media platforms today suffer from significant issues such as censorship, privacy violations, unauthorized data exploitation, lack of transparency, and complete platform control over users’ identities and posts. Research has repeatedly shown that these systems create vulnerabilities including data breaches, limited user ownership, server outages, and opaque content moderation practices. With growing concerns around digital autonomy and personal data protection, especially highlighted in recent decentralized social media research, it has become essential to design systems where users retain control over their identity, interactions, and content. Therefore, the problem this project addresses is the absence of a lightweight, transparent, and decentralized user registry and posting framework that operates independently of centralized servers. The goal is to develop a blockchain-based authentication and content-management solution that ensures immutability, security, and autonomy while providing basic social-network functionalities without relying on any centralized database.


-----
### Literature Survey 

**Paper - 1 : Non-Fungible Token Enhanced Blockchain-Based Online Social Network**

The shift from centralized to decentralized social platforms has been explored in several academic works, highlighting the failures of traditional platforms like Facebook, Twitter, and Instagram to guarantee privacy, transparency, and user ownership. Studies report that federated systems such as Mastodon and Diaspora attempted to distribute control away from a central authority, but still could not fully eliminate issues like limited monetization and storage reliability. Research by **Ritu et al. (2023)** discusses how blockchain-backed solutions, combined with decentralized storage such as IPFS, offer a long-term alternative by ensuring data integrity, reducing censorship risks, and enabling user-controlled identities. Similarly, **Jadon et al. (2024)** highlight the rising relevance of NFTs in social media platforms, enabling creators to tokenize posts, prove uniqueness, and monetize content directly through blockchain mechanisms. Their system further introduces structured algorithms for user registration, content posting, liking mechanisms, and NFT creation that operate in a decentralized environment, demonstrating how blockchain and IPFS can resolve challenges such as fake news, centralized moderation, poor access-control mechanisms, and revenue imbalance between platforms and creators. However, existing research focuses heavily on NFTs, marketplaces, and reputation scoring systems, leaving a gap for simple, efficient, foundational social frameworks that provide the basic capabilities of identity management, secure authentication, and interaction-backed content storage entirely on-chain. This project builds on these ideas while simplifying the architecture to deliver a minimal but functional decentralized social module.

-----
### Proposed Solution
To address the limitations of centralized platforms and fill the gaps identified in the literature, this project proposes a fully decentralized User Registry and Social Posting System implemented using Solidity on the Ethereum Virtual Machine. The solution enables users to create an account using only a username, bio, and password, where the password is securely hashed using keccak256, ensuring that no plaintext credential is stored on-chain. Each user is uniquely identified, and usernames are enforced through mappings such as usernameTaken and usernameToAddress. Once registered, users can authenticate themselves either through their wallet address or by providing their username and password, allowing Web2-like login behaviour in a Web3 environment. The system further supports posting text and images (linked through IPFS CIDs), storing timestamps, and maintaining interaction data such as likes through a mapping of addresses, ensuring transparency and preventing duplicate interactions. Retrieval functions enable users to fetch posts, profile information, and search for users using substring-based matching. Since all operations—registration, posting, liking, and searching—are executed on-chain, the platform ensures immutability, decentralization, and censorship resistance while remaining lightweight enough to serve as a base layer for more advanced decentralized social networks.

-----
### Architectural Diagram

<img width="334" height="260" alt="image" src="https://github.com/user-attachments/assets/d0af2b50-6883-4338-a8dd-40106a6a6e1a" />

_Image taken from paper-1_

<img width="263" height="227" alt="image" src="https://github.com/user-attachments/assets/9d0fe25d-6240-457b-aada-90e370413863" />

_Image taken from paper-2_



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
| 

These transaction are as shown in the [https://youtu.be/Xfo6L_V9xIE](https://youtu.be/Xfo6L_V9xIE) 

------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| **SDG**    | **Goal Title**                           | **Project Contribution**                                                              |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------------------------- |
| **SDG 9**  | Industry, Innovation, and Infrastructure | Promotes innovative, decentralized digital infrastructure for ownership verification. |
| **SDG 12** | Responsible Consumption and Production   | Encourages ethical creation, ownership, and sharing of digital assets.                |
| **SDG 16** | Peace, Justice, and Strong Institutions  | Enhances transparency and fairness in online transactions and ownership management.   |



-----

### References

S. Jadon, K. Bhat, K. R. Jenni, K. Vedantha, L. R R and P. B. Honnavalli, "Non-Fungible Token Enhanced Blockchain-Based Online Social Network," in IEEE Access, vol. 12, pp. 92368-92385, 2024, doi: 10.1109/ACCESS.2024.3422530.
























