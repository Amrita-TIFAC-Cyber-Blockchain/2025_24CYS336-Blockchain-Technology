
Table of Contents

Introduction
# EnergyMarket Smart Contract

A Solidity-based smart contract facilitating peer-to-peer (P2P) energy trading and load management on the blockchain. This system enables registered prosumers (both producers and consumers of energy) to transparently report, trade, and track surplus energy, providing the backbone for decentralized energy marketplaces and load flow analysis.

---

## 🔷 Energy Market Flow Diagram

![Energy Market Flow](./FLOW.png)

---

## 📑 Table of Contents

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

## 📘 Introduction

As smart grids integrate increasing numbers of distributed renewable generators, managing energy production, consumption, and load flow becomes more complex.  
The **EnergyMarket** contract demonstrates how blockchain and autonomous smart contracts can automate and secure P2P energy trades, empowering prosumers and optimizing grid load balancing with auditable, real-time data.

---

## ⚡ Problem Statement — Load Flow Analysis Using Smart Grid

Modern grid systems face:

- decentralized, unpredictable generation  
- dynamic consumption  
- difficulty in sharing real-time load data  
- lack of transparent prosumer trading  
- risk of tampered or inaccurate load flow records  

Traditional centralized systems are not sufficient for future smart grids.

---

## 🔐 How Blockchain Helps

Blockchain enables:

- ✔ Tamper-proof load & trade records  
- ✔ Transparent energy surplus tracking  
- ✔ Automated trading via smart contracts  
- ✔ Decentralized validation  
- ✔ Real-time load flow visibility  

This aligns with **NITI Aayog’s vision** of trusted, decentralized public infrastructure.

---

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


