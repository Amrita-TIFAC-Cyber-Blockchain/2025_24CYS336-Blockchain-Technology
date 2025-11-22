import { useState, useEffect } from 'react';
import { useBackendConfig } from '@/contexts/BackendConfigContext';

interface NanogridData {
  nanogrid_id: number;
  solar_output: number;
  load_demand: number;
  battery_soc: number;
  power_balance: number;
  address: string;
}

interface Transaction {
  sender: string;
  receiver: string;
  amountInKwh: number;
  timestamp: number;
}

interface SystemStatus {
  mode: "simulation" | "live";
  nanogridsOnline: number;
  totalNanogrids: number;
  blockchainConnected: boolean;
  aiControllerActive: boolean;
}

interface SmartGridData {
  nanogrids: NanogridData[];
  transactions: Transaction[];
  systemStatus: SystemStatus;
  loading: boolean;
  error: string | null;
}

export function useSmartGridData(): SmartGridData {
  const { config, setIsConnected } = useBackendConfig();
  const [data, setData] = useState<SmartGridData>({
    nanogrids: [],
    transactions: [],
    systemStatus: {
      mode: "simulation",
      nanogridsOnline: 0,
      totalNanogrids: 5,
      blockchainConnected: true,
      aiControllerActive: true,
    },
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gridResponse, transactionsResponse, systemResponse] = await Promise.all([
          fetch(`${config.apiUrl}/api/grid-status`),
          fetch(`${config.apiUrl}/api/blockchain/transactions`),
          fetch(`${config.apiUrl}/api/system-status`)
        ]);

        const gridData = await gridResponse.json();
        const transactionsData = await transactionsResponse.json();
        const systemData = await systemResponse.json();

        setData({
          nanogrids: gridData.nanogrids || [],
          transactions: transactionsData.transactions || [],
          systemStatus: {
            mode: systemData.mode || "simulation",
            nanogridsOnline: systemData.nanogrids_online || 0,
            totalNanogrids: systemData.total_nanogrids || 5,
            blockchainConnected: systemData.blockchain_connected || false,
            aiControllerActive: systemData.ai_controller_active || false,
          },
          loading: false,
          error: null,
        });
        setIsConnected(true);
      } catch (error: any) {
        setIsConnected(false);
        console.error('Error fetching grid data:', error);
        setData((prev) => ({ ...prev, loading: false, error: error?.message ?? 'Failed to fetch data from backend' }));
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [config.apiUrl]);

  return data;
}
