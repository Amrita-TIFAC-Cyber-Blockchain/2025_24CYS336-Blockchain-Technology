import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Battery, Home, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnergyFlowProps {
  totalGeneration: number;
  totalConsumption: number;
  totalStorage: number;
  totalTrading: number;
  className?: string;
}

export function EnergyFlowVisualization({
  totalGeneration,
  totalConsumption,
  totalStorage,
  totalTrading,
  className,
}: EnergyFlowProps) {
  const netFlow = totalGeneration - totalConsumption;
  const isExporting = netFlow > 0;

  return (
    <Card className={cn("bg-gradient-card border-2 border-border", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-energy-generation" />
          Energy Flow Visualization
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="relative flex items-center justify-between py-8">
          {/* Generation */}
          <div className="flex flex-col items-center space-y-2">
            <div className="p-4 rounded-full bg-energy-generation/20 border-2 border-energy-generation animate-pulse-energy">
              <Zap className="h-8 w-8 text-energy-generation" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-energy-generation">
                {totalGeneration.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">kW Generated</div>
            </div>
          </div>

          {/* Flow Arrows */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-energy-generation via-energy-storage to-energy-consumption opacity-60"></div>
            </div>
            
            {/* Storage in the middle */}
            <div className="flex flex-col items-center space-y-2 bg-background rounded-lg p-4 border border-border z-10">
              <div className="p-3 rounded-full bg-energy-storage/20 border-2 border-energy-storage animate-float">
                <Battery className="h-6 w-6 text-energy-storage" />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-energy-storage">
                  {totalStorage.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">kWh Stored</div>
              </div>
            </div>

            {/* Trading indicator */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              {totalTrading !== 0 && (
                <div className="flex items-center gap-1 bg-gradient-trading px-3 py-1 rounded-full text-xs text-primary-foreground animate-glow">
                  {totalTrading > 0 ? (
                    <>
                      <ArrowRight className="h-3 w-3" />
                      <span>+{totalTrading.toFixed(1)} kW Trading</span>
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="h-3 w-3" />
                      <span>{totalTrading.toFixed(1)} kW Trading</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Consumption */}
          <div className="flex flex-col items-center space-y-2">
            <div className="p-4 rounded-full bg-energy-consumption/20 border-2 border-energy-consumption animate-pulse-energy">
              <Home className="h-8 w-8 text-energy-consumption" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-energy-consumption">
                {totalConsumption.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">kW Consumed</div>
            </div>
          </div>
        </div>

        {/* Net Balance */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Net Energy Balance</div>
            <div className={cn(
              "text-2xl font-bold",
              isExporting ? "text-energy-generation" : "text-energy-consumption"
            )}>
              {isExporting ? "+" : ""}{netFlow.toFixed(1)} kW
            </div>
            <div className="text-xs text-muted-foreground">
              {isExporting ? "Excess for Export" : "Grid Import Needed"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}