// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
UniVeritas
Roles: Dean, HOD, Coordinator, Registrar, Student

Dean: 0xba760f1119fce562098bbc0616fed1006b6c4bfc
Registrar: 0xeba3cfd5c26e91e087b3b8dbbef57ed1dbc72383
HOD - CCE: 0x4efea71b0640c499885ebfae8a34418a7982e454
Coordinator - CCE: 0x64e9857a789d6719c156b420dc355d9b0c9d8400
Student - CCE: 0x6481514b61b4e4ea258c2027e0d768865c383386
Employer: 0xd4ed8886073f5cfab223992c3b4a538c632f15e2
*/

contract AcademicRecordSystem {

    enum CertificateStatus { NotIssued, Issued, Revoked }

    struct Student {
        string name;
        uint256 rollNumber;
        string department;
        bool registered;
    }

    struct Mark {
        string subject;
        uint8 score;
        bool graded;
    }

    struct Certificate {
        string courseName;
        bytes32 certHash;
        string ipfsHash;
        CertificateStatus status;
    }

    struct Gradesheet {
        string semester;
        string ipfsHash;
        uint256 timestamp;
    }

    struct QuestionPaper {
        string subject;
        string department;
        bytes32 paperHash;
        string ipfsHash;
        uint256 timestamp;
    }

    struct RevocationLog {
        bytes32 certHash;
        address student;
        uint256 revokedAt;
        string reason;
    }

    address public dean;
    address public registrar;

    mapping(string => address) public departmentHODs;
    mapping(string => address) public departmentCoordinators;

    mapping(address => Student) public students;
    mapping(address => Mark[]) public studentMarks;
    mapping(address => Certificate) public certificates;
    mapping(address => Gradesheet[]) public gradesheets;
    mapping(string => QuestionPaper[]) public departmentPapers;

    mapping(bytes32 => bool) public validCertificates;
    RevocationLog[] public revocationLogs;


    modifier onlyDean() {
        require(msg.sender == dean, "Only Dean can perform this action");
        _;
    }

    modifier onlyRegistrar() {
        require(msg.sender == registrar, "Only Registrar can perform this action");
        _;
    }

    modifier onlyHOD(string memory dept) {
        require(msg.sender == departmentHODs[dept], "Only HOD of department");
        _;
    }

    modifier onlyCoordinator(string memory dept) {
        require(msg.sender == departmentCoordinators[dept], "Only Coordinator of department");
        _;
    }

    modifier onlyRegisteredStudent() {
        require(students[msg.sender].registered, "Not a registered student");
        _;
    }


    constructor(address _dean, address _registrar) {
        dean = _dean;
        registrar = _registrar;
    }


    //Role Assignment

    function assignHOD(string memory department, address hodAddr) external onlyDean {
        departmentHODs[department] = hodAddr;
    }

    function assignCoordinator(string memory department, address coordinatorAddr) 
        external 
        onlyHOD(department) 
    {
        departmentCoordinators[department] = coordinatorAddr;
    }

    function changeDean(address newDean) external onlyDean {
        dean = newDean;
    }

    function changeRegistrar(address newRegistrar) external onlyDean {
        registrar = newRegistrar;
    }



    //Student Management

    function registerStudent(
        address _student,
        string memory _name,
        uint256 _rollNumber,
        string memory _department
    ) external onlyCoordinator(_department) {
        require(!students[_student].registered, "Already registered");
        students[_student] = Student(_name, _rollNumber, _department, true);
    }

    function viewMyMarks() external view onlyRegisteredStudent returns (Mark[] memory) {
        return studentMarks[msg.sender];
    }

    function viewMyCertificate() external view onlyRegisteredStudent returns (Certificate memory) {
        return certificates[msg.sender];
    }

    function getGradesheets() external view onlyRegisteredStudent returns (Gradesheet[] memory) {
        return gradesheets[msg.sender];
    }


    
    // Academic Activity Management

    function addCourse(string memory courseName, string memory department) 
        external 
        onlyCoordinator(department) 
    {
        // simple action — no event needed
    }

    function assignMarks(
        address studentAddr,
        string memory subject,
        uint8 score
    ) external onlyHOD(students[studentAddr].department) 
    {
        require(students[studentAddr].registered, "Student not found");
        require(score <= 100, "Invalid score");

        studentMarks[studentAddr].push(Mark(subject, score, true));
    }

    // Approve certificate (Dean or Registrar can approve)
    function issueCertificate(
        address studentAddr,
        string memory courseName,
        string memory ipfsHash
    ) external {
        require(
            msg.sender == dean || msg.sender == registrar,
            "Only Dean or Registrar may issue"
        );
        require(students[studentAddr].registered, "Student not found");

        bytes32 certHash = keccak256(
            abi.encodePacked(studentAddr, courseName, ipfsHash, block.timestamp)
        );

        certificates[studentAddr] = Certificate(
            courseName,
            certHash,
            ipfsHash,
            CertificateStatus.Issued
        );

        validCertificates[certHash] = true;
    }

    function revokeCertificate(address studentAddr, string memory reason) external onlyDean {
        Certificate storage cert = certificates[studentAddr];
        require(cert.status == CertificateStatus.Issued, "Certificate not valid");

        cert.status = CertificateStatus.Revoked;
        validCertificates[cert.certHash] = false;

        revocationLogs.push(
            RevocationLog(cert.certHash, studentAddr, block.timestamp, reason)
        );
    }

    function uploadGradesheet(
        address studentAddr,
        string memory semester,
        string memory ipfsHash
    ) external onlyCoordinator(students[studentAddr].department) 
    {
        require(students[studentAddr].registered, "Student not found");

        gradesheets[studentAddr].push(Gradesheet(semester, ipfsHash, block.timestamp));
    }

    function uploadQuestionPaper(
        string memory department,
        string memory subject,
        string memory ipfsHash
    ) external onlyHOD(department) 
    {
        bytes32 paperHash = keccak256(
            abi.encodePacked(subject, ipfsHash, block.timestamp)
        );

        departmentPapers[department].push(
            QuestionPaper(subject, department, paperHash, ipfsHash, block.timestamp)
        );
    }


    // Employer Verification

    function verifyCertificate(bytes32 certHash) external view returns (bool) {
        return validCertificates[certHash];
    }



    function getStudentInfo(address studentAddr)
        external
        view
        returns (string memory, uint256, string memory, bool)
    {
        Student memory s = students[studentAddr];
        return (s.name, s.rollNumber, s.department, s.registered);
    }

    function getCertificateStatus(address studentAddr)
        external
        view
        returns (CertificateStatus)
    {
        return certificates[studentAddr].status;
    }

    function totalMarks(address studentAddr) external view returns (uint256 total) {
        Mark[] memory marks = studentMarks[studentAddr];
        for (uint i = 0; i < marks.length; i++) {
            total += marks[i].score;
        }
    }

    function getRevocationLogs() external view returns (RevocationLog[] memory) {
        return revocationLogs;
    }
}

