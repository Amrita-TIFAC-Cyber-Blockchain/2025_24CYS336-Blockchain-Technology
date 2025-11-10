<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - Ashwinkumar K.S
![](https://img.shields.io/badge/Name-YourName-blue) <br/>

| Wallet Address | 0x212A570021598E68a94A16421F6388F575bB23F2 | 
|:--------------:|:-------------------------------------:|
|Wallet Desc.    | [https://sepolia.etherscan.io/address/0x212A570021598E68a94A16421F6388F575bB23F2] |   

### Lab  - Introduction to solidity  

| Smart Contract Address | 0x47E35A39Dd22714e46DFdA67B706Cb0874463fF7 |
|:----------------------:|:-------------------------------------:|
| Transaction Desc.      | [https://sepolia.etherscan.io/address/0x47E35A39Dd22714e46DFdA67B706Cb0874463fF7] |

### Lab  - Solidity Contract deployment

Storing and retrieving online asset information

| Smart Contract Address | 0x394BeC39fAAB1a87D49e7d7d05112808D3183006 |
|:----------------------:|:-------------------------------------:|
| Transaction Desc.      | [https://sepolia.etherscan.io/address/0x394BeC39fAAB1a87D49e7d7d05112808D3183006] |
<img width="160" height="280" alt="Screenshot 2025-10-12 120153" src="https://github.com/user-attachments/assets/f81c6c25-8998-4837-b97a-7b737ae4a57a" />
<img width="380" height="197" alt="image" src="https://github.com/user-attachments/assets/aeeac3d9-da78-4859-b9ba-19256dc6aed5" />


### Lab  - Solidity Contract deployment


| Smart Contract Address | 0x9297E5859fD21f65731D5B28306d0ea5A31BF7f4 |
|:----------------------:|:-------------------------------------:|
| Transaction Desc.      | [https://sepolia.etherscan.io/address/0x9297E5859fD21f65731D5B28306d0ea5A31BF7f4] |
<img width="160" height="258" alt="image" src="https://github.com/user-attachments/assets/6a2b1290-b5f7-40b1-9f0a-15c4c673dfe2" />
<img width="366" height="168" alt="image" src="https://github.com/user-attachments/assets/c498003a-b0f6-4a44-beaa-ac7c6d824b05" />


### Lab  - Solidity Contract deployment with modifiers


| Smart Contract Address | 0x71A88A64FFDc09264fd6Da2679F7D4859a03b79f |
|:----------------------:|:-------------------------------------:|
| Transaction Desc.      | [https://sepolia.etherscan.io/address/0x71A88A64FFDc09264fd6Da2679F7D4859a03b79f] |

### Lab  - IPFS
Basic ipfs commands 

<img width="767" height="174" alt="image" src="https://github.com/user-attachments/assets/89ce7e3e-3830-44a4-91d4-45f56e597976" />

Adding a file to IPFS
<img width="1437" height="73" alt="image" src="https://github.com/user-attachments/assets/e0290119-746b-42d7-9b09-574545a58617" />




### End Sem Lab
**Document**

[CB.EN.U4ECE23007_Endsem_copy.pdf](https://github.com/user-attachments/files/23432672/CB.EN.U4ECE23007_Endsem_copy.pdf)

**Code**
```
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract PlotRegistry{
    address govtAdmin;

    struct Plot{
        uint PlotID;
        string PlotOwner;
        uint PlotSize;
        string PlotLocation;
        uint PlotPrice;
        string date;
    }

    mapping(uint => Plot) public plots;

    constructor(){
        govtAdmin = msg.sender;
    }
    modifier onlyGovtAdmin(){
        require(msg.sender == govtAdmin, "Government Admin privilege required");
        _;
    }

    function addPlotDetails(uint _PlotID, string memory _PlotOwner, uint _PlotSize, string memory _PlotLocation, uint _PlotPrice, string memory _date)
    public
     onlyGovtAdmin{
        plots[_PlotID] = Plot(_PlotID, _PlotOwner, _PlotSize, _PlotLocation, _PlotPrice, _date);
    }

    function viewPlots(uint _PlotID) public view returns(Plot memory){
        return plots[_PlotID];
    }

}
```




