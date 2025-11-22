/**
 * Blockchain Configuration
 * Update these values after deploying your smart contract
 */

export const BLOCKCHAIN_CONFIG = {
  // Network Configuration
  network: {
    chainId: 1337,
    name: 'Truffle Development Network',
    rpcUrl: 'http://127.0.0.1:8545',
    chainName: 'Ganache Local',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    }
  },
  
  // Smart Contract Address (Update this after deployment)
  contractAddress: '0xd25B8DE4715326bd1Ae5505E9E2f6a0AD1cE1fE8',
  
  // Gas Configuration
  gas: {
    limit: 6721975,
    price: 20000000000 // 20 Gwei
  }
};

// Export for backward compatibility
export const CUSTOM_NETWORK = BLOCKCHAIN_CONFIG.network;
export const CONTRACT_ADDRESS = BLOCKCHAIN_CONFIG.contractAddress;
