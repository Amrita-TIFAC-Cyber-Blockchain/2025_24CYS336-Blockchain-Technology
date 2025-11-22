import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Area,
  AreaChart,
  ReferenceLine
} from "recharts";
import { 
  Sun, 
  CloudRain, 
  Cloud, 
  Battery, 
  TrendingUp, 
  Zap,
  DollarSign,
  Brain,
  Lightbulb
} from "lucide-react";
import { ForecastData } from "@/hooks/useEnhancedGridData";

interface ForecastingChartProps {
  forecastData: ForecastData[];
  nanogridId: number;
}

export function ForecastingChart({ forecastData, nanogridId }: ForecastingChartProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-4 w-4 text-gray-500" />;
      case 'partly-cloudy': return <CloudRain className="h-4 w-4 text-blue-500" />;
      default: return <Sun className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return "text-emerald-600";
    if (confidence >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const averageConfidence = forecastData.reduce((sum, item) => sum + item.confidence, 0) / forecastData.length;

  const optimizedData = forecastData.map(item => ({
    ...item,
    optimizedSolar: item.solarPrediction * 1.15, // AI optimization potential
    optimizedLoad: item.loadPrediction * 0.95,   // Demand response optimization
  }));

  const currentHour = new Date().getHours();
  const peakSolarHours = forecastData.filter((_, i) => i >= 10 && i <= 16);
  const avgPeakSolar = peakSolarHours.reduce((sum, item) => sum + item.solarPrediction, 0) / peakSolarHours.length;

  return (
    <div className="space-y-6">
      {/* Forecast Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Sun className="h-8 w-8 mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{avgPeakSolar.toFixed(1)} kW</div>
            <div className="text-sm text-muted-foreground">Peak Solar</div>
            <div className="text-xs text-green-600 mt-1">10AM-4PM avg</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Battery className="h-8 w-8 mb-2 text-green-500" />
            <div className="text-2xl font-bold">{
              Math.max(...forecastData.map(f => f.batteryPrediction)).toFixed(1)
            } kWh</div>
            <div className="text-sm text-muted-foreground">Max Battery</div>
            <div className="text-xs text-blue-600 mt-1">Predicted</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <DollarSign className="h-8 w-8 mb-2 text-purple-500" />
            <div className="text-2xl font-bold">${
              (forecastData.reduce((sum, f) => sum + f.priceForcast, 0) / forecastData.length).toFixed(3)
            }</div>
            <div className="text-sm text-muted-foreground">Avg Price</div>
            <div className="text-xs text-green-600 mt-1">per kWh</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Brain className="h-8 w-8 mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{averageConfidence.toFixed(0)}%</div>
            <div className="text-sm text-muted-foreground">Confidence</div>
            <Badge variant={averageConfidence >= 85 ? "default" : averageConfidence >= 70 ? "secondary" : "destructive"} className="mt-1 text-xs">
              {averageConfidence >= 85 ? "High" : averageConfidence >= 70 ? "Medium" : "Low"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="solar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="solar">Solar</TabsTrigger>
          <TabsTrigger value="demand">Demand</TabsTrigger>
          <TabsTrigger value="battery">Battery</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="solar">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Solar Generation Forecast
              </CardTitle>
              <CardDescription>
                Weather-based solar output prediction with confidence intervals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span>Sunny: High output</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-gray-500" />
                    <span>Cloudy: Reduced output</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-blue-500" />
                    <span>Partly Cloudy: Variable</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{label}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {getWeatherIcon(data.weatherCondition)}
                              <span className="text-sm capitalize">{data.weatherCondition}</span>
                            </div>
                            <p className="text-sm">Solar: {data.solarPrediction.toFixed(1)} kW</p>
                            <p className={`text-sm ${getConfidenceColor(data.confidence)}`}>
                              Confidence: {data.confidence.toFixed(0)}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="solarPrediction" 
                    stroke="hsl(var(--chart-1))" 
                    fill="hsl(var(--chart-1) / 0.2)" 
                    name="Solar Output (kW)"
                  />
                  <ReferenceLine y={currentHour < 24 ? forecastData[currentHour]?.solarPrediction : 0} stroke="red" strokeDasharray="5 5" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demand">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Load Demand Forecast
              </CardTitle>
              <CardDescription>
                Predicted energy consumption patterns based on historical data and ML models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="loadPrediction" 
                    stroke="hsl(var(--chart-2))" 
                    fill="hsl(var(--chart-2) / 0.3)" 
                    name="Load Demand (kW)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="battery">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Battery className="h-5 w-5" />
                Battery State Prediction
              </CardTitle>
              <CardDescription>
                Optimal charging/discharging schedule based on generation and demand forecasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="batteryPrediction" 
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={3}
                    name="Battery SoC (kWh)"
                  />
                  <ReferenceLine y={20} stroke="red" strokeDasharray="2 2" label="Max Capacity" />
                  <ReferenceLine y={2} stroke="orange" strokeDasharray="2 2" label="Min Safe Level" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Energy Price Forecast
              </CardTitle>
              <CardDescription>
                Market price predictions for optimal trading decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(3)}`, "Price per kWh"]} />
                  <Line 
                    type="monotone" 
                    dataKey="priceForcast" 
                    stroke="hsl(var(--chart-4))" 
                    strokeWidth={2}
                    name="Price ($/kWh)"
                  />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Optimal Trading Windows</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-emerald-600 font-medium">Best Selling Times:</span>
                    <div className="mt-1">
                      {forecastData
                        .map((item, index) => ({ ...item, index }))
                        .sort((a, b) => b.priceForcast - a.priceForcast)
                        .slice(0, 3)
                        .map(item => (
                          <div key={item.index}>
                            {item.hour} - ${item.priceForcast.toFixed(3)}/kWh
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-blue-600 font-medium">Best Buying Times:</span>
                    <div className="mt-1">
                      {forecastData
                        .map((item, index) => ({ ...item, index }))
                        .sort((a, b) => a.priceForcast - b.priceForcast)
                        .slice(0, 3)
                        .map(item => (
                          <div key={item.index}>
                            {item.hour} - ${item.priceForcast.toFixed(3)}/kWh
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI-Powered Optimization
              </CardTitle>
              <CardDescription>
                Compare current forecast vs AI-optimized scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={optimizedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="solarPrediction" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Current Solar Forecast"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="optimizedSolar" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={3}
                    name="Optimized Solar (+15%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="loadPrediction" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Current Load Forecast"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="optimizedLoad" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={3}
                    name="Optimized Load (-5%)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Potential Savings</h4>
                    <div className="text-2xl font-bold text-emerald-600">+18.5%</div>
                    <div className="text-sm text-muted-foreground">Energy efficiency</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Revenue Boost</h4>
                    <div className="text-2xl font-bold text-blue-600">+$47.2</div>
                    <div className="text-sm text-muted-foreground">Daily potential</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">CO₂ Reduction</h4>
                    <div className="text-2xl font-bold text-green-600">-125kg</div>
                    <div className="text-sm text-muted-foreground">Monthly impact</div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4">
                <Button className="w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  Enable AI Optimization
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}