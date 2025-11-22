import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useWeb3 } from "@/hooks/useWeb3";
import { toast } from "@/hooks/use-toast";
import { BackendConfigTab } from "@/components/BackendConfigTab";
import { 
  Settings as SettingsIcon, 
  Network, 
  Wallet, 
  Key,
  Download,
  Upload,
  RefreshCw,
  Shield,
  Info,
  CheckCircle,
  AlertCircle,
  Globe,
  Copy,
  Server
} from "lucide-react";
import { CONTRACT_ADDRESS, CUSTOM_NETWORK } from "@/blockchain/config";

const Settings = () => {
  const { 
    walletState, 
    getNetworkInfo, 
    addCustomNetwork,
    isMetaMaskInstalled,
    connectWallet,
    registerProsumer,
    provider 
  } = useWeb3();
  
  const [networkInfo, setNetworkInfo] = useState<any>(null);
  const [isLoadingNetwork, setIsLoadingNetwork] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("30");
  const [simulationMode, setSimulationMode] = useState(false);

  // Load network information
  useEffect(() => {
    const loadNetworkInfo = async () => {
      if (walletState.isConnected && provider) {
        try {
          const info = await getNetworkInfo();
          setNetworkInfo(info);
        } catch (error) {
          console.error('Failed to load network info:', error);
        }
      }
    };

    loadNetworkInfo();
  }, [walletState.isConnected, provider, getNetworkInfo]);

  // Handle network switch to custom network
  const handleSwitchToCustomNetwork = async () => {
    setIsLoadingNetwork(true);
    try {
      await addCustomNetwork();
      toast({
        title: "Network Added",
        description: "Successfully added Truffle Development Network",
      });
      
      // Refresh network info
      const info = await getNetworkInfo();
      setNetworkInfo(info);
    } catch (error: any) {
      toast({
        title: "Network Error",
        description: error.message || "Failed to add custom network",
        variant: "destructive",
      });
    } finally {
      setIsLoadingNetwork(false);
    }
  };

  const handleExportData = () => {
    const data = {
      walletAddress: walletState.address,
      isProsumer: walletState.isProsumer,
      networkInfo,
      contractAddress: CONTRACT_ADDRESS,
      customNetworkConfig: CUSTOM_NETWORK,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smart-grid-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Settings data has been exported successfully",
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied",
        description: `${label} copied to clipboard`,
      });
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your Smart Grid DApp preferences</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <SettingsIcon className="h-4 w-4 mr-2" />
          Configuration Panel
        </Badge>
      </div>

      <Tabs defaultValue="network" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="backend">
            <Server className="h-4 w-4 mr-2" />
            Backend
          </TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Network Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Network Status
                </CardTitle>
                <CardDescription>
                  Current blockchain network information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {networkInfo ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Chain ID:</span>
                      <Badge variant="outline">{networkInfo.chainId}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Network:</span>
                      <Badge variant={networkInfo.isCustomNetwork ? "default" : "secondary"}>
                        {networkInfo.isCustomNetwork ? "Truffle Dev" : networkInfo.name}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-emerald-500">Connected</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Connect wallet to view network info</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Custom Network Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Custom Network
                </CardTitle>
                <CardDescription>
                  Truffle development network configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">RPC URL</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input 
                        value={CUSTOM_NETWORK.rpcUrl} 
                        readOnly 
                        className="text-sm"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(CUSTOM_NETWORK.rpcUrl, "RPC URL")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Chain ID</Label>
                    <Input 
                      value={CUSTOM_NETWORK.chainId.toString()} 
                      readOnly 
                      className="text-sm mt-1"
                    />
                  </div>

                  <Button 
                    onClick={handleSwitchToCustomNetwork}
                    disabled={isLoadingNetwork || (networkInfo?.isCustomNetwork)}
                    className="w-full"
                  >
                    {isLoadingNetwork ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Adding Network...
                      </>
                    ) : networkInfo?.isCustomNetwork ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Using Custom Network
                      </>
                    ) : (
                      <>
                        <Network className="h-4 w-4 mr-2" />
                        Add Truffle Network
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contract Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Smart Contract
              </CardTitle>
              <CardDescription>
                Energy marketplace contract details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Contract Address</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input 
                      value={CONTRACT_ADDRESS} 
                      readOnly 
                      className="text-sm font-mono"
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(CONTRACT_ADDRESS, "Contract Address")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Contract Status</span>
                  </div>
                  <Badge variant="default">
                    {walletState.isConnected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wallet Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet Information
                </CardTitle>
                <CardDescription>
                  Connected wallet details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {walletState.isConnected ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Address</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input 
                          value={walletState.address || ""} 
                          readOnly 
                          className="text-sm font-mono"
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(walletState.address || "", "Wallet Address")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Prosumer Status:</span>
                      <Badge variant={walletState.isProsumer ? "default" : "secondary"}>
                        {walletState.isProsumer ? "Registered" : "Not Registered"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Connection Status:</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-emerald-500">Connected</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">No wallet connected</span>
                    </div>
                    {isMetaMaskInstalled ? (
                      <Button 
                        onClick={connectWallet}
                        className="w-full"
                      >
                        <Wallet className="h-4 w-4 mr-2" />
                        Connect MetaMask
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        onClick={() => window.open('https://metamask.io/download/', '_blank')}
                        className="w-full"
                      >
                        Install MetaMask
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Wallet Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Wallet Security
                </CardTitle>
                <CardDescription>
                  Security recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium">MetaMask Installed</p>
                      <p className="text-xs text-muted-foreground">Browser extension detected</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Custom Network</p>
                      <p className="text-xs text-muted-foreground">Truffle development setup</p>
                    </div>
                    {networkInfo?.isCustomNetwork ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Prosumer Registered</p>
                      <p className="text-xs text-muted-foreground">Required for trading</p>
                    </div>
                    {walletState.isProsumer ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>

                  {walletState.isConnected && !walletState.isProsumer && (
                    <>
                      <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <div className="text-xs text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">Local Blockchain Required</p>
                          <p>Make sure Ganache is running on http://127.0.0.1:8545 before registering.</p>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={async () => {
                          try {
                            await registerProsumer();
                            toast({
                              title: "Registration Successful",
                              description: "You are now registered as a prosumer!",
                            });
                          } catch (error: any) {
                            toast({
                              title: "Registration Failed",
                              description: error.message || "Failed to register",
                              variant: "destructive",
                            });
                          }
                        }}
                        disabled={walletState.isLoading}
                        className="w-full"
                      >
                        {walletState.isLoading ? "Registering..." : "Register as Prosumer"}
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backend" className="space-y-6">
          <BackendConfigTab />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  System Settings
                </CardTitle>
                <CardDescription>
                  Application behavior configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Auto Refresh</Label>
                    <p className="text-xs text-muted-foreground">Automatically update data</p>
                  </div>
                  <Switch 
                    checked={autoRefresh} 
                    onCheckedChange={setAutoRefresh}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Refresh Interval (seconds)</Label>
                  <Input 
                    type="number" 
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(e.target.value)}
                    min="5"
                    max="300"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Simulation Mode</Label>
                    <p className="text-xs text-muted-foreground">Use mock data for testing</p>
                  </div>
                  {/* Removed mock data switch, always use backend data */}
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Export and backup your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleExportData}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Settings
                </Button>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Data Export Includes:</Label>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Wallet configuration</li>
                    <li>• Network settings</li>
                    <li>• Contract addresses</li>
                    <li>• System preferences</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Guidelines
              </CardTitle>
              <CardDescription>
                Best practices for secure DApp usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Private Key Security</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Never share your private keys</li>
                    <li>• Use hardware wallets for large amounts</li>
                    <li>• Keep backups in secure locations</li>
                    <li>• Use strong passwords</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Network Security</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Verify contract addresses</li>
                    <li>• Use trusted RPC endpoints</li>
                    <li>• Check transaction details</li>
                    <li>• Monitor gas prices</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Trading Safety</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Verify trade counterparties</li>
                    <li>• Start with small amounts</li>
                    <li>• Monitor market prices</li>
                    <li>• Keep transaction records</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Development Mode</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Only use test networks</li>
                    <li>• Don't use real funds</li>
                    <li>• Regularly update contracts</li>
                    <li>• Backup development data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;