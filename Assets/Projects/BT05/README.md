
# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/Batch-22UCYS-gold) ![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject-Blockchain-blue) <br/>

## BT#05 - BlockVote: Enterprise E-Voting System

![](https://img.shields.io/badge/Jose_Rohit_M-TBD-gold)  <br/> 
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

------

### Problem Statement
Traditional electronic voting systems face major challenges such as centralized control, security loopholes, and lack of transparency.  
This project, **BlockVote**, aims to solve these issues by building an **Enterprise E-Voting System** on the blockchain using **Ethereum and Ganache**.  
It ensures **voter anonymity**, **prevents double voting**, and maintains **transparency** and **immutability** through the use of **smart contracts** and **decentralized storage**.

------

## Project Overview

This project demonstrates a simple **Enterprise E-Voting System** built using:
- **Solidity** – Smart contract logic for handling voting securely on the blockchain.  
- **HTML + JavaScript (Web3.js)** – Frontend interface to interact with the smart contract.  
- **Ganache** – A local blockchain used for testing and deploying the smart contract.

---

## Components Used

1. **Smart Contract (`Voting.sol`)**  
   - Written in Solidity.  
   - Handles election setup, vote casting, and result calculation.  
   - Ensures each voter can vote only once and only the owner can end the election.

2. **Frontend (`index.html`)**  
   - Connects to the blockchain using Web3.js.  
   - Allows users to cast their votes and view results through a simple UI.  
   - Ensures that only the owner can start and end the elections.

3. **Ganache Blockchain**  
   - **Ganache** is a personal Ethereum blockchain used for local development and testing.  
   - It simulates Ethereum behavior without using real Ether or connecting to public testnets.  
   - Ganache automatically provides **10 pre-funded Ethereum accounts**, each loaded with **100 ETH** to deploy contracts and test transactions.

---

##  How Ganache Is Used in This Project

- The Solidity contract is deployed on the **Ganache local network**.  
- Each Ganache account represents a **voter** or the **election owner**.  
- Transactions like casting votes or deploying contracts are processed locally with zero cost.  
- The frontend connects to Ganache via **MetaMask**, using the RPC URL and chain ID provided by Ganache.

---



### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| **SDG** | **Description** | **Relevance to Project** |
|--------|-----------------|-------------------------|
| **SDG 16 – Peace, Justice and Strong Institutions** | Promote peaceful and inclusive societies with effective, accountable institutions | Provides a **transparent and tamper-proof electronic voting system** to enhance trust in elections |
| **SDG 9 – Industry, Innovation, and Infrastructure** | Build resilient infrastructure and foster innovation | Uses **blockchain technology** to create a **modern and secure digital election infrastructure** | 

------
