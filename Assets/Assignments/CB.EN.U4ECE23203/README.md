<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - <<NAME>>
![](https://img.shields.io/badge/Name-AKILESH-blue) <br/>

[README.md](https://github.com/user-attachments/files/23660424/README.md)
# 📘 Certificate Registry – Solidity Smart Contract

A decentralized certificate issuance and verification system built using **Solidity**.  
This smart contract allows authorized institutions to issue certificates, while students and verifiers can easily retrieve and verify them.

---

## 🚀 Features

### **👨‍💼 Admin**
- Adds or updates authorized institutions.

### **🏫 Institutions**
- Can issue certificates to students.
- Certificates include:
  - Student Name  
  - Course  
  - Grade  
  - IPFS Hash  
  - Timestamp of Issue  

### **🎓 Students**
- Retrieve their certificate details.
- Verify certificate authenticity using the IPFS hash.

---

## 📜 Smart Contract Code

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

    mapping(address => Certificate> studentCertificates;
    Certificate c;

    // -------------------- Roles --------------------
    address admin;
    address institution1;
    address institution2;

    constructor() {
        // Fixed Admin address
        admin = 0xB91857E39Ad4C087b73ddcc307006246a833480d;

        // Predefined Institutions
        institution1 = 0x602288E36BC05d7E719767A548428992BFCb2AE6;
        institution2 = 0x2ef88d3D00B28d355BF7568a01ccC9a334F82362;
    }

    // -------------------- Modifiers --------------------
    modifier isAdmin() {
        require(msg.sender == admin, "Only Admin can call this function");
        _;
    }

    modifier isInstitution() {
        require(
            msg.sender == institution1 || msg.sender == institution2,
            "Only Institution can call this function"
        );
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
    function getCertificate(address _student)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        Certificate memory c1 = studentCertificates[_student];
        return (
            c1.studentName,
            c1.course,
            c1.grade,
            c1.ipfsHash,
            c1.issuedOn
        );
    }

    function verifyCertificate(address _student, string memory _ipfsHash)
        public
        view
        returns (bool)
    {
        Certificate memory c1 = studentCertificates[_student];
        if (
            keccak256(abi.encodePacked(c1.ipfsHash)) ==
            keccak256(abi.encodePacked(_ipfsHash))
        ) {
            return true;
        } else {
            return false;
        }
    }
}
```

---

## 🖼 Remix Execution Screenshots

### **1️⃣ Add Institution 1**
![Add Institution 1](/mnt/data/343025d0-65be-45b7-a89a-86b70158de3d.png)

### **2️⃣ Add Institution 2**
![Add Institution 2](/mnt/data/10a19c08-3851-4b0e-a3e2-5a95146a8715.png)

### **3️⃣ Issue Certificate**
![Issue Certificate](/mnt/data/bdc43c85-2c03-49e9-85cc-bea98c95e242.png)

### **4️⃣ Verify Certificate**
![Verify Certificate](/mnt/data/4468d7ff-fed4-44c4-a1b5-3f8184276747.png)

---





