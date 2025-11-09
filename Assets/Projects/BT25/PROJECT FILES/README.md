# DEFENCE LOGISTICS SMART CONTRACT

``` 
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract DefenceLogistics {
    struct StatusEvent {
        string status;
        uint256 timestamp;
        string note;
    }

    struct Asset {
        string name;
        string supplier;
        address currentHolder;
        uint256 registeredAt;
        string ipfsHash;
        StatusEvent[] history;
    }

    mapping(uint256 => Asset> public assetRecords;

    address public logisticsOfficer;
    address public depotManager;
    address public agencyAuditor;
    address public owner;

    event AssetRegistered(uint256 assetId, string name, string supplier, string ipfsHash, address holder, uint256 time);
    event AssetTransferred(uint256 assetId, address from, address to, string newStatus, string note, uint256 time);
    event SupplierChanged(uint256 assetId, string oldSupplier, string newSupplier, uint256 time);
    event AssetAudited(uint256 assetId, address auditor, string auditNote, uint256 time);

    constructor() {
        owner = msg.sender;
        logisticsOfficer = 0x84Be682C7EB7CB778c2D062596c404A08b93f2a6;
        depotManager = 0x8434BCC016dF78CAF6f1D469D44714334229d232;
        agencyAuditor = 0xAc4336fa91E6b2B849115C0C5F9F0A37C47594d7;
    }

    modifier onlyOfficer() {
        require(msg.sender == logisticsOfficer, "Only logistics officer");
        _;
    }
    modifier onlyDepot() {
        require(msg.sender == depotManager, "Only depot manager");
        _;
    }
    modifier onlyAuditor() {
        require(msg.sender == agencyAuditor, "Only auditor");
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyHolder(uint256 assetId) {
        require(msg.sender == assetRecords[assetId].currentHolder, "Not current asset holder");
        _;
    }

    function registerAsset(
        uint256 assetId,
        string memory name,
        string memory supplier,
        string memory ipfsHash,
        string memory note
    ) public onlyOfficer {
        require(assetRecords[assetId].registeredAt == 0, "Asset already registered");
        assetRecords[assetId].name = name;
        assetRecords[assetId].supplier = supplier;
        assetRecords[assetId].ipfsHash = ipfsHash;
        assetRecords[assetId].currentHolder = logisticsOfficer;
        assetRecords[assetId].registeredAt = block.timestamp;
        assetRecords[assetId].history.push(StatusEvent("Registered", block.timestamp, note));
        emit AssetRegistered(assetId, name, supplier, ipfsHash, logisticsOfficer, block.timestamp);
    }

    function transferAsset(
        uint256 assetId,
        address newHolder,
        string memory newStatus,
        string memory note
    ) public onlyDepot {
        require(assetRecords[assetId].registeredAt != 0, "Asset doesn't exist");
        address prevHolder = assetRecords[assetId].currentHolder;
        assetRecords[assetId].currentHolder = newHolder;
        assetRecords[assetId].history.push(StatusEvent(newStatus, block.timestamp, note));
        emit AssetTransferred(assetId, prevHolder, newHolder, newStatus, note, block.timestamp);
    }

    function changeSupplier(uint256 assetId, string memory newSupplier) public onlyOfficer {
        require(assetRecords[assetId].registeredAt != 0, "Asset not found");
        string memory oldSupplier = assetRecords[assetId].supplier;
        assetRecords[assetId].supplier = newSupplier;
        assetRecords[assetId].history.push(StatusEvent("Supplier Changed", block.timestamp, newSupplier));
        emit SupplierChanged(assetId, oldSupplier, newSupplier, block.timestamp);
    }

    function auditAsset(uint256 assetId, string memory note) public onlyAuditor {
        require(assetRecords[assetId].registeredAt != 0, "Asset not found");
        assetRecords[assetId].history.push(StatusEvent("Audited", block.timestamp, note));
        emit AssetAudited(assetId, msg.sender, note, block.timestamp);
    }

    function getAsset(uint256 assetId) public view returns (
        string memory,
        string memory,
        address,
        uint256,
        string memory
    ) {
        Asset memory asset = assetRecords[assetId];
        return (
            asset.name,
            asset.supplier,
            asset.currentHolder,
            asset.registeredAt,
            asset.ipfsHash
        );
    }

    function getAssetHistory(uint256 assetId) public view returns (
        StatusEvent[] memory
    ) {
        return assetRecords[assetId].history;
    }
}

```
