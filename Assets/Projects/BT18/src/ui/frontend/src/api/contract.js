// src/api/contract.js
import { ethers } from "ethers";
import contractABI from "../abi/CredentialNFT.json"; // you'll add this ABI folder here too

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not detected");

  // Request wallet connection
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
};

// For read-only access (no wallet pop-up)
export const getReadOnlyContract = () => {
  const provider = new ethers.JsonRpcProvider(
    `https://${process.env.REACT_APP_NETWORK}.infura.io/v3/YOUR_INFURA_PROJECT_ID`
  );
  return new ethers.Contract(contractAddress, contractABI, provider);
};