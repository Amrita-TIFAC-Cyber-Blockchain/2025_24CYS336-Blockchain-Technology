<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## ASSIGNMENTS - CB.EN.U4ECE23238

![NAME - RAHUL KRISHNA J](https://img.shields.io/badge/NAME-RAHUL%20KRISHNA%20J-blue)  
![ROLL NO - CB.EN.U4ECE23238](https://img.shields.io/badge/ROLL--NO-CB.EN.U4ECE23238-blue)

| WALLET ADDRESS ACCOUNT 1 | [0x120837dB0c8E662875082055eB2195baB5B66c0E](https://sepolia.etherscan.io/address/0x120837dB0c8E662875082055eB2195baB5B66c0E) | 
|:------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------:|
| WALLET ADDRESS ACCOUNT 2 | [0xAc4336fa91E6b2B849115C0C5F9F0A37C47594d7](https://sepolia.etherscan.io/address/0xAc4336fa91E6b2B849115C0C5F9F0A37C47594d7) | 


---

### LAB 6 - INTRODUCTION TO REMIX IDE AND SOLIDITY PROGRAMMING  
![DATE](https://img.shields.io/badge/DATE-08--09--2025-green) <br/>

| Smart Contract Address | [0x901eb257c7fc9a736328d3b3b12439f2dba557b8](https://sepolia.etherscan.io/address/0x901eb257c7fc9a736328d3b3b12439f2dba557b8) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash       | [0x28dcbf43e5924f6cd4b89c8c1819f63a67367ac6e27b7ab6f43a80bcfd758d24](https://sepolia.etherscan.io/tx/0x28dcbf43e5924f6cd4b89c8c1819f63a67367ac6e27b7ab6f43a80bcfd758d24) |
| Block                  | 9158127 |
| Timestamp              | Sep-08-2025 05:53:24 AM UTC |
| Value                  | 0 ETH |
| Transaction Fee         | 0.000176753602086959 ETH |
| Gas Price               | 1.501946773 Gwei |

---

![DATE](https://img.shields.io/badge/DATE-15--09--2025-green) <br/>

| Smart Contract Address | [0xC5f8992f04222C9418b40C4516ef34a0a08E4eE4](https://sepolia.etherscan.io/address/0xC5f8992f04222C9418b40C4516ef34a0a08E4eE4) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash       | [0x806f45f6add2bab13f862be52ed519081829cc353f0f03e3e6ab89c815b59a91](https://sepolia.etherscan.io/tx/0x806f45f6add2bab13f862be52ed519081829cc353f0f03e3e6ab89c815b59a91) |
| Block                  | 9206976 |
| Timestamp              | Sep-15-2025 06:52:12 AM UTC |
| Value                  | 0 ETH |
| Transaction Fee         | 0.001712882708570124 ETH |
| Gas Price               | 1.500085132 Gwei |

---

![DATE](https://img.shields.io/badge/DATE-29--09--2025-green) <br/>

| Smart Contract Address | [0xBed5A4096b4Cf32b211898f03f9838583E98562b](https://sepolia.etherscan.io/address/0xbed5a4096b4cf32b211898f03f9838583e98562b) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash       | [0xd14f49c279233a7c25c06ae018ace2d945f51b48def42abe7467bd35e759273e](https://sepolia.etherscan.io/tx/0xd14f49c279233a7c25c06ae018ace2d945f51b48def42abe7467bd35e759273e) |
| Block                  | 9303497 |
| Timestamp              | Sep-29-2025 06:07:00 AM UTC |
| Value                  | 0 ETH |
| Transaction Fee         | 0.000470710503451877 ETH |
| Gas Price               | 1.500000011 Gwei |

---

![DATE](https://img.shields.io/badge/DATE-29--09--2025-green) <br/>

| Smart Contract Address | [0x3d0593aa2b88d507f2c14e50a9fb4258c0be0c88](https://sepolia.etherscan.io/address/0x3d0593aa2b88d507f2c14e50a9fb4258c0be0c88) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash       | [0xa7fd7df0ea14aae323e735a2a87759131530d9a1fa7de6fe0378ee32df8a89c3](https://sepolia.etherscan.io/tx/0xa7fd7df0ea14aae323e735a2a87759131530d9a1fa7de6fe0378ee32df8a89c3) |
| Block                  | 9303500 |
| Timestamp              | Sep-29-2025 06:07:36 AM UTC |
| Value                  | 0 ETH |
| Transaction Fee         | 0.000470710503451877 ETH |
| Gas Price               | 1.500000011 Gwei |
---

---------------------------------------------------------------------------------------------------------------
![DATE](https://img.shields.io/badge/DATE-29--09--2025-green) <br/>

<h2>LAB 6 - STORAGE SMART CONTRACT</h2>

<h3>🧠 SMART CONTRACT PROGRAM USING SOLIDITY</h3>

<p style="font-size:15px;">
This Solidity smart contract enables <b>certificate issuance and verification</b> on the Ethereum blockchain.  
Only the <b>Issuer</b> can issue certificates, and anyone can verify their authenticity using a unique certificate ID (<code>certId</code>).
</p>

<hr>

<h3>⚙️SOLIDITY CODE </h3>

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract CertificateRegistry {

    struct Certificate {
        string studentName;
        string course;
        string grade;
        string ipfsHash;
        uint256 issuedOn;
    }

    mapping(address => Certificate) studentCertificates;

    Certificate c;

    // -------------------- Roles --------------------
    address admin;
    address institution1;
    address institution2;

    constructor() {
        // Fixed Admin address
        admin = 0xe71ABd7cB0c19f7A8A821E7D977a2742874fD635 ;

        // Predefined Institutions
        institution1 = 0x120837dB0c8E662875082055eB2195baB5B66c0E;
        institution2 = 0x80217b294D7a2D0902484783c61fda5A1EFc7bff;
    }

    // -------------------- Modifiers --------------------
    modifier isAdmin() {
        require(msg.sender == admin, "Only Admin can call this function");
        _;
    }

    modifier isInstitution() {
        require(msg.sender == institution1 || msg.sender == institution2, "Only Institution can call this function");
        _;
    }

    // -------------------- Admin Functions --------------------
    function addInstitution1(address _instAddress) public isAdmin {
        institution1 = _instAddress;
    }

    function addInstitution2(address _instAddress) public isAdmin {
        institution2 = _instAddress;
    }

    // -------------------- Institution Functions --------------------
    function issueCertificate(
        address _student,
        string memory _studentName,
        string memory _course,
        string memory _grade,
        string memory _ipfsHash
    ) public isInstitution {
        c.studentName = _studentName;
        c.course = _course;
        c.grade = _grade;
        c.ipfsHash = _ipfsHash;
        c.issuedOn = block.timestamp;

        studentCertificates[_student] = c;
    }

    // -------------------- Student / Public Functions --------------------
    function getCertificate(address _student) public view returns (string memory, string memory, string memory, string memory, uint256) {
        Certificate memory c1 = studentCertificates[_student];
        return (c1.studentName, c1.course, c1.grade, c1.ipfsHash, c1.issuedOn);
    }

    function verifyCertificate(address _student, string memory _ipfsHash) public view returns (bool) {
        Certificate memory c1 = studentCertificates[_student];
        if (keccak256(abi.encodePacked(c1.ipfsHash)) == keccak256(abi.encodePacked(_ipfsHash))) {
            return true;
        } else {
            return false;
        }
    }

}
-----------------------------------------
NOTE :OUTPUTS ARE IN FOLDER NAMED IMAGES
-----------------------------------------
```
------------------------------------------------------------------------------------------------------------------------------------------

![DATE](https://img.shields.io/badge/DATE-07--10--2025-green) <br/>

| Smart Contract Address | [0xe324cc3225ba4f49b7270ac4d2b7a690b559b695](https://sepolia.etherscan.io/address/0xe324cc3225ba4f49b7270ac4d2b7a690b559b695) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash       | [0x28bb626de5273f858fd7e03bb6d933ab61b4661ec989d61f441531b563472e27](https://sepolia.etherscan.io/tx/0x28bb626de5273f858fd7e03bb6d933ab61b4661ec989d61f441531b563472e27) |
| Block                  | 9362848 |
| Timestamp              | Oct-07-2025 04:05:48 PM UTC |
| Value                  | 0 ETH |
| Transaction Fee         | 0.000470723158032959 ETH |
| Gas Price               | 1.500040337 Gwei |

------------------------------------------------------------------------------------------------------------------------------------------

![DATE](https://img.shields.io/badge/DATE-17--10--2025-green) <br/>

| Transaction Hash [REFER ADMIN IMAGE]     | [0xe71ABd7cB0c19f7A8A821E7D977a2742874fD635](https://sepolia.etherscan.io/address/0xe71ABd7cB0c19f7A8A821E7D977a2742874fD635) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash [REFER INSTITUTE IMAGE]     | [0x80217b294D7a2D0902484783c61fda5A1EFc7bff](https://sepolia.etherscan.io/address/0x80217b294D7a2D0902484783c61fda5A1EFc7bff) |
---
<sub>
<img width="332" height="156" alt="image" src="https://github.com/user-attachments/assets/7edde9c7-3a84-405d-b396-9bb871d5189d" />
The above image represents the accounts created for INSTITUTE AND ADMIN RESPECTIVELY.</sub>

<sub>
<img width="258" height="363" alt="image" src="https://github.com/user-attachments/assets/917f1ba0-9ad5-4f54-b6bf-e975221b6aa1" />
Above image represents the accounts [Account 1 , Account 2 , INSTITUTE Account , ADMIN Account] added to REMIX IDE.</sub>

<sub>
<img width="591" height="159" alt="image" src="https://github.com/user-attachments/assets/76a95de6-938d-4f0f-b3da-00a0977ae0ff" />
The constructer in code represents the Account Address connected to METAMASK.</sub>

---
<sub>
The Transactions done on 17-10-2025 were based on LAB2 QUESTIONS ON SOLIDITY (@Lab6.md), for certificate issuance in which the Admin account only has the authority to add institutions, and institutions have permission to add students or issue the certificate of the student. If any other accounts are used for the ADMIN or INSTITUTE transactions respectively, the transaction will be reverted and a display message will be printed stating the authority of respective accounts. The verification of certificate can be called by any account.
</sub>


---













