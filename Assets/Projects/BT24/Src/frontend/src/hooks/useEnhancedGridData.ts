import { useState, useEffect } from 'react';
import { useBackendConfig } from '@/contexts/BackendConfigContext';

export interface PerformanceMetrics {
  efficiency: number;
  utilization: number;
  healthScore: number;
  temperatureC: number;
  voltage: number;
  current: number;
  transmissionLoss: number;
}

export interface ForecastData {
  hour: string;
  solarPrediction: number;
  loadPrediction: number;
  batteryPrediction: number;
  priceForcast: number;
  confidence: number;
  weatherCondition: string;
}

export interface MarketOrder {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  address: string;
  timestamp: number;
  status: 'active' | 'filled' | 'cancelled';
}

export interface MarketDepth {
  buyOrders: MarketOrder[];
  sellOrders: MarketOrder[];
  spread: number;
  volume24h: number;
  priceChange24h: number;
}

export interface EnhancedNanogridData {
  nanogrid_id: number;
  address: string;
  solar_output: number;
  load_demand: number;
  battery_soc: number;
  power_balance: number;
  performance: PerformanceMetrics;
  forecast: ForecastData[];
  maintenanceScheduled: Date | null;
  isOptimized: boolean;
}

export interface TradingAnalytics {
  totalVolume: number;
  averagePrice: number;
  priceVolatility: number;
  marketSentiment: 'bullish' | 'bearish' | 'neutral';
  liquidityScore: number;
}

export interface EnhancedGridData {
  nanogrids: EnhancedNanogridData[];
  marketDepth: MarketDepth;
  tradingAnalytics: TradingAnalytics;
  priceHistory: Array<{ timestamp: number; price: number; volume: number }>;
  loading: boolean;
  error: string | null;
}

export function useEnhancedGridData(): EnhancedGridData {
  const { config } = useBackendConfig();
  const [data, setData] = useState<EnhancedGridData>({
    nanogrids: [],
    marketDepth: {
      buyOrders: [],
      sellOrders: [],
      spread: 0,
      volume24h: 0,
      priceChange24h: 0
    },
    tradingAnalytics: {
      totalVolume: 0,
      averagePrice: 0.12,
      priceVolatility: 0,
      marketSentiment: 'neutral',
      liquidityScore: 0
    },
    priceHistory: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchEnhanced = async () => {
      try {
        const [gridResp, marketResp, systemResp] = await Promise.all([
          fetch(`${config.apiUrl}/api/grid-status`),
          fetch(`${config.apiUrl}/api/market/orders`),
          fetch(`${config.apiUrl}/api/system/status`)
        ]);

        const grids = await gridResp.json();
        const market = await marketResp.json();
        const system = await systemResp.json();

        setData({
          nanogrids: (grids as any[])?.map(g => ({
            nanogrid_id: g.nanogrid_id,
            address: g.address,
            solar_output: g.solar_output,
            load_demand: g.load_demand,
            battery_soc: g.battery_soc,
            power_balance: typeof g.power_balance !== 'undefined' ? g.power_balance : g.solar_output - g.load_demand,
            performance: {
              efficiency: 0,
              utilization: 0,
              healthScore: 0,
              temperatureC: 0,
              voltage: 0,
              current: 0,
              transmissionLoss: 0
            },
            forecast: [],
            maintenanceScheduled: null,
            isOptimized: false
          })),
          marketDepth: {
            buyOrders: market.buy_orders ?? [],
            sellOrders: market.sell_orders ?? [],
            spread: market.spread ?? 0,
            volume24h: market.volume24h ?? 0,
            priceChange24h: market.priceChange24h ?? 0
          },
          tradingAnalytics: {
            totalVolume: system.marketVolume ?? 0,
            averagePrice: system.marketPrice ?? 0.12,
            priceVolatility: 0,
            marketSentiment: 'neutral',
            liquidityScore: 0
          },
          priceHistory: [],
          loading: false,
          error: null
        });
      } catch (err: any) {
        console.error('Failed to load enhanced data:', err);
        setData((prev) => ({ ...prev, loading: false, error: err?.message ?? 'Failed to fetch enhanced grid data' }));
      }
    };

    fetchEnhanced();
    const id = setInterval(fetchEnhanced, 5000);
    return () => clearInterval(id);
  }, [config.apiUrl]);

  return data;
}
