import { EnergyCard } from "./EnergyCard";
import { NanogridCard } from "./NanogridCard";
import { TransactionCard } from "./TransactionCard";
import { EnergyFlowVisualization } from "./EnergyFlowVisualization";
import { SystemStatus } from "./SystemStatus";
import { useSmartGridData } from "@/hooks/useSmartGridData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Zap, Battery, Home, TrendingUp, History } from "lucide-react";

export function Dashboard() {
  const { nanogrids, transactions, systemStatus, loading, error } = useSmartGridData();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">System Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalGeneration = nanogrids.reduce((sum, ng) => sum + ng.solar_output, 0);
  const totalConsumption = nanogrids.reduce((sum, ng) => sum + ng.load_demand, 0);
  const totalStorage = nanogrids.reduce((sum, ng) => sum + ng.battery_soc, 0);
  const totalTrading = nanogrids.reduce((sum, ng) => sum + ng.power_balance, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnergyCard
            title="Total Generation"
            value={totalGeneration.toFixed(1)}
            unit="kW"
            icon={Zap}
            variant="generation"
            trend="up"
            status="online"
          />
          <EnergyCard
            title="Total Consumption"
            value={totalConsumption.toFixed(1)}
            unit="kW"
            icon={Home}
            variant="consumption"
            trend="stable"
            status="online"
          />
          <EnergyCard
            title="Total Storage"
            value={totalStorage.toFixed(1)}
            unit="kWh"
            icon={Battery}
            variant="storage"
            trend="up"
            status="online"
          />
          <EnergyCard
            title="Active Trading"
            value={Math.abs(totalTrading).toFixed(1)}
            unit="kW"
            icon={TrendingUp}
            variant="trading"
            trend={totalTrading > 0 ? "up" : "down"}
            status="online"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Energy Flow Visualization */}
          <div className="lg:col-span-2">
            <EnergyFlowVisualization
              totalGeneration={totalGeneration}
              totalConsumption={totalConsumption}
              totalStorage={totalStorage}
              totalTrading={totalTrading}
            />
          </div>

          {/* System Status */}
          <SystemStatus
            mode={systemStatus.mode}
            nanogridsOnline={systemStatus.nanogridsOnline}
            totalNanogrids={systemStatus.totalNanogrids}
            blockchainConnected={systemStatus.blockchainConnected}
            aiControllerActive={systemStatus.aiControllerActive}
          />
        </div>

        {/* Nanogrids and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Nanogrids Grid */}
          <Card className="bg-gradient-card border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-energy-generation" />
                Active Nanogrids ({nanogrids.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                {nanogrids.map((nanogrid) => (
                  <NanogridCard key={nanogrid.nanogrid_id} nanogrid={nanogrid} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-gradient-card border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-energy-trading" />
                Recent Transactions ({transactions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.slice(0, 8).map((transaction, index) => (
                  <TransactionCard key={index} transaction={transaction} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}