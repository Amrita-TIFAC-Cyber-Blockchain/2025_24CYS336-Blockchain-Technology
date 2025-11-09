<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - CB.EN.U4CCE23019
![](https://img.shields.io/badge/Name-K_B_Vishal-blue) <br/>

| Wallet Address | [0x1A0e645b47B4BeDd350164aEAaB9818a1C19455d](https://sepolia.etherscan.io/address/0x1A0e645b47B4BeDd350164aEAaB9818a1C19455d)| 
|:--------------:|:-----------------------------:|
 
### Lab - Introduction to Solidity 
![](https://img.shields.io/badge/Date-08th_Sept-purple)

| Smart Contract Address | [0x40C2ccF8f8BfC1915F57CE84052cfFe45C06f253](https://sepolia.etherscan.io/address/0x40C2ccF8f8BfC1915F57CE84052cfFe45C06f253) |
|:----------------------:|:-------------------------------------:|
| Store Value      | [0x248abd8af8f22363d031d8ee8e5a170b9ff4d109acf194e29f9f45034ec32e59](https://sepolia.etherscan.io/tx/0x248abd8af8f22363d031d8ee8e5a170b9ff4d109acf194e29f9f45034ec32e59) |
| Store Value      | [0x0df6f5060e5d23d65794c2099b9083b1ec49677d221d13b1f0a1105bfc142528](https://sepolia.etherscan.io/tx/0x0df6f5060e5d23d65794c2099b9083b1ec49677d221d13b1f0a1105bfc142528) |


### Lab - More about Solidity
![](https://img.shields.io/badge/Date-15th_Sept-purple)

| Smart Contract Address | [0x476e122708962c6ee47b0b23684a6eebc8b9e58c](https://sepolia.etherscan.io/tx/0x3b179cb42bde5e4cf70ebd5ac444fe17e95c0b8692b8ae3d667fabdb30c786f5) |
|:----------------------:|:-------------------------------------:|
| Store Value      | [0x3b179cb42bde5e4cf70ebd5ac444fe17e95c0b8692b8ae3d667fabdb30c786f5](https://sepolia.etherscan.io/tx/0x3b179cb42bde5e4cf70ebd5ac444fe17e95c0b8692b8ae3d667fabdb30c786f5) |


### Lab - Mapping in Solidity

| Smart Contract Address | [0x34a3630a8cff7e200ff39009c971f67fa7b6b2a4](https://sepolia.etherscan.io/tx/0xc4676e3ad0d517f5202d377a4ba24c7e51b0af0822a3b7d9a7633a5a9854b551) |
|:----------------------:|:-------------------------------------:|
| Store Value      | [0xf60d20699c06a7deca50d20cd1de42fd05354a0753b3b1e02a76b595b79540a4](https://sepolia.etherscan.io/tx/0xf60d20699c06a7deca50d20cd1de42fd05354a0753b3b1e02a76b595b79540a4) |

Code :

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract StudentRecords {
        struct Student {
            string name;
            uint256 rollNo;
            string place;
            string college;
            uint256 number;
        }

    mapping(uint256 => Student) public students;

    function addStudent(
        uint256 _rollNo,
        string memory _name,
        string memory _place,
        string memory _college,
        uint256 _number
    ) public {
        students[_rollNo] = Student({
            name: _name,
            rollNo: _rollNo,
            place: _place,
            college: _college,
            number: _number
        });
    }

    function getStudent(uint256 _rollNo)
        public
        view
        returns (Student memory)
    {
        return students[_rollNo];
    }
    }




