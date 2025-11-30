# BLOCKCHAIN DECISION TREE ANALYSIS BASED ON COMPTIA FRAMEWORK
## TOPIC : **BLOCKCHAIN APPLICATIONS IN DEFENCE LOGISTICS**

| **STEP** | **DECISION TREE QUESTION** | **ANSWER -YES/NO** | **WITH REFERENCE TO DefenceLogistics.sol CONTRACT** |
|-----------|-----------------------------|----------------------|-------------------------------------------------------------|
| 1 | Is there a need for a trusted central authority? | **No** | Multiple semi-trusted entities (officer, depot, auditor) make a centralized authority risky. |
| 2 | Is there a need for high performance (>1000 TPS)? | **No** | Logistics events are infrequent and below blockchain TPS limits. |
| 3 | Is there a need to capture massive amounts of data? | **Partially** | On-chain data is limited; IPFS handles large files (certificates, manifests). |
| 4 | Do one or more parties need to be able to modify entries? | **Yes** | Officer registers assets, depot transfers, auditor audits — multi-writer system. |
| 5 | Is there a need for a persistent historical transaction record? | **Yes** | Auditability and chain-of-custody require immutable transaction logs. |
| 6 | Do multiple parties need to be able to access or audit data? | **Yes** | Auditors, officers, depots, and command units require synchronized visibility. |
| 7 | Are contractual relationships or value exchanges being managed? | **Yes** | Transfers, audits, and supplier changes act as contractual events. |
| 8 | Can business processes be represented by conditional logic? | **Yes** | Role permissions and SOPs are encoded as smart contract conditions. |
| 9 | Is there a need to centrally own application functionality? | **No** | Each role operates independently; decentralization is preferred. |
| 10 | Can transactions be public but hashed? | **Yes** | Permissioned blockchain provides transparency while protecting classified data. |
| 11 | Under 30 TPS OK? | **Yes** | Low transaction throughput suits private/permissioned blockchain. |

**Permissioned Blockchain Is Suitable**
---

**CONCLUSION:**  
Our Project **“Blockchain Applications in Defence Logistics”** satisfies every key “YES” branch in the **CompTIA Decision Tree**, confirming that **Permissioned Blockchain** is suitable.

---

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
