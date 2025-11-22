import { useState, useEffect } from 'react';
import { supabase } from '@/integration/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Zap, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AutomationRule {
  id: string;
  rule_name: string;
  rule_type: string;
  conditions: any;
  actions: any;
  enabled: boolean;
  last_triggered: string | null;
}

interface AutomationRulesProps {
  nanogridId: number;
}

export const AutomationRules = ({ nanogridId }: AutomationRulesProps) => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewRule, setShowNewRule] = useState(false);
  const { toast } = useToast();

  const [newRule, setNewRule] = useState({
    rule_name: '',
    rule_type: 'energy_trading',
    condition_field: 'power_balance',
    condition_operator: 'greater_than',
    condition_value: '5',
    action_type: 'create_trade_order',
    action_params: { amount: 5, price: 0.08 }
  });

  useEffect(() => {
    fetchRules();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('automation_rules_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'automation_rules' },
        () => fetchRules()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRules(data || []);
    } catch (error) {
      console.error('Error fetching rules:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRule = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('automation_rules').insert({
        user_id: user.id,
        nanogrid_id: nanogridId,
        rule_name: newRule.rule_name,
        rule_type: newRule.rule_type,
        conditions: [{
          field: newRule.condition_field,
          operator: newRule.condition_operator,
          value: parseFloat(newRule.condition_value)
        }],
        actions: [{
          type: newRule.action_type,
          params: newRule.action_params
        }],
        enabled: true
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Automation rule created successfully',
      });

      setShowNewRule(false);
      setNewRule({
        rule_name: '',
        rule_type: 'energy_trading',
        condition_field: 'power_balance',
        condition_operator: 'greater_than',
        condition_value: '5',
        action_type: 'create_trade_order',
        action_params: { amount: 5, price: 0.08 }
      });
    } catch (error) {
      console.error('Error creating rule:', error);
      toast({
        title: 'Error',
        description: 'Failed to create automation rule',
        variant: 'destructive',
      });
    }
  };

  const toggleRule = async (ruleId: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('automation_rules')
        .update({ enabled })
        .eq('id', ruleId);

      if (error) throw error;

      toast({
        title: enabled ? 'Rule Enabled' : 'Rule Disabled',
        description: `Automation rule has been ${enabled ? 'enabled' : 'disabled'}`,
      });
    } catch (error) {
      console.error('Error toggling rule:', error);
      toast({
        title: 'Error',
        description: 'Failed to update rule',
        variant: 'destructive',
      });
    }
  };

  const deleteRule = async (ruleId: string) => {
    try {
      const { error } = await supabase
        .from('automation_rules')
        .delete()
        .eq('id', ruleId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Automation rule deleted',
      });
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete rule',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Automation Rules</h3>
          <p className="text-sm text-muted-foreground">Configure automated actions based on conditions</p>
        </div>
        <Button onClick={() => setShowNewRule(!showNewRule)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Rule
        </Button>
      </div>

      {showNewRule && (
        <Card>
          <CardHeader>
            <CardTitle>Create Automation Rule</CardTitle>
            <CardDescription>Define conditions and actions for automatic execution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input
                value={newRule.rule_name}
                onChange={(e) => setNewRule({ ...newRule, rule_name: e.target.value })}
                placeholder="e.g., Auto-trade surplus energy"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Condition Field</Label>
                <Select value={newRule.condition_field} onValueChange={(v) => setNewRule({ ...newRule, condition_field: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="power_balance">Power Balance</SelectItem>
                    <SelectItem value="battery_soc">Battery SOC</SelectItem>
                    <SelectItem value="solar_output">Solar Output</SelectItem>
                    <SelectItem value="load_demand">Load Demand</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Operator</Label>
                <Select value={newRule.condition_operator} onValueChange={(v) => setNewRule({ ...newRule, condition_operator: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greater_than">Greater Than</SelectItem>
                    <SelectItem value="less_than">Less Than</SelectItem>
                    <SelectItem value="equals">Equals</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  type="number"
                  value={newRule.condition_value}
                  onChange={(e) => setNewRule({ ...newRule, condition_value: e.target.value })}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Action Type</Label>
              <Select value={newRule.action_type} onValueChange={(v) => setNewRule({ ...newRule, action_type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create_trade_order">Create Trade Order</SelectItem>
                  <SelectItem value="send_alert">Send Alert</SelectItem>
                  <SelectItem value="adjust_load">Adjust Load</SelectItem>
                  <SelectItem value="charge_battery">Charge Battery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={createRule} className="flex-1">
                <Zap className="h-4 w-4 mr-2" />
                Create Rule
              </Button>
              <Button onClick={() => setShowNewRule(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {rules.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No automation rules configured yet</p>
            </CardContent>
          </Card>
        ) : (
          rules.map((rule) => (
            <Card key={rule.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{rule.rule_name}</h4>
                      <Badge variant={rule.enabled ? 'default' : 'secondary'}>
                        {rule.enabled ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      When {rule.conditions[0]?.field} {rule.conditions[0]?.operator.replace('_', ' ')} {rule.conditions[0]?.value},
                      then {rule.actions[0]?.type.replace('_', ' ')}
                    </p>
                    {rule.last_triggered && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Last triggered: {new Date(rule.last_triggered).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={(checked) => toggleRule(rule.id, checked)}
                    />
                    <Button
                      onClick={() => deleteRule(rule.id)}
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
