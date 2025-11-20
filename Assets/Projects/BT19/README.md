# 24CYS336 - Blockchain Technology  

##  BT#19 – Blockchain-Based Multi-Energy System  
![](https://img.shields.io/badge/Member-Gajan_S-gold) ![](https://img.shields.io/badge/Member-Hariharan_R-gold)  
![](https://img.shields.io/badge/SDG--darkgreen) ![](https://img.shields.io/badge/SDG--darkgreen) <br/>
![](https://img.shields.io/badge/Reviewed-18th_Nov_2025-brown) <br/>

---

###  Problem Statement

The increasing use of solar panels and other renewable energy sources in homes and communities is good for the environment, but it also creates challenges for electricity grids. At certain times, there can be too much energy produced, while at other times there may not be enough. This imbalance can cause stress on the grid and make energy supply less reliable.

One way to help is to use multi-energy systems, which combine electricity, heating, and possibly other energy forms. These systems can store energy or convert it between forms, helping to balance supply and demand. However, to get the most benefit, these systems must be operated efficiently and fairly.

The challenge is how to manage local energy trading between producers (like solar panel owners) and consumers in a way that is:
- Transparent and trustworthy  
- Fair for everyone  
- Encourages the use of local renewable energy before using grid power  
- Keeps consumer costs as low as possible  

Traditional centralized systems can be slow, less transparent, and vulnerable to manipulation. A better approach is needed that can automatically match supply with demand, handle pricing, and settle payments quickly without a central authority.

---

###  Literature Survey

Researchers have been exploring ways to improve local energy systems as more renewable energy sources, like solar panels, are installed. One important approach is the **multi-carrier energy system (MES)**, which combines electricity, heating, cooling, and other energy forms so they can store, convert, and share energy efficiently. Studies show MES can help reduce carbon emissions, improve energy efficiency, and handle the variability of renewable energy.

Another related idea is the **Transactive Energy System (TES)**, which uses price signals and market-based mechanisms to balance energy supply and demand. TES encourages active participation from consumers and producers, improving flexibility and reliability.

Blockchain technology has been identified as a promising tool for both MES and TES. It offers transparency, security, and decentralized control without relying on a central authority. With smart contracts, transactions can be automatically executed and recorded, ensuring fairness and traceability.

Previous research has tested various pricing strategies—like real-time pricing, production-based pricing, and game-theory approaches—to optimize local energy trading. These strategies affect both the cost for consumers and the share of renewable energy used. Studies also highlight the role of batteries and storage in balancing the grid and increasing renewable energy usage in community energy systems.

---

###  Architectural Diagram

The architectural diagram of the **Blockchain-Based Multi-Energy System** is shown below.
<p align="center">
 <img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/2fd8c451-c504-4b71-bbde-9240226c7e17" />

</p>

#### Architecture Description
- **Producers** feed renewable energy data (capacity, source) into the blockchain.  
- **Consumers** register with their energy demand and location.  
- **Smart Contract** acts as a decentralized ledger maintaining block-level data.  
- **EnergyBlocks** record transactions linking producers and consumers chronologically.  
- **SystemBlock** tracks network-wide energy metrics for governance and optimization.
###  System Overview

The implemented smart contract — **`MultiEnergyBlocks.sol`** — is designed as a **block representation model** for a decentralized energy trading network.  
It is not a transactional trading platform but a **data-layer abstraction**, capturing and organizing entities in the energy ecosystem.

####  Core Components

1. **Producer Block**  
   Represents renewable energy producers such as solar or wind farms.  
   - Stores source type (e.g., Solar, Wind, Hydro)  
   - Records energy capacity and availability  

2. **Consumer Block**  
   Represents households, industries, or microgrids consuming energy.  
   - Stores consumer address and geographic location  
   - Records energy demand  

3. **Energy Data Block**  
   Logs energy transfers between producers and consumers.  
   - Contains producer and consumer addresses  
   - Records amount of energy transferred (in kWh)  
   - Includes a timestamp for traceability  

4. **System Info Block**  
   Maintains overall system statistics.  
   - Total number of producers and consumers  
   - Total energy capacity registered on-chain  

---

###  Smart Contract Workflow

Below is the simple step-by-step workflow of the `MultiEnergyBlocks` contract:

1. **Producer Registration**  
   - Energy producers are added using `addProducer(address, type, capacity)`.  
   - Each producer block stores capacity and available energy.  
   - System statistics (`totalProducers`, `totalEnergy`) are updated automatically.

2. **Consumer Registration**  
   - Consumers are added via `addConsumer(address, location, demand)`.  
   - Their details are stored in the `consumers` mapping.  
   - `totalConsumers` in `SystemBlock` increments accordingly.

3. **Energy Transaction Logging**  
   - Whenever energy is exchanged, the provider records it using `addEnergyBlock(address producer, address consumer, uint amount)`.  
   - The energy transfer creates a unique `EnergyBlock` with a timestamp and block ID.  
   - The block ledger (`energyBlocks`) ensures every transfer is transparent and immutable.

4. **System Tracking**  
   - `SystemBlock` maintains overall system status — total energy, number of producers, and consumers — forming the foundation for analytics or smart metering extensions.

---

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner  | 0xD552D310b7967771eBf5c9894FE1f316274f1656 |
| User 1 | 0xD552D310b7967771eBf5c9894FE1f316274f1656 |
| User 2 | 0xD552D310b7967771eBf5c9894FE1f316274f1656 | 

#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contract |   https://sepolia.etherscan.io/tx/0x36ae8828ef4dd1b64c69ff8419822ea3a4804dd0c13fd134232a0ad6e53c74c9   |

These transaction are as shown in the [https://youtu.be/cOLAuyS-jx0]() 

###  Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| **SDG Goal** | **Alignment with Blockchain-Based Multi-Energy System** |
|---------------|----------------------------------------------------------|
| **Goal 1 – Affordable and Clean Energy** | Blockchain enables peer-to-peer (P2P) trading of renewable electricity and heat, removing intermediaries and lowering energy costs. Smart contracts automate settlement and pricing, ensuring efficient and affordable green energy distribution. |
| **Goal 2 – Industry, Innovation, and Infrastructure** | The system integrates IoT devices, energy storage, and blockchain infrastructure to create a resilient, transparent, and decentralized energy marketplace. |
| **Goal 3 – Sustainable Cities and Communities** | Encourages localized energy generation and consumption, making urban and rural communities self-sufficient and reducing grid dependency. |
| **Goal 4 – Responsible Consumption and Production** | Smart contracts track and record every energy transaction immutably, ensuring accountability in energy use and promoting optimal consumption patterns. |
| **Goal 5 – Climate Action** | Prioritizes community-generated renewable energy over grid-based fossil energy, reducing carbon emissions and mitigating climate change. |
| **Goal 6 – Peace, Justice, and Strong Institutions** | Uses blockchain’s tamper-proof ledger to enforce fair pricing rules, resolve disputes, and build trust among all stakeholders. |
| **Goal 7 – Partnerships for the Goals** | The blockchain platform facilitates collaboration between households, energy producers, storage providers, and regulatory bodies through transparent smart contract execution. |

---

###  References

1. Yu, Q., Meeuw, A., & Wortmann, F. (2018). *Design and implementation of a blockchain multi-energy system.* **Energy Informatics**, 1(Suppl 1), 17. [https://doi.org/10.1186/s42162-018-0040-4](https://doi.org/10.1186/s42162-018-0040-4)

2. Gierek, A. (2016). *Report on an EU strategy on heating and cooling (2016/2058(INI))* [Internet].  
   European Parliament, Committee on Industry, Research and Energy (Report No. A8-0232/2016).  
   [http://www.europarl.europa.eu/sides/getDoc.do?pubRef=-//EP//NONSGML+REPORT+A8-2016-0232+0+DOC+PDF+V0//EN](http://www.europarl.europa.eu/sides/getDoc.do?pubRef=-//EP//NONSGML+REPORT+A8-2016-0232+0+DOC+PDF+V0//EN)

3. Glaser, F. (2017). *Pervasive decentralisation of digital infrastructures: A framework for blockchain-enabled system and use case analysis.*  
   Proceedings of the 50th Hawaii International Conference on System Sciences (HICSS-50), Waikoloa Village, Hawaii, January 4–7, 2017 (pp. 1543–1552). AIS Electronic Library (AISeL).

4. Mancarella, P. (2014). *MES (multi-energy systems): An overview of concepts and evaluation models.* **Energy**, 65, 1–17.
























