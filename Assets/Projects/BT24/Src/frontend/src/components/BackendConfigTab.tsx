import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useBackendConfig } from '@/contexts/BackendConfigContext';
import { toast } from '@/hooks/use-toast';
import { Server, CheckCircle, XCircle, RotateCcw, Save } from 'lucide-react';

export const BackendConfigTab = () => {
  const { config, updateConfig, resetToDefaults, isConnected } = useBackendConfig();
  const [localConfig, setLocalConfig] = useState(config);
  const [isTesting, setIsTesting] = useState(false);

  const handleTest = async () => {
    setIsTesting(true);
    try {
      const response = await fetch(`${localConfig.apiUrl}/api/system-status`, {
        signal: AbortSignal.timeout(localConfig.timeout),
      });
      
      if (response.ok) {
        toast({
          title: 'Connection Successful',
          description: 'Backend server is reachable and responding',
        });
      } else {
        toast({
          title: 'Connection Failed',
          description: `Server returned status ${response.status}`,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to reach backend server',
        variant: 'destructive',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    updateConfig(localConfig);
    toast({
      title: 'Configuration Saved',
      description: 'Backend configuration has been updated',
    });
  };

  const handleReset = () => {
    resetToDefaults();
    setLocalConfig(config);
    toast({
      title: 'Reset to Defaults',
      description: 'Backend configuration has been reset',
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Backend Status
            </CardTitle>
            <CardDescription>
              Current connection status to the backend API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connection:</span>
              <Badge variant={isConnected ? "default" : "destructive"}>
                {isConnected ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 mr-1" />
                    Disconnected
                  </>
                )}
              </Badge>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground">
                {isConnected
                  ? 'Successfully connected to backend. Real-time data is available.'
                  : 'Using fallback data. Start your backend server or configure the API URL.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Test connection and manage configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={handleTest} 
              disabled={isTesting}
              className="w-full"
              variant="outline"
            >
              {isTesting ? 'Testing...' : 'Test Connection'}
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Form */}
      <Card>
        <CardHeader>
          <CardTitle>Backend Configuration</CardTitle>
          <CardDescription>
            Configure the connection parameters for your FastAPI backend
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiUrl">API Base URL</Label>
            <Input
              id="apiUrl"
              type="url"
              placeholder="http://localhost:8000"
              value={localConfig.apiUrl}
              onChange={(e) => setLocalConfig({ ...localConfig, apiUrl: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              The base URL of your FastAPI backend server
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeout">Request Timeout (ms)</Label>
            <Input
              id="timeout"
              type="number"
              min="1000"
              max="30000"
              step="1000"
              value={localConfig.timeout}
              onChange={(e) => setLocalConfig({ ...localConfig, timeout: parseInt(e.target.value) })}
            />
            <p className="text-xs text-muted-foreground">
              Maximum time to wait for API responses (1000-30000ms)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="retryAttempts">Retry Attempts</Label>
            <Input
              id="retryAttempts"
              type="number"
              min="0"
              max="10"
              value={localConfig.retryAttempts}
              onChange={(e) => setLocalConfig({ ...localConfig, retryAttempts: parseInt(e.target.value) })}
            />
            <p className="text-xs text-muted-foreground">
              Number of times to retry failed requests (0-10)
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints Reference */}
      <Card>
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
          <CardDescription>
            Available backend endpoints for the Smart Grid system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm font-mono">
            <div className="p-2 bg-muted rounded flex justify-between">
              <span>GET /api/grid-status</span>
              <Badge variant="outline" className="text-xs">Grid Data</Badge>
            </div>
            <div className="p-2 bg-muted rounded flex justify-between">
              <span>GET /api/system-status</span>
              <Badge variant="outline" className="text-xs">System</Badge>
            </div>
            <div className="p-2 bg-muted rounded flex justify-between">
              <span>GET /api/blockchain/transactions</span>
              <Badge variant="outline" className="text-xs">Blockchain</Badge>
            </div>
            <div className="p-2 bg-muted rounded flex justify-between">
              <span>GET /api/ai/load-flow-prediction</span>
              <Badge variant="outline" className="text-xs">AI/ML</Badge>
            </div>
            <div className="p-2 bg-muted rounded flex justify-between">
              <span>GET /api/ai/fault-prediction</span>
              <Badge variant="outline" className="text-xs">AI/ML</Badge>
            </div>
            <div className="p-2 bg-muted rounded flex justify-between">
              <span>GET /api/ai/recommendations</span>
              <Badge variant="outline" className="text-xs">AI/ML</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
