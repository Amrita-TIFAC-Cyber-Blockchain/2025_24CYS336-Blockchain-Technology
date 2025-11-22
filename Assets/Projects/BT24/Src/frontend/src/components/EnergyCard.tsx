import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnergyCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  variant?: "generation" | "consumption" | "storage" | "trading";
  status?: "online" | "warning" | "offline";
  className?: string;
}

export function EnergyCard({
  title,
  value,
  unit,
  icon: Icon,
  trend = "stable",
  variant = "generation",
  status = "online",
  className,
}: EnergyCardProps) {
  const variantStyles = {
    generation: "bg-gradient-card border-energy-generation/30 hover:shadow-energy-glow",
    consumption: "bg-gradient-card border-energy-consumption/30 hover:shadow-[0_0_30px_hsl(var(--energy-consumption)_/_0.3)]",
    storage: "bg-gradient-card border-energy-storage/30 hover:shadow-[0_0_30px_hsl(var(--energy-storage)_/_0.3)]",
    trading: "bg-gradient-trading border-energy-trading/30 hover:shadow-trading",
  };

  const iconStyles = {
    generation: "text-energy-generation",
    consumption: "text-energy-consumption",
    storage: "text-energy-storage",
    trading: "text-energy-trading",
  };

  const statusColors = {
    online: "bg-status-online",
    warning: "bg-status-warning",
    offline: "bg-status-offline",
  };

  return (
    <Card className={cn(
      "relative overflow-hidden border-2 transition-smooth hover:scale-105",
      variantStyles[variant],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className={cn("w-2 h-2 rounded-full", statusColors[status])} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">{value}</span>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
            {trend !== "stable" && (
              <Badge variant={trend === "up" ? "default" : "destructive"} className="text-xs">
                {trend === "up" ? "↗" : "↘"} {trend}
              </Badge>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-xl bg-background/20 backdrop-blur-sm animate-pulse-energy",
            iconStyles[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}