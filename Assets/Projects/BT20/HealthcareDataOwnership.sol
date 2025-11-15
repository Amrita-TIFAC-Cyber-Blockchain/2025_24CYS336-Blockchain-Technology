// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HealthcareDataOwnership {
    address public owner;

    struct MedicalRecord {
        string cid;
        bytes32 fileHash;
        address uploader;
        address patient;
        uint256 timestamp;
    }

    struct Hospital {
        bool isRegistered;
        bool isRevoked;
    }

    struct AccessLog {
        address hospital;
        uint256 timestamp;
    }

    mapping(address => uint256) public recordCount;
    mapping(address => bool) public isPatientRegistered;
    mapping(address => Hospital) public hospitals;
    mapping(address => mapping(uint256 => MedicalRecord)) public records;
    mapping(address => mapping(uint256 => mapping(address => bool))) public accessPermissions;

    mapping(address => mapping(uint256 => uint256)) public accessLogCount;
    mapping(address => mapping(uint256 => mapping(uint256 => AccessLog))) public accessLogs;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }
    modifier onlyRegisteredHospital() {
        require(hospitals[msg.sender].isRegistered, "Hospital not registered");
        require(!hospitals[msg.sender].isRevoked, "Hospital revoked");
        _;
    }
    modifier onlyRegisteredPatient() {
        require(isPatientRegistered[msg.sender], "Patient not registered");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerPatient(address patientAddress) public onlyRegisteredHospital {
        require(!isPatientRegistered[patientAddress], "Already registered");
        isPatientRegistered[patientAddress] = true;
        recordCount[patientAddress] = 0;
    }

    function removePatient(address patientAddress) public onlyRegisteredHospital {
        require(isPatientRegistered[patientAddress], "Not registered");
        isPatientRegistered[patientAddress] = false;
        recordCount[patientAddress] = 0;
    }

    function registerHospital(address hospitalAddress) public onlyOwner {
        require(!hospitals[hospitalAddress].isRegistered, "Already registered");
        hospitals[hospitalAddress].isRegistered = true;
        hospitals[hospitalAddress].isRevoked = false;
    }

    function removeHospital(address hospitalAddress) public onlyOwner {
        require(hospitals[hospitalAddress].isRegistered, "Hospital not registered");
        delete hospitals[hospitalAddress];
    }

    function unrevokeHospital(address hospitalAddress) public onlyOwner {
        require(hospitals[hospitalAddress].isRegistered, "Not registered");
        hospitals[hospitalAddress].isRevoked = false;
    }

    function revokeHospital(address hospitalAddress) public onlyOwner {
        require(hospitals[hospitalAddress].isRegistered, "Not registered");
        hospitals[hospitalAddress].isRevoked = true;
    }

    function uploadRecord(
        address patientAddress,
        string memory cid,
        bytes32 fileHash
    ) public onlyRegisteredHospital {
        require(isPatientRegistered[patientAddress], "Patient not registered");
        uint256 recId = recordCount[patientAddress] + 1;
        recordCount[patientAddress] = recId;
        records[patientAddress][recId] = MedicalRecord(
            cid, fileHash, msg.sender, patientAddress, block.timestamp
        );
        accessPermissions[patientAddress][recId][msg.sender] = true;
    }

    function grantAccess(
        uint256 recordId,
        address hospitalAddress
    ) public onlyRegisteredPatient {
        require(hospitals[hospitalAddress].isRegistered, "Hospital not registered");
        require(recordId > 0 && recordId <= recordCount[msg.sender], "Invalid recordId");
        accessPermissions[msg.sender][recordId][hospitalAddress] = true;
    }

    function revokeAccess(
        uint256 recordId,
        address hospitalAddress
    ) public onlyRegisteredPatient {
        require(recordId > 0 && recordId <= recordCount[msg.sender], "Invalid recordId");
        require(accessPermissions[msg.sender][recordId][hospitalAddress], "Access not granted");
        accessPermissions[msg.sender][recordId][hospitalAddress] = false;
    }

    function hasAccess(
        address patientAddress,
        uint256 recordId
    ) public view onlyRegisteredHospital returns (bool) {
        require(recordId > 0 && recordId <= recordCount[patientAddress], "Invalid recordId");
        return accessPermissions[patientAddress][recordId][msg.sender];
    }

    function getRecordCID(
        address patientAddress,
        uint256 recordId
    ) public view onlyRegisteredHospital returns (string memory) {
        require(hasAccess(patientAddress, recordId), "Access denied");
        return records[patientAddress][recordId].cid;
    }

    function getRecordHash(
        address patientAddress,
        uint256 recordId
    ) public view onlyRegisteredHospital returns (bytes32) {
        require(hasAccess(patientAddress, recordId), "Access denied");
        return records[patientAddress][recordId].fileHash;
    }

    function logAccess(
        address patientAddress,
        uint256 recordId
    ) public onlyRegisteredHospital {
        require(hasAccess(patientAddress, recordId), "Access denied");
        uint256 logIndex = accessLogCount[patientAddress][recordId];
        accessLogs[patientAddress][recordId][logIndex] = AccessLog(msg.sender, block.timestamp);
        accessLogCount[patientAddress][recordId]++;
    }

    function getAccessLogCount(address patientAddress, uint256 recordId) public view returns (uint256) {
        return accessLogCount[patientAddress][recordId];
    }

    function getAccessLogEntry(address patientAddress, uint256 recordId, uint256 index) public view returns (
        address hospital,
        uint256 timestamp
    ) {
        AccessLog storage logEntry = accessLogs[patientAddress][recordId][index];
        return (logEntry.hospital, logEntry.timestamp);
    }
}
