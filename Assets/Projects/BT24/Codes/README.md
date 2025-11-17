
# EnergyMarket Smart Contract

A decentralized marketplace for peer-to-peer energy trading on Ethereum, built in Solidity. Prosumers (producers/consumers) can register, report surplus energy, and trade with each other.  


---

## Features

- Ownable contract — only the owner can register new prosumers
- Prosumer energy reporting and tracking
- Peer-to-peer energy trading
- Complete transaction history retrieval
- Events for application integration and listener scripts

---

## Tech Stack

- **Solidity** `^0.8.24`
- **Truffle** (development, testing, migration)
- **OpenZeppelin Contracts** (access controls)
- **Web3.js** (client-side contract interaction)
- Node.js + npm (runtime and package manager)

---

## Dependencies

Make sure you have the following installed:

| Dependency               | Install Command                       | Purpose                                   |
|--------------------------|---------------------------------------|-------------------------------------------|
| Node.js and npm          | [Download from nodejs.org](https://nodejs.org) | JS runtime & package manager               |
| Truffle (global)         | `npm install -g truffle`              | Smart contract suite                       |
| Truffle (local/dev)      | `npm install --save-dev truffle`      | Project-wide Truffle version               |
| OpenZeppelin contracts   | `npm install @openzeppelin/contracts` | Secure, audited contract templates         |
| dotenv (optional)        | `npm install dotenv`                  | Managing environment variables             |
| Chai (optional)          | `npm install --save-dev chai`         | Enhanced assertions for tests              |
| Web3.js                  | `npm install web3`                    | Ethereum JS API for frontend/scripts       |

Initialize your npm project if not already done:
npm init -y

---

## Setup and Compilation

1. **Clone this repository:**
    ```
    git clone https://github.com/MukeshSingh123-tech/energymarket.git
    cd energymarket
    ```

2. **Install project dependencies:**
    ```
    npm install
    ```

3. **Compile contracts:**
    ```
    truffle compile
    ```

4. **Configure your custom network:**
    - Edit `truffle-config.js` to add your custom network settings.
    - Use a local Ganache, testnet, or your own RPC endpoints as required.

5. **Migrate contracts to your network:**
    ```
    truffle migrate --network <yourCustomNetwork>
    ```

6. **Start Truffle console for interactive testing:**
    ```
    truffle develop
    ```

---

## Smart Contract Overview

**File:** `contracts/EnergyMarket.sol`

| Function                                      | Description                                 |
|------------------------------------------------|---------------------------------------------|
| `registerProsumer(address)`                    | Owner-only. Registers new prosumer.         |
| `reportEnergySurplus(uint256)`                 | Prosumers can add surplus KWh to balance.   |
| `executeP2PTrade(address, uint256)`            | Sells KWh from sender to registered buyer.  |
| `getTransactions()`                            | Fetches complete transaction history.       |

Events:
- ProsumerRegistered
- EnergyReported
- TradeCompleted

---

## Interacting with Contracts Using Web3.js

Here’s a sample script to interact with your contract using Web3.js:

const Web3 = require('web3');
const contractABI = require('./build/contracts/EnergyMarket.json').abi;
const contractAddress = '<DEPLOYED_CONTRACT_ADDRESS>'; // Fill this after migration

const web3 = new Web3('<YOUR_CUSTOM_RPC_URL>');
const account = '<YOUR_ACCOUNT_ADDRESS>';

const energyMarket = new web3.eth.Contract(contractABI, contractAddress);

// Example: Registering a new prosumer (owner only)
energyMarket.methods.registerProsumer('0xProsumerAddress').send({ from: account });

// Example: Reporting energy surplus
energyMarket.methods.reportEnergySurplus(100).send({ from: account });

// Example: Executing a trade
energyMarket.methods.executeP2PTrade('0xBuyerAddress', 50).send({ from: account });

// Example: Getting transaction history
energyMarket.methods.getTransactions().call().then(console.log);


---

## Running Tests

To execute Truffle tests (placed in `/test`):

truffle test


---

## Custom Network Deployment

Update `truffle-config.js` for your network, e.g.:

module.exports = {
networks: {
custom: {
host: "localhost",
port: 8545,
network_id: "*",
}
},
// ...rest of config
};


Deploy:

truffle migrate --network custom


---

## License

Released under the [MIT License](./LICENSE).
