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
TEST CASES USED AND RESPECTIVE OUTPUTS ARE PRESENT IN IMAGES FOLDER : [LINK FOR IMAGES FOLDER](https://github.com/Amrita-TIFAC-Cyber-Blockchain/2025_24CYS336-Blockchain-Technology/tree/main/Assets/Projects/BT25/IMAGES)


## 1. Successful Asset Registration
- **From Address:** Logistics Officer  
- **Function:** `registerAsset(1, "Night Vision Goggles", "OrdnanceSupplierLtd", "QmAF123...ipfs", "Initial Issue Batch")`  
- **Expected Result:**  
  - Transaction succeeds  
  - `AssetRegistered` event emitted  
  - Asset ID `1` stored with correct details  

---

## 2. Attempt Registration by Wrong Address
- **From Address:** Depot Manager  
- **Function:** `registerAsset(2, "Drone", "AeroTech", "Qm324ipfs...", "Attempt by wrong role")`  
- **Expected Result:**  
  - Transaction reverts  
  - Error: **"Only logistics officer"**

---

## 3. Ownership Transfer by Depot Manager
- **From Address:** Depot Manager  
- **Function:** `transferAsset(1, 0x123...abc, "In-Transit", "Dispatched to field")`  
- **Expected Result:**  
  - Transaction succeeds  
  - `currentHolder` updated to `0x123...abc`  
  - `AssetTransferred` event emitted  

---

## 4. Ownership Transfer by Unauthorized User
- **From Address:** Agency Auditor  
- **Function:** `transferAsset(1, 0x222...efg, "Lost", "Fake transfer")`  
- **Expected Result:**  
  - Transaction reverts  
  - Error: **"Only depot manager"**

---

## 5. Change Supplier by Logistics Officer
- **From Address:** Logistics Officer  
- **Function:** `changeSupplier(1, "NewDefenceSupplierInc")`  
- **Expected Result:**  
  - Transaction succeeds  
  - Supplier updated to `NewDefenceSupplierInc`  
  - `SupplierChanged` event emitted  

---

## 6. Supplier Change by Unauthorized User
- **From Address:** Depot Manager  
- **Function:** `changeSupplier(1, "NotAllowedInc")`  
- **Expected Result:**  
  - Transaction reverts  
  - Error: **"Only logistics officer"**

---

## 7. Audit Asset by Auditor
- **From Address:** Agency Auditor  
- **Function:** `auditAsset(1, "Checked, all serials match manifests.")`  
- **Expected Result:**  
  - Transaction succeeds  
  - `AssetAudited` event emitted  
  - Audit entry appended to audit history  

---

## 8. Check Asset Details
- **From Address:** Any  
- **Function:** `getAsset(1)`  
- **Expected Result:**  
  - Returns:
    - Part Name  
    - Supplier  
    - Current Holder  
    - Registration Timestamp  
    - IPFS Hash  

---

## 9. Check Asset History (Audit Trail)
- **From Address:** Any  
- **Function:** `getAssetHistory(1)`  
- **Expected Result:**  
  - Returns ordered event history including:
    - Registration  
    - Transfers  
    - Supplier Changes  
    - Audits  

---

## 10. Attempt to Register Same Asset Twice
- **From Address:** Logistics Officer  
- **Function:** `registerAsset(1, "Recoilless Rifle", "ArmTech", "QmAnother...", "Duplicate")`  
- **Expected Result:**  
  - Transaction reverts  
  - Error: **"Asset already registered"**
