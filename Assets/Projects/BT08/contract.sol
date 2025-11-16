// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DeFiForFarmsSimple {
    address public admin;

    constructor() { 
        admin = msg.sender; 
    }

    modifier onlyAdmin() { 
        require(msg.sender == admin, "Admin only"); 
        _; 
    }

  
    mapping(address => bool) public isLender;
    mapping(address => bool) public isInsurer;

  
    struct Farmer { 
        string name; 
        string location; 
        bool exists; 
    }
    mapping(address => Farmer) public farmers;


    enum State { Created, Harvested, Shipped, Delivered }
    struct Batch { 
        uint id; 
        address farmer; 
        string product; 
        uint qty; 
        State st; 
    }
    mapping(uint => Batch) public batches; 
    uint nextBatch;

  
    enum LoanStatus { Applied, Approved, Paid }
    struct Loan { 
        uint id; 
        address farmer; 
        address lender; 
        uint amt; 
        uint repay; 
        LoanStatus st; 
    }
    mapping(uint => Loan) public loans; 
    uint nextLoan;

    // --- Insurance ---
    enum InsStatus { Active, Claimed, Paid }
    struct Policy { 
        uint id; 
        address farmer; 
        address insurer; 
        uint premium; 
        uint cover; 
        InsStatus st; 
    }
    mapping(uint => Policy) public policies; 
    uint nextPol;

    
    receive() external payable {}
}
