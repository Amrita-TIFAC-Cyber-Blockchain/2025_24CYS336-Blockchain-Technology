EnergyMarket Smart Contract

A Solidity-based smart contract facilitating peer-to-peer (P2P) energy trading and load management on the blockchain. This system enables registered prosumers (both producers and consumers of energy) to transparently report, trade, and track surplus energy, providing the backbone for decentralized energy marketplaces and load flow analysis.

Energy Market Flow Diagram
![Energy Market Flow](./Assets/Projects/BT24/FLOW.png)


Table of Contents

Introduction

Problem Statement

How Blockchain Helps

NITI Aayog Blockchain Flow (ASCII)

Features

Contract Overview

Usage

Events

Compilation & Deployment

License

Introduction

As smart grids integrate increasing numbers of distributed renewable generators, managing energy production, consumption, and load flow becomes more complex. The EnergyMarket contract demonstrates how blockchain and autonomous smart contracts can automate and secure P2P energy trades, empowering prosumers and optimizing grid load balancing with auditable, real-time data.

Problem Statement

Load Flow Analysis using Smart Grid
Modern energy systems face challenges with decentralized generation, dynamic consumption, and the need for trustworthy, real-time data sharing for effective load management. Traditional centralized records are prone to inefficiency and tampering, while P2P energy prosumers—and their surplus energy—remain underutilized due to a lack of reliable exchange mechanisms.

How Blockchain Helps

Blockchain enables auditable, tamper-proof recordkeeping and automated contract logic, facilitating fair and transparent P2P energy exchanges.

Every surplus report, trade, and energy use is instantly visible and verifiable.

Settlement is automatic, and trades cannot be altered after execution.

Prosumer registration and all trades are enforced by immutable code.

All participants transparently see the transaction history and balances.

This system eliminates the need for a central authority, reducing risk and building a more resilient, responsive smart grid.

NITI Aayog Blockchain Energy Flow (ASCII Diagram)
+-------------+      +---------------------+      +-------------+
| Prosumer A  |<---->|   Blockchain Node   |<---->| Prosumer B  |
+-------------+      +---------------------+      +-------------+
       ^                     ^      ^                     ^
       |                     |      |                     |
+-------------+      +--------------+      +---------------------+
| Prosumer C  |<---->|   Utility    |<---->| Distribution Co-Op  |
+-------------+      +--------------+      +---------------------+

Features

Prosumer Registration

Surplus Reporting

P2P Energy Trade Execution

Immutable Public Transaction History

Owner/Prosumer Access Control

Contract Overview
Data Structures

mapping(address => bool) public isProsumer

mapping(address => uint256) public prosumerEnergyBalance

Transaction[] public transactionHistory

Key Functions
Function	Description
registerProsumer(address)	Adds new prosumer
reportEnergySurplus(uint256)	Updates surplus
executeP2PTrade(address,uint256)	Executes trade
getTransactions()	Returns full log
Usage

Admin registers prosumers

Prosumers report surplus

Prosumers initiate P2P trades

Anyone can fetch transaction logs

Events

ProsumerRegistered

EnergyReported

TradeCompleted

Compilation & Deployment
Install Dependencies
npm install -g truffle
npm install @openzeppelin/contracts

Compile
truffle compile

Deploy
truffle migrate --network <network>


For Truffle Develop:

truffle develop
migrate --reset

License

MIT License
