# 24CYS336 - Blockchain-Technology 

## BT#11 - Blockchain-Backed Auditability for Recommender Systems

![](https://img.shields.io/badge/Member-Shankar_N_K-gold) <br/> 
![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-10-darkgreen) ![](https://img.shields.io/badge/SDG-12-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-19th_Nov_2025-brown) <br/>

------

### Problem Statement

Modern recommender systems, such as those used by social media and streaming platforms, constantly adjust their models based on user interactions like _likes, clicks, and watch history_. However, these updates occur within opaque, centralized infrastructures, leaving users and regulators unable to verify how specific actions shape recommendations or why certain content is prioritized. This lack of transparency contributes to growing real-world concerns such as algorithmic bias, filter bubbles, misinformation amplification, and unfair content visibility.
  
Therefore, the problem is to develop a system that brings auditability and verifiable accountability to recommender models hence allowing every model update or decision pathway to be cryptographically verifiable without revealing private data or exposing proprietary algorithms. Such a mechanism would help restore trust, ensure compliance with explainable AI mandates, and promote ethical deployment of recommendation technologies.

-----

### Literature Survey 

Existing research on integrating AI/ML with blockchain can be summarised to three points:
    1. blockchain provides trust, transparency, and immutability, letting model updates or decisions be verifiable and tamper-proof. <br/>
    2. it helps record data provenance and model ownership, preventing unauthorized model reuse or biased training manipulation. <br/>
    3. in federated learning, blockchain can coordinate decentralized model training without a central authority while rewarding participants fairly. <br/>

with crucial challenges involving:
high computational cost, scalability, and privacy trade-offs

suggesting blockchain isn't suitable for storing neither the whole model parameters nor the data involved in training, what it can rather store is the change in state of the model/ or the current state of the model by using hashes, while this can't help in reconstructing the relevant data, it can instead be used for verifying the state of the model in a cryptographical fashion (checking whether the state of the model provides the same hash value) and this method of storing hashes proves useful in maintaining accountablity and auditablity.

Suggested workarounds:
1) Using structures like merkle tree to enable batch processing of model updates, here, this could be achieved using seperate aggregation servers provided by the organization or executing batch processing in local device.
2) Since blockchain is append-only, added data cannot be removed but cannot be traced back to the original owner due to pseudo-anonymized addresses, ensuring privacy.
3) Adopting hybrid architectures where heavy ML computation (training, aggregation) happens off-chain while only verification metadata or hashed updates are stored on-chain, drastically reducing computational and storage overhead.

notes on papers:
 
**Drungilas et al. (2021)** implemented a smart contract for model inference on the Hyperledger Fabric platform to explore how blockchain can support federated learning workflows. Their system used chaincode (smart contract in hyperledger) to coordinate and aggregate local model updates while maintaining an immutable audit trail of inferences. They compared two setups—running inference directly on-chain versus using an oracle service for off-chain computation—and found that simple models (like logistic regression) run efficiently within the chaincode, whereas larger models benefit from the oracle’s flexibility. This work demonstrates how blockchain can enhance transparency and trust in distributed learning systems while highlighting scalability limits of on-chain computation.
  
**Kayikci & Khoshgoftaar (2024)** presented a detailed survey on integrating blockchain with machine learning, outlining how blockchain contributes to trust, transparency, and data provenance while supporting decentralized learning. The authors identified key challenges — such as scalability limits, computational cost, and privacy concerns — and suggested hybrid approaches that store hashes of model states or updates instead of raw parameters, combined with off-chain processing for efficiency. They also discussed batching strategies and interoperability layers to improve transaction throughput. This paper reinforces the architectural decisions of our project by validating the use of lightweight on-chain verification as a practical solution for maintaining accountability without burdening the blockchain network.

**Wu et al. (2023)** provide a comprehensive survey of the integration of Federated Learning (FL) and blockchain (dubbed “BFL” – blockchain-based federated learning). The paper outlines how blockchain technologies support federated learning by enabling decentralised aggregation, enhancing provenance of updates, and incentivising participation. It also delves into the major challenges—such as efficiency loss, network latency, large-scale communication overhead, and privacy risks—and suggests workarounds including off-chain storage of heavy data, use of lightweight blockchain metadata (e.g., hashes), and hybrid architectures combining chain and off-chain components

-----

### Proposed Solution
  
The proposed system aims to introduce auditability and verifiable accountability into recommender systems by combining traditional machine learning with blockchain-based logging. The core recommendation model runs off-chain on a standard Python ML server, where user inputs are processed, predictions are generated, and model updates are performed through incremental learning. Instead of storing raw data or parameters on-chain, the system generates cryptographic hashes representing the user’s input and the updated model state. These hashes are then recorded immutably on a blockchain ledger through a smart contract. This design ensures that every model update, and the interaction that caused it, can be verified later without exposing private data or requiring access to proprietary model internals.

To support real-time user interaction, a simple frontend interface collects user attributes and their feedback on the model’s predictions. This information is sent to the backend, which updates the model where appropriate and logs the corresponding hash on the blockchain. The smart contract maintains a transparent, append-only history of these updates, allowing anyone to audit when and why a model state changed. By leveraging blockchain only for verification, and not for heavy computation, the solution achieves a balance between transparency, scalability, and practicality, demonstrating how blockchain can meaningfully improve trust in recommender systems without disrupting their performance.

-----

### Architectural Diagram
<p align = "center">
  <img src="architectural diagram modelupdatelogger_.png" alt="diagram" width="1000">
</p>

------

### Novelty of the Project

