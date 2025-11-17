# Real-World Asset (RWA) Tokenization Platform

## Project Overview

This project is a web application designed to demonstrate the tokenization of real-world assets (RWAs) on a blockchain. It allows for the creation, fractionalization, listing, and tracking of assets like real estate, artwork, or invoices using blockchain technology. Unique asset metadata and documents are stored on IPFS, while ownership and transfer logic are handled by smart contracts on an Ethereum-compatible blockchain (Ganache for local development). A Node.js/Express backend manages off-chain data like KYC status and provides an IPFS upload helper, and a React frontend provides a user interface for interacting with the platform.

## Core Features

*   **Create (Mint) Asset NFT:** Admin or verified users can mint an ERC-721 NFT representing a real-world asset. Asset metadata (JSON + PDF/image) is uploaded to IPFS, and the IPFS Content Identifier (CID) is stored in the NFT's `tokenURI`.
*   **View Asset Details:** Frontend can read asset metadata directly from IPFS using the NFT's `tokenURI`.
*   **Fractionalization:** Lock an Asset NFT into a `Fractionalizer` contract to mint ERC-20 tokens representing fractions of the asset.
*   **Marketplace:** A smart contract-based marketplace for fixed-price sales of Asset NFTs.
*   **KYC & Role Management:** A `Registry` contract allows for on-chain role management (e.g., `KYC_VERIFIED_ROLE`) based on off-chain verification handled by the backend.
*   **IPFS Pinning:** Integration with IPFS for immutable storage of asset data.

## System Architecture

1.  **Blockchain (Local Dev):** Ganache (local Ethereum blockchain) for deploying and testing smart contracts via Truffle.
2.  **Decentralized Storage:** Kubo IPFS (local daemon) for immutable storage of asset metadata and documents.
3.  **Smart Contracts (Solidity):**
    *   `AssetNFT` (ERC-721): Represents individual real-world assets.
    *   `FractionalToken` (ERC-20): Represents fractional ownership of an `AssetNFT`.
    *   `Fractionalizer`: Manages the locking of `AssetNFT`s and minting/burning of `FractionalToken`s.
    *   `Marketplace`: Facilitates fixed-price buying and selling of `AssetNFT`s.
    *   `Registry`: Manages roles (e.g., `KYC_VERIFIED_ROLE`) for users.
4.  **Backend (Node.js/Express):**
    *   Provides an API for the frontend.
    *   Includes a placeholder for an IPFS upload helper (simulates pinning to IPFS).
    *   Includes a placeholder for KYC status management.
