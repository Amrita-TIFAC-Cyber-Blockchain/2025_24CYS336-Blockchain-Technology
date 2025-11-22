// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { currentData } = await req.json();

    // Fetch enabled automation rules
    const { data: rules, error: rulesError } = await supabase
      .from("automation_rules")
      .select("*")
      .eq("user_id", user.id)
      .eq("enabled", true);

    if (rulesError) throw rulesError;

    const executedActions = [];
    const now = new Date();

    for (const rule of rules) {
      const { conditions, actions, nanogrid_id } = rule;
      
      // Filter data for this rule's nanogrid
      const nanogridData = currentData.find((n: any) => n.nanogrid_id === nanogrid_id);
      if (!nanogridData) continue;

      // Evaluate conditions
      let conditionsMet = true;
      for (const condition of conditions) {
        const { field, operator, value } = condition;
        const fieldValue = nanogridData[field];

        switch (operator) {
          case "greater_than":
            conditionsMet = conditionsMet && (fieldValue > value);
            break;
          case "less_than":
            conditionsMet = conditionsMet && (fieldValue < value);
            break;
          case "equals":
            conditionsMet = conditionsMet && (fieldValue === value);
            break;
          case "between":
            conditionsMet = conditionsMet && (fieldValue >= value.min && fieldValue <= value.max);
            break;
        }
      }

      // Execute actions if conditions are met
      if (conditionsMet) {
        for (const action of actions) {
          const { type, params } = action;
          
          let result = null;
          switch (type) {
            case "create_trade_order":
              // Would integrate with trading system
              result = {
                action: "trade_order_created",
                params,
                timestamp: now.toISOString()
              };
              break;
            
            case "send_alert":
              result = {
                action: "alert_sent",
                message: params.message,
                timestamp: now.toISOString()
              };
              break;
            
            case "adjust_load":
              result = {
                action: "load_adjusted",
                adjustment: params.adjustment,
                timestamp: now.toISOString()
              };
              break;
            
            case "charge_battery":
              result = {
                action: "battery_charging_initiated",
                target_soc: params.target_soc,
                timestamp: now.toISOString()
              };
              break;
          }

          if (result) {
            executedActions.push({
              rule_id: rule.id,
              rule_name: rule.rule_name,
              ...result
            });
          }
        }

        // Update last triggered timestamp
        await supabase
          .from("automation_rules")
          .update({ last_triggered: now.toISOString() })
          .eq("id", rule.id);
      }
    }

    return new Response(JSON.stringify({ 
      executed: executedActions.length,
      actions: executedActions 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Automation execution error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
