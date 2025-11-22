import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CUSTOM_NETWORK, CONTRACT_ADDRESS } from '@/blockchain/config';
import CONTRACT_ABI from '@/blockchain/abi/EnergyMarket.json';
import type { WalletState, BlockchainTransaction } from '../../types/grid';

export const useWeb3 = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    isProsumer: false,
    isLoading: false,
    error: null
  });

  // Check if MetaMask is installed
  const isMetaMaskInstalled = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

  // Initialize provider and contract
  const initializeEthers = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Create provider
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(browserProvider);

        // Get signer
        const userSigner = await browserProvider.getSigner();
        setSigner(userSigner);

        // Initialize contract with signer
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, userSigner);
        setContract(contractInstance);

        return { provider: browserProvider, signer: userSigner, contract: contractInstance };
      } catch (error) {
        console.error('Failed to initialize ethers:', error);
        throw error;
      }
    } else {
      throw new Error('MetaMask not detected. Please install MetaMask!');
    }
  }, []);

  // Add or switch to custom network
  const addCustomNetwork = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      // Try to switch to the custom network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.toQuantity(CUSTOM_NETWORK.chainId) }],
      });
    } catch (switchError: any) {
      // Network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: ethers.toQuantity(CUSTOM_NETWORK.chainId),
              chainName: CUSTOM_NETWORK.name,
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: [CUSTOM_NETWORK.rpcUrl],
              blockExplorerUrls: null
            }]
          });
        } catch (addError) {
          console.error('Failed to add network:', addError);
          throw addError;
        }
      } else {
        throw switchError;
      }
    }
  }, []);

  // Connect to MetaMask and custom network
  const connectWallet = useCallback(async () => {
    setWalletState(prev => ({ ...prev, isLoading: true }));
    
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not detected. Please install MetaMask!');
      }

      // Add/switch to custom network first
      await addCustomNetwork();

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please check your MetaMask.');
      }

      // Initialize ethers
      const { contract: contractInstance } = await initializeEthers();
      const userAddress = accounts[0];

      // Check if user is registered prosumer
      let isProsumerRegistered = false;
      if (contractInstance) {
        try {
          isProsumerRegistered = await contractInstance.isProsumer(userAddress);
        } catch (error) {
          console.warn('Could not check prosumer status:', error);
        }
      }

      setWalletState({
        isConnected: true,
        address: userAddress,
        isProsumer: isProsumerRegistered,
        isLoading: false,
        error: null
      });

      return userAddress;
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      setWalletState(prev => ({ 
        ...prev, 
        isLoading: false,
        isConnected: false,
        address: null,
        error: error.message || 'Failed to connect wallet'
      }));
      throw error;
    }
  }, [addCustomNetwork, initializeEthers]);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      isProsumer: false,
      isLoading: false,
      error: null
    });
    setProvider(null);
    setSigner(null);
    setContract(null);
  }, []);

  // Register as prosumer
  const registerProsumer = useCallback(async () => {
    if (!contract || !walletState.address) {
      throw new Error('Wallet not connected');
    }

    try {
      setWalletState(prev => ({ ...prev, isLoading: true }));
      
      // Check network connectivity first
      try {
        await provider?.getBlockNumber();
      } catch (networkError) {
        throw new Error('Cannot connect to blockchain network. Please ensure your local blockchain (Ganache/Truffle) is running on http://127.0.0.1:8545');
      }
      
      // Call registerProsumer without parameters - uses msg.sender
      const tx = await contract.registerProsumer();
      await tx.wait(); // Wait for transaction confirmation
      
      setWalletState(prev => ({ 
        ...prev, 
        isProsumer: true, 
        isLoading: false,
        error: null
      }));
      
      return tx.hash;
    } catch (error: any) {
      console.error('Failed to register prosumer:', error);
      
      // Provide more helpful error messages
      let errorMessage = 'Failed to register as prosumer';
      
      if (error.message?.includes('circuit breaker') || error.message?.includes('blockchain network')) {
        errorMessage = 'Blockchain not running. Start Ganache on port 8545 and try again.';
      } else if (error.message?.includes('user rejected')) {
        errorMessage = 'Transaction was rejected in MetaMask';
      } else if (error.message?.includes('Already registered')) {
        errorMessage = 'You are already registered as a prosumer';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setWalletState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: errorMessage
      }));
      
      throw new Error(errorMessage);
    }
  }, [contract, walletState.address, provider]);

  // Report energy surplus
  const reportEnergySurplus = useCallback(async (surplusInKwh: number) => {
    if (!contract || !walletState.address) {
      throw new Error('Wallet not connected');
    }

    try {
      // Convert kWh to wei (using 18 decimals like ether)
      const surplusWei = ethers.parseEther(surplusInKwh.toString());
      const tx = await contract.reportEnergySurplus(surplusWei);
      await tx.wait(); // Wait for confirmation
      
      return tx.hash;
    } catch (error) {
      console.error('Failed to report energy surplus:', error);
      throw error;
    }
  }, [contract, walletState.address]);

  // Execute P2P trade
  const executeP2PTrade = useCallback(async (buyerAddress: string, amountInKwh: number) => {
    if (!contract || !walletState.address) {
      throw new Error('Wallet not connected');
    }

    try {
      // Convert kWh to wei
      const amountWei = ethers.parseEther(amountInKwh.toString());
      const tx = await contract.executeP2PTrade(buyerAddress, amountWei);
      await tx.wait(); // Wait for confirmation
      
      return tx.hash;
    } catch (error) {
      console.error('Failed to execute P2P trade:', error);
      throw error;
    }
  }, [contract, walletState.address]);

  // Get prosumer energy balance
  const getEnergyBalance = useCallback(async (address?: string): Promise<number> => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const targetAddress = address || walletState.address;
      if (!targetAddress) {
        throw new Error('No address provided');
      }

      const balanceWei = await contract.prosumerEnergyBalance(targetAddress);
      return parseFloat(ethers.formatEther(balanceWei));
    } catch (error) {
      console.error('Failed to get energy balance:', error);
      return 0;
    }
  }, [contract, walletState.address]);

  // Get all transactions
  const getTransactions = useCallback(async (): Promise<BlockchainTransaction[]> => {
    if (!contract) {
      return [];
    }

    try {
      const transactions = await contract.getTransactions();
      return transactions.map((tx: any, index: number) => ({
        tx_id: `tx_${index}`,
        sender: tx.sender,
        receiver: tx.receiver,
        amountInKwh: tx.amountInKwh.toString(),
        timestamp: tx.timestamp.toString()
      }));
    } catch (error) {
      console.error('Failed to get transactions:', error);
      return [];
    }
  }, [contract]);

  // Get network information
  const getNetworkInfo = useCallback(async () => {
    if (!provider) return null;
    
    try {
      const network = await provider.getNetwork();
      return {
        chainId: Number(network.chainId),
        name: network.name,
        isCustomNetwork: Number(network.chainId) === CUSTOM_NETWORK.chainId
      };
    } catch (error) {
      console.error('Failed to get network info:', error);
      return null;
    }
  }, [provider]);

  // Listen for account and network changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== walletState.address) {
          // Account changed, reconnect
          connectWallet().catch(console.error);
        }
      };

      const handleChainChanged = (chainId: string) => {
        const newChainId = parseInt(chainId, 16);
        if (newChainId !== CUSTOM_NETWORK.chainId) {
          // Chain changed away from our custom network
          console.warn('Please switch back to the Truffle Development Network');
        }
        // Reload to reset state
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [walletState.address, connectWallet, disconnectWallet]);

  // Auto-connect if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            // Check if we're on the right network
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const currentChainId = parseInt(chainId, 16);
            
            if (currentChainId === CUSTOM_NETWORK.chainId) {
              await initializeEthers();
              // Don't auto-connect completely, let user manually connect
            }
          }
        } catch (error) {
          console.error('Auto-connect failed:', error);
        }
      }
    };

    autoConnect();
  }, [initializeEthers]);

  return {
    provider,
    signer,
    contract,
    walletState,
    connectWallet,
    disconnectWallet,
    registerProsumer,
    reportEnergySurplus,
    executeP2PTrade,
    getEnergyBalance,
    getTransactions,
    getNetworkInfo,
    addCustomNetwork,
    isMetaMaskInstalled: typeof window.ethereum !== 'undefined',
    customNetwork: CUSTOM_NETWORK
  };
};

// Extend window object for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}