<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - T RAGULRAJ - CB.EN.U4ECE23049
![](https://img.shields.io/badge/Name-YourName-blue) <br/>

| Wallet Address | 0xD00be8030b9f34941f37e0F305cC1Cb9CCbeb9e3 | 
|:--------------:|:-----------------------------:|

### Lab - Introduction to Solidity 

| Smart Contract Address | 0x39Ede4bba9F1a5d0C2D29c22bdB467D97164A0A7 |
|:----------------------:|:-------------------------------------:|
| Transaction Desc.      | https://sepolia.etherscan.io/address/0x39Ede4bba9F1a5d0C2D29c22bdB467D97164A0A7         

### Lab - Solidity - Customised solidity use case programming 

|  Contract Deployment | 0xc1b3558da2b659e94156f8cf9005e33a621f6a7769605c56d711b9fde4e3a1d6 |
|:----------------------:|:-------------------------------------:|
|  Store   | 0x5f39ec6f47b34b60685b483570144da8365115d9cc823c57d035d1aa77b88dfd    |

### Lab - Solidity - Structs 

|  Contract Deployment | 0x15dd8a45b01e2a1d70c9350ed8686455b108b17045b6b754da65ccfdf71d43a7|
|:----------------------:|:-------------------------------------:|
|  Store   | 0x6e14921c7a69ad83f0ccce76a4fc77159322ab63db84d650551bd8e1e85d79dd   |


### Practise

| Admin Adding Institution   | [0x86bd5b58626c88bf50b7d1ea32f337f72fc41f9176a62838e317b318d800c4ed](https://sepolia.etherscan.io/tx/0x86bd5b58626c88bf50b7d1ea32f337f72fc41f9176a62838e317b318d800c4ed)| 
| Institution adding certificates   | [0x69270111fa830441477e7286ac52a9a885841412cffc8949fe3c413156b0537c](https://sepolia.etherscan.io/tx/0x69270111fa830441477e7286ac52a9a885841412cffc8949fe3c413156b0537c)| 

Code:
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

contract CertificateRepository {

    struct Certificate {
        string studentName;
        string course;
        string grade;
        string ipfsHash;
        string issueDate;
    }

    struct Institution {
        address instAddress;
        string instName;
        bool isApproved;
    }

    mapping(address => Certificate) private studentCertificates;
    mapping(address => Institution) private institutions;

    address private admin;

    event InstitutionAdded(address indexed instAddress, string instName);
    event CertificateIssued(address indexed student, string course, string grade);
    event CertificateVerified(address indexed student, bool valid);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Access denied: Only admin");
        _;
    }

    modifier onlyInstitution() {
        require(institutions[msg.sender].isApproved, "Access denied: Not a valid institution");
        _;
    }

    // Add a new institution by the admin
    function addInstitution(address _instAddr, string memory _instName) public onlyAdmin {
        institutions[_instAddr] = Institution(_instAddr, _instName, true);
        emit InstitutionAdded(_instAddr, _instName);
    }

    // Institution issues a certificate to a student
    function issueCertificate(
        address _studentAddr,
        string memory _studentName,
        string memory _course,
        string memory _grade,
        string memory _ipfsHash,
        string memory _issueDate
    ) public onlyInstitution {
        studentCertificates[_studentAddr] = Certificate(
            _studentName,
            _course,
            _grade,
            _ipfsHash,
            _issueDate
        );
        emit CertificateIssued(_studentAddr, _course, _grade);
    }

    // View student certificate
    function getCertificate(address _studentAddr)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        Certificate memory c = studentCertificates[_studentAddr];
        return (c.studentName, c.course, c.grade, c.ipfsHash, c.issueDate);
    }

    // Verify the authenticity of a certificate using IPFS hash
    function verifyCertificate(address _studentAddr, string memory _ipfsHash)
        public
        view
        returns (bool)
    {
        Certificate memory c = studentCertificates[_studentAddr];
        bool valid = (keccak256(abi.encodePacked(c.ipfsHash)) ==
            keccak256(abi.encodePacked(_ipfsHash)));
        return valid;
    }

    // Get institution details
    function getInstitution(address _instAddr)
        public
        view
        returns (string memory, bool)
    {
        Institution memory i = institutions[_instAddr];
        return (i.instName, i.isApproved);
    }

    // Admin can transfer ownership
    function transferAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "Invalid new admin address");
        admin = newAdmin;
    }

    // View current admin
    function getAdmin() public view returns (address) {
        return admin;
    }
}
