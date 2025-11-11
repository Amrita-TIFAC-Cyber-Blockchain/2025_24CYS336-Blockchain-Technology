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

### Lab - IPFS

IPFS initialisation:
```
PS C:\Users\Ragulraj> ipfs init
generating ED25519 keypair...done
peer identity: 12D3KooWCJhfLgMLUykgjB8n45L14RoqxRgCQNU9hdm5ge58N9cB
initializing IPFS node at C:\Users\Tarun\.ipfs
```

Adding a file:
```
PS C:\Users\Ragulraj\Apps\kubo_v0.38.0\kubo> ipfs add build-log
added QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m build-log
 1.24 KiB / 1.24 KiB [========================================================================================] 100.00%
```
Opening a file:
```
PS C:\Users\Ragulraj\Apps\kubo_v0.38.0\kubo> ipfs cat QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m
----------

NOTICE:

You have tried to upgrade to asdf 0.16.0 or newer. Versions 0.16.0 is a
complete rewrite of asdf in Go. This text is being printed by the older
Bash implementation. If you are seeing this you have not migrated to
asdf 0.16.0. Please follow the instructions on the upgrade guide to
migrate to the new version......
```

Downloading IPFS object:
```
PS C:\Users\Ragulraj\Apps\kubo_v0.38.0\kubo> ipfs get QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m
Saving file(s) to QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m
 1.24 KiB / 1.24 KiB [=====================================================================================] 100.00% 0s
```

Block distribution of the file:
```
PS C:\Users\Ragulraj\Apps\kubo_v0.38.0\kubo> ipfs dag stat QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m

CID                                             Blocks          Size
QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m  1               1281

Summary
Total Size: 1281
Unique Blocks: 1
Shared Size: 0
Ratio: 1.000000
```

Block distribution of a bigger file(Failed):
```
PS C:\Users\Ragulraj\Apps\kubo_v0.38.0\kubo> ipfs add "D:\Kali Linux.vdi"
 7.32 GiB / 17.43 GiB [=================================>----------------------------------------------]  42.02% 03m04sError: committing batch to datastore at /blocks: rename C:\Users\Ragulraj\.ipfs\blocks\.temp\temp-997130360 C:\Users\Tarun\.ipfs\blocks\GL\CIQEN7ZAMXHWLAMRCCJHHQOKQDLMQETY4LRA5YUC7BGSWRK3SCV7GLY.data: Operation did not complete successfully because the file contains a virus or potentially unwanted software.
```
Block distribution of a bigger file:
```
PS C:\Users\Ragulraj\Apps\kubo_v0.38.0\kubo> ipfs add "D:\royal-enfield-hunter-350-technical-specifications.pdf"
added QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt royal-enfield-hunter-350-technical-specifications.pdf
 11.90 MiB / 11.90 MiB [======================================================================================] 100.00%
PS C:\Users\Ragulraj\Apps\kubo_v0.38.0\kubo> ipfs dag stat QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 2314, NumBlocks: 1
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 264472, NumBlocks: 2
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 526630, NumBlocks: 3
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 788788, NumBlocks: 4
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 1050946, NumBlocks: 5
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 1313104, NumBlocks: 6
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 1575262, NumBlocks: 7
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 1837420, NumBlocks: 8
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 2099578, NumBlocks: 9
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 2361736, NumBlocks: 10
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 2623894, NumBlocks: 11
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 2886052, NumBlocks: 12
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 3148210, NumBlocks: 13
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 3410368, NumBlocks: 14
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 3672526, NumBlocks: 15
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 3934684, NumBlocks: 16
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 4196842, NumBlocks: 17
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 4459000, NumBlocks: 18
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 4721158, NumBlocks: 19
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 4983316, NumBlocks: 20
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 5245474, NumBlocks: 21
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 5507632, NumBlocks: 22
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 5769790, NumBlocks: 23
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 6031948, NumBlocks: 24
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 6294106, NumBlocks: 25
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 6556264, NumBlocks: 26
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 6818422, NumBlocks: 27
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 7080580, NumBlocks: 28
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 7342738, NumBlocks: 29
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 7604896, NumBlocks: 30
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 7867054, NumBlocks: 31
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 8129212, NumBlocks: 32
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 8391370, NumBlocks: 33
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 8653528, NumBlocks: 34
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 8915686, NumBlocks: 35
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 9177844, NumBlocks: 36
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 9440002, NumBlocks: 37
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 9702160, NumBlocks: 38
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 10226476, NumBlocks: 40
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 10226476, NumBlocks: 40
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 10488634, NumBlocks: 41
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 10750792, NumBlocks: 42
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 11012950, NumBlocks: 43
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 11275108, NumBlocks: 44
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 11537266, NumBlocks: 45
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 11799424, NumBlocks: 46
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 12061582, NumBlocks: 47
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 12323740, NumBlocks: 48

CID                                             Blocks          Size
QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt  49              12478798

Summary
Total Size: 12478798
Unique Blocks: 49
Shared Size: 0
Ratio: 1.000000

```


### Practise

| Admin Adding Institution   | [0x86bd5b58626c88bf50b7d1ea32f337f72fc41f9176a62838e317b318d800c4ed]
(https://sepolia.etherscan.io/tx/0x86bd5b58626c88bf50b7d1ea32f337f72fc41f9176a62838e317b318d800c4ed)| 

| Institution adding certificates   | [0x69270111fa830441477e7286ac52a9a885841412cffc8949fe3c413156b0537c]
(https://sepolia.etherscan.io/tx/0x69270111fa830441477e7286ac52a9a885841412cffc8949fe3c413156b0537c)| 

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



