// hooks/useBlockchain.ts
'use client'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from "../app/components/abi/UserRegistry.json";

const CONTRACT_ADDRESS = "0x40e0b31400c0c6b9099e16f052524a802af10180";

export function useBlockchain() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string>('');

  useEffect(() => {
    initializeProvider();
  }, []);

  const initializeProvider = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const browserProvider = new ethers.BrowserProvider((window as any).ethereum);
        setProvider(browserProvider);
        
        const network = await browserProvider.getNetwork();
        console.log('Connected to network:', network.name);
        
        // Listen for account changes
        (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
          setAccount(accounts[0] || '');
          initializeSigner(browserProvider);
        });
        
      } catch (error) {
        console.error('Error initializing provider:', error);
      }
    }
  };

  const initializeSigner = async (browserProvider: ethers.BrowserProvider) => {
    try {
      const newSigner = await browserProvider.getSigner();
      setSigner(newSigner);
      
      const userAddress = await newSigner.getAddress();
      setAccount(userAddress);
      
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        newSigner
      );
      setContract(contractInstance);
    } catch (error) {
      console.error('Error initializing signer:', error);
    }
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const browserProvider = new ethers.BrowserProvider((window as any).ethereum);
        await initializeSigner(browserProvider);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const createPost = async (text: string, imageCid: string = '') => {
    if (!contract) throw new Error('Contract not initialized');
    
    const tx = await contract.createPost(text, imageCid);
    await tx.wait();
    return tx;
  };
  const searchUsers = async (query: string): Promise<{address: string, username: string}[]> => {
  if (!contract) throw new Error('Contract not initialized');
  
  const [addresses, usernames] = await contract.searchUsers(query);
  return addresses.map((address: string, index: number) => ({
    address,
    username: usernames[index]
  }));
};


// In hooks/useBlockchain.ts - make sure these are included:
const likePost = async (userAddress: string, postIndex: number) => {
  if (!contract) throw new Error('Contract not initialized');
  
  const tx = await contract.likePost(userAddress, postIndex);
  await tx.wait();
  return tx;
};

const unlikePost = async (userAddress: string, postIndex: number) => {
  if (!contract) throw new Error('Contract not initialized');
  
  const tx = await contract.unlikePost(userAddress, postIndex);
  await tx.wait();
  return tx;
};
  return {
  provider,
  signer,
  contract,
  account,
  connectWallet,
  createPost,
  searchUsers,
  likePost,    // Make sure this is included
  unlikePost,  // Make sure this is included
  isConnected: !!account
};
}