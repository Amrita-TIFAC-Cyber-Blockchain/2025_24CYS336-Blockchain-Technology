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
Modern energy systems face challenges with decentralized generation, dynamic consumption, and the need for trustworthy, real-time data sharing for effective load management. Centralized systems suffer from inefficiency, tampering risks, and lack of transparent P2P exchange.

How Blockchain Helps

Blockchain provides:

✔ Tamper-proof records

✔ Transparent energy trades

✔ Automated settlement via smart contracts

✔ Decentralized data handling

✔ Real-time load & surplus visibility

This makes it ideal for smart grid load flow analysis and prosumer energy markets.

NITI Aayog Blockchain Flow (ASCII Diagram)
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

Access Control (Owner + Prosumer-only functions)

Contract Overview
Data Structures

isProsumer[address] → registration status

prosumerEnergyBalance[address] → energy in kWh

transactionHistory[] → all trades

Key Functions
Function	Description
registerProsumer()	Adds new prosumer
reportEnergySurplus()	Update surplus energy
executeP2PTrade()	Executes trade
getTransactions()	Returns complete log
Usage

Admin registers prosumers

Prosumers report surplus

Prosumers trade energy

Anyone can query transaction history

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

If using Truffle Develop:

truffle develop
migrate --reset


Or normal migration:

truffle migrate --network <network>

License

MIT License
