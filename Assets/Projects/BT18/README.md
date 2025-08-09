
# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/Batch-22UCYS-gold) ![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject-Blockchain-blue) <br/>

## BT#18: NFT-Based Educational Credential Verification System

![](https://img.shields.io/badge/Member-Hithesh_B.S-gold)  <br/> 
![](https://img.shields.io/badge/Member-Sriharish-gold)  <br/> 
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

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
### Architectural Diagram


------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)


-----

### References

1. X. Zhao and Y.-W. Si, "NFTCert: NFT-based certificates with online payment gateway," in 2021 IEEE International Conference on Blockchain (Blockchain), 2021, pp. 538-543.
2. C. Delgado-von-Eitzen, L. Anido-Rifón, and M. J. Fernández-Iglesias, "NFTs for the issuance and validation of academic information that complies with the GDPR," Appl. Sci., vol. 14, no. 2, Art. no. 706, Jan. 2024.
3. P. Khati, A. K. Shrestha, and J. Vassileva, "Student certificate sharing system using blockchain and NFTs," in International Congress on Blockchain and Applications, Cham, Switzerland: Springer Nature, 2023, pp. 61–70.
4. N. N. Kumar, R. S. Kumar, R. R. Basale, and M. Saffath, "Decentralized storage of educational assets using NFTs and blockchain technology," in 2022 4th International Conference on Smart Systems and Inventive Technology (ICSSIT), 2022, pp. 260-266.
5. T. Rahman, S. I. Mouno, A. M. Raatul, A. K. Al Azad, and N. Mansoor, "Verifi-chain: A credentials verifier using blockchain and IPFS," in International Conference on Information, Communication and Computing Technology, Singapore: Springer Nature Singapore, 2023, pp. 361–371.





