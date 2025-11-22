import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, TrendingUp, Zap, Activity } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LoadFlowResultsProps {
  busResults: {
    busNumber: number;
    voltage: number;
    angle: number;
    pGen: number;
    qGen: number;
    pLoad: number;
    qLoad: number;
  }[];
  lineResults: {
    id: number;
    name: string;
    fromBus: number;
    toBus: number;
    pFlow: number;
    qFlow: number;
    losses: number;
  }[];
  convergence: {
    iterations: number;
    converged: boolean;
    error: number;
  };
  onRunAnalysis: () => void;
  isRunning: boolean;
}

export const LoadFlowResults = ({
  busResults,
  lineResults,
  convergence,
  onRunAnalysis,
  isRunning
}: LoadFlowResultsProps) => {
  const totalGeneration = busResults.reduce((sum, bus) => sum + bus.pGen, 0);
  const totalLoad = busResults.reduce((sum, bus) => sum + bus.pLoad, 0);
  const totalLosses = lineResults.reduce((sum, line) => sum + line.losses, 0);

  return (
    <div className="space-y-6">
      {/* Run Analysis Button */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Load Flow Analysis</span>
            <Button onClick={onRunAnalysis} disabled={isRunning}>
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? 'Running...' : 'Run Analysis'}
            </Button>
          </CardTitle>
          <CardDescription>
            Newton-Raphson method for power flow calculation
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Convergence Status */}
      {convergence.converged !== null && (
        <Alert className={convergence.converged ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}>
          <Activity className={`h-4 w-4 ${convergence.converged ? 'text-green-500' : 'text-red-500'}`} />
          <AlertDescription className={convergence.converged ? 'text-green-500' : 'text-red-500'}>
            {convergence.converged
              ? `Analysis converged in ${convergence.iterations} iterations (error: ${convergence.error.toExponential(2)})`
              : `Analysis did not converge after ${convergence.iterations} iterations`
            }
          </AlertDescription>
        </Alert>
      )}

      {/* System Summary */}
      {convergence.converged && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Generation</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{totalGeneration.toFixed(2)} kW</div>
              <p className="text-xs text-muted-foreground">Active power from Bus 1</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Load</CardTitle>
              <Zap className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{totalLoad.toFixed(2)} kW</div>
              <p className="text-xs text-muted-foreground">Consumed by load buses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Losses</CardTitle>
              <Activity className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{totalLosses.toFixed(2)} kW</div>
              <p className="text-xs text-muted-foreground">
                {((totalLosses / totalGeneration) * 100).toFixed(2)}% of generation
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bus Results */}
      {convergence.converged && (
        <Card>
          <CardHeader>
            <CardTitle>Bus Voltages and Power</CardTitle>
            <CardDescription>Voltage magnitude and angle at each bus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {busResults.map((bus) => (
                <div key={bus.busNumber} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold">Bus {bus.busNumber}</div>
                      <Badge variant={bus.busNumber === 1 ? 'default' : 'outline'}>
                        {bus.busNumber === 1 ? 'Generation' : 'Load'}
                      </Badge>
                    </div>
                    <div className={`text-sm font-semibold ${
                      bus.voltage >= 0.95 && bus.voltage <= 1.05 ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {bus.voltage.toFixed(4)} ∠ {bus.angle.toFixed(2)}° p.u.
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">P Gen</div>
                      <div className="font-semibold text-green-500">
                        {bus.pGen.toFixed(2)} kW
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">Q Gen</div>
                      <div className="font-semibold text-green-500">
                        {bus.qGen.toFixed(2)} kVAR
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">P Load</div>
                      <div className="font-semibold text-blue-500">
                        {bus.pLoad.toFixed(2)} kW
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">Q Load</div>
                      <div className="font-semibold text-blue-500">
                        {bus.qLoad.toFixed(2)} kVAR
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Line Power Flows */}
      {convergence.converged && (
        <Card>
          <CardHeader>
            <CardTitle>Line Power Flows</CardTitle>
            <CardDescription>Active and reactive power flow through each line</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lineResults.map((line) => (
                <div key={line.id} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold">
                      {line.name}: Bus {line.fromBus} → Bus {line.toBus}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Losses: {line.losses.toFixed(3)} kW
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">Active Power (P)</div>
                      <div className={`font-semibold ${line.pFlow >= 0 ? 'text-green-500' : 'text-blue-500'}`}>
                        {line.pFlow.toFixed(3)} kW
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">Reactive Power (Q)</div>
                      <div className="font-semibold text-purple-500">
                        {line.qFlow.toFixed(3)} kVAR
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};