This project introduces a unique hybrid architecture that brings auditability to recommender systems by recording only cryptographic hashes of user interactions and model updates on a blockchain. Unlike existing approaches that attempt to store full model parameters or run training on-chain—which is computationally infeasible—this work separates computation (off-chain) from verification (on-chain) in a practical way. The system shows how a recommender model can remain fully functional while gaining an immutable, tamper-proof trail of how each interaction influences its evolution.

A second novelty lies in demonstrating a transparent end-to-end pathway: user feedback → ML model update → blockchain hash logging → verifiable audit trail. This prototype showcases how accountability can be added to real-time recommendation pipelines without modifying the underlying blockchain software or compromising user privacy. By integrating on-device hashing, lightweight smart contracts, and incremental model training, the project provides a replicable blueprint for building explainable, trustworthy AI systems using blockchain—not as a storage layer, but as a cryptographic accountability layer.

-------

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner  | [0x75Dd20566F7A622C799D6929CdA1CB4b5E76c1Ea](https://sepolia.etherscan.io/address/0x75dd20566f7a622c799d6929cda1cb4b5e76c1ea) |
| User 2 | [0xE0DffB208b92d744a6FBfFcbE5aA722cF1b91C72](https://sepolia.etherscan.io/address/0xE0DffB208b92d744a6FBfFcbE5aA722cF1b91C72) |
| User 1 | [0x0c5422fA432A0046b1d604AE79c375244d693910](https://sepolia.etherscan.io/address/0x0c5422fA432A0046b1d604AE79c375244d693910) | 

#### Transaction Details

**note: The server uses the address of owner to access the chain**

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts | [0x508a8bb7d65f9a47fe3a1dab1d41ed3183b77fe8a12947238cb03ee5e5291552](https://sepolia.etherscan.io/tx/0x508a8bb7d65f9a47fe3a1dab1d41ed3183b77fe8a12947238cb03ee5e52915520x2b23CA876e4666C493fdc07Db5FE2BBEebe428D5) |
| 8th update (from user) (here owner) | [0x5ab66abe9198b8218dadb54c8f3f67c960786ef051172d7ad038d347db7465fb](https://sepolia.etherscan.io/tx/0x5ab66abe9198b8218dadb54c8f3f67c960786ef051172d7ad038d347db7465fb) |
| 8th update (from server) | [0x57f697fad77b28044290ef98847da69abdb37a0d758c683f952b35232ac1c435](https://sepolia.etherscan.io/tx/0x57f697fad77b28044290ef98847da69abdb37a0d758c683f952b35232ac1c435) |
| 10th update (from user 1) | [0xebc98749e16369aa165ea0d06d9f0c5307ef519d5e6e153684f6fb263036be43](https://sepolia.etherscan.io/tx/0xebc98749e16369aa165ea0d06d9f0c5307ef519d5e6e153684f6fb263036be43) |
| 10th update (from server) | [0xd0a8e58fbf4fd09d04704610f1a2e89e16687a32cc858e9fcbd741b2728d5f3f](https://sepolia.etherscan.io/tx/0xd0a8e58fbf4fd09d04704610f1a2e89e16687a32cc858e9fcbd741b2728d5f3f) |
| 11th update (from user 2) | [0x016578199b3ec64fe97bfb356fe7cd0445d3ebac2413d456a3108d64964776d7](https://sepolia.etherscan.io/tx/0x016578199b3ec64fe97bfb356fe7cd0445d3ebac2413d456a3108d64964776d7) |
| 11th update (from server) | [0xe18d6195c65dd21f899a9987a790ab2d8ad52eb812235f42ab74a3a715ce1366](https://sepolia.etherscan.io/tx/0xe18d6195c65dd21f899a9987a790ab2d8ad52eb812235f42ab74a3a715ce1366) |
| Smart Contract Address (ModelAudit) | [0x2b23CA876e4666C493fdc07Db5FE2BBEebe428D5](https://sepolia.etherscan.io/address/0x2b23CA876e4666C493fdc07Db5FE2BBEebe428D5) |

#### Demo Video
The Demo Video is available [here](https://youtu.be/CTcaDMseYq0)

-----

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)


| **SDG** | **Goal Name** | **Relevance to Project** |
|----------|---------------|--------------------------|
| **SDG 9** | Industry, Innovation, and Infrastructure | Promotes transparent, ethical, and sustainable innovation in AI infrastructure. |
| **SDG 10** | Reduced Inequalities | Prevents algorithmic bias, ensuring fair digital representation and visibility. |
| **SDG 12** | Responsible Consumption and Production | Encourages balanced content consumption through accountable recommendation processes. |
| **SDG 16** | Peace, Justice, and Strong Institutions | Supports transparent and trustworthy digital governance via blockchain-based audit trails. |

-----

### References

1) **Kayikci, S., Khoshgoftaar**, T.M. _Blockchain meets machine learning: a survey_. J Big Data 11, 9 (2024). https://doi.org/10.1186/s40537-023-00852-y

2) **Drungilas, V., Vaičiukynas**, E., Jurgelaitis, M., Butkienė, R., & Čeponienė, L. (2021). _Towards Blockchain-Based Federated Machine Learning: Smart Contract for Model Inference_. Applied Sciences, 11(3), 1010. https://doi.org/10.3390/app11031010

3) **Wu, L., Ruan, W., Hu, J., & He, Y. (2023)**. _A Survey on Blockchain-Based Federated Learning_. Future Internet, 15(12), 400. https://doi.org/10.3390/fi15120400





