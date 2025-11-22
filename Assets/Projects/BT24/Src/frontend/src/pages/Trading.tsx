import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/hooks/useWeb3";
import { useSmartGridData } from "@/hooks/useSmartGridData";
import { useEnhancedGridData } from "@/hooks/useEnhancedGridData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Zap, 
  ArrowRightLeft,
  DollarSign,
  PieChart,
  BarChart3,
  History,
  AlertCircle,
  Send
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";
import { OrderBook } from "@/components/OrderBook";
import type { BlockchainTransaction } from "../../types/grid";

interface TradeOrder {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  address: string;
  timestamp: number;
}

const Trading = () => {
  const { nanogrids, loading, error } = useSmartGridData();
  const { 
    marketDepth, 
    tradingAnalytics, 
    priceHistory, 
    loading: enhancedLoading 
  } = useEnhancedGridData();
  const { 
    walletState, 
    executeP2PTrade, 
    getTransactions, 
    getEnergyBalance 
  } = useWeb3();
  
  const [tradeAmount, setTradeAmount] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [energyBalance, setEnergyBalance] = useState<number>(0);
  const [blockchainTransactions, setBlockchainTransactions] = useState<BlockchainTransaction[]>([]);

  // Mock data for trading
  // Remove mockOrderBook and mockPriceData, use backend data only

  const energyDistribution = [
    { name: 'Solar Surplus', value: 45, color: '#f59e0b' },
    { name: 'Battery Storage', value: 30, color: '#10b981' },
    { name: 'Grid Import', value: 25, color: '#6366f1' },
  ];

  const totalEnergyAvailable = nanogrids.reduce((sum, grid) => 
    sum + Math.max(0, grid.power_balance), 0
  );

  // Load blockchain data when wallet connects
  useEffect(() => {
    const loadBlockchainData = async () => {
      if (walletState.isConnected) {
        try {
          const [balance, txs] = await Promise.all([
            getEnergyBalance(),
            getTransactions()
          ]);
          setEnergyBalance(balance);
          setBlockchainTransactions(txs);
        } catch (error) {
          console.error('Failed to load blockchain data:', error);
        }
      }
    };
    
    loadBlockchainData();
  }, [walletState.isConnected, getEnergyBalance, getTransactions]);

  // Handle P2P trade execution
  const handleExecuteTrade = async () => {
    if (!tradeAmount || !buyerAddress || parseFloat(tradeAmount) <= 0) {
      toast({
        title: "Invalid Trade",
        description: "Please enter valid trade amount and buyer address",
        variant: "destructive",
      });
      return;
    }

    try {
      await executeP2PTrade(buyerAddress, parseFloat(tradeAmount));
      
      // Refresh data
      const [newBalance, newTxs] = await Promise.all([
        getEnergyBalance(),
        getTransactions()
      ]);
      setEnergyBalance(newBalance);
      setBlockchainTransactions(newTxs);
      
      // Clear form
      setTradeAmount("");
      setBuyerAddress("");
      
      toast({
        title: "Trade Executed",
        description: `Successfully traded ${tradeAmount} kWh`,
      });
    } catch (error: any) {
      toast({
        title: "Trade Failed",
        description: error.message || "Failed to execute trade",
        variant: "destructive",
      });
    }
  };

  if (loading || enhancedLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <p className="text-lg font-semibold">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Energy Trading</h1>
          <p className="text-muted-foreground">Peer-to-peer energy marketplace</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-3 py-1">
            {totalEnergyAvailable.toFixed(1)} kWh Available
          </Badge>
          {walletState.isConnected ? (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Wallet className="h-3 w-3 mr-1" />
                {`${walletState.address?.slice(0, 6)}...${walletState.address?.slice(-4)}`}
              </Badge>
              <Badge variant="default" className="text-xs bg-gradient-energy-primary">
                Balance: {energyBalance.toFixed(2)} kWh
              </Badge>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Connect wallet to access trading features
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="market" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="trade">Trade</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Market Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Current Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">$0.12</div>
                <p className="text-sm text-muted-foreground">per kWh</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-emerald-500">+3.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  24h Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,847</div>
                <p className="text-sm text-muted-foreground">kWh traded</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-emerald-500">+12.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Market Cap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$341.6K</div>
                <p className="text-sm text-muted-foreground">total value</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-500">-1.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Price Chart (24h)</CardTitle>
            </CardHeader>
            <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={(priceHistory ?? []).map((p: any, i: number) => ({ hour: p.hour ?? `${i}:00`, price: p.price ?? p.value ?? 0 }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enhanced Order Book */}
          <OrderBook 
            marketDepth={marketDepth}
            tradingAnalytics={tradingAnalytics}
            onPlaceOrder={(order) => {
              toast({
                title: "Order Placed",
                description: `${order.type} order for ${order.amount} kWh at $${order.price.toFixed(3)}`,
              });
            }}
          />
        </TabsContent>

        <TabsContent value="trade" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trade Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Execute P2P Trade
                </CardTitle>
                <CardDescription>
                  Direct energy transfer between prosumers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trade-amount">Amount (kWh)</Label>
                  <Input
                    id="trade-amount"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="Enter energy amount"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buyer-address">Buyer Address</Label>
                  <Input
                    id="buyer-address"
                    placeholder="0x..."
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                  />
                </div>

                {tradeAmount && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Estimated Price:</span>
                      <span>${(parseFloat(tradeAmount) * 0.12 || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span>Network Fee:</span>
                      <span>$0.05</span>
                    </div>
                    <Button 
                      onClick={handleExecuteTrade}
                      className="w-full"
                      disabled={!walletState.isConnected || !walletState.isProsumer || walletState.isLoading}
                    >
                      {walletState.isLoading ? "Processing..." : "Execute Trade"}
                    </Button>
                  </div>
                )}

                {!walletState.isConnected && (
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Connect your wallet to start trading</p>
                  </div>
                )}

                {walletState.isConnected && !walletState.isProsumer && (
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Register as prosumer to start trading</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Energy Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Energy Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={energyDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {energyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Energy Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{energyBalance.toFixed(2)} kWh</div>
                <p className="text-sm text-muted-foreground">Available for trading</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trading Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">+$127.50</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{blockchainTransactions.length}</div>
                <p className="text-sm text-muted-foreground">Completed transactions</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {blockchainTransactions.length > 0 ? (
                  blockchainTransactions.map((tx, index) => (
                    <div key={tx.tx_id || index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <ArrowRightLeft className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">Energy Transfer</p>
                          <p className="text-sm text-muted-foreground">
                            From: {`${tx.sender.slice(0, 6)}...${tx.sender.slice(-4)}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            To: {`${tx.receiver.slice(0, 6)}...${tx.receiver.slice(-4)}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="font-medium">{ethers.formatEther(tx.amountInKwh.toString())} kWh</p>
                         <p className="text-sm text-muted-foreground">
                           {new Date(Number(tx.timestamp.toString()) * 1000).toLocaleDateString()}
                         </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No transactions yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Trading;