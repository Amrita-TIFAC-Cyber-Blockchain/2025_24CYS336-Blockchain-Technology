// SPDX-License-Identifier: GPL 3.0

pragma solidity >=0.8.0 <0.9.2;

contract cert_registry{
    struct Certificate{
        string studentName;
        string course;
        string grade;
        string issuedOn;
    }

    string instName;
    Certificate cr;
    mapping(address => Certificate) studentCertificates;

    address admin;
    address instAddress;

    modifier isAdmin() {
        require(msg.sender == admin, 'Caller is not admin');
        _;
    }

    modifier isInstitution() {
        require(msg.sender == instAddress, 'Only by Institution');
        _;
    }
    constructor(){
        admin = msg.sender;
        instAddress = 0x63056E3DCcB4d15a246FF3f387cc342e29fa3176;
    }

    function addInstitution(
        address add,
        string memory insName
    ) public isAdmin{
        instAddress = add;
        instName = insName; 
    }

    function issueCertificate(
        address student,
        string memory name,
        string memory _course,
        string memory _grade,
        string memory _id
    ) public isInstitution{
        cr.studentName = name;
        cr.course = _course;
        cr.grade = _grade;
        cr.issuedOn = _id;
        studentCertificates[student] = cr;
    }

    function getCertificates(address student) public view returns   
    (string memory, string memory, string memory, string memory) {
        Certificate memory cert = studentCertificates[student];
        return (cert.studentName, cert.course, cert.grade, cr.issuedOn);
    }
}