5.  **Frontend (React):**
    *   Built with Create React App.
    *   Uses `ethers.js` for blockchain interaction and `web3modal` for MetaMask wallet integration.
    *   User interface for connecting wallet, minting assets, and potentially viewing/trading them.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js & npm:** [Download & Install Node.js](https://nodejs.org/en/download/) (LTS version recommended).
*   **Git:** [Download & Install Git](https://git-scm.com/downloads).
*   **Truffle:** `npm install -g truffle`
*   **Ganache:** `npm install -g ganache` (or use the [Ganache GUI](https://trufflesuite.com/ganache/)).
*   **Kubo IPFS:** Follow the installation steps below.
*   **MetaMask:** A browser extension wallet. [Install MetaMask](https://metamask.io/download/).

## Setup Instructions

Follow these steps to set up and run the project locally.

### 1. Clone the Repository (Hypothetical)

```bash
# If this were a real repository, you would clone it:
# git clone <repository-url>
# cd rwa-tokenization
```
*(Assuming you are already in the `rwa-tokenization` directory)*

### 2. Install Project Dependencies

Navigate to the `rwa-tokenization` directory and install the Node.js dependencies for the smart contracts and backend:

```bash
cd rwa-tokenization
npm install @openzeppelin/contracts @truffle/hdwallet-provider ethers web3
```

Then, navigate into the `backend` directory and install its dependencies:

```bash
cd backend
npm install express cors
cd .. # Go back to rwa-tokenization root
```

Finally, navigate into the `frontend` directory and install its dependencies:

```bash
cd frontend
npm install ethers web3modal
cd .. # Go back to rwa-tokenization root
```

### 3. Install and Initialize Kubo IPFS

```bash
# Download Kubo IPFS (using v0.38.2 as an example, check dist.ipfs.tech/#kubo for latest)
wget https://dist.ipfs.tech/kubo/v0.38.2/kubo_v0.38.2_linux-amd64.tar.gz

# Extract the archive
tar -xvzf kubo_v0.38.2_linux-amd64.tar.gz

# Navigate into the extracted directory
cd kubo

# Run the installation script (requires sudo)
sudo bash install.sh

# Go back to rwa-tokenization root
cd ..

# Initialize IPFS
ipfs init

# Start the IPFS daemon (run in a separate terminal or in background)
ipfs daemon &
```

### 4. Compile Smart Contracts

Ensure you are in the `rwa-tokenization` root directory, then compile the Solidity contracts:

```bash
truffle compile
```

### 5. Deploy Smart Contracts

First, start your Ganache local blockchain. Open a **new terminal** and run:

```bash
ganache
```
Keep this terminal open.

Then, in your original terminal (from `rwa-tokenization` root), deploy the contracts:

```bash
truffle migrate --network development
```

### 6. Configure Frontend with Contract Address

After deployment, you need to update the `ASSET_NFT_ADDRESS` in the frontend.

1.  Open `rwa-tokenization/frontend/src/contracts/AssetNFT.json`.
2.  Find the deployed address under `networks.<network_id>.address` (e.g., `networks.1337.address` for Ganache). Copy this address.
3.  Open `rwa-tokenization/frontend/src/App.js`.
4.  Replace `"YOUR_ASSET_NFT_CONTRACT_ADDRESS"` with the copied address.

    ```javascript
    // In rwa-tokenization/frontend/src/App.js
    const ASSET_NFT_ADDRESS = "0x..."; // Paste your copied address here
    ```

## Running the Application

You will need three separate terminals for Ganache, the Backend, and the Frontend.

### 1. Start Ganache (if not already running)

Open a new terminal and run:

```bash
ganache
```
Keep this terminal open.

### 2. Start IPFS Daemon (if not already running)

Open a new terminal and run:

```bash
ipfs daemon &
```
Keep this terminal open.

### 3. Start the Backend Server

Open a new terminal, navigate to `rwa-tokenization/backend`, and run:

```bash
cd rwa-tokenization/backend
npm start
```
You should see `Backend listening at http://localhost:5000`. Keep this terminal open.

### 4. Start the Frontend Application

Open a new terminal, navigate to `rwa-tokenization/frontend`, and run:

```bash
cd rwa-tokenization/frontend
npm start
```
This will open the React app in your browser (usually at `http://localhost:3000`).

## Usage

1.  **Connect MetaMask:**
    *   Open your browser and navigate to `http://localhost:3000`.
    *   Ensure MetaMask is installed and configured to connect to your Ganache local network (usually `http://127.0.0.1:8545` or `http://localhost:8545`, Network ID `1337`).
    *   Click the "Connect Wallet" button. MetaMask should prompt you to connect.
    *   **Important:** Ensure your MetaMask account is set to the **same address that deployed the smart contracts** (the owner account from Ganache).

2.  **Mint an Asset:**
    *   Fill in the "Asset Name", "Asset Description", and "Asset Image" fields in the frontend.
    *   Click the "Mint Asset NFT" button.
    *   MetaMask will prompt you to confirm the transaction.
    *   Upon successful transaction, you should see "NFT Minted Successfully!" on the frontend.
    *   Check your Ganache console for transaction details.

## Smart Contract Details

*   **AssetNFT.sol (ERC-721):** Represents a unique real-world asset. `onlyOwner` can mint.
*   **FractionalToken.sol (ERC-20):** Represents a fractional share of an AssetNFT. Minted/burned by `Fractionalizer`.
*   **Fractionalizer.sol:** Locks AssetNFTs and issues corresponding FractionalTokens.
*   **Marketplace.sol:** Enables fixed-price sales of AssetNFTs.
*   **Registry.sol:** Manages roles like `KYC_VERIFIED_ROLE` using OpenZeppelin's `AccessControl`.

## Folder Structure

```
rwa-tokenization/
├─ contracts/             # Solidity smart contracts
│  ├─ AssetNFT.sol
│  ├─ FractionalToken.sol
│  ├─ Fractionalizer.sol
│  ├─ Marketplace.sol
│  ├─ Migrations.sol
│  └─ Registry.sol
├─ migrations/            # Truffle migration scripts
├─ test/                  # (Placeholder) Smart contract tests
├─ truffle-config.js      # Truffle configuration
├─ build/                 # Compiled contract artifacts (generated after truffle compile)
├─ backend/               # Node.js/Express backend
│  ├─ src/
│  ├─ package.json
│  ├─ server.js
│  └─ ...
└─ frontend/              # React web application
   ├─ public/
   ├─ src/
   │  ├─ contracts/        # Copied contract ABIs (e.g., AssetNFT.json)
   │  ├─ App.js
   │  ├─ App.css
   │  └─ ...
   ├─ package.json
   └─ ...
```

## Troubleshooting

*   **`Error: network does not support ENS`**: This is handled by overriding `provider.resolveName` in `App.js`. If it persists, ensure your frontend is restarted after the fix.
*   **`Error: missing revert data` / `CALL_EXCEPTION`**: This usually means a smart contract function reverted. For `mint` on `AssetNFT`, ensure the connected MetaMask account is the **owner** of the `AssetNFT` contract.
*   **`Module not found: AssetNFT.json`**: Ensure `AssetNFT.json` is copied from `rwa-tokenization/build/contracts/` to `rwa-tokenization/frontend/src/contracts/`.
*   **`ethers.providers.Web3Provider is not a constructor`**: Ensure `ethers.js` provider instantiation is `new ethers.BrowserProvider(instance, ...)` and that `await provider.getSigner()` is used.

## Future Enhancements

*   Implement full fractionalization flow with ERC-20 token transfers and buyout mechanisms.
*   Develop a complete marketplace UI for listing, buying, and selling fractional tokens and full NFTs.
*   Integrate with a real IPFS pinning service (e.g., Pinata, Infura) in the backend.
*   Implement a robust KYC/user management system in the backend with database integration.
*   Add event listeners in the backend to track on-chain events and update off-chain data.
*   Implement TheGraph subgraph for efficient querying of on-chain data.
*   Add comprehensive unit and integration tests for all components.
*   Improve UI/UX with better styling and responsiveness.

---
This `README.md` provides a comprehensive guide to the RWA Tokenization Platform.
