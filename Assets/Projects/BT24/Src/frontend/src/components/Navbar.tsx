import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Activity, TrendingUp, Settings, Wallet, Cable, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWeb3 } from "@/hooks/useWeb3";
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  systemMode: "simulation" | "live";
  className?: string;
}

export function Navbar({ activeTab, onTabChange, systemMode, className }: NavbarProps) {
  const { walletState, connectWallet, disconnectWallet, isMetaMaskInstalled } = useWeb3();
  
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity, path: "/" },
    { id: "nanogrids", label: "Nanogrids", icon: Zap, path: "/nanogrids" },
    { id: "digital-twin", label: "Digital Twin", icon: Layers, path: "/digital-twin" },
    { id: "transmission", label: "Transmission", icon: Cable, path: "/transmission" },
    { id: "trading", label: "Trading", icon: TrendingUp, path: "/trading" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleWalletConnect = async () => {
    if (!isMetaMaskInstalled) {
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      await connectWallet();
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to MetaMask!",
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className={cn(
      "bg-gradient-card border-b border-border backdrop-blur-sm sticky top-0 z-50",
      className
    )}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-energy-primary">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Smart Grid 3.0</h1>
              <p className="text-xs text-muted-foreground">Decentralized Energy Management</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Link key={item.id} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center gap-2 transition-smooth",
                      isActive && "bg-gradient-energy-primary text-primary-foreground shadow-energy-glow"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Wallet Connection & System Mode */}
          <div className="flex items-center gap-3">
            {/* Wallet Connection */}
            <div className="flex items-center gap-2">
              {walletState.isConnected ? (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Wallet className="h-3 w-3 mr-1" />
                    {`${walletState.address?.slice(0, 6)}...${walletState.address?.slice(-4)}`}
                  </Badge>
                  {walletState.isProsumer && (
                    <Badge variant="default" className="text-xs bg-gradient-energy-primary">
                      Prosumer
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={disconnectWallet}
                    className="text-xs"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWalletConnect}
                  disabled={walletState.isLoading}
                  className="flex items-center gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  {walletState.isLoading ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>

            {/* System Mode Indicator */}
            <Badge 
              variant={systemMode === "live" ? "default" : "secondary"}
              className={cn(
                "text-xs",
                systemMode === "live" && "bg-gradient-energy-primary animate-pulse-energy"
              )}
            >
              <div className="w-2 h-2 rounded-full bg-current mr-1" />
              {systemMode.toUpperCase()} MODE
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  );
}