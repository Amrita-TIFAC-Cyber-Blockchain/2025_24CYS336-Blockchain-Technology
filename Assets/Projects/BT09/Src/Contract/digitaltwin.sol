// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalTwinSimple {

    struct TwinRecord {
        string dataHash;
        string metaInfo;
        uint256 timestamp;
        address updatedBy;
    }

    struct Twin {
        uint256 twinId;
        address owner;
        bool exists;
        TwinRecord[] records;
    }

    mapping(uint256 => Twin) public twins;

    event TwinRegistered(uint256 twinId, address owner);
    event TwinDataAdded(uint256 twinId, string dataHash, string metaInfo, address updatedBy, uint256 time);
    event OwnershipTransferred(uint256 twinId, address oldOwner, address newOwner);

    modifier onlyOwner(uint256 _twinId) {
        require(twins[_twinId].exists, "Twin not found");
        require(twins[_twinId].owner == msg.sender, "You are not the owner");
        _;
    }

    function registerTwin(uint256 _twinId) public {
        require(!twins[_twinId].exists, "Twin already exists");
        twins[_twinId].twinId = _twinId;
        twins[_twinId].owner = msg.sender;
        twins[_twinId].exists = true;
        emit TwinRegistered(_twinId, msg.sender);
    }

    function addTwinData(uint256 _twinId, string memory _dataHash, string memory _metaInfo)
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

    function transferTwinOwnership(uint256 _twinId, address _newOwner)
        public
        onlyOwner(_twinId)
    {
        require(_newOwner != address(0), "Invalid new owner");
        address oldOwner = twins[_twinId].owner;
        twins[_twinId].owner = _newOwner;
        emit OwnershipTransferred(_twinId, oldOwner, _newOwner);
    }

    function getRecordCount(uint256 _twinId) public view returns (uint256) {
        require(twins[_twinId].exists, "Twin not found");
        return twins[_twinId].records.length;
    }

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