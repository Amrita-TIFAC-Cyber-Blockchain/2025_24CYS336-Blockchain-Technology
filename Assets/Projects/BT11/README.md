# 24CYS336 - Blockchain-Technology 

## BT#11 - Blockchain-Backed Auditability for Recommender Systems

![](https://img.shields.io/badge/Member-Shankar_N_K-gold) <br/> 
![](https://img.shields.io/badge/SDG--darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-19th_Nov_2025-brown) <br/>

------

### Problem Statement

**Auditability in Recommender Systems**:

&nbsp;&nbsp;&nbsp;&nbsp; Modern recommender systems, such as those used by social media and streaming platforms, constantly adjust their models based on user interactions like likes, clicks, and watch history. However, these updates occur within opaque, centralized infrastructures, leaving users and regulators unable to verify how specific actions shape recommendations or why certain content is prioritized. This lack of transparency contributes to growing real-world concerns such as algorithmic bias, filter bubbles, misinformation amplification, and unfair content visibility.
  
&nbsp;&nbsp;&nbsp;&nbsp; Therefore, the problem is to develop a system that brings auditability and verifiable accountability to recommender models hence allowing every model update or decision pathway to be cryptographically verifiable without revealing private data or exposing proprietary algorithms. Such a mechanism would help restore trust, ensure compliance with explainable AI mandates, and promote ethical deployment of recommendation technologies.

-----
### Literature Survey 

Existing research on integrating AI/ML with blockchain can be summarised to three points
1) blockchain provides trust, transparency, and immutability, letting model updates or decisions be verifiable and tamper-proof.
2) it helps record data provenance and model ownership, preventing unauthorized model reuse or biased training manipulation.
3) in federated learning, blockchain can coordinate decentralized model training without a central authority while rewarding participants fairly.

with crucial challenges involving:
high computational cost, scalability, and privacy trade-offs

&nbsp;&nbsp;&nbsp;&nbsp; suggesting blockchain isn't suitable for storing neither the whole model parameters nor the data involved in training, what it can rather store is the change in state of the model/ or the current state of the model by using hashes, while this can't help in reconstructing the relevant data, it can instead be used for verifying the state of the model in a cryptographical fashion ( checking whether the state of the model provides the same hash value) and this method of storing hashes proves useful in maintaining accountablity and auditablity.

Suggested workarounds:
1) Using structures like merkle tree to enable batch processing of model updates, here, this could be achieved using seperate aggregation servers provided by the organization or executing batch processing in local device
2) Since blockchain is append-only, added data cannot be removed but cannot be traced back to the original owner due to pseudo-anonymized addresses, ensuring privacy.
3) Adopting hybrid architectures where heavy ML computation (training, aggregation) happens off-chain while only verification metadata or hashed updates are stored on-chain, drastically reducing computational and storage overhead.

notes on papers:
 
&nbsp;&nbsp;&nbsp;&nbsp; **Drungilas et al. (2021)** implemented a smart contract for model inference on the Hyperledger Fabric platform to explore how blockchain can support federated learning workflows. Their system used chaincode(smart contract in hyperledger) to coordinate and aggregate local model updates while maintaining an immutable audit trail of inferences. They compared two setups—running inference directly on-chain versus using an oracle service for off-chain computation—and found that simple models (like logistic regression) run efficiently within the chaincode, whereas larger models benefit from the oracle’s flexibility. This work demonstrates how blockchain can enhance transparency and trust in distributed learning systems while highlighting scalability limits of on-chain computation.
  
&nbsp;&nbsp;&nbsp;&nbsp; **Kayikci & Khoshgoftaar (2024)** presented a detailed survey on integrating blockchain with machine learning, outlining how blockchain contributes to trust, transparency, and data provenance while supporting decentralized learning. The authors identified key challenges — such as scalability limits, computational cost, and privacy concerns — and suggested hybrid approaches that store hashes of model states or updates instead of raw parameters, combined with off-chain processing for efficiency. They also discussed batching strategies and interoperability layers to improve transaction throughput. This paper reinforces the architectural decisions of our project by validating the use of lightweight on-chain verification as a practical solution for maintaining accountability without burdening the blockchain network.

&nbsp;&nbsp;&nbsp;&nbsp; **Wu et al. (2023)** provide a comprehensive survey of the integration of Federated Learning (FL) and blockchain (dubbed “BFL” – blockchain-based federated learning). The paper outlines how blockchain technologies support federated learning by enabling decentralised aggregation, enhancing provenance of updates, and incentivising participation. It also delves into the major challenges—such as efficiency loss, network latency, large-scale communication overhead, and privacy risks—and suggests workarounds including off-chain storage of heavy data, use of lightweight blockchain metadata (e.g., hashes), and hybrid architectures combining chain and off-chain components
  

-----
### Architectural Diagram
<p align = "center">
  <img src="architectural diagram modelupdatelogger_.png" alt="diagram" width="600">
</p>

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
| 

These transaction are as shown in the [YouTube Demo Video]() 

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

