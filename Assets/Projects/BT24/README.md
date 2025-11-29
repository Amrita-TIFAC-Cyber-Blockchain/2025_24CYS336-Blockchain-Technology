<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## BT#24 - Smart Grid P2P Energy Trading Market

![MUKESH SINGH](https://img.shields.io/badge/Member-Mukesh_Singh-gold) ![DEEPANA S](https://img.shields.io/badge/Member-Deepana_S-gold) ![HARSHAN S](https://img.shields.io/badge/Member-Harshan_S-gold) <br/> 
![](https://img.shields.io/badge/SDG-7-darkgreen) ![](https://img.shields.io/badge/SDG-9-darkgreen) ![](https://img.shields.io/badge/SDG-13-darkgreen) ![](https://img.shields.io/badge/SDG-16-darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-19th_Nov_2025-brown) <br/>

------

### Problem Statement

The primary architectural challenge is transforming conventional energy systems (nanogrids, microgrids, VPPs, and Smart Grid 1.0/2.0) into a resilient, efficient, and interconnected cyber-physical network known as Smart Grid 3.0. This evolution is necessitated by rapid urbanization and the shift to decentralized, intermittent Distributed Energy Resources (DERs) (like solar and wind), which introduce unpredictable energy patterns, instability, and vulnerability.

Key challenges hindering this transition include:

- **Security and Privacy:** The large number of distributed smart devices and vast data exchange increase the risk of cyberattacks (e.g., FDI, DoS), compromising data integrity and system reliability.
- **Decentralization and Management**: The centralized control model conflicts with distributed DERs, leading to insecure authentication and low efficiency in information sharing and energy markets.
- **Operational Complexity:** Integrating and optimizing heterogeneous assets (nanogrids, storage, DERs) while maintaining interoperability, scalability, and seamless communication remains complex.
- **Market Efficiency:** Existing P2P energy trading systems lack adequate mechanisms for transparent and secure transactions, hindering participants' maximum payoff and efficient market clearing.

-----
### Literature Survey 

The foundation of modern grid architecture begins with Nanogrids (NGs), evolving through Microgrids (MGs) and Virtual Power Plants (VPPs) up to the current, IoT-supported Smart Grid (SG). However, this existing infrastructure, relying largely on conventional monitoring and control, faces limitations in scale, security, and market adaptability.

The literature proposes that the transition to Smart Grid 3.0 requires the convergence of four cutting-edge technologies:

- **Blockchain Technology** 🔗: Provides a decentralized, tamper-proof digital ledger that ensures transparency, security, and immutability for all transactions.
  - Application: It is ideal for enabling Peer-to-Peer (P2P) energy trading via smart contracts (SCs) without intermediaries, simplifying market settlement and securing data integrity against manipulation.
- **Digital Twin (DT)** 💻: Creates accurate virtual replicas (or cyber-physical models) of the entire grid ecosystem or individual assets.
  - Application: DTs facilitate real-time monitoring, predictive maintenance, simulation of fault scenarios, and system optimization before changes are deployed to the physical grid.
- **Artificial Intelligence (AI) / Machine Learning (ML)** 🧠: Employs advanced algorithms (Deep Learning, Reinforcement Learning, Federated Learning).
  - Application: AI optimizes energy scheduling, load/demand forecasting, fault detection, and energy management. When combined with DT, AI enables informed, automated decision-making for optimal operational efficiency.
- **The Metaverse** 🌐: Offers immersive, interactive environments that converge the physical and digital worlds.
  - Application: The Metaverse serves as the virtual space where DT simulations occur, facilitating remote system management, visualization of grid operations, and promoting stakeholder collaboration on real-time energy data.

This confluence addresses the fundamental pillars of a successful decentralized energy market: Market Economics (optimal bidding/payoff), Power Network (system stability/ANC allocation), and Policy & Regulation (dispute management/trust).

-----
### 🧩 Proposed Solution

To address the challenges of transparent energy trading and real-time load flow analysis in smart grids, we propose a **blockchain-backed P2P Energy Market** powered by the `EnergyMarket` smart contract.

The solution is organized into three main layers:

#### 1️⃣ Physical Layer – Smart Grid & Meters

Smart meters installed at prosumer premises are responsible for measuring:

- 🔹 **Energy generation**
- 🔹 **Energy consumption**
- 🔹 **Surplus energy available for trade**

These measurements are periodically pushed to the blockchain application **via an off-chain gateway/API**, which acts as a bridge between the physical grid and the blockchain-based energy market.

#### 2️⃣ Blockchain Layer – Core Energy Market Logic

At the core of the system is a Solidity smart contract called `EnergyMarket`, deployed on an **Ethereum-compatible blockchain** (testnet or private chain).

This layer manages:

- ✅ **Prosumer registration**
  - Registered only by the **grid operator/utility** (contract owner).
- ✅ **Surplus energy reporting**
  - Prosumers submit their **available surplus (in kWh)**.
- ✅ **P2P trade execution**
  - Direct energy trades between prosumers are validated and recorded.
- ✅ **Immutable logging of all transactions**
  - Every trade is stored on-chain, forming a **tamper-proof history** for:
    - Audit trails  
    - Load flow analysis  
    - Regulatory verification  

This ensures **trustless, transparent, and automated** energy trading without reliance on a centralized authority.

#### 3️⃣ Application & Analytics Layer – Frontend, Digital Twin, and AI/ML

On top of the blockchain, an **Application & Analytics Layer** provides user interaction and intelligence:

##### 🖥️ Web Interface & APIs

A frontend (e.g., **React**) and backend (e.g., **FastAPI**) are used to:

- Provide dashboards for:
  - Prosumers  
  - Utility  
  - Grid operator
- Allow users to:
  - Register (through the owner)
  - Report surplus
  - View available surplus and prices
  - Initiate P2P trades

The interface visualizes:

- 📊 **Surplus energy available** in the network  
- 🔁 **Ongoing and past trades**  
- 🌐 **Load flow patterns** over a simulated or digital twin grid  

##### 📈 Analytics, Digital Twin & AI/ML

Analytical tools consume the **on-chain data as trusted input**:

- **Load flow engines** use trade and surplus data to:
  - Reconstruct energy movement
  - Analyze node-level load patterns
- **AI/ML models** can:
  - Forecast future load and renewable generation
  - Detect anomalies in trading or load behavior
  - Suggest **optimal trading or dispatch strategies** for grid stability

This makes the system not just a trading platform, but a **data backbone for smart grid optimization**.

In summary, the proposed solution tightly couples **physical smart grid infrastructure**, a **decentralized blockchain market**, and **intelligent analytics**, enabling secure, transparent, and real-time P2P energy trading with support for **load flow analysis**.

-----
### Architectural Diagram

<p align="center">
  <img src="FLOW.png" width=500 />
</p>

------

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address                                   |
|:----------------------------|:------------------------------------------|
| Owner                       | 0x69954b38f8f72abac68b18d1a457cb0c1e289bb8 |
| User 1                      | 0x1cccCcE2DB8b812460F45f055d4eCeed96c51179 |
| User 2                      | 0x307fb4d7E5Bbc94FA9d361b55fE27DfcD3E91600 |

#### Transaction Details

| Transaction Action        | Hash                                                                 |
|:--------------------------|:---------------------------------------------------------------------|
| Deployment of Contracts   | 0xe75bdf168ab322de79f4ce993d1e40a1c83cb279764bdb5ef1653092a687a7e4   |

 
#### Demo Video
The Demo Video is available [here](https://www.youtube.com/watch?v=n9KG7wkeUs0)


### Mapping The Project To Relevant Sustainable Development Goals (SDGS)

| SDG No. | Goal Name | Relevance to Project |
|--------|----------|---------------------|
| **SDG 7** | Affordable and Clean Energy | Maximizes the integration of Renewable Energy Sources (RES) (solar, wind) into the grid. Enables decentralized P2P trading to make energy more affordable and accessible. |
| **SDG 9** | Industry, Innovation and Infrastructure |Leverages cutting-edge digital technologies (AI, DT, Metaverse, Blockchain) for grid modernization and intelligence. Creates resilient infrastructure capable of handling dynamic load and cyber threats |
| **SDG 13** | Climate Action | Incentivizes emission reductions and the adoption of clean energy. The proposed trading framework demonstrates superiority in carbon emission reduction compared to centralized models. |
| **SDG 16** | Peace, Justice and Strong Institutions | Ensures transparent, verifiable, and non-tamperable energy transactions via blockchain and smart contracts. Enhances trust and reduces fraud/disputes in the energy marketplace. |

-----

## References

1. Nguyen, D., & Tran, H. (2022). A framework for blockchain-enabled smart contract management system of arms and ammunition for defence industry. In *IEEE ICRITO*. https://doi.org/10.1109/ICRITO61523.2024.10522135

2. Singh, K., et al. (2025). Foundational pillars of peer-to-peer (P2P) energy trading in smart grid using blockchain. *Research Square Preprints*. https://doi.org/10.21203/rs.3.rs-6703573/v1

3. Agarwal, S., & Jain, A. (2024). Energy management in smart distribution grid: Leveraging blockchain for energy trading. In *Cigre 2024 Paris Session* (Paper ID 11298).

4. Boumaiza, A. (2024). Carbon and energy trading integration within a blockchain-powered peer-to-peer framework. *Energies, 17*(11), 2473. https://doi.org/10.3390/en17112473

5. Zhang, M., et al. (2024). Smart grid security based on blockchain and smart contract. *Peer-to-Peer Networking and Applications*. https://doi.org/10.1007/s12083-024-01703-0

6. Zahid, H., et al. (2025). Transforming nano grids to smart grid 3.0: AI, digital twins, blockchain, and the metaverse revolutionizing the energy ecosystem. *Results in Engineering*. https://doi.org/10.1016/j.rineng.2025.105850
----   
