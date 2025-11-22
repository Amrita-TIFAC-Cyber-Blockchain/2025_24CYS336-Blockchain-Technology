import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Battery, Zap, Home, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface NanogridData {
  nanogrid_id: number;
  solar_output: number;
  load_demand: number;
  battery_soc: number;
  power_balance: number;
  address: string;
}

interface NanogridCardProps {
  nanogrid: NanogridData;
  className?: string;
}

export function NanogridCard({ nanogrid, className }: NanogridCardProps) {
  const batteryPercentage = (nanogrid.battery_soc / 20) * 100; // Assuming 20kWh capacity
  const isGenerating = nanogrid.power_balance > 0;
  const isConsuming = nanogrid.power_balance < 0;
  
  const statusColor = isGenerating 
    ? "text-energy-generation" 
    : isConsuming 
    ? "text-energy-consumption" 
    : "text-muted-foreground";

  const borderColor = isGenerating 
    ? "border-energy-generation/30" 
    : isConsuming 
    ? "border-energy-consumption/30" 
    : "border-border";

  return (
    <Card className={cn(
      "bg-gradient-card border-2 transition-smooth hover:scale-105 hover:shadow-card",
      borderColor,
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Home className="h-5 w-5 text-muted-foreground" />
            Nanogrid #{nanogrid.nanogrid_id}
          </CardTitle>
          <Badge 
            variant={isGenerating ? "default" : isConsuming ? "destructive" : "secondary"}
            className="text-xs"
          >
            {isGenerating ? "Selling" : isConsuming ? "Buying" : "Balanced"}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          {nanogrid.address.slice(0, 10)}...{nanogrid.address.slice(-8)}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Solar Output */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-energy-generation" />
            <span className="text-sm font-medium">Solar</span>
          </div>
          <span className="text-sm font-bold text-energy-generation">
            {nanogrid.solar_output.toFixed(1)} kW
          </span>
        </div>

        {/* Load Demand */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-energy-consumption" />
            <span className="text-sm font-medium">Load</span>
          </div>
          <span className="text-sm font-bold text-energy-consumption">
            {nanogrid.load_demand.toFixed(1)} kW
          </span>
        </div>

        {/* Power Balance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className={cn("h-4 w-4", statusColor)} />
            <span className="text-sm font-medium">Balance</span>
          </div>
          <span className={cn("text-sm font-bold", statusColor)}>
            {nanogrid.power_balance > 0 ? "+" : ""}{nanogrid.power_balance.toFixed(1)} kW
          </span>
        </div>

        {/* Battery Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-energy-storage" />
              <span className="text-sm font-medium">Battery</span>
            </div>
            <span className="text-sm font-bold text-energy-storage">
              {nanogrid.battery_soc.toFixed(1)} kWh
            </span>
          </div>
          <Progress 
            value={batteryPercentage} 
            className="h-2"
          />
          <div className="text-xs text-muted-foreground text-center">
            {batteryPercentage.toFixed(0)}% charged
          </div>
        </div>
      </CardContent>
    </Card>
  );
}