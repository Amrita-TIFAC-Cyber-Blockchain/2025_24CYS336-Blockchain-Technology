# EnergyMarket Smart Contract

A Solidity-based smart contract facilitating peer-to-peer (P2P) energy trading and load management on the blockchain. This system enables registered prosumers (both producers and consumers of energy) to transparently report, trade, and track surplus energy, providing the backbone for decentralized energy marketplaces and load flow analysis.

---

## Table of Contents

- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [How Blockchain Helps](#how-blockchain-helps)
- [NITI Aayog Blockchain Flow (ASCII)](#niti-aayog-blockchain-flow-ascii)
- [Features](#features)
- [Contract Overview](#contract-overview)
- [Usage](#usage)
- [Events](#events)
- [Compilation & Deployment](#compilation--deployment)
- [License](#license)

---

## Introduction

As smart grids integrate increasing numbers of distributed renewable generators, managing energy production, consumption, and load flow becomes more complex. The EnergyMarket contract demonstrates how blockchain and autonomous smart contracts can automate and secure P2P energy trades, empowering prosumers and optimizing grid load balancing with auditable, real-time data[web:31][web:33].

---

## Problem Statement

**Load Flow Analysis using Smart Grid**  
Modern energy systems face challenges with decentralized generation, dynamic consumption, and the need for trustworthy, real-time data sharing for effective load management. Traditional centralized records are prone to inefficiency and tampering, while P2P energy prosumers—and their surplus energy—remain underutilized due to a lack of reliable exchange mechanisms.

---

## How Blockchain Helps

Blockchain enables auditable, tamper-proof recordkeeping and automated contract logic, facilitating fair and transparent P2P energy exchanges.  
- Every surplus report, trade, and energy use is instantly visible and verifiable.
- Settlement is automatic, and trades cannot be altered after execution.
- Prosumer registration and all trades are enforced by immutable code.
- All participants transparently see the transaction history and balances.

This system eliminates the need for a central authority, reducing risk and building a more resilient, responsive smart grid.  
*Based on NITI Aayog and contemporary research, blockchain supports traceability, trust, and operational automation in complex energy ecosystems, making it highly suitable for decentralized load flow analysis and trading[web:31][web:33].*

---

## NITI Aayog Blockchain Energy Flow (ASCII Diagram)

+-------------+ +---------------------+ +-------------+
| Prosumer A |<----->| Blockchain Node |<----->| Prosumer B |
+-------------+ +---------------------+ +-------------+
^ ^ ^ ^
| | | |
+-------------+ +--------------+ +-------------------+
| Prosumer C |<---->| Utility |<------| Distribution CoOp |
+-------------+ +--------------+ +-------------------+

All trades are broadcast and validated by smart contracts.

Distributed load, surplus, and consumption updates are transparent and immutable.

Utilities monitor, but cannot alter, trades or data.


---

## Features

- **Prosumer Registration:** Admin-controlled, prevents duplicate entries.
- **Surplus Reporting:** Prosumers publish available energy, updating on-chain balances.
- **P2P Trade Execution:** Direct energy swaps between registered prosumers.
- **Public Transaction History:** Immutable and queryable for accurate load flow.
- **Access Control:** Owner privileges and prosumer-only actions enforced.

---

## Contract Overview

### Data Structures

- `mapping(address => bool) public isProsumer`  
  Registered status of each participant.
- `mapping(address => uint256) public prosumerEnergyBalance`  
  Tracks energy balances in kWh.
- `Transaction[] public transactionHistory`  
  Complete log of energy trades.

### Key Functions

| Function                                   | Description                                             |
|---------------------------------------------|---------------------------------------------------------|
| `registerProsumer(address _prosumer)`       | Owner-only, adds a new prosumer                         |
| `reportEnergySurplus(uint256 _surplusInKwh)`| Prosumers update available surplus energy                |
| `executeP2PTrade(address _buyer, uint256 _amountInKwh)` | Executes an energy trade between two prosumers  |
| `getTransactions()`                        | Returns complete trade log for all on-chain analysis     |

---

## Usage

1. **Registration**  
   Admin calls `registerProsumer(address)` to enroll new users.
2. **Reporting Surplus**  
   Registered users call `reportEnergySurplus(uint256)` as surplus is generated.
3. **Trading**  
   Surplus holders initiate `executeP2PTrade(address, uint256)` to transfer energy.
4. **Transaction Query**  
   Anyone can call `getTransactions()` to fetch the event log.

---

## Events

- `ProsumerRegistered(address indexed prosumer)`  
- `EnergyReported(address indexed prosumer, uint256 newBalance)`  
- `TradeCompleted(address indexed seller, address indexed buyer, uint256 amountInKwh, uint256 timestamp)`

---

## Compilation & Deployment

1. **Install dependencies:**
npm install -g truffle
npm install @openzeppelin/contracts

text
2. **Compile:**  
`truffle compile`
3. **Deploy:**  
Configure your `truffle-config.js` for your desired network and run  
`truffle migrate --network <network>`

---

## License

MIT License

---

*For real world use, integration with off-chain data, price logic, and further security mechanisms may be necessary. This contract provides a modular, auditable foundation for blockchain-based energy trading and load flow analytics.*
