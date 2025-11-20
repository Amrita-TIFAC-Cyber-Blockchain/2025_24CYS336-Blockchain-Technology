import { useState, useEffect } from "react";
import { ethers } from "ethers";

// ⚠️ REPLACE WITH YOUR ACTUAL DEPLOYED CONTRACT ADDRESS
const CONTRACT_ADDRESS = "0xDD6b89f16E1087Fee845f9f65FFB8270F007aeC8";

const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "metadataHash", "type": "string" }
    ],
    "name": "registerProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "getProperty",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "metadataHash", "type": "string" }
    ],
    "name": "PropertyRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  }
];

interface PropertyData {
  id: string;
  owner: string;
  metadataHash: string;
  timestamp: number;
  files?: string[];
}

interface PropertyHistory {
  event: string;
  from?: string;
  to?: string;
  timestamp: number;
  txHash: string;
}

export default function EnhancedPropertyRegistry() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("register");

  // Registration
  const [regId, setRegId] = useState("");
  const [regFiles, setRegFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Search & Listing
  const [searchId, setSearchId] = useState("");
  const [searchResults, setSearchResults] = useState<PropertyData[]>([]);
  const [myProperties, setMyProperties] = useState<PropertyData[]>([]);
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());

  // Property Details
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);
  const [propertyHistory, setPropertyHistory] = useState<PropertyHistory[]>([]);

  // Transfer
  const [transferId, setTransferId] = useState("");
  const [transferAddress, setTransferAddress] = useState("");

  const connectWallet = async () => {
    try {
      setError("");
      if (!window.ethereum) {
        setError("Please install MetaMask!");
        return;
      }

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      await web3Provider.send("eth_requestAccounts", []);
      const signer = await web3Provider.getSigner();
      const address = await signer.getAddress();
      
      setAccount(address);
      setProvider(web3Provider);
      setContract(new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
      
      // Load user's properties
      await loadMyProperties(address, new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
      
      alert("✅ Wallet connected successfully!");
    } catch (err: any) {
      setError(`Connection failed: ${err.message}`);
      console.error(err);
    }
  };

  // Upload multiple files to IPFS
  const uploadFilesToIPFS = async (files: File[]) => {
    const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1Mzk4NzNlZS1mZmMzLTQ5MjktYTJhZC1mMjZhZGM5OGYwYWIiLCJlbWFpbCI6InJqYWl3YW50aGkyMDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlMGNlNDE5NDE0ZjI0YTNiZmMyZCIsInNjb3BlZEtleVNlY3JldCI6Ijg4YTlkZDE1NWYyNWRmZmY4ZWYyMDI5ZmYxMTJiNmQ4ZGQ1NmZkZGIzNmE2OTlhN2NmMDE0MDIyZGFkNDFiZDIiLCJleHAiOjE3OTQxMzIyNjV9.bjhzne46HnGOAIaXVdWEyoRO63B4VKmyz-DF49Wu_8I"; // Replace with your JWT
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${JWT}`
        },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to upload ${file.name}: ${errorText}`);
      }

      const data = await res.json();
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
      uploadedUrls.push(ipfsUrl);
      console.log(`Uploaded ${file.name}:`, ipfsUrl);
    }

    setUploadProgress(0);
    return uploadedUrls;
  };

  // Create metadata with multiple files
  const createMetadata = async (files: File[]) => {
    const fileUrls = await uploadFilesToIPFS(files);
    
    const metadata = {
      files: fileUrls,
      fileNames: files.map(f => f.name),
      uploadedAt: new Date().toISOString(),
      totalFiles: files.length
    };

    // Upload metadata JSON to IPFS
    const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1Mzk4NzNlZS1mZmMzLTQ5MjktYTJhZC1mMjZhZGM5OGYwYWIiLCJlbWFpbCI6InJqYWl3YW50aGkyMDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlMGNlNDE5NDE0ZjI0YTNiZmMyZCIsInNjb3BlZEtleVNlY3JldCI6Ijg4YTlkZDE1NWYyNWRmZmY4ZWYyMDI5ZmYxMTJiNmQ4ZGQ1NmZkZGIzNmE2OTlhN2NmMDE0MDIyZGFkNDFiZDIiLCJleHAiOjE3OTQxMzIyNjV9.bjhzne46HnGOAIaXVdWEyoRO63B4VKmyz-DF49Wu_8I";
    const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    const formData = new FormData();
    formData.append("file", blob, "metadata.json");

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${JWT}`
      },
      body: formData,
    });

    const data = await res.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  };

  const registerProperty = async () => {
    try {
      setError("");
      setLoading(true);

      if (!contract) {
        alert("Please connect wallet first!");
        return;
      }
      if (!regId || regId.trim() === "") {
        alert("Please enter a Property ID");
        return;
      }
      if (regFiles.length === 0) {
        alert("Please select at least one document file.");
        return;
      }

      console.log("Creating metadata with", regFiles.length, "files...");
      const metadataHash = await createMetadata(regFiles);
      console.log("Metadata hash:", metadataHash);

      console.log("Registering on blockchain...");
      const tx = await contract.registerProperty(Number(regId), metadataHash);
      console.log("Transaction sent:", tx.hash);
      
      await tx.wait();
      
      // Add to registered IDs
      setRegisteredIds(prev => new Set([...prev, regId]));
      
      alert("✅ Property registered successfully!");
      
      // Clear form
      setRegId("");
      setRegFiles([]);
      
      // Refresh my properties
      await loadMyProperties(account, contract);
      
    } catch (err: any) {
      console.error("Registration error:", err);
      
      if (err.message.includes("Property already registered")) {
        setError("❌ This Property ID is already registered!");
      } else if (err.message.includes("user rejected")) {
        setError("❌ Transaction was rejected");
      } else {
        setError(`❌ Error: ${err.message}`);
      }
      
      alert(`Registration failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const searchProperty = async () => {
    try {
      setError("");
      setLoading(true);
      
      if (!contract) {
        alert("Please connect wallet first!");
        return;
      }
      if (!searchId) {
        alert("Please enter a Property ID");
        return;
      }

      const res = await contract.getProperty(searchId);
      const property: PropertyData = {
        id: res[0].toString(),
        owner: res[1],
        metadataHash: res[2],
        timestamp: Number(res[3])
      };

      // Fetch metadata to get files
      try {
        const metadataRes = await fetch(property.metadataHash);
        const metadata = await metadataRes.json();
        property.files = metadata.files;
      } catch (e) {
        console.log("Could not fetch metadata, treating as single file");
        property.files = [property.metadataHash];
      }

      setSearchResults([property]);
      setSelectedProperty(property);
      
      // Load property history
      await loadPropertyHistory(searchId);
      
    } catch (err: any) {
      console.error("Search error:", err);
      if (err.message.includes("Property not found")) {
        setError("❌ Property not found");
        alert("Property not found with this ID");
      } else {
        setError(`❌ Error: ${err.message}`);
      }
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMyProperties = async (address: string, contractInstance: any) => {
    try {
      // Get all PropertyRegistered events for this address
      const filter = contractInstance.filters.PropertyRegistered(null, address);
      const events = await contractInstance.queryFilter(filter);
      
      const properties: PropertyData[] = [];
      
      for (const event of events) {
        const propertyId = event.args?.id.toString();
        if (propertyId) {
          try {
            const res = await contractInstance.getProperty(propertyId);
            const property: PropertyData = {
              id: res[0].toString(),
              owner: res[1],
              metadataHash: res[2],
              timestamp: Number(res[3])
            };
            
            // Fetch files if metadata
            try {
              const metadataRes = await fetch(property.metadataHash);
              const metadata = await metadataRes.json();
              property.files = metadata.files;
            } catch {
              property.files = [property.metadataHash];
            }
            
            properties.push(property);
          } catch (e) {
            console.log("Could not load property", propertyId);
          }
        }
      }
      
      setMyProperties(properties);
    } catch (err) {
      console.error("Error loading properties:", err);
    }
  };

  const loadPropertyHistory = async (propertyId: string) => {
    try {
      if (!provider) return;
      
      const contractWithProvider = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const history: PropertyHistory[] = [];
      
      // Get registration event
      const registerFilter = contractWithProvider.filters.PropertyRegistered(propertyId);
      const registerEvents = await contractWithProvider.queryFilter(registerFilter);
      
      for (const event of registerEvents) {
        const block = await provider.getBlock(event.blockNumber);
        history.push({
          event: "Property Registered",
          to: event.args?.owner,
          timestamp: block.timestamp,
          txHash: event.transactionHash
        });
      }
      
      // Get transfer events
      const transferFilter = contractWithProvider.filters.OwnershipTransferred(propertyId);
      const transferEvents = await contractWithProvider.queryFilter(transferFilter);
      
      for (const event of transferEvents) {
        const block = await provider.getBlock(event.blockNumber);
        history.push({
          event: "Ownership Transferred",
          from: event.args?.previousOwner,
          to: event.args?.newOwner,
          timestamp: block.timestamp,
          txHash: event.transactionHash
        });
      }
      
      // Sort by timestamp
      history.sort((a, b) => b.timestamp - a.timestamp);
      setPropertyHistory(history);
      
    } catch (err) {
      console.error("Error loading history:", err);
    }
  };

  const transferOwnership = async () => {
    try {
      setError("");
      setLoading(true);
      
      if (!contract) {
        alert("Please connect wallet first!");
        return;
      }
      if (!transferId) {
        alert("Please enter a Property ID");
        return;
      }
      if (!transferAddress || !ethers.isAddress(transferAddress)) {
        alert("Please enter a valid Ethereum address");
        return;
      }

      const tx = await contract.transferOwnership(transferId, transferAddress);
      await tx.wait();
      
      alert("✅ Ownership transferred successfully!");
      
      setTransferId("");
      setTransferAddress("");
      
      // Refresh properties
      await loadMyProperties(account, contract);
      
    } catch (err: any) {
      console.error("Transfer error:", err);
      if (err.message.includes("Only owner can transfer")) {
        setError("❌ You are not the owner of this property!");
      } else {
        setError(`❌ Error: ${err.message}`);
      }
      alert(`Transfer failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setRegFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setRegFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ 
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ 
        width: "100%",
        maxWidth: 1200, 
        background: "white", 
        borderRadius: 20,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        overflow: "hidden",
        margin: "0 auto"
      }}>
        {/* Header */}
        <div style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "30px",
          color: "white"
        }}>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: "bold" }}>
            🏠 Property Registry DApp
          </h1>
          <p style={{ margin: "10px 0 0 0", opacity: 0.9 }}>
            Secure blockchain-based property management system
          </p>
        </div>

        {/* Wallet Connection */}
        <div style={{ padding: "20px 30px", borderBottom: "2px solid #f0f0f0" }}>
          {error && (
            <div style={{ 
              background: "#fee", 
              border: "1px solid #fcc", 
              padding: 15, 
              marginBottom: 15,
              borderRadius: 10,
              color: "#c00"
            }}>
              {error}
            </div>
          )}

          {account ? (
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              background: "#e8f5e9",
              padding: 15,
              borderRadius: 10
            }}>
              <div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>Connected Wallet</div>
                <div style={{ fontWeight: "bold", fontSize: 16 }}>
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
                            </div>
              <div style={{
                background: "#4caf50",
                color: "white",
                padding: "5px 15px",
                borderRadius: 20,
                fontSize: 12
              }}>
                ✓ Connected
              </div>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              style={{ 
                width: "100%",
                padding: "15px", 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              Connect Wallet
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: "flex",
          borderBottom: "2px solid #f0f0f0",
          background: "#fafafa"
        }}>
          {["register", "search", "myProperties", "transfer"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "15px",
                border: "none",
                background: activeTab === tab ? "white" : "transparent",
                borderBottom: activeTab === tab ? "3px solid #667eea" : "none",
                cursor: "pointer",
                fontWeight: activeTab === tab ? "bold" : "normal",
                color: activeTab === tab ? "#667eea" : "#666",
                fontSize: 14
              }}
            >
              {tab === "register" && "📝 Register"}
              {tab === "search" && "🔍 Search"}
              {tab === "myProperties" && "📋 My Properties"}
              {tab === "transfer" && "↔️ Transfer"}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div style={{ padding: 30 }}>

          {/* ✅ REGISTER TAB */}
          {activeTab === "register" && (
            <div>
              <h2>Register New Property</h2>

              <input 
                placeholder="Enter Property ID"
                value={regId}
                onChange={e => setRegId(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  marginBottom: 15
                }}
              />

              <input 
                type="file"
                multiple
                onChange={handleFileChange}
                style={{
                  width: "100%",
                  padding: 12,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  marginBottom: 15
                }}
              />

              <button
                onClick={registerProperty}
                style={{
                  width: "100%",
                  padding: 15,
                  border: "none",
                  borderRadius: 10,
                  background: "#38ef7d",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Register Property
              </button>
            </div>
          )}

          {/* ✅ SEARCH TAB */}
          {activeTab === "search" && (
            <div>
              <h2>Search Property</h2>
              <input 
                placeholder="Enter Property ID"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  marginBottom: 15
                }}
              />
              <button
                onClick={searchProperty}
                style={{
                  width: "100%",
                  padding: 15,
                  border: "none",
                  borderRadius: 10,
                  background: "#667eea",
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                Search
              </button>

              {selectedProperty && (
                <div style={{ marginTop: 20 }}>
                  <p><strong>ID:</strong> {selectedProperty.id}</p>
                  <p><strong>Owner:</strong> {selectedProperty.owner}</p>
                  <p><strong>Registered on:</strong> {new Date(selectedProperty.timestamp * 1000).toLocaleString()}</p>

                  {selectedProperty.files?.map((file, i) => (
                    <a 
                      key={i}
                      href={file}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: "block", marginTop: 5, color: "#667eea" }}
                    >
                      📄 View Document {i+1}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ✅ TRANSFER TAB */}
          {activeTab === "transfer" && (
            <div>
              <h2>Transfer Ownership</h2>

              <input
                placeholder="Property ID"
                value={transferId}
                onChange={e => setTransferId(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  marginBottom: 15
                }}
              />

              <input
                placeholder="New Owner Address"
                value={transferAddress}
                onChange={e => setTransferAddress(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  marginBottom: 15,
                  fontFamily: "monospace"
                }}
              />

              <button
                onClick={transferOwnership}
                style={{
                  width: "100%",
                  padding: 15,
                  border: "none",
                  borderRadius: 10,
                  background: "#f5576c",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Transfer
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
