import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Scene } from '@/components/DigitalTwin/Scene';
import { useSmartGridData } from '@/hooks/useSmartGridData';
import { useBlockchainData } from '@/hooks/useBlockchainData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Battery, Activity, TrendingUp } from 'lucide-react';

interface NanogridData {
  nanogrid_id: number;
  address: string;
  solar_output: number;
  load_demand: number;
  battery_soc: number;
}

const DigitalTwin = () => {
  const gridData = useSmartGridData();
  const { transactions } = useBlockchainData();
  const [selectedNanogrid, setSelectedNanogrid] = useState<NanogridData | null>(null);

  const nanogrids = gridData.nanogrids || [];

  const stats = {
    totalSolar: nanogrids.reduce((sum, ng) => sum + ng.solar_output, 0),
    totalLoad: nanogrids.reduce((sum, ng) => sum + ng.load_demand, 0),
    avgBattery: nanogrids.reduce((sum, ng) => sum + ng.battery_soc, 0) / (nanogrids.length || 1),
    activeNanogrids: nanogrids.length
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        activeTab="digital-twin" 
        onTabChange={() => {}} 
        systemMode={gridData.systemStatus.mode}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Smart Grid Digital Twin
          </h1>
          <p className="text-muted-foreground">
            Real-time 3D visualization of your energy trading network
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Solar Output</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSolar.toFixed(1)} kWh</div>
              <p className="text-xs text-muted-foreground">Current generation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Load</CardTitle>
              <Activity className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLoad.toFixed(1)} kWh</div>
              <p className="text-xs text-muted-foreground">Current demand</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Battery</CardTitle>
              <Battery className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgBattery.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">State of charge</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Nanogrids</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeNanogrids}</div>
              <p className="text-xs text-muted-foreground">Connected nodes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Visualization */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>3D Grid Visualization</CardTitle>
              <CardDescription>
                Interactive view of all nanogrids and energy flows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] rounded-lg overflow-hidden bg-black/20">
                <Scene
                  nanogrids={nanogrids}
                  transactions={transactions}
                  onNanogridClick={setSelectedNanogrid}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  High Battery (&gt;70%)
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  Medium Battery (30-70%)
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  Low Battery (&lt;30%)
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Solar Panel
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Nanogrid Details */}
          <Card>
            <CardHeader>
              <CardTitle>Nanogrid Details</CardTitle>
              <CardDescription>
                {selectedNanogrid ? `NG-${selectedNanogrid.nanogrid_id}` : 'Click a nanogrid to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedNanogrid ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Address</div>
                    <div className="text-xs font-mono bg-muted p-2 rounded break-all">
                      {selectedNanogrid.address}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Solar Output</div>
                      <div className="text-2xl font-bold text-yellow-500">
                        {selectedNanogrid.solar_output.toFixed(2)} kWh
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Load Demand</div>
                      <div className="text-2xl font-bold text-red-500">
                        {selectedNanogrid.load_demand.toFixed(2)} kWh
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="text-sm text-muted-foreground mb-1">Battery SoC</div>
                      <div className="text-2xl font-bold text-green-500">
                        {selectedNanogrid.battery_soc.toFixed(2)}%
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${selectedNanogrid.battery_soc}%`,
                            backgroundColor: selectedNanogrid.battery_soc > 70 ? '#10b981' : 
                                           selectedNanogrid.battery_soc > 30 ? '#f59e0b' : '#ef4444'
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="text-sm text-muted-foreground mb-1">Energy Balance</div>
                      <div className={`text-2xl font-bold ${
                        selectedNanogrid.solar_output - selectedNanogrid.load_demand > 0 
                          ? 'text-green-500' 
                          : 'text-red-500'
                      }`}>
                        {(selectedNanogrid.solar_output - selectedNanogrid.load_demand).toFixed(2)} kWh
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {selectedNanogrid.solar_output - selectedNanogrid.load_demand > 0 
                          ? 'Surplus available for trading' 
                          : 'Deficit - needs energy'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Status</div>
                    <Badge className="gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      Online
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a nanogrid from the 3D view</p>
                  <p className="text-sm mt-2">Click on any node to see detailed information</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Energy Trades</CardTitle>
            <CardDescription>Live transaction feed from the blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {transactions.slice(0, 5).map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <div>
                      <div className="text-sm font-medium">
                        {tx.amount_kwh.toFixed(2)} kWh
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {tx.sender_address.slice(0, 6)}...{tx.sender_address.slice(-4)} → {tx.receiver_address.slice(0, 6)}...{tx.receiver_address.slice(-4)}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(tx.created_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DigitalTwin;
