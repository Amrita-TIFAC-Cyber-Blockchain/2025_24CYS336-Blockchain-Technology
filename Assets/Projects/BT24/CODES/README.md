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

### 1. Install Dependencies

npm install -g truffle
npm install
npm install @openzeppelin/contracts


---

### 2. Compile

_Navigate to your blockchain project folder:_

truffle compile


---

### 3. Deploy

#### On Truffle Develop

truffle develop


_Then, inside the Truffle console:_

migrate --reset


#### On Other Networks (e.g., Sepolia, Polygon, custom):

truffle migrate --network <network_name>


---

## ✅ License

**Type:** MIT  
_Note: Free to use, modify, and distribute._
