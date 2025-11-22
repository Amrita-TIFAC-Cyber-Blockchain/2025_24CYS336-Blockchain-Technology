import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, AlertTriangle, Activity, TrendingDown } from 'lucide-react';
import { calculateShortCircuit } from '@/utils/shortCircuitAnalysis';
import { toast } from 'sonner';

interface LineData {
  id: number;
  name: string;
  fromBus: number;
  toBus: number;
  resistance: number;
  reactance: number;
}

interface ShortCircuitAnalysisProps {
  lines: LineData[];
}

export const ShortCircuitAnalysis = ({ lines }: ShortCircuitAnalysisProps) => {
  const [faultType, setFaultType] = useState<'bus' | 'line'>('bus');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [results, setResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAnalysis = () => {
    if (!selectedLocation) {
      toast.error('Please select a fault location');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const locationId = parseInt(selectedLocation);
      const result = calculateShortCircuit(lines, {
        type: faultType,
        id: locationId
      });
      
      setResults(result);
      toast.success('Short circuit analysis completed');
    } catch (error: any) {
      toast.error(error.message || 'Analysis failed');
      console.error('Short circuit analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setSelectedLocation('');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Activity className="h-4 w-4" />;
      case 'low':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Short Circuit Analysis
          </CardTitle>
          <CardDescription>
            Simulate a three-phase balanced fault at a selected location and analyze system response
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fault Configuration */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Fault Location Type</Label>
              <RadioGroup value={faultType} onValueChange={(value: 'bus' | 'line') => {
                setFaultType(value);
                setSelectedLocation('');
              }}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bus" id="bus" />
                  <Label htmlFor="bus" className="font-normal">Bus Fault</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="line" id="line" />
                  <Label htmlFor="line" className="font-normal">Line Fault (at midpoint)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Select {faultType === 'bus' ? 'Bus' : 'Line'}</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${faultType === 'bus' ? 'bus' : 'line'}`} />
                </SelectTrigger>
                <SelectContent>
                  {faultType === 'bus' ? (
                    Array.from({ length: 5 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        Bus {i + 1}
                      </SelectItem>
                    ))
                  ) : (
                    lines.map((line) => (
                      <SelectItem key={line.id} value={line.id.toString()}>
                        {line.name} (Bus {line.fromBus} → Bus {line.toBus})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleRunAnalysis}
                disabled={isAnalyzing || !selectedLocation}
                className="flex-1"
              >
                <Zap className="h-4 w-4 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
              </Button>
              {results && (
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-4 pt-4 border-t">
              {/* Severity Alert */}
              <Alert variant={results.severity === 'critical' || results.severity === 'high' ? 'destructive' : 'default'}>
                <div className="flex items-center gap-2">
                  {getSeverityIcon(results.severity)}
                  <AlertDescription>
                    <span className="font-semibold">Fault Severity: {results.severity.toUpperCase()}</span>
                    {' - '}
                    {results.severity === 'critical' && 'Immediate protective action required'}
                    {results.severity === 'high' && 'Circuit breakers should trip to protect equipment'}
                    {results.severity === 'medium' && 'Monitor system closely'}
                    {results.severity === 'low' && 'System can handle this fault condition'}
                  </AlertDescription>
                </div>
              </Alert>

              {/* Fault Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fault Location</p>
                  <p className="text-lg font-semibold">{results.faultLocation.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fault Current</p>
                  <p className="text-lg font-semibold">
                    {results.faultCurrent.magnitude.toFixed(1)} A
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ∠ {results.faultCurrent.angle.toFixed(1)}°
                  </p>
                </div>
              </div>

              <Separator />

              {/* Bus Voltages */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Bus Voltages During Fault</h4>
                <div className="space-y-2">
                  {results.busVoltages.map((bus: any) => (
                    <div key={bus.busNumber} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">Bus {bus.busNumber}</span>
                        <Badge variant={bus.voltageDrop > 50 ? 'destructive' : 'secondary'}>
                          {bus.voltageMagnitude.toFixed(3)} pu
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-destructive">
                          ↓ {bus.voltageDrop.toFixed(1)}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ∠ {bus.voltageAngle.toFixed(1)}°
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Line Currents */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Line Currents During Fault</h4>
                <div className="space-y-2">
                  {results.lineCurrents.map((line: any) => (
                    <div key={line.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm">{line.name}</span>
                        <Badge variant={line.overloadPercentage > 150 ? 'destructive' : 'secondary'}>
                          {line.currentMagnitude.toFixed(1)} A
                        </Badge>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={line.overloadPercentage > 200 ? 'destructive' : 
                                  line.overloadPercentage > 150 ? 'default' : 'secondary'}
                        >
                          {line.overloadPercentage.toFixed(0)}% load
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
