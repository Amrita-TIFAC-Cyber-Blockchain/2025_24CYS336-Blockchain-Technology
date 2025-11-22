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

    const { nanogridId, periodDays = 30 } = await req.json();

    // Fetch historical data
    const periodStart = new Date();
    periodStart.setDate(periodStart.getDate() - periodDays);

    const { data: history, error: historyError } = await supabase
      .from("nanogrid_history")
      .select("*")
      .eq("user_id", user.id)
      .eq("nanogrid_id", nanogridId)
      .gte("timestamp", periodStart.toISOString())
      .order("timestamp");

    if (historyError) throw historyError;

    // Calculate analytics metrics
    const totalSolarGenerated = history.reduce((sum, h) => sum + parseFloat(h.solar_output), 0);
    const totalLoadConsumed = history.reduce((sum, h) => sum + parseFloat(h.load_demand), 0);
    const avgBatterySOC = history.reduce((sum, h) => sum + parseFloat(h.battery_soc), 0) / history.length;
    const energySurplus = totalSolarGenerated - totalLoadConsumed;
    
    // Cost calculations (example rates)
    const gridRate = 0.12; // $/kWh
    const sellRate = 0.08; // $/kWh
    const costSavings = totalSolarGenerated * gridRate;
    const revenue = energySurplus > 0 ? energySurplus * sellRate : 0;
    const netBenefit = costSavings + revenue;
    
    // ROI calculation (assuming $10k system cost)
    const systemCost = 10000;
    const annualBenefit = (netBenefit / periodDays) * 365;
    const paybackPeriod = systemCost / annualBenefit;
    const roi = (annualBenefit / systemCost) * 100;

    // Efficiency metrics
    const selfConsumptionRate = ((totalLoadConsumed / totalSolarGenerated) * 100).toFixed(2);
    const autonomyRate = ((totalSolarGenerated / totalLoadConsumed) * 100).toFixed(2);

    // Peak performance analysis
    const peakSolar = Math.max(...history.map(h => parseFloat(h.solar_output)));
    const peakLoad = Math.max(...history.map(h => parseFloat(h.load_demand)));
    
    const metrics = {
      period: {
        start: periodStart.toISOString(),
        end: new Date().toISOString(),
        days: periodDays
      },
      energy: {
        totalSolarGenerated: parseFloat(totalSolarGenerated.toFixed(2)),
        totalLoadConsumed: parseFloat(totalLoadConsumed.toFixed(2)),
        energySurplus: parseFloat(energySurplus.toFixed(2)),
        avgBatterySOC: parseFloat(avgBatterySOC.toFixed(2)),
        peakSolar,
        peakLoad
      },
      financial: {
        costSavings: parseFloat(costSavings.toFixed(2)),
        revenue: parseFloat(revenue.toFixed(2)),
        netBenefit: parseFloat(netBenefit.toFixed(2)),
        annualProjection: parseFloat(annualBenefit.toFixed(2))
      },
      roi: {
        systemCost,
        paybackPeriod: parseFloat(paybackPeriod.toFixed(2)),
        roiPercentage: parseFloat(roi.toFixed(2))
      },
      efficiency: {
        selfConsumptionRate: parseFloat(selfConsumptionRate),
        autonomyRate: parseFloat(autonomyRate)
      }
    };

    const insights = {
      recommendations: [],
      alerts: []
    };

    // Generate insights
    if (parseFloat(selfConsumptionRate) < 70) {
      insights.recommendations.push("Consider adding battery capacity to improve self-consumption.");
    }
    if (energySurplus > totalLoadConsumed * 0.3) {
      insights.recommendations.push("High surplus detected. Enable P2P trading to maximize revenue.");
    }
    if (avgBatterySOC < 30) {
      insights.alerts.push("Low average battery charge. Consider load balancing.");
    }

    // Store analytics report
    const { error: reportError } = await supabase
      .from("analytics_reports")
      .insert({
        user_id: user.id,
        nanogrid_id: nanogridId,
        report_type: "comprehensive",
        period_start: periodStart.toISOString(),
        period_end: new Date().toISOString(),
        metrics,
        insights
      });

    if (reportError) console.error("Failed to store report:", reportError);

    return new Response(JSON.stringify({ metrics, insights }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Analytics generation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
