<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## ASSIGNMENTS - CB.EN.U4ECE23238
![RAHUL-KRISHNA-J](https://img.shields.io/badge/NAME-RAHULKRIHSNAJ-blue) <br/>

| WALLET ADDRESS / FROM ADDRESS | [0x120837dB0c8E662875082055eB2195baB5B66c0E](https://sepolia.etherscan.io/address/0x120837dB0c8E662875082055eB2195baB5B66c0E) | 
|:------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------:|

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

![DATE](https://img.shields.io/badge/DATE-07--10--2025-green) <br/>

| Smart Contract Address | [0xe324cc3225ba4f49b7270ac4d2b7a690b559b695](https://sepolia.etherscan.io/address/0xe324cc3225ba4f49b7270ac4d2b7a690b559b695) |
|:----------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|
| Transaction Hash       | [0x28bb626de5273f858fd7e03bb6d933ab61b4661ec989d61f441531b563472e27](https://sepolia.etherscan.io/tx/0x28bb626de5273f858fd7e03bb6d933ab61b4661ec989d61f441531b563472e27) |
| Block                  | 9362848 |
| Timestamp              | Oct-07-2025 04:05:48 PM UTC |
| Value                  | 0 ETH |
| Transaction Fee         | 0.000470723158032959 ETH |
| Gas Price               | 1.500040337 Gwei |

---

---------------------------------------------------------------------------------------------------------------
![DATE](https://img.shields.io/badge/DATE-07--10--2025-green) <br/>

## LAB 7 - CERTIFICATE STORAGE SMART CONTRACT

### 🧠 Smart Contract Description
This Solidity smart contract enables **certificate issuance and verification** on the Ethereum blockchain.  
Only the **owner (issuer)** can issue certificates, and anyone can verify their authenticity using a unique certificate ID (`certId`).

---

### ⚙️ Smart Contract Code
```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

/**
 * @title CertificateStorage
 * @dev Issue & retrieve certificates (owner-restricted issuance)
 */
contract CertificateStorage {

    address public owner;

    // Certificate structure
    struct Certificate {
        string certId;
        string rollNo;
        string recipientName;
        string issuerOrg;
        string issueDate;
        string eventName;
        bool issued;            // explicit flag to indicate existence
    }

    // Mapping certId => Certificate
    mapping(string => Certificate) private certificates;

    // Emitted when a certificate is issued
    event CertificateIssued(
        string indexed certId,
        string rollNo,
        string recipientName,
        string issuerOrg,
        string issueDate,
        string eventName,
        address indexed issuedBy
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Issue a certificate and store on-chain (owner only)
     * @param _certId Certificate ID (unique)
     * @param _rollNo Student roll number
     * @param _recipientName Recipient name
     * @param _issuerOrg Issuing organization name
     * @param _issueDate Date string (e.g., "08-09-2025")
     * @param _eventName Event or course name
     */
    function issueCertificate(
        string memory _certId,
        string memory _rollNo,
        string memory _recipientName,
        string memory _issuerOrg,
        string memory _issueDate,
        string memory _eventName
    ) public onlyOwner {
        require(bytes(_certId).length > 0, "certId required");
        require(!certificates[_certId].issued, "Certificate already issued");

        certificates[_certId] = Certificate({
            certId: _certId,
            rollNo: _rollNo,
            recipientName: _recipientName,
            issuerOrg: _issuerOrg,
            issueDate: _issueDate,
            eventName: _eventName,
            issued: true
        });

        emit CertificateIssued(_certId, _rollNo, _recipientName, _issuerOrg, _issueDate, _eventName, msg.sender);
    }

    /**
     * @dev Retrieve certificate details by ID
     */
    function getCertificate(string memory _certId)
        public
        view
        returns (
            string memory certId,
            string memory rollNo,
            string memory recipientName,
            string memory issuerOrg,
            string memory issueDate,
            string memory eventName,
            bool issued
        )
    {
        Certificate memory cert = certificates[_certId];
        return (
            cert.certId,
            cert.rollNo,
            cert.recipientName,
            cert.issuerOrg,
            cert.issueDate,
            cert.eventName,
            cert.issued
        );
    }

    /**
     * @dev Verify whether a certificate exists (quick check)
     * @param _certId Certificate ID
     * @return true if certificate exists, false otherwise
     */
    function verifyCertificate(string memory _certId) public view returns (bool) {
        return certificates[_certId].issued;
    }

    /**
     * @dev Transfer contract ownership (owner only)
     * @param newOwner new owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "zero address");
        owner = newOwner;
    }
}
