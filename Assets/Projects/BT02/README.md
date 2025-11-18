# 24CYS336 - Blockchain-Technology 

## BT#02 - Real-world Asset (RWA) Tokenization
![](https://img.shields.io/badge/Member-Charan_K-gold)  <br/> 
![](https://img.shields.io/badge/SDG--darkgreen) ![](https://img.shields.io/badge/SDG--darkgreen)  <br/>
![](https://img.shields.io/badge/Reviewed-18th_Nov_2025-brown) <br/>

------

### Problem Statement
The traditional financial system faces significant challenges in managing and transferring real-world assets (RWAs) such as real estate, art, or commodities. These challenges include illiquidity, high transaction costs, lack of transparency, and complex legal processes. Manual ownership transfers are time-consuming and prone to fraud, limiting accessibility for smaller investors and hindering efficient capital allocation. This project addresses these issues by developing a **Real-World Asset (RWA) Tokenization Platform** that leverages blockchain technology to create a secure, transparent, and efficient system for tokenizing, fractionalizing, and trading RWAs.

-----
### Literature Survey 
The tokenization of real-world assets (RWAs) on blockchain platforms is an emerging field aimed at enhancing liquidity, transparency, and accessibility in traditional asset markets. This literature review examines key concepts and existing approaches in RWA tokenization, drawing parallels and distinctions with the provided context of academic credential verification where applicable, to highlight the unique challenges and opportunities.

#### Existing Solutions & Concepts
-   **ERC-721 for Unique Assets:** The use of ERC-721 tokens (Non-Fungible Tokens) is a widely accepted standard for representing unique, indivisible RWAs like a specific piece of real estate or a work of art. Projects like Decentraland (for virtual land) or various art tokenization platforms demonstrate the utility of NFTs for digital ownership.
-   **ERC-20 for Fractional Ownership:** To address the illiquidity of high-value assets, ERC-20 tokens are employed to represent fractional ownership. This allows multiple investors to own a portion of a single RWA, increasing market participation and liquidity. Platforms often use a "locking" mechanism where the ERC-721 is held in a smart contract, and ERC-20s are issued against it.
-   **Hybrid On-Chain/Off-Chain Models:** Due to the inherent nature of RWAs (physical existence, legal frameworks), most tokenization solutions adopt a hybrid approach. On-chain smart contracts handle ownership, transfer, and fractionalization logic, while off-chain systems manage legal documentation, KYC/AML compliance, and physical asset management. This is analogous to the DCDVS's need for off-chain identity verification.
-   **IPFS for Metadata Storage:** Decentralized storage solutions like IPFS are crucial for storing immutable asset metadata (e.g., property deeds, appraisal reports, images). This ensures data integrity and censorship resistance, linking directly to the NFT's `tokenURI`.

#### Research Gaps & RWA Specific Challenges
-   **Legal and Regulatory Frameworks:** A significant challenge in RWA tokenization is the lack of clear and harmonized legal and regulatory frameworks across jurisdictions. Ensuring that on-chain ownership translates to legally enforceable off-chain rights remains a complex hurdle.
-   **Oracle Integration for Real-World Data:** Integrating reliable oracles to bring real-world data (e.g., asset valuations, legal status changes) onto the blockchain is vital but complex, requiring robust and secure data feeds.
-   **Liquidity and Market Depth:** While fractionalization aims to improve liquidity, achieving sufficient market depth and investor participation for diverse RWA classes is an ongoing challenge.
-   **KYC/AML Compliance:** Strict Know Your Customer (KYC) and Anti-Money Laundering (AML) regulations are paramount in financial services. Integrating off-chain KYC processes with on-chain identity verification (e.g., whitelisting, role-based access control) is essential for compliant RWA platforms. This project's `Registry` contract directly addresses this.
-   **Interoperability:** The ability to seamlessly transfer tokenized RWAs across different blockchain networks or integrate with traditional financial systems is a future challenge.

-----
### Architectural Diagram

- The RWA Tokenization Platform operates on a Full-Stack DApp architecture, utilizing a local Ethereum Virtual Machine (EVM) for smart contract execution and IPFS for off-chain document storage.

**Key Data Flow (Minting & Fractionalization):**

1.  **Asset Minting (Admin/Verified User):**
    *   The user uploads asset metadata (name, description, image, documents) via the **Frontend**.
    *   The **Frontend** sends this metadata to the **Backend**.
    *   The **Backend** (simulating an IPFS pinning service) processes the metadata, uploads it to **Kubo IPFS**, and receives a Content Identifier (CID).
    *   The **Backend** returns the CID to the **Frontend**.
    *   The **Frontend** then calls the `mint()` function on the **AssetNFT Smart Contract** (via **Ethers.js**), passing the recipient address and the IPFS CID.
    *   The `AssetNFT` contract records the CID immutably on the **Ganache EVM**.

2.  **Asset Fractionalization:**
    *   A user (owner of an AssetNFT) initiates fractionalization via the **Frontend**.
    *   The **Frontend** calls the `fractionalizeNFT()` function on the **Fractionalizer Smart Contract** (via **Ethers.js**), specifying the `AssetNFT`'s `tokenId`, desired ERC-20 name, symbol, and total supply.
    *   The `Fractionalizer` contract takes ownership of the `AssetNFT` (locks it).
    *   The `Fractionalizer` then deploys a new `FractionalToken` (ERC-20) contract and mints the specified supply of these ERC-20 tokens to the original `AssetNFT` owner.
    *   All these actions are recorded on the **Ganache EVM**.

------

## Project Setup and Execution

This project requires Node.js, Truffle, MetaMask, and a local IPFS Daemon.

### Prerequisites

*   Node.js (v18+)
*   MetaMask Browser Extension (latest)
*   Truffle & `ganache` CLI (`npm install -g truffle ganache`)
*   IPFS Daemon (Ensure `kubo` is installed and the `ipfs` command is available).

---

### Step 1: Start Blockchain Node (Ganache)

Start the local EVM node with the configuration required by the DApp:

```bash
# We use Chain ID 1337 and Port 8545 for stability with modern MetaMask/Ethers.js
ganache --server.port 8545 --chain.networkId 1337 --chain.chainId 1337
```
*(Note: The mnemonic "debris excess tuna napkin comfort erase liberty drama goat fun bubble giggle" is specific to the DCDVS project. For this RWA project, Ganache will generate a default mnemonic unless specified. The important part is the chain ID and port.)*

### Step 2: Configure IPFS CORS

*   Configure your IPFS daemon to allow connections from your React app (localhost:3000).

*   Stop Daemon: Press `Ctrl + C` if your `ipfs daemon` is running.

Apply CORS Policy (Run these 3 commands in your terminal):

```bash
ipfs config API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://127.0.0.1:5000"]'
ipfs config API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
ipfs config API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
```
*(Note: The backend URL is 5000, not 5001 as in the DCDVS example.)*

Start IPFS Daemon:

```bash
ipfs daemon
```

### Step 3: Deploy Smart Contracts

*   Navigate to the project root (`rwa-tokenization/`) and deploy the contracts.

```bash
# Navigate to the root directory
cd rwa-tokenization
truffle migrate --network development --reset
```

### Step 4: Run Backend

Open a new terminal, navigate to `rwa-tokenization/backend`, and run:

```bash
cd rwa-tokenization/backend
npm start
```
You should see `Backend listening at http://localhost:5000`. Keep this terminal open.

### Step 5: Run Frontend

```bash
cd rwa-tokenization/frontend
npm start
```

### Step 6: MetaMask Connection & Configuration

*   **Add Network:** In MetaMask, add a custom network pointing to RPC URL: `http://127.0.0.1:8545` and Chain ID: `1337`. Set Currency Symbol to `ETH`.
*   **Configure Frontend:** Before interacting, ensure you have updated the `ASSET_NFT_ADDRESS` in `rwa-tokenization/frontend/src/App.js` with the actual deployed address of your `AssetNFT` contract (found in `rwa-tokenization/build/contracts/AssetNFT.json`).
*   **Connect:** Click "Connect Wallet" on the DApp. The account that deployed the contracts (the owner) should be selected in MetaMask to successfully mint assets.

------

### Results

#### Stakeholder Details

| Smart Contract Stakeholders | Address | 
|:---------------------------:|:-------:|
| Owner  |  |
| User 1 |  |
| User 2 |  | 

#### Transaction Details

| Transaction Action   | Hash   |
|:---------------------|:------:|
| Deployment of Contracts |      |

These transaction are as shown in the [YouTube Demo Video]() 

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| SDG | Alignment |
|:---|:----------|
| Goal 8 - Decent Work and Economic Growth | By increasing liquidity and accessibility to real-world assets through tokenization, the platform can foster new investment opportunities and more efficient capital markets, contributing to economic growth. |
| Goal 9 - Industry, Innovation, and Infrastructure | The project leverages blockchain technology and decentralized storage (IPFS) to build innovative financial infrastructure, promoting technological advancement and resilient systems for asset management. |
| Goal 16 - Peace, Justice and Strong Institutions | Tokenization enhances transparency and immutability in asset ownership records, reducing fraud and corruption. This contributes to more accountable and transparent institutions, fostering trust in asset markets. |

-----

### References
-   Werner, S., & Leal, F. (2020). *Tokenization of Real Estate: A New Paradigm for Property Investment*. Journal of Real Estate Finance and Economics, 61(3), 385-405.
-   Blockchain & Distributed Ledger Technologies in Finance: A Review of the Literature. (2021). *Journal of Financial Economics*, 140(1), 1-25.
-   OpenZeppelin Documentation. (n.d.). *ERC-721, ERC-20, and AccessControl Contracts*. Retrieved from [https://docs.openzeppelin.com/contracts/](https://docs.openzeppelin.com/contracts/)
