<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments
![NAME - VIYAS_K](https://img.shields.io/badge/NAME-VIYAS%20K%20-blue)  
![ROLLNO - CB.EN.U4ECE23254](https://img.shields.io/badge/ROLL.NO.-CB.EN.U4ECE232354-blue)

| Wallet Address | [0x805bd66EEa33108150c49eF8d33AE40dd2Faa945](https://sepolia.etherscan.io/address/0x805bd66eea33108150c49ef8d33ae40dd2faa945) | 
|:--------------:|:-----------------------------:|

---

### LAB 6 - INTRODUCTION TO REMIX IDE AND SOLIDITY PROGRAMMING  
![DATE](https://img.shields.io/badge/DATE-08/09/2025-red) <br/>

| Smart Contract Address |[0xd0BF98c57e7183C7f153182531254A0177CC320A](https://sepolia.etherscan.io/address/0xd0bf98c57e7183c7f153182531254a0177cc320a) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash       | [0xa274d49c70b4f46593bc13297e7571e697a8ad4b03df00cc497be87e87498b7d](https://sepolia.etherscan.io/tx/0xa274d49c70b4f46593bc13297e7571e697a8ad4b03df00cc497be87e87498b7d) |
| Status                 | Success |
| Block                  | 9206350 |
| Timestamp              | Sep-15-2025 04:38:00 AM UTC |
| Value                  | 0 ETH |
| Transaction Fee         | 0.000065580684596758 ETH |
| Gas Price               | 1.500084281 Gwei |

---
![DATE](https://img.shields.io/badge/DATE-17/10/2025-red) <br/>

| Smart Contract Address |[0xc20f07Ea69fB4256742095529Dcce85Af109CaAe](https://sepolia.etherscan.io/address/0xc20f07Ea69fB4256742095529Dcce85Af109CaAe) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash       | [0xc90dadf6d8fa19f86e91a77d4f0ecc1b0b58ba67dcefd44a4cab31446ca4bf93](https://sepolia.etherscan.io/tx/0xc90dadf6d8fa19f86e91a77d4f0ecc1b0b58ba67dcefd44a4cab31446ca4bf93) |
| Status                 | Success |
| Block                  | 9428951 |
| Timestamp              | Oct-17-2025 05:16:00 AM UTC |
| Value                  | 0 ETH |
| Transaction Fee         | 0.001611909009671454 ETH |
| Gas Price               | 1.500000009 Gwei |

---
![DATE](https://img.shields.io/badge/DATE-17/10/2025-red) <br/>

| Smart Contract Address |[0xebE14A6D30865003968450192dAd4444C30Ca0b3](https://sepolia.etherscan.io/address/0xebE14A6D30865003968450192dAd4444C30Ca0b3) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash       | [0x4b544d0c08fe79e8159eb0a927d145d043ebff92a033045d5f33bd57b400136a](https://sepolia.etherscan.io/tx/0x4b544d0c08fe79e8159eb0a927d145d043ebff92a033045d5f33bd57b400136a) |
| Status                 | Success |
| Block                  | 9428979 |
| Timestamp              | Oct-17-2025 05:21:36 AM UTC |
| Value                  | 0 ETH |
| Transaction Fee         | 0.001611909009671454 ETH |
| Gas Price               | 1.500000009 Gwei |

---
### LAB - Certificate Registry with IPFS Hash using SOLIDITY

Smart Contract Code :

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {

    
    address public admin;

    
    struct Certificate {
        string studentName;
        string course;
        string grade;
        string ipfsHash;
        uint256 issuedOn;
        address issuedBy;
    }

    
    mapping(address => bool) public isInstitution;
    mapping(address => bool) public isStudent;

    
    mapping(address => Certificate[]) private studentCertificates;

    
    constructor() {
        admin = msg.sender;
    }

    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can do this");
        _;
    }

    
    modifier onlyInstitution() {
        require(isInstitution[msg.sender], "Only institution can do this");
        _;
    }

    
    function addInstitution(address instAddress) public onlyAdmin {
        require(instAddress != address(0), "Invalid address");
        isInstitution[instAddress] = true;
    }


    function registerStudent(address student) public onlyInstitution {
        require(student != address(0), "Invalid student address");
        isStudent[student] = true;
    }

    
    function issueCertificate(
        address student,
        string memory name,
        string memory course,
        string memory grade,
        string memory ipfsHash
    ) public onlyInstitution {
        require(student != address(0), "Invalid student address");
        require(bytes(ipfsHash).length > 0, "IPFS hash required");

        Certificate memory cert = Certificate({
            studentName: name,
            course: course,
            grade: grade,
            ipfsHash: ipfsHash,
            issuedOn: block.timestamp,
            issuedBy: msg.sender
        });

        studentCertificates[student].push(cert);
    }

    
    function getCertificates(address student) public view returns (Certificate[] memory) {
        return studentCertificates[student];
    }

    
    function verifyCertificate(address student, string memory ipfsHash) public view returns (bool) {
        Certificate[] memory certList = studentCertificates[student];
        for (uint i = 0; i < certList.length; i++) {
            if (keccak256(bytes(certList[i].ipfsHash)) == keccak256(bytes(ipfsHash))) {
                return true;
            }
        }
        return false;
    }
}
```
---
#### Accounts used for this Contract :

| Name | Address |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Contract Deployer | [0x3a5344c3084bd5ebe99bdb253ed55b702ff08846](https://sepolia.etherscan.io/address/0x3a5344c3084bd5ebe99bdb253ed55b702ff08846) |
| Admin | [0x72d0a1000e49e0137ab7863348703d4cda5c82f8](https://sepolia.etherscan.io/address/0x72d0a1000e49e0137ab7863348703d4cda5c82f8) |
| Student | [0x84c536eaeac921890229f3029aa3f2d01586366b](https://sepolia.etherscan.io/address/0x84c536eaeac921890229f3029aa3f2d01586366b) |
---
#### Generating IPFS Hash Value for the Certificate : <br/> <br/> <img width="1057" height="379" alt="Screenshot 2025-11-10 at 9 25 37 AM" src="https://github.com/user-attachments/assets/9ca09de9-ca52-47cd-bacd-2c850cf1a400" />

#### Initializing the Parameters using appropriate Owner and Admin Addresses :<br/> <br/> <img width="266" height="501" alt="Screenshot 2025-11-10 at 9 06 49 AM" src="https://github.com/user-attachments/assets/7c3d2e3c-7cc6-4723-84f5-fcb01585f885" />

#### Transaction Hashes for the above actions :

| Transaction Hash  1     |[0x937569646dfb506060d785d22df26af87c17c28433e1a4ac50011194cf90b9da](https://sepolia.etherscan.io/tx/0x937569646dfb506060d785d22df26af87c17c28433e1a4ac50011194cf90b9da) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash  2     |[0x49bb7d594de888083340e3e013dfb13f3d93bc2b7c6cf014a591807fe51570e8](https://sepolia.etherscan.io/tx/0x49bb7d594de888083340e3e013dfb13f3d93bc2b7c6cf014a591807fe51570e8) |
| Transaction Hash  3     |[0xeb86f0fbb22a78f1d8b30d442341df865416fa5fbb96882427bed1f6a2f0d8b1](https://sepolia.etherscan.io/tx/0xeb86f0fbb22a78f1d8b30d442341df865416fa5fbb96882427bed1f6a2f0d8b1) |


#### Crosscheck and Retrive the Stored values  : <br/> <br/> <img width="1087" height="713" alt="Screenshot 2025-11-10 at 9 31 15 AM" src="https://github.com/user-attachments/assets/70367340-8538-42f4-8328-826261742c58" />







