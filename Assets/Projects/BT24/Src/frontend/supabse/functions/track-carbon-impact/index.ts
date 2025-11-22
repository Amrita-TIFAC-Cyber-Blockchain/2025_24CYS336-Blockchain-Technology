// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { nanogridId, periodDays = 30 } = await req.json();

    // Get nanogrid history for the period
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    const { data: history, error: historyError } = await supabaseClient
      .from('nanogrid_history')
      .select('*')
      .eq('nanogrid_id', nanogridId)
      .eq('user_id', user.id)
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: true });

    if (historyError) throw historyError;

    // Calculate carbon metrics
    // Average grid emission factor: 0.92 kg CO2 per kWh (global average)
    // Solar energy offset: prevents this amount of CO2 from being emitted
    const GRID_EMISSION_FACTOR = 0.92;
    const TREES_PER_TON_CO2 = 50; // One tree absorbs ~20kg CO2/year

    let totalSolarGenerated = 0;
    let totalGridConsumption = 0;
    let carbonSaved = 0;
    let carbonEmitted = 0;

    const dailyData = new Map<string, any>();

    history.forEach(record => {
      const date = new Date(record.timestamp).toISOString().split('T')[0];
      
      if (!dailyData.has(date)) {
        dailyData.set(date, {
          solarGenerated: 0,
          loadDemand: 0,
          gridUsage: 0
        });
      }

      const daily = dailyData.get(date);
      daily.solarGenerated += record.solar_output;
      daily.loadDemand += record.load_demand;
      
      // Calculate grid usage (when solar doesn't cover demand)
      const deficit = Math.max(0, record.load_demand - record.solar_output);
      daily.gridUsage += deficit;
    });

    // Calculate totals and carbon impact
    for (const [date, data] of dailyData) {
      totalSolarGenerated += data.solarGenerated;
      totalGridConsumption += data.gridUsage;
      
      // Carbon saved by using solar instead of grid
      const savedFromSolar = data.solarGenerated * GRID_EMISSION_FACTOR;
      carbonSaved += savedFromSolar;
      
      // Carbon emitted from grid usage
      const emittedFromGrid = data.gridUsage * GRID_EMISSION_FACTOR;
      carbonEmitted += emittedFromGrid;

      // Store daily carbon footprint
      await supabaseClient
        .from('carbon_footprint')
        .upsert({
          user_id: user.id,
          nanogrid_id: nanogridId,
          date: date,
          solar_generation_kwh: data.solarGenerated,
          grid_consumption_kwh: data.gridUsage,
          carbon_saved_kg: savedFromSolar,
          carbon_emitted_kg: emittedFromGrid,
          net_carbon_kg: emittedFromGrid - savedFromSolar,
          trees_equivalent: (savedFromSolar / 1000) * TREES_PER_TON_CO2
        }, {
          onConflict: 'user_id,nanogrid_id,date'
        });
    }

    const netCarbon = carbonEmitted - carbonSaved;
    const treesEquivalent = (carbonSaved / 1000) * TREES_PER_TON_CO2;
    const carbonOffsetPercentage = totalSolarGenerated > 0 
      ? (carbonSaved / (carbonSaved + carbonEmitted)) * 100 
      : 0;

    // Get historical carbon data for chart
    const { data: carbonHistory } = await supabaseClient
      .from('carbon_footprint')
      .select('*')
      .eq('user_id', user.id)
      .eq('nanogrid_id', nanogridId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    const impact = {
      period: { days: periodDays, start: startDate, end: new Date() },
      totals: {
        solarGenerated: totalSolarGenerated,
        gridConsumption: totalGridConsumption,
        carbonSaved: carbonSaved,
        carbonEmitted: carbonEmitted,
        netCarbon: netCarbon,
        carbonOffsetPercentage: carbonOffsetPercentage
      },
      environmental: {
        treesEquivalent: Math.round(treesEquivalent),
        carsMilesAvoided: Math.round((carbonSaved / 0.404)), // avg car emits 0.404 kg CO2/mile
        homesPoweredDays: Math.round(totalSolarGenerated / 30), // avg home uses 30 kWh/day
        coalAvoided: (carbonSaved / 1000 / 0.9).toFixed(2) // 1 ton coal = ~0.9 tons CO2
      },
      history: carbonHistory || []
    };

    // Update prosumer stats with carbon data
    const { data: existingStats } = await supabaseClient
      .from('prosumer_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (existingStats) {
      await supabaseClient
        .from('prosumer_stats')
        .update({
          carbon_offset_kg: carbonSaved,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
    }

    return new Response(
      JSON.stringify({ impact }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Carbon tracking error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});