import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import './App.css';
import AssetNFT from './contracts/AssetNFT.json'; // Import the AssetNFT ABI

const ASSET_NFT_ADDRESS = "0x31C968f41e1F693013208C8aa48A752b071e383A"; // Replace with your deployed AssetNFT contract address
const BACKEND_URL = "http://localhost:5000"; // Your backend URL

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [assetNFTContract, setAssetNFTContract] = useState(null);

  const [assetName, setAssetName] = useState('');
  const [assetDescription, setAssetDescription] = useState('');
  const [assetImage, setAssetImage] = useState(''); // Placeholder for IPFS CID or URL
  const [mintingStatus, setMintingStatus] = useState('');

  async function connectWallet() {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions: {} // required
      });
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance, { chainId: 1337, name: "unknown" });

      // Override resolveName to prevent ENS errors on local networks
      provider.resolveName = async (name) => {
        if (ethers.isAddress(name)) {
          return name;
        }
        console.warn("ENS resolution skipped for local network:", name);
        return null;
      };
      const signer = await provider.getSigner();
      const accounts = await provider.listAccounts();
      const address = accounts[0].address;
      setProvider(provider);
      setSigner(signer);
      setAccount(address);
      console.log("Connected account:", address);

      // Initialize AssetNFT contract
      const nftContract = new ethers.Contract(ASSET_NFT_ADDRESS, AssetNFT.abi, signer);
      setAssetNFTContract(nftContract);

    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }

  async function mintAsset() {
    if (!assetNFTContract || !account) {
      alert("Please connect your wallet first.");
      return;
    }

    setMintingStatus("Uploading metadata to IPFS...");
    try {
      // 1. Upload metadata to IPFS via backend
      const metadata = {
        name: assetName,
        description: assetDescription,
        image: assetImage, // This should ideally be an IPFS CID
        // Add other metadata fields as needed
      };

      const response = await fetch(`${BACKEND_URL}/upload-to-ipfs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metadata }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      const ipfsCID = data.cid;
      console.log("Metadata IPFS CID:", ipfsCID);

      setMintingStatus("Minting NFT...");
      // 2. Mint NFT on blockchain
      const tx = await assetNFTContract.mint(account, ipfsCID);
      await tx.wait();
      setMintingStatus("NFT Minted Successfully!");
      console.log("Minting transaction:", tx);

      // Clear form
      setAssetName('');
      setAssetDescription('');
      setAssetImage('');

    } catch (error) {
      setMintingStatus(`Minting Failed: ${error.message}`);
      console.error("Error minting asset:", error);
    }
  }

  useEffect(() => {
    if (Web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>RWA Tokenization Platform</h1>
        {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <div>
            <p>Connected Account: {account}</p>
            <h2>Mint New Asset</h2>
            <input
              type="text"
              placeholder="Asset Name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Asset Description"
              value={assetDescription}
              onChange={(e) => setAssetDescription(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Asset Image (IPFS CID or URL)"
              value={assetImage}
              onChange={(e) => setAssetImage(e.target.value)}
            />
            <br />
            <button onClick={mintAsset}>Mint Asset NFT</button>
            {mintingStatus && <p>{mintingStatus}</p>}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
