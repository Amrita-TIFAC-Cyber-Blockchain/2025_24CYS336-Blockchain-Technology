// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

/**
 * @title CertificateRegistry
 * @notice Admin can add institutions. Institutions register students and issue certificates.
 * Certificates include an IPFS hash (CID). Issued certificates are not editable.
 */
contract CertificateRegistry {
    address public owner; // Admin / deployer

    // Roles
    mapping(address => bool) public institutions;         // Approved institutions
    mapping(address => address) public studentToInst;     // Which institution registered a student (0x0 if unregistered)

    // Certificate structure
    struct Certificate {
        string studentName;
        string course;
        string grade;
        string ipfsHash;   // CID returned by IPFS when uploading certificate file
        uint256 issuedOn;  // timestamp
        address issuedBy;  // institution address
    }

    // Store many certificates per student address
    mapping(address => Certificate[]) private studentCertificates;

    // Events
    event InstitutionAdded(address indexed instAddress, string instName, address addedBy);
    event InstitutionRemoved(address indexed instAddress, address removedBy);
    event StudentRegistered(address indexed student, address indexed institution);
    event CertificateIssued(address indexed student, address indexed institution, string ipfsHash);

    // Constructor: deployer is Admin
    constructor() {
        owner = msg.sender;
    }

    /** modifier to provide Admin-only access control **/
    modifier isAdmin() {
        require(msg.sender == owner, "Caller is not Admin");
        _;
    }

    /** modifier to provide Institution-only access control **/
    modifier onlyInstitution() {
        require(institutions[msg.sender], "Caller is not an approved Institution");
        _;
    }

    /**************************************************************************
     * ADMIN FUNCTIONS
     **************************************************************************/

    /**
     * @notice Admin adds a new institution.
     * @param instAddress address of the institution
     * @param instName human readable name (stored in event)
     */
    function addInstitution(address instAddress, string calldata instName) external isAdmin {
        require(instAddress != address(0), "Invalid institution address");
        require(!institutions[instAddress], "Institution already added");

        institutions[instAddress] = true;
        emit InstitutionAdded(instAddress, instName, msg.sender);
    }

    /**
     * @notice Admin removes an institution.
     * @param instAddress address of the institution to remove
     */
    function removeInstitution(address instAddress) external isAdmin {
        require(institutions[instAddress], "Institution not present");
        institutions[instAddress] = false;
        emit InstitutionRemoved(instAddress, msg.sender);
    }

    /**************************************************************************
     * INSTITUTION FUNCTIONS
     **************************************************************************/

    /**
     * @notice Institution registers a student (linking that student to the institution).
     * @param student address of the student wallet
     */
    function registerStudent(address student) external onlyInstitution {
        require(student != address(0), "Invalid student address");
        require(studentToInst[student] == address(0), "Student already registered");
        studentToInst[student] = msg.sender;
        emit StudentRegistered(student, msg.sender);
    }

    /**
     * @notice Institution issues a certificate to `student`.
     * @param student address of the student
     * @param name student's name
     * @param course course name
     * @param grade grade or result (string)
     * @param ipfsHash IPFS CID (hash) of the certificate file (PDF/image)
     */
    function issueCertificate(
        address student,
        string calldata name,
        string calldata course,
        string calldata grade,
        string calldata ipfsHash
    ) external onlyInstitution {
        require(student != address(0), "Invalid student address");
        // Ensure that institution registered that student (precondition)
        require(studentToInst[student] == msg.sender, "Institution did not register this student");

        // Create certificate - immutable once pushed to array
        Certificate memory cert = Certificate({
            studentName: name,
            course: course,
            grade: grade,
            ipfsHash: ipfsHash,
            issuedOn: block.timestamp,
            issuedBy: msg.sender
        });

        studentCertificates[student].push(cert);
        emit CertificateIssued(student, msg.sender, ipfsHash);
    }

    /**************************************************************************
     * VIEW / VERIFICATION FUNCTIONS (public)
     **************************************************************************/

    /**
     * @notice Returns all certificates issued to a student.
     * @param student address of the student
     * @return array of Certificate structs
     */
    function getCertificates(address student) external view returns (Certificate[] memory) {
        return studentCertificates[student];
    }

    /**
     * @notice Verifies whether a given ipfsHash exists among the certificates of a student.
     * @param student student address
     * @param ipfsHash IPFS hash to verify
     * @return true if a certificate with that ipfsHash exists for the student, false otherwise
     */
    function verifyCertificate(address student, string calldata ipfsHash) external view returns (bool) {
        Certificate[] storage certs = studentCertificates[student];
        for (uint256 i = 0; i < certs.length; i++) {
            if (keccak256(bytes(certs[i].ipfsHash)) == keccak256(bytes(ipfsHash))) {
                return true;
            }
        }
        return false;
    }

    /**************************************************************************
     * HELPERS / GETTERS
     **************************************************************************/

    /**
     * @notice Returns whether an address is registered as an Institution
     */
    function isInstitution(address addr) external view returns (bool) {
        return institutions[addr];
    }

    /**
     * @notice Returns the registering institution for a student (0x0 if none)
     */
    function getRegisteringInstitution(address student) external view returns (address) {
        return studentToInst[student];
    }
}
