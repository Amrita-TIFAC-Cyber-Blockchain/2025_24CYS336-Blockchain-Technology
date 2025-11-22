// client/src/utils/web3Service.js (Ethers.js v6 + IPFS Integration)

import { BrowserProvider, Contract } from 'ethers';
import CertificateVerifierArtifact from '../contracts/CertificateVerifier.json';
import { create } from 'ipfs-http-client';

// Configuration
const REQUIRED_CHAIN_ID = 31337; // Updated to 31337 for stable MetaMask connection
const IPFS_CLIENT_CONFIG = { host: '127.0.0.1', port: 5001, protocol: 'http' };

// Initialize IPFS Client
const ipfs = create(IPFS_CLIENT_CONFIG);

let provider;
let signer;
let contract;
let adminAddress;
let currentAccount;

/**
 * @dev Connects to MetaMask (BrowserProvider), gets the Signer, and loads the contract.
 */
export const connectWallet = async () => {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install it to use this DApp.");
    }
    
    try {
        provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();

        const network = await provider.getNetwork();
        currentAccount = await signer.getAddress();
        
        const receivedChainId = Number(network.chainId);

        if (receivedChainId !== REQUIRED_CHAIN_ID) {
            throw new Error(`Please connect to the Ganache network (Chain ID: ${REQUIRED_CHAIN_ID}).`);
        }

        const deployedNetwork = CertificateVerifierArtifact.networks[REQUIRED_CHAIN_ID.toString()];
        if (!deployedNetwork) {
            throw new Error('Contract not deployed on the current network.');
        }

        // Initialize contract with the Signer for write access
        contract = new Contract(
            deployedNetwork.address,
            CertificateVerifierArtifact.abi,
            signer
        );
        
        adminAddress = await contract.getAdmin();

        return { account: currentAccount, chainId: receivedChainId.toString() };

    } catch (error) {
        console.error("Connection Error:", error);
        throw error;
    }
};

/**
 * @dev Fetches all certificate data, including the IPFS hash.
 */
export const fetchAllCertificates = async () => {
    if (!contract || !provider) return [];
    
    const nextId = await contract.getNextId();
    const certificates = [];

    for (let i = 1001; i < nextId; i++) {
        try {
            // readCertificate now returns 7 values: id, name, course, date, issuer, ipfsHash, exists
            const [id, recipientName, courseName, issueDate, issuerAddress, ipfsHash, exists] = 
                await contract.readCertificate(i);
            
            if (exists) {
                certificates.push({
                    id: Number(id),
                    recipientName: recipientName,
                    courseName: courseName,
                    issueDate: new Date(Number(issueDate) * 1000).toLocaleDateString(), 
                    issuerAddress: issuerAddress,
                    ipfsHash: ipfsHash,
                });
            }
        } catch (error) {
            // Ignore if the specific ID does not exist
            if (!error.message.includes("does not exist")) {
                 console.error(`Error reading certificate ID ${i}:`, error);
            }
        }
    }
    return certificates;
};

// --- CRUD Transaction Functions (Admin Only) ---

/**
 * @dev Uploads file to IPFS and stores the CID hash in the contract.
 */
export const createCertificate = async (file, name, course, date, issuer) => {
    // 1. UPLOAD FILE TO IPFS
    let ipfsHash = '';
    if (file) {
        console.log("Uploading file to IPFS...");
        const result = await ipfs.add(file);
        ipfsHash = result.cid.toString();
        console.log(`IPFS Hash: ${ipfsHash}`);
    }

    // 2. SEND TRANSACTION WITH HASH
    const timestamp = Math.floor(new Date(date).getTime() / 1000);
    
    const tx = await contract.createCertificate(name, course, timestamp, issuer, ipfsHash); 
    
    return tx.wait(); // Wait for the transaction to be mined
};

export const updateCertificate = async (id, course, date) => {
    const timestamp = Math.floor(new Date(date).getTime() / 1000);
    const tx = await contract.updateCertificate(id, course, timestamp);
    return tx.wait();
};

export const deleteCertificate = async (id) => {
    const tx = await contract.deleteCertificate(id);
    return tx.wait();
};

// --- Export Helpers ---

export const getAdminAddress = () => adminAddress;
export const getCurrentAccount = () => currentAccount;
