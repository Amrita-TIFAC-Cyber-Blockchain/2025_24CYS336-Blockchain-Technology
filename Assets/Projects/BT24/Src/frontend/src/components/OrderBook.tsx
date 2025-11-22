import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Clock,
  DollarSign,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Target
} from "lucide-react";
import { MarketOrder, MarketDepth, TradingAnalytics } from "@/hooks/useEnhancedGridData";
import { toast } from "@/hooks/use-toast";

interface OrderBookProps {
  marketDepth: MarketDepth;
  tradingAnalytics: TradingAnalytics;
  onPlaceOrder?: (order: Omit<MarketOrder, 'id' | 'timestamp' | 'status'>) => void;
}

export function OrderBook({ marketDepth, tradingAnalytics, onPlaceOrder }: OrderBookProps) {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [orderAmount, setOrderAmount] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [priceType, setPriceType] = useState<'market' | 'limit'>('market');

  const { buyOrders, sellOrders, spread, volume24h, priceChange24h } = marketDepth;

  const maxBuyOrderSize = Math.max(...buyOrders.map(o => o.amount), 0);
  const maxSellOrderSize = Math.max(...sellOrders.map(o => o.amount), 0);
  const maxOrderSize = Math.max(maxBuyOrderSize, maxSellOrderSize);

  const bestBid = buyOrders[0]?.price || 0;
  const bestAsk = sellOrders[0]?.price || 0;
  const midPrice = (bestBid + bestAsk) / 2;

  const handlePlaceOrder = () => {
    if (!orderAmount || parseFloat(orderAmount) <= 0) {
      toast({
        title: "Invalid Order",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (priceType === 'limit' && (!orderPrice || parseFloat(orderPrice) <= 0)) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price for limit orders",
        variant: "destructive",
      });
      return;
    }

    const price = priceType === 'market' ? (orderType === 'buy' ? bestAsk : bestBid) : parseFloat(orderPrice);

    const order = {
      type: orderType,
      amount: parseFloat(orderAmount),
      price,
      address: '0x' + Math.random().toString(16).substr(2, 40),
    };

    onPlaceOrder?.(order);

    toast({
      title: "Order Placed",
      description: `${orderType === 'buy' ? 'Buy' : 'Sell'} order for ${orderAmount} kWh at $${price.toFixed(3)}`,
    });

    setOrderAmount('');
    setOrderPrice('');
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-emerald-600';
      case 'bearish': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp className="h-4 w-4" />;
      case 'bearish': return <TrendingDown className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <DollarSign className="h-6 w-6 mb-2 text-primary" />
            <div className="text-lg font-bold">${midPrice.toFixed(3)}</div>
            <div className="text-xs text-muted-foreground">Mid Price</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <ArrowUpRight className="h-6 w-6 mb-2 text-emerald-500" />
            <div className="text-lg font-bold">${bestBid.toFixed(3)}</div>
            <div className="text-xs text-muted-foreground">Best Bid</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <ArrowDownRight className="h-6 w-6 mb-2 text-red-500" />
            <div className="text-lg font-bold">${bestAsk.toFixed(3)}</div>
            <div className="text-xs text-muted-foreground">Best Ask</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Target className="h-6 w-6 mb-2 text-purple-500" />
            <div className="text-lg font-bold">${spread.toFixed(3)}</div>
            <div className="text-xs text-muted-foreground">Spread</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Zap className="h-6 w-6 mb-2 text-blue-500" />
            <div className="text-lg font-bold">{volume24h.toFixed(0)}</div>
            <div className="text-xs text-muted-foreground">24h Volume</div>
          </CardContent>
        </Card>
      </div>

      {/* Market Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Market Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">${tradingAnalytics.averagePrice.toFixed(3)}</div>
              <div className="text-sm text-muted-foreground">Avg Price (24h)</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">{tradingAnalytics.priceVolatility.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Volatility</div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${getSentimentColor(tradingAnalytics.marketSentiment)}`}>
                {getSentimentIcon(tradingAnalytics.marketSentiment)}
                <span className="capitalize">{tradingAnalytics.marketSentiment}</span>
              </div>
              <div className="text-sm text-muted-foreground">Sentiment</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">{tradingAnalytics.liquidityScore.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">Liquidity Score</div>
              <Progress value={tradingAnalytics.liquidityScore} className="mt-2 h-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="orderbook" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orderbook">Order Book</TabsTrigger>
          <TabsTrigger value="trade">Place Order</TabsTrigger>
          <TabsTrigger value="depth">Market Depth</TabsTrigger>
        </TabsList>

        <TabsContent value="orderbook">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buy Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="h-5 w-5" />
                  Buy Orders ({buyOrders.length})
                </CardTitle>
                <CardDescription>Bids sorted by price (highest first)</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Price</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buyOrders.slice(0, 10).map((order, index) => (
                      <TableRow key={order.id} className="hover:bg-emerald-50">
                        <TableCell className="font-medium text-emerald-600">
                          ${order.price.toFixed(3)}
                        </TableCell>
                        <TableCell>{order.amount.toFixed(1)} kWh</TableCell>
                        <TableCell>${(order.price * order.amount).toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={(order.amount / maxOrderSize) * 100} 
                              className="w-8 h-1"
                            />
                            <span className="text-xs">
                              {((order.amount / maxOrderSize) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Sell Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <TrendingDown className="h-5 w-5" />
                  Sell Orders ({sellOrders.length})
                </CardTitle>
                <CardDescription>Asks sorted by price (lowest first)</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Price</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellOrders.slice(0, 10).map((order, index) => (
                      <TableRow key={order.id} className="hover:bg-red-50">
                        <TableCell className="font-medium text-red-600">
                          ${order.price.toFixed(3)}
                        </TableCell>
                        <TableCell>{order.amount.toFixed(1)} kWh</TableCell>
                        <TableCell>${(order.price * order.amount).toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={(order.amount / maxOrderSize) * 100} 
                              className="w-8 h-1"
                            />
                            <span className="text-xs">
                              {((order.amount / maxOrderSize) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trade">
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
              <CardDescription>Create buy or sell orders for energy trading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={orderType === 'buy' ? "default" : "outline"}
                  onClick={() => setOrderType('buy')}
                  className="h-12"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Buy
                </Button>
                <Button
                  variant={orderType === 'sell' ? "default" : "outline"}
                  onClick={() => setOrderType('sell')}
                  className="h-12"
                >
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Sell
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={priceType === 'market' ? "default" : "outline"}
                  onClick={() => setPriceType('market')}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Market Order
                </Button>
                <Button
                  variant={priceType === 'limit' ? "default" : "outline"}
                  onClick={() => setPriceType('limit')}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Limit Order
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (kWh)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="Enter amount"
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(e.target.value)}
                  />
                </div>

                {priceType === 'limit' && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($/kWh)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.001"
                      min="0"
                      placeholder="Enter price"
                      value={orderPrice}
                      onChange={(e) => setOrderPrice(e.target.value)}
                    />
                  </div>
                )}

                {priceType === 'market' && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm">
                      <div className="flex justify-between mb-2">
                        <span>Estimated Price:</span>
                        <span>${orderType === 'buy' ? bestAsk.toFixed(3) : bestBid.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Est. Total:</span>
                        <span>
                          ${((parseFloat(orderAmount) || 0) * (orderType === 'buy' ? bestAsk : bestBid)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handlePlaceOrder}
                  className="w-full h-12"
                  disabled={!orderAmount}
                >
                  Place {orderType} Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depth">
          <Card>
            <CardHeader>
              <CardTitle>Market Depth Chart</CardTitle>
              <CardDescription>Cumulative order volume visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Market depth visualization</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Interactive depth chart would be implemented here
                  </p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2 text-emerald-600">Buy Side Depth</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Total Volume:</span>
                      <span>{buyOrders.reduce((sum, o) => sum + o.amount, 0).toFixed(1)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Price:</span>
                      <span>${(buyOrders.reduce((sum, o) => sum + o.price, 0) / buyOrders.length).toFixed(3)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-red-600">Sell Side Depth</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Total Volume:</span>
                      <span>{sellOrders.reduce((sum, o) => sum + o.amount, 0).toFixed(1)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Price:</span>
                      <span>${(sellOrders.reduce((sum, o) => sum + o.price, 0) / sellOrders.length).toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}