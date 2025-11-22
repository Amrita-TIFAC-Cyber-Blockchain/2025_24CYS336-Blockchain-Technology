import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Wifi, Shield, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemStatusProps {
  mode: "simulation" | "live";
  nanogridsOnline: number;
  totalNanogrids: number;
  blockchainConnected: boolean;
  aiControllerActive: boolean;
  className?: string;
}

export function SystemStatus({
  mode,
  nanogridsOnline,
  totalNanogrids,
  blockchainConnected,
  aiControllerActive,
  className,
}: SystemStatusProps) {
  const systemHealth = (nanogridsOnline / totalNanogrids) * 100;
  const isHealthy = systemHealth >= 80;

  return (
    <Card className={cn("bg-gradient-card border-2 border-border", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            System Status
          </div>
          <Badge 
            variant={mode === "live" ? "default" : "secondary"}
            className="text-xs"
          >
            {mode.toUpperCase()} MODE
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Nanogrid Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isHealthy ? "bg-status-online animate-pulse" : "bg-status-warning"
            )} />
            <span className="text-sm font-medium">Nanogrids</span>
          </div>
          <span className="text-sm font-bold">
            {nanogridsOnline}/{totalNanogrids} Online
          </span>
        </div>

        {/* Blockchain Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className={cn(
              "h-4 w-4",
              blockchainConnected ? "text-status-online" : "text-status-offline"
            )} />
            <span className="text-sm font-medium">Blockchain</span>
          </div>
          <Badge 
            variant={blockchainConnected ? "default" : "destructive"}
            className="text-xs"
          >
            {blockchainConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        {/* Network Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-status-online" />
            <span className="text-sm font-medium">Network</span>
          </div>
          <Badge variant="default" className="text-xs">
            Online
          </Badge>
        </div>

        {/* AI Controller */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className={cn(
              "h-4 w-4",
              aiControllerActive ? "text-status-online animate-pulse" : "text-status-offline"
            )} />
            <span className="text-sm font-medium">AI Controller</span>
          </div>
          <Badge 
            variant={aiControllerActive ? "default" : "secondary"}
            className="text-xs"
          >
            {aiControllerActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* System Health */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">System Health</span>
            <span className={cn(
              "text-sm font-bold",
              isHealthy ? "text-status-online" : "text-status-warning"
            )}>
              {systemHealth.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={cn(
                "h-2 rounded-full transition-smooth",
                isHealthy ? "bg-status-online" : "bg-status-warning"
              )}
              style={{ width: `${systemHealth}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}