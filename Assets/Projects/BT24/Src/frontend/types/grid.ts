// Smart Grid 3.0 DApp Type Definitions

export interface Nanogrid {
  nanogrid_id: string;
  address: string;
  solar_output: number;
  load_demand: number;
  battery_soc: number;
}

export interface BlockchainTransaction {
  tx_id?: string;
  sender: string;
  receiver: string;
  amountInKwh: string | bigint;
  timestamp: string | bigint;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  isProsumer: boolean;
  isLoading: boolean;
  error?: string | null;
}

export interface GridStatus {
  nanogrids: Nanogrid[];
  totalSolarOutput: number;
  totalLoadDemand: number;
  averageBatterySoC: number;
}

export interface TradeData {
  amount: number;
  buyerAddress: string;
}

// Re-export blockchain config for backward compatibility
export { CONTRACT_ADDRESS, BLOCKCHAIN_CONFIG, CUSTOM_NETWORK } from '@/blockchain/config';
export { default as CONTRACT_ABI } from '@/blockchain/abi/EnergyMarket.json';