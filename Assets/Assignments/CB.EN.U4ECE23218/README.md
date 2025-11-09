<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## ASSIGNMENTS - CB.EN.U4ECE23238

![NAME - Gajan S](https://img.shields.io/badge/NAME-Gajan%20S%20J-blue)  
![ROLL NO - CB.EN.U4ECE23218](https://img.shields.io/badge/ROLL--NO-CB.EN.U4ECE23218-blue)

---

### 💼 WALLET ADDRESSES

| ROLE | WALLET ADDRESS | NETWORK | LINK |
|:----:|:---------------|:--------|:-----|
| **Admin** | `0x950Cb5347259130DA8b631952CDC3A364269c280` | Sepolia | [View on Etherscan](https://sepolia.etherscan.io/address/0x950Cb5347259130DA8b631952CDC3A364269c280) |
| **Institution 2** | `0x3434d8C187591FC131295282937a2aD50CB6E3F6` | Sepolia | [View on Etherscan](https://sepolia.etherscan.io/address/0x3434d8C187591FC131295282937a2aD50CB6E3F6) |
| **Student (for testing)** | `0x2D996a60c8EBB5386918CbB4289bAB1754b990F1` | Sepolia | [View on Etherscan](https://sepolia.etherscan.io/address/0x2D996a60c8EBB5386918CbB4289bAB1754b990F1) |

---

### 🧠 LAB 6 - CERTIFICATE REGISTRY SMART CONTRACT

![DATE](https://img.shields.io/badge/DATE-09--11--2025-green)

---

## ⚙ MetaMask Transactions Overview

| ROLE | ACTION | TRANSACTION HASH | BLOCK | TIMESTAMP (UTC) | VALUE | TX FEE (ETH) | GAS PRICE (Gwei) | STATUS |
|:----:|:-------|:-----------------|:------|:----------------|:------|:--------------|:-----------------|:--------|
| **Admin** | Interaction (1) | [0xf65c4730a9405bf3c5e9734a2bc3a744fb3471928f7acda7b56bf85700c0afc6](https://sepolia.etherscan.io/tx/0xf65c4730a9405bf3c5e9734a2bc3a744fb3471928f7acda7b56bf85700c0afc6) | 9592709 | Nov-09-2025 11:59:48 AM | 0 ETH | 0.0000395400031632 | 1.500000012 | ✅ Success |
| **Instituition 1** | Interaction (2) | [0xf9dcd80b5ccf90bc7cf7cbe8203c6dc9107e63e1f4a378a6e08af7c6e5797a2e](https://sepolia.etherscan.io/tx/0xf9dcd80b5ccf90bc7cf7cbe8203c6dc9107e63e1f4a378a6e08af7c6e5797a2e) | 9592712 | Nov-09-2025 12:00:24 PM | 0 ETH | 0.000039474000368424 | 1.500000014 | ✅ Success |
| **Institution 2** | Interaction | [0xb1b3aeeff341d3ad00bedd9eb0feb7148bb856d15512e35d520ffb9f1b36e333](https://sepolia.etherscan.io/tx/0xb1b3aeeff341d3ad00bedd9eb0feb7148bb856d15512e35d520ffb9f1b36e333) | 9592758 | Nov-09-2025 12:11:24 PM | 0 ETH | 0.000522004503132027 | 1.500000009 | ✅ Success |

---

### 🧩 SMART CONTRACT CODE

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
        admin = 0x950Cb5347259130DA8b631952CDC3A364269c280;

        // Predefined Institutions
        institution1 = 0xB29078D74f2FCD6bB53Ba8E86a53492e16279fad;
        institution2 = 0x3434d8C187591FC131295282937a2aD50CB6E3F6;
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




