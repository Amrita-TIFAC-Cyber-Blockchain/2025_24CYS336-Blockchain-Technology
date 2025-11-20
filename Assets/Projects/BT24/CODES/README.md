## 🏛 NITI Aayog Blockchain 

## Why Blockchain? (Problem Fit)

This checklist evaluates the project against standard criteria for determining if a blockchain solution is a good fit.

### 1. Are there multiple parties involved? → **YES**
* Prosumers
* Consumers
* Utility
* Distribution company
* Grid operator
> **✔ Multiple independent entities → blockchain recommended.**

---

### 2. Do these parties trust each other fully? → **NO**
* Prosumers may cheat surplus values.
* Buyers may fake demand.
* Utility may alter data.
* Load flow data may be manipulated.
> **✔ When trust is low, blockchain ensures fairness.**

---

### 3. Is data coming from multiple distributed sources? → **YES**
* Smart meters
* Prosumers
* Load flow sensors
* Decentralized renewable sites
> **✔ Blockchain is ideal for distributed environments.**

---

### 4. Is tamper-proof, auditable logging required? → **YES**
* Load flow analysis needs:
    * Transparent energy transfer
    * Verified surplus reporting
    * Immutable trade history
    * Audit trail for grid balancing
> **✔ Blockchain provides immutable logs.**

---

### 5. Is there a need to automate rules without human interference? → **YES**
* Prosumer registration
* Surplus reporting
* Energy trading
* Settlement (future version)
> **✔ Smart contracts automate these actions.**

---

### 6. Does centralization create a risk? → **YES**
* A centralized database can:
    * Alter records
    * Hide trades
    * Manipulate surplus data
> **✔ Blockchain removes a single point of failure.**

---

### 7. Are there benefits from decentralization? → **YES**
* Transparent load flow
* Decentralized trading
* Eliminates disputes
* Removes intermediary cost
> **✔ Major improvement over traditional databases.**

## Blockchain Part

Blockchain folder for Smart Grid P2P Energy Trading project.
Contains Solidity smart contract, migrations, Truffle config, and build/test files.

---

### Setup Instructions

1.  **Activate your virtual environment:**
    * Linux/macOS: `source venv/bin/activate`
    * Windows: `venv\Scripts\activate`
2.  **Navigate into blockchain folder:**
    * `cd smartgrid/blockchain`
3.  **Start local blockchain using Truffle Develop:**
    * `truffle develop`

---

### Features

* Prosumer registration (owner-controlled)
* Energy surplus reporting
* Peer-to-peer (P2P) energy trading
* Immutable on-chain transaction history
* Access control using OpenZeppelin Ownable
* Automated trustless execution
* Supports load flow analysis via transparent logs

---

### Contract Overview

#### Data Structures
* **isProsumer:** `mapping(address => bool)` - tracks registered prosumers
* **prosumerEnergyBalance:** `mapping(address => uint256)` - stores energy balance (kWh)
* **transactionHistory:** Array of all executed P2P trades

#### Key Functions
* **registerProsumer:** Owner registers a prosumer
* **reportEnergySurplus:** Prosumers update surplus energy
* **executeP2PTrade:** Executes trade between seller and buyer
* **getTransactions:** Returns full on-chain transaction history

---

### Usage

#### Steps
1.  Admin registers prosumers using `registerProsumer()`
2.  Prosumers report surplus with `reportEnergySurplus()`
3.  Prosumers trade energy via `executeP2PTrade()`
4.  Anyone can fetch logs using `getTransactions()`


### Events

* `ProsumerRegistered(address)`
* `EnergyReported(address, uint256)`
* `TradeCompleted(address, address, uint256, uint256)`

---

## ✅ Compilation & Deployment

1. Install Dependencies <br>
`npm install -g truffle` <br>
`npm install` <br>
`npm install @openzeppelin/contracts` <br>

2. Compile <br>
`truffle compile` <br>

3. Deploy Using Truffle Develop <br>
`truffle develop` <br>

Inside the Truffle console: <br>
`migrate --reset` <br>

Deploy to Other Networks <br>
`truffle migrate --network <network_name>`


Inside the Truffle console:
`migrate --reset`

Deploy to Other Networks
`truffle migrate --network <network_name>`


### 🚀 Running Backend & Frontend

1. Start Backend (FastAPI)

`cd smartgrid` <br>
`uvicorn smartgrid.api.main:app --reload` <br>

2. Start Frontend (React & Tailwind)

`cd smartgrid/frontend` <br>
`npm run dev` <br>

### Libraries and Ides

1. Truffle : `Contract compiling and deploying`
2. web3 : `Connect backend with blockchain`
3. fastapi : `Build backend API`
4. Cors Middleware : `Allow frontend to access backend`
5. React And Tailwind : `Build frontend ui`

