<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## BT#18: NFT-Based Educational Credential Verification System

![](https://img.shields.io/badge/Member-Hithesh_B.S-gold) ![](https://img.shields.io/badge/Member-Sriharish_V_J-gold)  <br/> 
![](https://img.shields.io/badge/SDG-4-darkgreen) ![](https://img.shields.io/badge/SDG-8-darkgreen) ![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-16th_Nov_2025-brown) <br/>

------

### Problem Statement
The increasing globalisation of education and employment has made reliable academic credential verification systems essential for ensuring trust, preventing fraud, and enabling seamless recognition of qualifications across borders. Traditional, paper-based credentialing methods often suffer from inefficiencies, susceptibility to forgery, lengthy verification times, and difficulties in cross-institutional validation. In response, modern digital and blockchain-based solutions have emerged, offering improved security and verifiability. However, despite these advancements, both traditional systems and current blockchain-based approaches continue to encounter notable limitations, which can be summarised as follows:

#### Process Inefficiencies and Security Vulnerabilities of Traditional Systems:
The conventional method of authenticating academic qualifications is characterised by its slow and costly process. The fact that it involves paper certificates makes it a laborious process, especially for foreign students who have to go through slow, multi-step procedures of translation, attestation, and legalisation in order to validate their documents. These paper-based procedures, by creating unnecessary delays and bureaucratic obstacles, are most susceptible to misuse by fraudsters.

The epidemic of credential forgery poses a critical threat to professional and academic integrity, with the fake degree industry becoming a multi-billion-dollar market. Conventional systems, together with some of the first digital systems, do not possess the tamper-evident and clear data origin required to properly resist counterfeiting. Consequently, this prevents employers and other parties from being able to track the historical origin of a credential and ascertain the validity of the issuing institution, and hence erodes trust in the overall academic system.

#### Limitations in User Control and Data Ownership

Another significant limitation of many existing credentialing frameworks, including several blockchain-based systems, is the lack of autonomy of the students. Once a certificate is shared, students tend to lose control over its sharing and do not have the power to withdraw access. These systems are also often institution-centric, making students entirely dependent on the issuer for any authentication or administrative roles.

 Moreover, the existing models do not provide the ability for students to build custom, objective-oriented representations of their academic records, like sharing only coursework that is pertinent to a particular application for a job. These restrictions do not enable students to effectively maintain and utilise their education information.
 
#### Scalability, Cost, and Compliance Issues in Current Blockchain Models

Most blockchain platforms are not natively compliant with rigorous data protection regulations such as the General Data Protection Regulation (GDPR). The immutability of public blockchains is in direct opposition to the "right to erasure" (Art. 17) and the "right to rectification" (Art. 16). Storage of personal data on the blockchain itself, even hashed and encrypted, is a huge privacy risk since future advances in computational power can eventually crack the encryption and the data cannot be deleted.

In addition, public blockchains are generally constrained by their low transaction rate (about 15 per second in Ethereum) and nondeterministic, high transaction cost (gas fees). These systems are economically unviable for large issuance and make functionality like the generation of large numbers of filtered views extremely expensive for students. Experimental networks have seen transaction rates as low as 0.02 transactions per second, which emphasises the staggering scalability problem.

Furthermore, most designs include direct user interaction with advanced technologies like cryptocurrency wallets and private key management, representing a significant barrier to adoption by nontechnical users. Also, some designs reintroduce centralisation by employing a trusted administrator to perform the verification step, thus creating a potential point of contention and a single point of failure that eliminates the cornerstone of decentralisation.

In conclusion, there is a clear and pressing need for a decentralised credentialing system that is not only secure and efficient but also scalable, cost-effective, student-centric, and privacy-preserving by design. This project proposes to develop such a solution by leveraging a permissioned blockchain framework (Hyperledger Fabric) to overcome the critical limitations identified and provide a practical, robust, and compliant platform for the future of academic credential management.

-----
### Literature Survey 

 In [1], Zhao and Si proposed NFTCert, a permissioned blockchain framework to issue verifiable academic certificates as ERC-721 tokens and improve user experience by supporting traditional online payment channels. Their approach is to mint NFT certificates on a permissioned blockchain and keep only a SHA-256 hash of the integrated student and certificate data in the token metadata to preserve privacy. The system also uses a blockchain oracle to connect smart contracts with traditional payment gateways like PayPal and Alipay so that users do not have to rely on volatile cryptocurrencies. The system specifies the protocols for schema definition, minting, verification, and revocation and strives for usability, confidentiality, authenticity, transparency, and availability as its minimal design objectives.
 
 In [2], Delgado-von-Eitzen et al. proposed a GDPR-friendly NFT model that divides public and private attributes to balance blockchain immutability with data-protection rights. Their privacy-by-design architecture keeps personal academic information off-chain within institutional databases, while issuing NFTs whose tokenURI references a web service that dynamically creates metadata based on the requester's rights, which allows students to grant, revoke, or limit third-party access and facilitates erasure and rectification processes. By utilizing the chain only for trust anchors like signatures and leaving mutable personal data to controlled off-chain systems, the model is lawful while maintaining blockchain-based authentication.
 
 In [3], Khati et al. proposed a student-centric credential sharing technique through the use of a viewNFT abstraction. Students can mint viewNFTs from underlying certificate NFTs to provide filtered and context-specific credential representations with provenance and authenticity. Their solution combines decentralised authentication (ERC-4361 Sign-In with Ethereum), storage of metadata with IPFS, and an on-chain smart contract that enforces access control and time-dependent viewing rules. The receivers authenticate through inspection of the issuer's signature and hash linkage to the original NFT. Their testing, on the Kaleido testbed, shows low transaction latency (around 4.16 seconds), thus verifying the methodology's effectiveness and efficiency for controlled deployments.

 In [4], Kumar et al. proposed a 3-layered structure consisting of web interface, Ethereum blockchain, and IPFS for efficient management of large educational content. They store the original content within the IPFS, which returns a Content Identifier (CID), and the cryptographic hash of the CID is stored on Ethereum as NFT metadata, resulting in an immutable on-chain pointer to the off-chain asset. The structure has incentivised mining and storage nodes for validating and storing assets before tokenisation, thus effectively coming at an affordable price with community verification. Thus, the system demonstrates a cost-effective means of linking NFTs with large educational content without paying excessive on-chain storage prices.

 In [5], Rahman et al. proposed Verifi-Chain, a semi-decentralised proof-of-concept for credential verification that incorporates a human-in-the-loop pre-verification process, where a trusted administrator manually verifies submitted credentials with the issuing entity, uploads verified documents to IPFS to obtain a CID, and anchors the CID on-chain. The system employs tiered access control that allows applicants to accept or reject employer view requests, maintaining applicant privacy and offering direct control over sharing. While this does involve a centralised verification actor, the pre-verification process significantly mitigates fraud risk through limiting recording on the immutable ledger to pre-checked documents only.
 
-----
### Project Description

The NFT-Based Educational Credential Verification System is a blockchain-powered platform designed to issue, store, and verify academic certificates in a secure, tamper-proof, and decentralised manner. Traditional certificate systems rely heavily on centralised storage, manual verification, and physical documentation, thus making them vulnerable to forgery, loss, and inefficient validation processes. This project addresses these challenges by leveraging the Ethereum blockchain, Non-Fungible Tokens (NFTs), and IPFS decentralised storage to provide an immutable and verifiable credentialing system.

In this platform, authorised educational institutions can issue certificates as soulbound NFTs (non-transferable tokens) permanently tied to a student’s identity. Each credential includes metadata such as certificate details, issuance date, and IPFS-hosted documents. Once minted, the NFT becomes an immutable proof of achievement. Institutions can also revoke certificates on-chain, ensuring transparency and traceability.

Students receive certificates directly into their wallets, enabling them to showcase verifiable credentials without intermediaries. Employers, universities, or any third-party verifier can validate authenticity simply by querying the blockchain contract.

By combining decentralised identity, cryptographic guarantees, and transparent verification, this system provides a modern, trustworthy, and efficient alternative to traditional academic credential workflows.

-----
### Project Features

#### Authentication & Authorization
- JWT-based login system 
- Role-based access control (Admin / Institution / Student)
- Auto wallet verification with MetaMask

#### Admin Functionalities
- Approve/remove institutions
- View registered institutions
- Monitor on-chain transactions

#### Institution Functionalities
- Issue certificate NFTs to students
- Upload certificate files to IPFS
- Store metadata & txHash in backend
- Revoke certificates on-chain
- View all issued certificates

#### Certificate NFT (Soulbound)
- Non-transferable ERC721 token  
- On-chain minting  
- On-chain burning (revocation)  
- Verifiable IPFS metadata  
- Issuer-locked permissions  

#### Verification
- Anyone can verify an NFT certificate by:
  - Token ID  
  - Wallet address  
  - IPFS metadata  
  - Event logs  

#### IPFS Integration (Pinata)
- File upload (PDF, PNG, JPEG)
- JSON metadata upload
- `ipfs://` URIs managed properly  

#### Frontend-Blockchain Sync
- Ethers.js for contract calls
- Event log parsing for tokenId
- Auto wallet mismatch detection

------

### Proposed Solution

This project presents an NFT‑based academic credential verification system where institutions issue certificates as soulbound (non‑transferable) NFTs to student wallets. These NFTs contain IPFS‑hosted metadata that stores certificate details securely and immutably.

Key Components:
- Soulbound NFT Certificates: Prevent transfer, ensuring authenticity of ownership.
- IPFS Storage: Certificate files & metadata stored off‑chain.
- Ethers.js + MetaMask: For blockchain transactions. 
- Role‑based Access: Admin → Institutions → Students. 
- Revocation Support: Institutions can burn a certificate with on‑chain proof.
- Web Application: Frontend for issuing, viewing, and verifying credentials.

Benefits:
- Tamper‑proof certificates
- Reduced verification time for employers
- Student ownership and control
- Lower storage costs using IPFS
- Transparent issuance & revocation history

-----
### Architectural Diagram

<p align="center">
  <img width="400" alt="image" src="https://github.com/user-attachments/assets/e4cafd22-e873-484f-ade3-5b0cbdd539bc" />
</p>

### Novelty of the System:
- Soulbound NFTs ensure non-transferable academic credentials.
- IPFS + blockchain hybrid architecture ensures cost‑effective decentralisation.
- Admin–institution–student hierarchy ensures trust + transparency.
- On‑chain revocation offers tamper‑proof auditability.
- Employer‑friendly public verification removes intermediaries.

-----
### System Workflow

#### 1. Admin Workflow
1. Admin logs in and connects to MetaMask.  
2. Admin registers institutions through `addInstitution()`.  
3. Admin can remove institutions via `removeInstitution()`.  
4. Backend syncs institution approval status in MongoDB.

#### 2. Institution Workflow

##### A. Issuing Certificates
1. Institution logs in and connects to MetaMask.  
2. Institution uploads the certificate file to the frontend.  
3. Backend uploads file/metadata to Pinata → returns IPFS URI.  
4. Institution confirms MetaMask transaction calling `issueCertificate()`.  
5. Smart contract mints an NFT certificate to the student's wallet.  
6. Frontend sends minted certificate details to backend for DB storage.

##### B. Revoking Certificates
1. Institution enters tokenId + reason.  
2. Institution confirms MetaMask transaction calling `revokeCertificate()`.  
3. Smart contract burns the token and emits a revocation event.  
4. Frontend updates backend to mark certificate as revoked in DB.

#### 3. Student Workflow
1. Student logs in to view all received certificates.  
2. Frontend fetches certificate data from backend.  
3. Frontend loads IPFS metadata (JSON + certificate file).  
4. Verification is performed on-chain using tokenURI and issuer lookups.

------
### Results

#### Stakeholder Address

| Role / Purpose | Address | 
|-----------------------|---------|
| **Owner / Admin Wallet** | 0xf22330206587fd4fba09cc21c03f16336dabf53a | 
| **Institution 1 Wallet** | 0x2784050617c4d4a22eb32e401c40e055f6e8588b |  
| **Institution 2 Wallet** | 0x0a1bfdd14f8b6c828b3374bed24eb2ea1e0277eb | 
| **Institution 3 Wallet** | 0xe3f898384ab8c26c3fefa8e16f0ac2a1d49722ff | 
| **Student 1 Wallet** | 0x16a042126ab1d7b7bc86ec645d50b01787c71fbb | 
| **Student 2 Wallet** | 0x71572605e7ce981265be0797c72826444a91d8c6 | 
| **Contract Address** | [0xb16b0D7CB29f1de5C2f0F5dFA4742e3023eB447a](https://sepolia.etherscan.io/address/0xb16b0D7CB29f1de5C2f0F5dFA4742e3023eB447a) |

#### Demo Video
The Demo Video is available [here](https://www.youtube.com/watch?v=ShZQGLJPrXU)

------

### Tech Stack

#### Frontend
- React.js
- Ethers.js 
- MetaMask API

#### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer (for file processing)
- bcrypt.js (password hashing)

#### Database
- MongoDB Atlas

#### Blockchain
- Solidity (v0.8.x)
- Ethereum Sepolia Testnet
- OpenZeppelin Contracts v5.4.0
- Remix (deployment & debugging)
- MetaMask wallet

#### Storage
- Pinata IPFS
- IPFS Metadata (JSON + file)

------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| SDG                                                          | Project's Alignment Towards The Goal                                                                                                                                             |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SDG 4: Quality Education**                              | This project uses NFTs to create globally portable and instantly verifiable credentials, enhancing the quality and accessibility of education by ensuring qualifications are universally recognized and trusted. |
| **SDG 9: Industry, Innovation, and Infrastructure**          | The system builds a resilient, innovative digital infrastructure for the global education sector by applying cutting-edge NFT technology to solve long-standing challenges in credential management. |
| **SDG 8: Decent Work and Economic Growth**                  | By providing a fraud-proof method for verifying skills, the system fosters a fairer and more efficient job market, empowering individuals with greater control over their professional identity. |
| **SDG 16: Peace, Justice, and Strong Institutions**          | This project directly combats credential fraud, a form of institutional corruption, and enhances accountability through the transparent, immutable, and auditable provenance of NFTs. |

-----

### References

- Zhao, X., & Si, Y. W. (2021, December). NFTCert: NFT-based certificates with online payment gateway. In 2021 IEEE International Conference on Blockchain (Blockchain) (pp. 538-543). IEEE.
- Delgado-von-Eitzen, C., Anido-Rifón, L., & Fernández-Iglesias, M. J. (2024). Nfts for the issuance and validation of academic information that complies with the gdpr. Applied Sciences, 14(2), 706.
- Khati, P., Shrestha, A. K., & Vassileva, J. (2023, July). Student certificate sharing system using blockchain and nfts. In International Congress on Blockchain and Applications (pp. 61-70). Cham: Springer Nature Switzerland.
- Kumar, N. N., Kumar, R. S., Basale, R. R., & Saffath, M. (2022, January). Decentralized storage of educational assets using NFTs and blockchain technology. In 2022 4th international conference on smart systems and inventive technology (ICSSIT) (pp. 260-266). IEEE.
- Rahman, T., Mouno, S. I., Raatul, A. M., Al Azad, A. K., & Mansoor, N. (2023, May). Verifi-chain: a credentials verifier using blockchain and IPFS. In International Conference on Information, Communication and Computing Technology (pp. 361-371). Singapore: Springer Nature Singapore.


