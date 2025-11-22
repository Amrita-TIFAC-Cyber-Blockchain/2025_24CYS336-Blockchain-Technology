import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAIPredictions } from "@/hooks/useAIPredictions";
import { Brain, AlertTriangle, TrendingUp, Zap } from "lucide-react";

export function AIPredictionPanel() {
  const { loadFlowPredictions, faultPredictions, recommendations, loading, error } = useAIPredictions();

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 animate-pulse" />
          <p>Loading AI predictions...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Recommendations */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Recommendations</h3>
        </div>
        <div className="space-y-3">
          {recommendations.length > 0 ? (
            recommendations.map((rec, idx) => (
              <Alert key={idx}>
                <TrendingUp className="h-4 w-4" />
                <AlertTitle className="flex items-center justify-between">
                  <span>{rec.type}</span>
                  <Badge variant={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                </AlertTitle>
                <AlertDescription>
                  <p className="mb-2">{rec.message}</p>
                  <p className="text-sm text-muted-foreground mb-1">{rec.action}</p>
                  <p className="text-sm font-medium text-primary">
                    Estimated benefit: ${rec.estimated_benefit}
                  </p>
                </AlertDescription>
              </Alert>
            ))
          ) : (
            <p className="text-muted-foreground">No recommendations at this time</p>
          )}
        </div>
      </Card>

      {/* Load Flow Predictions */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Load Flow Predictions</h3>
        </div>
        <div className="space-y-3">
          {loadFlowPredictions.map((pred) => (
            <div key={pred.nanogrid_id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Nanogrid {pred.nanogrid_id}</h4>
                <Badge variant="outline">{(pred.confidence * 100).toFixed(0)}% confidence</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Predicted Solar</p>
                  <p className="font-medium">{pred.predicted_solar.toFixed(2)} kW</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Predicted Load</p>
                  <p className="font-medium">{pred.predicted_load.toFixed(2)} kW</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Balance</p>
                  <p className={`font-medium ${pred.predicted_balance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {pred.predicted_balance > 0 ? '+' : ''}{pred.predicted_balance.toFixed(2)} kW
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Fault Predictions */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Fault Detection & Prediction</h3>
        </div>
        <div className="space-y-3">
          {faultPredictions.map((fault) => (
            <Alert key={fault.nanogrid_id} variant={fault.severity === 'high' ? 'destructive' : 'default'}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="flex items-center justify-between">
                <span>Nanogrid {fault.nanogrid_id} - {fault.fault_type}</span>
                <Badge variant={getSeverityColor(fault.severity)}>
                  {(fault.fault_probability * 100).toFixed(0)}% risk
                </Badge>
              </AlertTitle>
              <AlertDescription>
                <p className="text-sm">{fault.recommendation}</p>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </Card>
    </div>
  );
}
