import { useState, useEffect } from 'react';
import { supabase } from '@/integration/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NanogridData {
  id: string;
  nanogrid_id: number;
  name: string;
  wallet_address: string;
  solar_output: number;
  load_demand: number;
  battery_soc: number;
  power_balance: number;
  status: string;
}

interface Transaction {
  id: string;
  transaction_hash: string;
  sender_address: string;
  receiver_address: string;
  amount_kwh: number;
  price_per_kwh: number;
  total_cost: number;
  status: string;
  block_number: number;
  created_at: string;
}

interface BlockchainData {
  nanogrids: NanogridData[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export function useBlockchainData(): BlockchainData {
  const [data, setData] = useState<BlockchainData>({
    nanogrids: [],
    transactions: [],
    loading: true,
    error: null,
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch nanogrids with latest energy metrics
        const { data: nanogridsData, error: nanogridError } = await supabase
          .from('nanogrids')
          .select(`
            *,
            energy_metrics (
              solar_output,
              load_demand,
              battery_soc,
              power_balance,
              timestamp
            )
          `)
          .eq('status', 'online')
          .order('created_at', { ascending: false });

        if (nanogridError) throw nanogridError;

        // Fetch recent transactions
        const { data: transactionsData, error: txError } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (txError) throw txError;

        // Transform data
        const transformedNanogrids = (nanogridsData || []).map((ng: any) => {
          const latestMetrics = ng.energy_metrics?.[0] || {
            solar_output: 0,
            load_demand: 0,
            battery_soc: 0,
            power_balance: 0,
          };

          return {
            id: ng.id,
            nanogrid_id: ng.nanogrid_id,
            name: ng.name,
            wallet_address: ng.wallet_address,
            solar_output: parseFloat(latestMetrics.solar_output) || 0,
            load_demand: parseFloat(latestMetrics.load_demand) || 0,
            battery_soc: parseFloat(latestMetrics.battery_soc) || 0,
            power_balance: parseFloat(latestMetrics.power_balance) || 0,
            status: ng.status,
          };
        });

        const transformedTransactions = (transactionsData || []).map((tx: any) => ({
          id: tx.id,
          transaction_hash: tx.transaction_hash,
          sender_address: tx.sender_address,
          receiver_address: tx.receiver_address,
          amount_kwh: parseFloat(tx.amount_kwh),
          price_per_kwh: parseFloat(tx.price_per_kwh),
          total_cost: parseFloat(tx.total_cost),
          status: tx.status,
          block_number: tx.block_number,
          created_at: tx.created_at,
        }));

        setData({
          nanogrids: transformedNanogrids,
          transactions: transformedTransactions,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        console.error('Error fetching blockchain data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchData();

    // Subscribe to real-time updates
    const metricsChannel = supabase
      .channel('energy_metrics_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'energy_metrics',
        },
        () => fetchData()
      )
      .subscribe();

    const transactionsChannel = supabase
      .channel('transactions_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions',
        },
        (payload) => {
          toast({
            title: "New Transaction",
            description: `${payload.new.amount_kwh} kWh traded for ${payload.new.total_cost} tokens`,
          });
          fetchData();
        }
      )
      .subscribe();

    // Refresh data every 10 seconds
    const interval = setInterval(fetchData, 10000);

    return () => {
      supabase.removeChannel(metricsChannel);
      supabase.removeChannel(transactionsChannel);
      clearInterval(interval);
    };
  }, [toast]);

  return data;
}
