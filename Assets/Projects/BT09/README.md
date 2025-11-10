
# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/Batch-22UCYS-gold) ![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject-Blockchain-blue) <br/>

## BT#09

![](https://img.shields.io/badge/Member-K_B_Vishal-gold)  <br/>
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

------

### Problem Statement
A Digital twin is a virtual copy of a physical asset like a machine,sensor or any device(all the functionaliites of the physical asset can be done by the virtual one - simulate the behavior of the real one). It is mainly used to monitor and analyse the real-world physical asset. Thus by analysing the behavior of the virtual copy, we can analyse the current status of the device and make decisions that could improve performance and also prevent future failures in the system. 

The major challenges faced in these systems are:
1)Digital twin data can be modified or tampered. Ex: The reading from a temperature sensor can be changed from the original.
2)Ownership issues like which party own the Digital twin, when the asset is shared among different stakeholders. 

Therefore the problem is to provide a secure,transperant and immutable data logging for the Digital Twin, so the the data cannot be tampered providing data integrity where the ownership is protected.


-----
### Literature Survey 
The management of Digital Twins (DTs) is constrained by two fundamental challenges: ensuring the integrity of their data and establishing clear, verifiable ownership. This project addresses these issues by building upon two complementary academic concepts to create a single, cohesive solution.

The first approach, established by Nielsen et al. in their "Digital Twin and... Proof of Concept," focuses on achieving data integrity. This foundational work demonstrates how a distributed ledger can serve as an immutable record for all DT-related transactions. By creating a tamper-proof and transparent audit trail, it guarantees that the asset’s data history is trustworthy, fostering a reliable environment for all stakeholders. This approach solves the critical problem of establishing trust in the data itself.

The second key concept provides a mechanism for verifiable ownership, as detailed in the research on the "Digital twin non-fungible token (DT-NFT)." This introduces the use of a Non-Fungible Token as a unique, non-replicable digital title for the Digital Twin. The DT-NFT links the asset to a specific owner's digital wallet, providing unequivocal proof of ownership and a secure, standardized protocol for its transfer. This elegantly solves the challenge of asset provenance and control.

While these studies are foundational, they address separate facets of the overall problem. Nielsen et al. answer the question, "Is this data trustworthy?" while the DT-NFT concept answers, "Who owns this data?" The significant contribution of this project is the synthesis of these two approaches. It aims to develop an integrated framework where a DT-NFT proves ownership of a Digital Twin whose data history is simultaneously secured by an immutable distributed ledger. This holistic approach provides a complete solution for the secure and transparent lifecycle management of digital assets.

-----
### Architectural Diagram
<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/23b36b1a-d3de-40ff-b7b9-c763d735e50b" />


------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)
SDG 9: Industry, Innovation, and Infrastructure: Fosters industrial innovation and resilient infrastructure through predictive maintenance and optimized asset management.

SDG 11: Sustainable Cities and Communities: Enables sustainable cities by creating trusted Digital Twins for efficiently managing smart grids, utilities, and transport systems.

SDG 12: Responsible Consumption and Production: Promotes responsible production by providing a verifiable lifecycle history for assets, which supports a circular economy and reduces waste.

SDG 16: Peace, Justice, and Strong Institutions: Strengthens institutional trust by creating immutable records of ownership and data, which reduces disputes and enhances transparency.

SDG 17: Partnerships for the Goals: Facilitates partnerships by providing a secure, trusted platform for multiple stakeholders to collaborate on managing shared assets.

-----

### References

- Nielsen, C. P., Andersen, S. B., & Pop, O. (2020). Digital twin and blockchain: Proof of concept. Procedia CIRP, 93, 291–296. https://doi.org/10.1016/j.procir.2020.04.045

- Teisserenc, B., & Sepasgozar, S. (2021). Digital twin non-fungible token (DT-NFT): A token-based data ownership model for the AEC industry. Automation in Construction, 132, 103940. https://doi.org/10.1016/j.autcon.2021.103940












