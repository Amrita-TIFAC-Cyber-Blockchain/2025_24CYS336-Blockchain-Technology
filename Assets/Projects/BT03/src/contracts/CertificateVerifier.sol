// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CertificateVerifier
 * @dev A smart contract for managing and verifying educational certificates.
 * It features Admin (deployer) and User (any other address) roles with access control.
 */
contract CertificateVerifier {

    // --- State Variables ---

    // Struct to hold certificate data.
    struct Certificate {
        uint256 id;
        string recipientName;
        string courseName;
	string ipfsHash;
        uint256 issueDate; // Unix timestamp
        address issuerAddress; // Address of the entity that issued it (e.g., University contract)
        bool exists; // To check if a certificate is truly active/set
    }

    // Mapping to store certificates: Certificate ID (unique) => Certificate struct.
    mapping(uint256 => Certificate) public certificates;
    
    // Counter for generating unique certificate IDs.
    uint256 public nextCertificateId = 1001;

    // The address that deploys the contract is automatically the Admin.
    address public admin;

    // --- Events ---

    // Events for logging actions, crucial for frontend indexing and low-cost notifications.
    event CertificateCreated(
        uint256 indexed id,
        string recipientName,
        string courseName,
        address indexed issuer,
	string ipfsHash
    );
    event CertificateUpdated(
        uint256 indexed id,
        string newCourseName,
        uint256 newIssueDate
    );
    event CertificateDeleted(uint256 indexed id);

    // --- Modifiers ---

    /**
     * @dev Restricts access to functions to only the contract deployer (Admin).
     */
    modifier onlyAdmin() {
        // Gas optimization: use require with a short error string
        require(msg.sender == admin, "CV: Not Admin");
        _;
    }

    /**
     * @dev Restricts access to functions to any address that is NOT the Admin.
     * Useful for general read/verify functions that anyone can call.
     */
    modifier onlyUser() {
        require(msg.sender != admin, "CV: Admin cannot use this user function");
        _;
    }

    // --- Constructor ---

    /**
     * @dev Sets the deployer as the Admin.
     */
    constructor() {
        admin = msg.sender;
    }

    // --- Functionalities (CRUD) ---

    /**
     * @notice Creates a new certificate record.
     * @dev Only the Admin can create new records. The ID is auto-incremented.
     * @param _recipientName The name of the certificate recipient.
     * @param _courseName The name of the course.
     * @param _issueDate The issue date (Unix timestamp).
     * @param _issuerAddress The address of the issuing entity.
     */
    function createCertificate(
        string memory _recipientName,
        string memory _courseName,
        uint256 _issueDate,
        address _issuerAddress,
	string memory _ipfsHash
    ) public onlyAdmin {
        // Gas optimization: Cache storage variable
        uint256 newId = nextCertificateId; 

        // Check if the recipient name or course name is empty (basic validation)
        require(bytes(_recipientName).length > 0, "CV: Recipient name cannot be empty");
        require(bytes(_courseName).length > 0, "CV: Course name cannot be empty");
        
        certificates[newId] = Certificate({
            id: newId,
            recipientName: _recipientName,
            courseName: _courseName,
            issueDate: _issueDate,
            issuerAddress: _issuerAddress,
	    ipfsHash: _ipfsHash,
            exists: true
        });

        // Increment ID for the next certificate
        nextCertificateId++;

        // Emit event
        emit CertificateCreated(newId, _recipientName, _courseName, _issuerAddress,_ipfsHash);
    }

    /**
     * @notice Reads a certificate record by its ID.
     * @dev Anyone (Admin or User) can view a certificate.
     * @param _id The unique ID of the certificate.
     * @return Certificate struct details.
     */
    function readCertificate(uint256 _id) 
        public 
        view 
        returns (
            uint256,
            string memory,
            string memory,
            uint256,
            address,
	    string memory,
            bool
        ) 
    {
        // Require that the certificate exists before returning
        require(certificates[_id].exists, "CV: Certificate does not exist");
        
        // Return individual fields for better frontend/ABI handling
        Certificate storage cert = certificates[_id];
        return (
            cert.id,
            cert.recipientName,
            cert.courseName,
            cert.issueDate,
            cert.issuerAddress,
	    cert.ipfsHash,
            cert.exists
        );
    }

    /**
     * @notice Updates the course name and issue date for an existing certificate.
     * @dev Only the Admin can modify records.
     * @param _id The unique ID of the certificate to update.
     * @param _newCourseName The new course name.
     * @param _newIssueDate The new issue date.
     */
    function updateCertificate(
        uint256 _id,
        string memory _newCourseName,
        uint256 _newIssueDate
    ) public onlyAdmin {
        // Gas optimization: Cache the certificate in storage
        Certificate storage cert = certificates[_id];

        // Ensure the record exists before updating
        require(cert.exists, "CV: Certificate does not exist");

        // Update fields
        cert.courseName = _newCourseName;
        cert.issueDate = _newIssueDate;

        // Emit event
        emit CertificateUpdated(_id, _newCourseName, _newIssueDate);
    }

    /**
     * @notice Deletes a certificate record by setting its 'exists' flag to false.
     * @dev Only the Admin can delete records. This is a 'soft delete' to preserve history/ID count.
     * Setting 'exists' to false is cheaper than deleting the whole struct (solidity slot clearing).
     * @param _id The unique ID of the certificate to delete.
     */
    function deleteCertificate(uint256 _id) public onlyAdmin {
        Certificate storage cert = certificates[_id];
        
        // Ensure the record exists before deleting
        require(cert.exists, "CV: Certificate does not exist");
        
        // Soft delete: Mark as not existing
        cert.exists = false;
        
        // Emit event
        emit CertificateDeleted(_id);
    }

    // --- Helper Read Functions ---

    /**
     * @notice Returns the Admin address.
     */
    function getAdmin() public view returns (address) {
        return admin;
    }

    /**
     * @notice Returns the next available certificate ID.
     */
    function getNextId() public view returns (uint256) {
        return nextCertificateId;
    }
}
