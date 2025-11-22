import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integration/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown } from "lucide-react";
import { z } from "zod";

const orderSchema = z.object({
  nanogrid_id: z.string().uuid(),
  order_type: z.enum(['buy', 'sell']),
  amount_kwh: z.number()
    .positive('Amount must be positive')
    .min(0.1, 'Minimum 0.1 kWh')
    .max(10000, 'Maximum 10,000 kWh')
    .finite('Invalid amount'),
  price_per_kwh: z.number()
    .positive('Price must be positive')
    .min(0.01, 'Minimum 0.01 tokens')
    .max(1000, 'Maximum 1000 tokens')
    .finite('Invalid price')
});

interface TradingInterfaceProps {
  nanogrids: Array<{
    id: string;
    nanogrid_id: number;
    name: string;
    power_balance: number;
  }>;
  userId: string;
}

export function TradingInterface({ nanogrids, userId }: TradingInterfaceProps) {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [selectedNanogrid, setSelectedNanogrid] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateOrder = async () => {
    if (!selectedNanogrid || !amount || !price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Parse and validate inputs
      const amountNum = parseFloat(amount);
      const priceNum = parseFloat(price);

      // Validate with zod schema
      const validationResult = orderSchema.safeParse({
        nanogrid_id: selectedNanogrid,
        order_type: orderType,
        amount_kwh: amountNum,
        price_per_kwh: priceNum,
      });

      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast({
          title: "Invalid Input",
          description: firstError.message,
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from('market_orders').insert({
        nanogrid_id: selectedNanogrid,
        user_id: userId,
        order_type: orderType,
        amount_kwh: validationResult.data.amount_kwh,
        price_per_kwh: validationResult.data.price_per_kwh,
      });

      if (error) throw error;

      toast({
        title: "Order Created",
        description: `${orderType.toUpperCase()} order for ${validationResult.data.amount_kwh} kWh at ${validationResult.data.price_per_kwh} tokens/kWh`,
      });

      // Reset form
      setAmount("");
      setPrice("");

      // Trigger order matching
      await supabase.functions.invoke('match-orders');
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-card border-2 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {orderType === "buy" ? (
            <TrendingUp className="h-5 w-5 text-energy-trading" />
          ) : (
            <TrendingDown className="h-5 w-5 text-energy-consumption" />
          )}
          Create {orderType === "buy" ? "Buy" : "Sell"} Order
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Order Type</Label>
          <Select value={orderType} onValueChange={(value: "buy" | "sell") => setOrderType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Buy Energy</SelectItem>
              <SelectItem value="sell">Sell Energy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Nanogrid</Label>
          <Select value={selectedNanogrid} onValueChange={setSelectedNanogrid}>
            <SelectTrigger>
              <SelectValue placeholder="Select nanogrid" />
            </SelectTrigger>
            <SelectContent>
              {nanogrids.map((ng) => (
                <SelectItem key={ng.id} value={ng.id}>
                  {ng.name} (Balance: {ng.power_balance.toFixed(2)} kW)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Amount (kWh)</Label>
          <Input
            type="number"
            step="0.1"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label>Price (tokens/kWh)</Label>
          <Input
            type="number"
            step="0.01"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button
          className="w-full"
          onClick={handleCreateOrder}
          disabled={loading || !selectedNanogrid || !amount || !price}
        >
          {loading ? "Creating Order..." : `Create ${orderType.toUpperCase()} Order`}
        </Button>
      </CardContent>
    </Card>
  );
}
