<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## BT#16 - Voting System 

![](https://img.shields.io/badge/Member-Namrata_B_G-gold)  ![](https://img.shields.io/badge/Member-Ch_Bhavya-gold) <br/> 
![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-18th_Nov_2025-brown) <br/>

------

### Problem Statement

Traditional voting systems, whether physical or digital, are often vulnerable to tampering, hacking, and fraud. Centralized voting systems are prone to data manipulation and errors during the counting process. Additionally, voters have no way to verify whether their votes are counted accurately or securely. There is also the possibility of multiple voting by a single person due to weak authentication systems. This creates trust issues in the election process, undermining the legitimacy of the results. To address these challenges, there is a need for a transparent, secure, and verifiable voting system that can ensure fairness and integrity.

-----
### Literature Survey 

Farooq et al. (2022) proposed a decentralized blockchain-based Voting Management System (VMS) that leverages smart contracts, OTP-based authentication, and voting coins to ensure enhanced security and transparency. Their framework stores votes as immutable blockchain transactions, with smart contracts preventing double voting and unauthorized manipulation. The system enables individual voters to independently verify their votes using unique transaction hashes, promoting transparency and trust in the electoral process.
González et al. (2022) addressed the limitations of both centralized systems and permissionless blockchains, which suffer from scalability issues and computational inefficiency. They presented an enterprise blockchain solution built on Hyperledger Fabric, a permissioned blockchain platform. The system utilizes Non-Fungible Tokens (NFTs) as digital ballots to enable complete traceability and prevent duplication. Smart contracts enforce role-based access control, ensuring only authorized participants can cast votes. Unlike energy-intensive proof-of-work systems, their permissioned blockchain architecture provides high performance and security with significantly lower energy consumption, making it practical for large-scale electoral applications.

-----
### Proposed Solution

To overcome the limitations of traditional voting systems, a secure, accessible, and transparent digital voting platform is proposed. The idea is to develop a mobile application that allows citizens—especially elderly individuals, people with disabilities, and voters in remote areas—to cast their votes without needing to physically visit polling stations. The system uses facial recognition for authentication, ensuring that only the legitimate voter can access their ballot and preventing impersonation or multiple voting.

To guarantee the integrity of the voting process, the application is integrated with a blockchain-based smart contract. Every vote is recorded immutably on the blockchain, eliminating the possibility of tampering, unauthorized modifications, or fraudulent entries. Voters can verify that their vote has been successfully recorded, while the system maintains complete anonymity. The smart contract also handles candidate registration, voter registration, vote casting, and result calculation with full transparency.

This combined approach—biometric authentication for secure identity verification, and blockchain for trustless, tamper-proof vote storage—provides a secure, verifiable, and user-friendly alternative to conventional voting systems.

-----
### Architectural Diagram

<img width="800" alt="Blockchain Network (1)" src="https://github.com/user-attachments/assets/f2961ae3-e09d-4f15-9c2c-bdb80c4a15be" />

-----
### Modules

The Voter Management Module handles the registration and verification of voters. Each voter is stored with basic details such as name, blockchain address, and voting status. This module ensures that only legitimate, registered voters can participate in the election. It also prevents double voting using the hasVoted flag and restricts viewing of voter information to either the Election Commission or the voter themselves.

The Candidate Management Module is responsible for adding and managing candidates. It stores details such as name, address, and current vote count. The system ensures that no candidate is registered more than once, while also maintaining a list of all candidates through an array. Access to candidate details is restricted to the candidate themselves or the Election Commission to maintain privacy and security.

The Voting Module enables the actual casting of votes. It checks whether the voter is registered, whether the chosen candidate exists, and whether the voter has already voted. Once all conditions are satisfied, the module increments the selected candidate’s vote count and updates the voter’s status to prevent duplicate voting. This ensures that the voting process remains secure and tamper-proof.

The Vote Counting and Result Module allows the Election Commission to count votes transparently once voting is completed. It scans through the registered candidates, identifies the one with the highest number of votes, and stores the final winner’s details. The result can be viewed by anyone, ensuring transparency and accuracy in the outcome of the election.

------
### Novelty

The novelty of the system lies in combining biometric facial recognition with blockchain-based voting to create a secure, accessible, and tamper-proof election platform. The mobile application uses facial recognition to verify identity, ensuring that only the legitimate voter can cast a vote, while the blockchain guarantees that every vote is recorded immutably and cannot be altered or deleted. This integration eliminates impersonation, prevents multiple voting, and removes the need for physical polling stations, making the system especially beneficial for elderly users, people with disabilities, and individuals in remote locations. By merging strong biometric authentication with transparent and decentralized vote storage, the system provides a trustworthy and user-friendly alternative to traditional voting methods.

------

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner - Election Commission  | 0xcd5c864d56e2f9b4212094c3170dcd6d8907edc6 |
| Candidate 1 | 0x59981364c9213874ea4ac158d0a63fe2a72d3dac |
| Candidate 2 | 0xb353a583dbc30632bd92793a58343ef68415f856 | 
| Voter 1 | 0x746a37e8da4f0930e2fdd875ff293d9ba5640388 | 
| Voter 2 | 0x63056e3dccb4d15a246ff3f387cc342e29fa3176 | 


#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts |   0x6d938ceb05a229ff225f37f4c2deab4e381ac67051278996c75764d3dac2f6b4   |
| Adding Candidate 1 |   0x0e2bdc7c1480c95d357aab7dfe0b8969f610da52108e751ec9b11f28231fd9cf  |
| Adding Candidate 2 |   0x2b19edd8b709ef7b567f23aa560763dbcee3642813bf14bc5d804880787c7c10  |
| Adding voter 1 |   0x2f68d1589159cf35863d040dbf8383cc71a4120b30370344aa1e7be7e97338e7   |
| Adding voter 2 |   0x8142829a9ee6c61fe7ac8d2542e1d3416701bf619a03f0eb726e48245036ce96   |
| Voter 1 Voting |   0x28fdc466d7c831091e8e5f0341a4e20fbb09803b1c8f5f81a35e565294e8fda6   |
| Voter 2 Voting |   0x93edd0eacac87b4fa7cb8e7cd4eea04e47d7af4364cbbd967e7de83c200dfd37   |
| Count Votes |  0xd41ab687cebaf8090defff1417d4fb26fbbc7b41514f932d761053854ca31675   |

#### Demo Video
The Demo Video is available [here](https://youtu.be/7SrDYXUkSPA)

-----

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| SDG | Alignment |
|:---|:----------|
| SDG 16 - Peace, Justice & Strong Institutions | A secure, tamper-proof voting system enhances transparency, accountability, and trust in democratic institutions.A verifiable voting system ensures that every citizen’s vote counts and is recorded correctly, promoting genuine participation.By enabling verifiable results , the system supports citizens’ right to accurate information and fair elections. |
| SDG 9 - Industry, Innovation & Infrastructure | The project leverages advanced technologies (e.g., blockchain, secure digital identity systems) to innovate electoral processes. |

-----

### References
<1>Farooq, M. S., Iftikhar, U., & Khelifi, A. (2022). A framework to make voting system transparent using blockchain technology. IEEE Access, 10, 59959–59969. https://doi.org/10.1109/access.2022.3180168

<2>González, C. D., Mena, D. F., Muñoz, A. M., Rojas, O., & Sosa-Gómez, G. (2022). Electronic voting system using an enterprise blockchain. Applied Sciences, 12(2), 531. https://doi.org/10.3390/app12020531
