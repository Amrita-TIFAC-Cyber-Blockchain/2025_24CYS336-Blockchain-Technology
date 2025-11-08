
# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/Batch-22UCYS-gold) ![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject-Blockchain-blue) <br/>

## BT#24

![AKILESH SENTHIL KUMAR](https://img.shields.io/badge/Member-AKILESH--SENTHIL--KUMAR-gold)  <br/> 
![RAHUL KRISHNA J](https://img.shields.io/badge/Member-RAHUL--KRISHNA--J-gold)  <br/> 
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

------

### PROBLEM STATEMENT

Defence logistics chains are complex, distributed, and rely on multiple intermediaries (suppliers, transporters, depots, customs). This leads to delays, lack of verifiable provenance for critical parts, counterfeit risk, and poor auditability. The project investigates whether a permissioned blockchain (or hybrid approach) can provide tamper-evident supply records, automated compliance checks, secure asset provenance, and auditable transactions while meeting defence confidentiality and performance requirements.

-----
### LITERATURE SURVEY 

Existing logistics systems in defense suffer from lack of transparency, auditability, and are susceptible to data manipulation.
Blockchain technology, especially through the use of smart contracts , provides a secure, tamper-proof, and transparent method for registering, transferring, and tracking defense assets.Military logistics systems face persistent problems lack of transparency, fragmented supply chain records, counterfeit risks, and extensive manual reconciliation. Traditional centralized databases cannot provide real-time tracking or guarantee tamper-proof delivery records, leading to inefficiency and data manipulation risks.

Every transaction—registering, transferring, or confirming the delivery of defense assets—is permanently recorded on a decentralized blockchain ledger. This record is instantly visible to all authorized participants, making it extremely difficult to alter or falsify. As a result, defense organizations can confidently monitor the lifecycle and movement of every asset in the supply chain.
Traceable, tamper-proof records: Every transaction such as asset registration, transfer, and delivery is recorded immutably, reducing fraud and simplifying audits.​

Real-world pilots: NATO, UK Ministry of Defence, and US DoD have piloted blockchain solutions for procurement, weapons/equipment tracking, and audit logging, reporting improved efficiency, transparency, and reduced counterfeiting.​

-----
### ARCHITECTURAL DIAGRAM

flowchart TD
    PARTICIPANTS[Participants\n(Logistics Officer, Supplier, Agency)]
    UI[User Interface Layer\n(Web/App with MetaMask)]
    SC[Application Layer\n(Solidity Smart Contracts)\n- Asset Registration\n- Ownership Transfer\n- Asset Tracking\n- Event Logging]
    BC[Blockchain Layer\n(Sepolia Testnet)]
    OF[Off-chain Storage\n(IPFS/Cloud for Docs & Certificates)]
    API[Integration/API Layer\n(Defense ERP, IoT Trackers, Audit)]

    PARTICIPANTS --> UI
    UI --> SC
    SC --> BC
    SC --> OF
    BC --> API
    OF --> API

    %% Layer Descriptions
    subgraph Layer_1 [Participants Layer]
        PARTICIPANTS
    end
    subgraph Layer_2 [User Interface Layer]
        UI
    end
    subgraph Layer_3 [Application Layer]
        SC
    end
    subgraph Layer_4 [Blockchain & Off-chain Layer]
        BC
        OF
    end
    subgraph Layer_5 [Integration/API Layer]
        API
    end



------

### MAPPING THE PROJECT TO RELEVANT SUSTAINABLE DEVELOPMENT GOALS (SDGS)

| SDG No. | Goal Name | Relevance to Project |
|--------|----------|---------------------|
| **SDG 9** | Industry, Innovation and Infrastructure | Improves defence supply chain infrastructure with tamper-evident, resilient, and verifiable logistics workflows. |
| **SDG 16** | Peace, Justice and Strong Institutions | Ensures transparent procurement, prevents fraud/corruption in logistics, and increases trust in defence asset tracking. |
| **SDG 12** | Responsible Consumption and Production | Ensures authentic, traceable spare parts to reduce counterfeits and wastage throughout the defence lifecycle. |


-----

### REFERENCES :

1. Sudhan, A. & Nene, M. (2017). *Employability of Blockchain Technology in Defence Applications.* IEEE ICISS.  
   https://ieeexplore.ieee.org/document/8273168

2. Kim, H. & Lee, J. (2022). *Ensuring Integrity in Defense Weapon Supply Chains Through Blockchain.* IEEE Access.  
   https://ieeexplore.ieee.org/document/9724158

3. Nguyen, D. & Tran, H. (2022). *Blockchain and Smart Contracts for Defense Logistics Security.* IEEE Transactions on Blockchain.  
   https://ieeexplore.ieee.org/document/9869598

4. Sharma, G., Sharma, D., & Kumar, A. (2023). *Role of Cybersecurity and Blockchain in Battlefield Logistics.* IEEE Internet Technology Letters.  
   https://ieeexplore.ieee.org/document/10096512

5. Patel, D. S. (2022). *Blockchain for Challenges in Logistics and Supply Chain.* IEEE ICCES.  
   https://ieeexplore.ieee.org/document/10037294





