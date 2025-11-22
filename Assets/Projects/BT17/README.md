# 24CYS336 - Blockchain-Technology 

## BT#17 - Digital Art Storage And Verification Using Blockchain Technology


![](https://img.shields.io/badge/Member-Praveen_S-gold) ![](https://img.shields.io/badge/Member-Akshay_R-gold)  <br/> 
![](https://img.shields.io/badge/SDG-8-darkgreen) ![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-12-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen) ![](https://img.shields.io/badge/SDG-17-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-20th_Nov_2025-brown) <br/>

------

### Problem Statement

In today’s digital era, artists often face serious challenges in proving the originality and ownership of their digital artworks. Since digital files can be easily copied, edited, or shared without permission, it becomes difficult to identify the real creator or to verify the authenticity of a piece of art. Traditional systems rely on centralized databases that can be tampered with or manipulated, which reduces trust and transparency.

To overcome these issues, this project proposes a blockchain-based verification system that uses smart contracts to securely record and validate digital artworks. Blockchain plays an important role here because it offers decentralization, immutability, and transparency, ensuring that once an artwork’s details are stored, they cannot be altered or deleted by anyone. This makes it possible to create a permanent proof of authorship and authenticity for each artwork, protecting the rights of digital artists and increasing trust in the digital art ecosystem.


-----

### Literature Survey 

[1] Blockchain technology offers a decentralized and tamper-proof solution to the challenges of digital artwork ownership, authenticity, and copyright protection. Prior research has explored its applications in digital rights management, copyright verification, and secure data sharing, emphasizing its potential for transparency and traceability in creative industries. Building on these studies, Wu (2023) developed an integrated blockchain-based system that combines the  Practical Byzantine Fault Tolerance (PBFT) consensus mechanism with Elliptic Curve Cryptography (ECC) for enhanced security, enabling secure transactions, automated ownership transfer, and compliance with ISO 25010 software quality standards.

[2] The paper proposes a blockchain-based framework that leverages the Ethereum ERC721 smart contract standard and InterPlanetary File System (IPFS) to securely verify ownership of digital artworks. By tokenizing each artwork as a unique non-fungible token (NFT) on the blockchain, it establishes an immutable and transparent record of ownership and provenance, preventing duplication or tampering. This integration of smart contracts, decentralized storage, and cryptographic hashing ensures authenticity, equitable artist compensation, and long-term trust in digital art transactions.


-----

### Proposed solution

In our proposed solution, the system first starts with an admin, who deploys the smart contract and acts as the platform controller, adding only verified creators as artists and giving each of them a unique artist ID mapped to their wallet address; this prevents random or fake users from uploading art. Once an artist is registered, they create a piece of digital art, upload the actual file to IPFS, and generate a fixed-length bytes32 hash of that file, which becomes the unique fingerprint of that artwork. The artist then calls the registerArtwork function in the DigitalArtNFT contract, passing the title and art hash; the contract checks that the caller is an active artist, that the title is not empty, and that the same hash has not been registered before, and if everything is valid it stores the artwork metadata (artistId, title, artHash, timestamp), mints a new ERC-721 token to the artist’s address, and links the token ID to both the artist and the art hash for future lookup.

Anyone later—buyer, gallery, or verifier—can check authenticity by either entering the token ID or the art hash into the read functions like getArtworkDetails or getArtworkByHash, which return the original registered artist, current owner, and timestamp, thereby proving provenance on-chain while the media itself stays off-chain. A simple but strong novelty in this design is the combination of an admin-curated artist registry with a hash-based NFT minting flow: only approved artists can mint, each artwork is guaranteed to be unique at the hash level, and the system can be naturally extended in the future with an AI-based pre-check (running off-chain) that compares a new image against previously registered hashes or embeddings before the registerArtwork call, turning this into a full “verify before mint” platform for protecting digital art.


-----

### Architectural Diagram

<img width="400" alt="image" src="https://github.com/user-attachments/assets/086994e2-95e9-4e59-bb51-57188d024a86" />


-----

### Blockchain Decision Tree (NITI Aayog)
1) Is there a compelling business case to reduce intermediaries?
Answer: Yes

2) Are multiple (i.e. 2 or more) stakeholders involved?
Answer: Yes

3) Are you working with digital assets instead of physical assets?
Answer: Yes

4) Do multiple parties require shared write access?
Answer: Yes

5) Do you require high performance/rapid transactions (milliseconds)?
Answer: No

6) Do you intend to store non-transactional data as part of your solution?
Answer: No

7) Do you want/need to rely on a trusted party i.e. for compliance reasons?
Answer: No

8) Do you need the ability to control functionality?
Answer: No

9) Should transactions be public?
Answer: Yes

Final Solution: Strong case for Public Blockchain


------

### Results



#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts |  0xdbbc3e18e4fce2a880305d53e4ca8f85538483c4a72dbe12d7d2e97142482631    |

These transaction are as shown in the [YouTube Demo Video](https://youtu.be/G34Y2T7BqyY) 


-----

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| **SDG**                                             | **Project’s Alignment Towards the Goal**                                                                                                                                                                                                |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SDG 9: Industry, Innovation, and Infrastructure** | This project fosters technological innovation by applying blockchain and smart contracts to create a transparent and tamper-proof system for verifying digital artworks, strengthening digital infrastructure in the creative industry. |
| **SDG 8: Decent Work and Economic Growth**          | By providing artists with a secure way to prove ownership of their creations, the project supports fair recognition, prevents fraud, and promotes sustainable economic growth within the digital art community.                         |
| **SDG 16: Peace, Justice, and Strong Institutions** | Through blockchain’s immutable and transparent nature, the project enhances accountability, prevents copyright manipulation, and builds trust, contributing to stronger and fairer digital institutions.                                |
| **SDG 12: Responsible Consumption and Production**  | The system encourages ethical creation and distribution of digital art by preventing duplication and unauthorized use, promoting originality and responsible digital content management.                                                |
| **SDG 17: Partnerships for the Goals**              | The project encourages collaboration among artists, technologists, and organizations, showcasing how decentralized technology can unite different sectors to create a transparent and equitable art ecosystem.                          |


-----

### References

[1] Wu, J. (2023). Detection and protection of digital artworks using blockchain technology. The Light Explorer, 8(4), 1–11.

[2] Ullah, S., Bazai, S. U., Zaland, Z., Ghafoor, M. I., Haider, A., & Hussain, L. (2023, December). Ownership verification for digital art using smart contract and blockchain technology. In Proceedings of the 17th International Conference on Open Source Systems & Technology (ICOSST) (pp. 1–6).

















