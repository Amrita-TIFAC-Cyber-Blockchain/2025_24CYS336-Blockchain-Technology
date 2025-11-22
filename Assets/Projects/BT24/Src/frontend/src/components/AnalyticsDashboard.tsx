import { useState, useEffect } from 'react';
import { supabase } from '@/integration/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { BarChart3, DollarSign, TrendingUp, Zap, Battery, Loader2, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AnalyticsData {
  metrics: {
    period: { start: string; end: string; days: number };
    energy: {
      totalSolarGenerated: number;
      totalLoadConsumed: number;
      energySurplus: number;
      avgBatterySOC: number | null;
      peakSolar: number | null;
      peakLoad: number | null;
    };
    financial: {
      costSavings: number;
      revenue: number;
      netBenefit: number;
      annualProjection: number;
    };
    roi: {
      systemCost: number;
      paybackPeriod: number | null;
      roiPercentage: number;
    };
    efficiency: {
      selfConsumptionRate: number | null;
      autonomyRate: number | null;
    };
  };
  insights: {
    recommendations: string[];
    alerts: string[];
  };
}

interface AnalyticsDashboardProps {
  nanogridId: number;
}

export const AnalyticsDashboard = ({ nanogridId }: AnalyticsDashboardProps) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [periodDays, setPeriodDays] = useState('30');
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-analytics', {
        body: { nanogridId, periodDays: parseInt(periodDays) }
      });

      if (error) throw error;
      setAnalytics(data);
    } catch (error) {
      console.error('Analytics fetch error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load analytics. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [nanogridId, periodDays]);

  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!analytics) return null;

  const { metrics, insights } = analytics;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights and ROI analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={periodDays} onValueChange={setPeriodDays}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="365">1 year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchAnalytics} disabled={loading} size="icon" variant="outline">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.financial.costSavings}</div>
            <p className="text-xs text-muted-foreground">from solar generation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.financial.revenue}</div>
            <p className="text-xs text-muted-foreground">from energy sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net Benefit</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${metrics.financial.netBenefit}</div>
            <p className="text-xs text-muted-foreground">total period benefit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Annual Projection</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.financial.annualProjection}</div>
            <p className="text-xs text-muted-foreground">projected yearly benefit</p>
          </CardContent>
        </Card>
      </div>

      {/* ROI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Return on Investment</CardTitle>
          <CardDescription>System payback and ROI analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">System Cost</p>
              <p className="text-2xl font-bold">${metrics.roi.systemCost.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Payback Period</p>
              <p className="text-2xl font-bold">
                {metrics.roi.paybackPeriod !== null ? `${metrics.roi.paybackPeriod.toFixed(1)} years` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">ROI</p>
              <p className="text-2xl font-bold text-primary">{metrics.roi.roiPercentage.toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energy Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Energy Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Solar Generated</span>
              <span className="font-bold">{metrics.energy.totalSolarGenerated} kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Load Consumed</span>
              <span className="font-bold">{metrics.energy.totalLoadConsumed} kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Energy Surplus</span>
              <span className="font-bold text-primary">{metrics.energy.energySurplus} kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Peak Solar</span>
              <span className="font-bold">{metrics.energy.peakSolar ?? 'N/A'} {metrics.energy.peakSolar !== null && 'kW'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Peak Load</span>
              <span className="font-bold">{metrics.energy.peakLoad ?? 'N/A'} {metrics.energy.peakLoad !== null && 'kW'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Battery className="h-5 w-5" />
              Efficiency Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Self-Consumption Rate</span>
                <span className="font-bold">
                  {metrics.efficiency.selfConsumptionRate !== null ? `${metrics.efficiency.selfConsumptionRate.toFixed(1)}%` : 'N/A'}
                </span>
              </div>
              <Progress value={metrics.efficiency.selfConsumptionRate ?? 0} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Energy Autonomy</span>
                <span className="font-bold">
                  {metrics.efficiency.autonomyRate !== null ? `${metrics.efficiency.autonomyRate.toFixed(1)}%` : 'N/A'}
                </span>
              </div>
              <Progress value={Math.min(metrics.efficiency.autonomyRate ?? 0, 100)} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Avg Battery SOC</span>
                <span className="font-bold">
                  {metrics.energy.avgBatterySOC !== null ? `${metrics.energy.avgBatterySOC.toFixed(1)}%` : 'N/A'}
                </span>
              </div>
              <Progress value={metrics.energy.avgBatterySOC ?? 0} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      {(insights.recommendations.length > 0 || insights.alerts.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>AI Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.recommendations.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                <ul className="space-y-2">
                  {insights.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {insights.alerts.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-sm text-orange-500">Alerts</h4>
                <ul className="space-y-2">
                  {insights.alerts.map((alert, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-orange-500">⚠️</span>
                      <span>{alert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
