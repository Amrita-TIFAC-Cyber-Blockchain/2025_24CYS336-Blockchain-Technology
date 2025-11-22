import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integration/supabase/client';
import { Leaf, TreePine, Car, Home, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface CarbonImpact {
  period: { days: number; start: Date; end: Date };
  totals: {
    solarGenerated: number;
    gridConsumption: number;
    carbonSaved: number;
    carbonEmitted: number;
    netCarbon: number;
    carbonOffsetPercentage: number;
  };
  environmental: {
    treesEquivalent: number;
    carsMilesAvoided: number;
    homesPoweredDays: number;
    coalAvoided: string;
  };
  history: any[];
}

interface CarbonImpactDashboardProps {
  nanogridId: number;
}

export const CarbonImpactDashboard = ({ nanogridId }: CarbonImpactDashboardProps) => {
  const [impact, setImpact] = useState<CarbonImpact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarbonImpact();
  }, [nanogridId]);

  const fetchCarbonImpact = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('track-carbon-impact', {
        body: { nanogridId, periodDays: 30 }
      });

      if (error) throw error;
      setImpact(data.impact);
    } catch (error) {
      console.error('Failed to fetch carbon impact:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !impact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Carbon Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = impact.history.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    saved: parseFloat(day.carbon_saved_kg.toFixed(2)),
    emitted: parseFloat(day.carbon_emitted_kg.toFixed(2)),
    net: parseFloat(day.net_carbon_kg.toFixed(2))
  }));

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Carbon Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {impact.totals.carbonSaved.toFixed(0)} kg
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              CO₂ prevented from atmosphere
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Offset Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {impact.totals.carbonOffsetPercentage.toFixed(1)}%
            </div>
            <Progress value={impact.totals.carbonOffsetPercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${impact.totals.netCarbon < 0 ? 'text-green-600' : 'text-orange-600'}`}>
              {Math.abs(impact.totals.netCarbon).toFixed(0)} kg
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {impact.totals.netCarbon < 0 ? 'Net positive! 🌱' : 'Room for improvement'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Solar Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {impact.totals.solarGenerated.toFixed(0)} kWh
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Clean energy produced
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Equivalents */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
          <CardDescription>Real-world equivalents of your carbon savings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                <TreePine className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{impact.environmental.treesEquivalent}</p>
                <p className="text-sm text-muted-foreground">Trees planted equivalent</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Car className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{impact.environmental.carsMilesAvoided.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Car miles avoided</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20">
                <Home className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{impact.environmental.homesPoweredDays}</p>
                <p className="text-sm text-muted-foreground">Home-days powered</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <Flame className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{impact.environmental.coalAvoided}</p>
                <p className="text-sm text-muted-foreground">Tons of coal avoided</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carbon Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Carbon Impact Trend</CardTitle>
          <CardDescription>Daily carbon saved vs emitted over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="saved" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
                name="Carbon Saved"
              />
              <Area 
                type="monotone" 
                dataKey="emitted" 
                stackId="2"
                stroke="#f97316" 
                fill="#f97316" 
                fillOpacity={0.6}
                name="Carbon Emitted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};