<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain Technology 

## Lab 6: Introduction to RemixIDE and Solidity Programming

### Objectives
By the end of this lab, students will be able to:
- Understand the concept of **Smart Contracts** and their role in Blockchain applications.
- Learn the basics of the **Solidity programming language**.
- Explore the **Remix IDE** for writing, compiling, and deploying Smart Contracts.
- Deploy a simple Smart Contract on a local Ethereum environment using Remix.
- Analyze how Smart Contracts ensure **transparency, trust, and automation**.

###  Background
Blockchain goes beyond cryptocurrency by enabling **programmable agreements**, known as **Smart Contracts**.  
A **Smart Contract** is a self-executing code deployed on the blockchain that automatically enforces rules without intermediaries.  

- **Solidity** is the most widely used programming language for writing Smart Contracts on the Ethereum Virtual Machine (EVM).  
- **Remix IDE** is a browser-based IDE that simplifies the process of writing, compiling, debugging, and deploying contracts.  

This lab will introduce:
1. Structure of a Solidity contract (`pragma`, `contract`, `state variables`, `functions`).
2. Writing and compiling a **Hello Blockchain** contract.
3. Deploying and interacting with the contract using **Remix IDE**.
4. Observing the contract state changes and transactions on the blockchain.

### Tools & Requirements
- **Browser** (Chrome/Firefox/Edge latest version).
- **Remix IDE**: [https://remix.ethereum.org/](https://remix.ethereum.org/) (no installation required).
- **Metamask Wallet (optional)** for deployment to test networks.
- **Sample Contracts** (provided during lab).

### Resources


```
Filename: Sample.sol


// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.7.0;
import "<<path-or-link-to-file-to-be-imported>>"

/**
 * @title Solidity Template
 * @author Ramaguru Radhakrishnan
 */
 contract <<contractName>> {
 
    mapping(datatype => datatype) public mapvar1; //Mapping to store a Key-Value 

    uint64 intvar1;	// Variable of Unsigned Integer with 64 bits 
    uint128 intvar2;    // Variable of Unsigned Integer with 128 bits
    int256 intvar3;     // Variable of Signed Integer with 256 bits
    
    string  stringvar;	// Variable of String
    
    address addressvar; // Variable of Address - to store Ethereum Wallet Address or Smart Contract Address
    
    address owner; // For assigning owner of the smart contract
    
    struct structvar {
        
        uint256 structvar1;
        string  structvar2;
    }
    
    structvar varstruct;
    
    /** Constructor */
    constructor() {}
    
    /** modifier to provide access control **/
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all changes to the state and to Ether balances are reverted.
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    
    /**
     * @dev Example Function to perform operation and store (only owner can make a successful call)
     * @param num value to store
     */
    function <<functionName>>(paramaters) public isOwner {
        // do function operations
    }
    
     /**
     * @dev Example Function to return values
     * @param num value to store
     */
    function <<functionName1>>() public view returns(datatypes) {
        return (variables);
    }

}

```
