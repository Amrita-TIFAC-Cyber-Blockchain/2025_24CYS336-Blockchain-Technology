// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalTwinSimple {

    // Structure to store each historical data update of the twin
    struct TwinRecord {
        string dataHash;     // Hash of off-chain stored DT data
        string metaInfo;     // Additional metadata
        uint256 timestamp;   // When the update was made
        address updatedBy;   // Wallet that pushed the update
    }

    // Structure representing a Digital Twin instance
    struct Twin {
        uint256 twinId;          // Unique ID of the twin
        address owner;           // Current owner wallet
        bool exists;             // Whether this twin is registered
        TwinRecord[] records;    // History of all updates
    }

    // Mapping: twinId → Twin details
    mapping(uint256 => Twin) public twins;

    // Events for monitoring and off-chain logging
    event TwinRegistered(uint256 twinId, address owner);
    event TwinDataAdded(uint256 twinId, string dataHash, string metaInfo, address updatedBy, uint256 time);
    event OwnershipTransferred(uint256 twinId, address oldOwner, address newOwner);

    // Modifier: Only allow the owner of a twin to perform certain actions
    modifier onlyOwner(uint256 _twinId) {
        require(twins[_twinId].exists, "Twin not found");
        require(twins[_twinId].owner == msg.sender, "You are not the owner");
        _;
    }

    // Function: Register a new Digital Twin with a unique ID
    function registerTwin(uint256 _twinId) public {
        require(!twins[_twinId].exists, "Twin already exists");
        twins[_twinId].twinId = _twinId;
        twins[_twinId].owner = msg.sender;
        twins[_twinId].exists = true;
        emit TwinRegistered(_twinId, msg.sender);
    }

    // Function: Add a new hashed record of twin data (integrity + timestamp)
    function addTwinData(
        uint256 _twinId,
        string memory _dataHash,
        string memory _metaInfo
    )
        public
        onlyOwner(_twinId)
    {
        Twin storage t = twins[_twinId];

        TwinRecord memory newRecord = TwinRecord({
            dataHash: _dataHash,
            metaInfo: _metaInfo,
            timestamp: block.timestamp,
            updatedBy: msg.sender
        });

        t.records.push(newRecord);

        emit TwinDataAdded(_twinId, _dataHash, _metaInfo, msg.sender, block.timestamp);
    }

    // Function: Transfer the ownership of a digital twin to another wallet
    function transferTwinOwnership(uint256 _twinId, address _newOwner)
        public
        onlyOwner(_twinId)
    {
        require(_newOwner != address(0), "Invalid new owner");

        address oldOwner = twins[_twinId].owner;
        twins[_twinId].owner = _newOwner;

        emit OwnershipTransferred(_twinId, oldOwner, _newOwner);
    }

    // Function: Get total number of historical update records
    function getRecordCount(uint256 _twinId) public view returns (uint256) {
        require(twins[_twinId].exists, "Twin not found");
        return twins[_twinId].records.length;
    }

    // Function: Get details of a specific update record by index
    function getRecordByIndex(uint256 _twinId, uint256 index)
        public
        view
        returns (string memory, string memory, uint256, address)
    {
        require(twins[_twinId].exists, "Twin not found");
        require(index < twins[_twinId].records.length, "Invalid index");

        TwinRecord storage rec = twins[_twinId].records[index];
        return (rec.dataHash, rec.metaInfo, rec.timestamp, rec.updatedBy);
    }
}
