import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Bar
} from "recharts";
import { 
  Thermometer, 
  Zap, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { PerformanceMetrics } from "@/hooks/useEnhancedGridData";

interface PerformanceChartProps {
  performance: PerformanceMetrics;
  nanogridId: number;
  historicalData: Array<{ hour: string; efficiency: number; utilization: number; health: number }>;
}

export function PerformanceChart({ performance, nanogridId, historicalData }: PerformanceChartProps) {
  const getHealthStatus = (score: number) => {
    if (score >= 95) return { label: "Excellent", color: "text-emerald-600", variant: "default" as const };
    if (score >= 85) return { label: "Good", color: "text-blue-600", variant: "secondary" as const };
    if (score >= 70) return { label: "Fair", color: "text-yellow-600", variant: "outline" as const };
    return { label: "Needs Attention", color: "text-red-600", variant: "destructive" as const };
  };

  const healthStatus = getHealthStatus(performance.healthScore);

  const performanceData = historicalData.map(item => ({
    ...item,
    temperature: 25 + Math.random() * 15,
    voltage: 240 + Math.random() * 20,
    current: 10 + Math.random() * 5
  }));

  return (
    <div className="space-y-6">
      {/* KPI Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <TrendingUp className="h-8 w-8 mb-2 text-primary" />
            <div className="text-2xl font-bold">{performance.efficiency.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Efficiency</div>
            <Progress value={performance.efficiency} className="w-full mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Activity className="h-8 w-8 mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{performance.utilization.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Utilization</div>
            <Progress value={performance.utilization} className="w-full mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center gap-2 mb-2">
              {performance.healthScore >= 85 ? (
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              )}
            </div>
            <div className="text-2xl font-bold">{performance.healthScore.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Health Score</div>
            <Badge variant={healthStatus.variant} className="mt-2 text-xs">
              {healthStatus.label}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Thermometer className="h-8 w-8 mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{performance.temperatureC.toFixed(1)}°C</div>
            <div className="text-sm text-muted-foreground">Temperature</div>
            <div className={`text-xs mt-2 ${
              performance.temperatureC > 35 ? 'text-red-600' : 
              performance.temperatureC > 30 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {performance.temperatureC > 35 ? 'High' : 
               performance.temperatureC > 30 ? 'Normal' : 'Optimal'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="electrical">Electrical</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Performance Trends</CardTitle>
              <CardDescription>Multi-metric performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.2)" 
                    name="Efficiency %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="utilization" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    name="Utilization %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="health" 
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={2}
                    name="Health Score"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="electrical">
          <Card>
            <CardHeader>
              <CardTitle>Electrical Parameters</CardTitle>
              <CardDescription>Real-time electrical monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">{performance.voltage.toFixed(1)}V</div>
                  <div className="text-sm text-muted-foreground">Voltage</div>
                  <div className={`text-xs mt-1 ${
                    Math.abs(performance.voltage - 240) > 20 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {Math.abs(performance.voltage - 240) > 20 ? 'Out of Range' : 'Normal'}
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">{performance.current.toFixed(1)}A</div>
                  <div className="text-sm text-muted-foreground">Current</div>
                  <div className="text-xs mt-1 text-green-600">Normal</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">{performance.transmissionLoss.toFixed(2)}%</div>
                  <div className="text-sm text-muted-foreground">Transmission Loss</div>
                  <div className={`text-xs mt-1 ${
                    performance.transmissionLoss > 2 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {performance.transmissionLoss > 2 ? 'High' : 'Normal'}
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="voltage" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    name="Voltage (V)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    name="Current (A)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={2}
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency">
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Analysis</CardTitle>
              <CardDescription>Energy conversion and utilization metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stackId="1"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.6)" 
                    name="Energy Efficiency %"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="utilization" 
                    stackId="2"
                    stroke="hsl(var(--chart-2))" 
                    fill="hsl(var(--chart-2) / 0.6)" 
                    name="Capacity Utilization %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts & Recommendations</CardTitle>
              <CardDescription>AI-driven insights and maintenance suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {performance.healthScore < 85 && (
                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Performance Alert</h4>
                    <p className="text-sm text-yellow-700">
                      Health score below optimal range. Consider scheduling maintenance.
                    </p>
                  </div>
                </div>
              )}

              {performance.temperatureC > 35 && (
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">Temperature Warning</h4>
                    <p className="text-sm text-red-700">
                      Operating temperature is high. Check cooling systems.
                    </p>
                  </div>
                </div>
              )}

              {performance.transmissionLoss > 2 && (
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-800">Efficiency Notice</h4>
                    <p className="text-sm text-orange-700">
                      Higher than normal transmission losses detected. Inspect wiring.
                    </p>
                  </div>
                </div>
              )}

              {performance.efficiency > 90 && performance.healthScore > 95 && (
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Optimal Performance</h4>
                    <p className="text-sm text-green-700">
                      Nanogrid {nanogridId} is operating at peak efficiency. Great job!
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Maintenance Recommendation</h4>
                  <p className="text-sm text-blue-700">
                    Next scheduled maintenance in {Math.floor(Math.random() * 30 + 7)} days. 
                    Predictive maintenance score: {(85 + Math.random() * 10).toFixed(0)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}