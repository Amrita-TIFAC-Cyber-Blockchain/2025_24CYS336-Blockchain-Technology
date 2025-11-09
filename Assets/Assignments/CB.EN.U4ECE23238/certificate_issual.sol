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
