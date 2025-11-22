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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all prosumer stats with user info
    const { data: allStats, error: statsError } = await supabaseClient
      .from('prosumer_stats')
      .select(`
        *,
        profiles!inner(display_name, wallet_address)
      `)
      .order('total_energy_traded', { ascending: false });

    if (statsError) throw statsError;

    // Calculate ranks based on multiple factors
    const rankedStats = allStats.map((stat, index) => {
      // Composite score: energy traded (40%), revenue (30%), carbon offset (20%), efficiency (10%)
      const compositeScore = 
        (stat.total_energy_traded * 0.4) +
        (stat.total_revenue * 0.3) +
        (stat.carbon_offset_kg * 0.2) +
        (stat.energy_efficiency_score * 0.1);

      return {
        ...stat,
        rank: index + 1,
        compositeScore
      };
    }).sort((a, b) => b.compositeScore - a.compositeScore);

    // Update ranks in database
    for (const stat of rankedStats) {
      await supabaseClient
        .from('prosumer_stats')
        .update({ rank: stat.rank })
        .eq('id', stat.id);
    }

    // Return top 10 for leaderboard
    const topProsumers = rankedStats.slice(0, 10).map(stat => ({
      rank: stat.rank,
      userId: stat.user_id,
      displayName: stat.profiles?.display_name || 'Anonymous',
      walletAddress: stat.profiles?.wallet_address,
      totalEnergyTraded: stat.total_energy_traded,
      totalRevenue: stat.total_revenue,
      carbonOffset: stat.carbon_offset_kg,
      efficiencyScore: stat.energy_efficiency_score,
      tradingStreak: stat.trading_streak_days,
      achievements: stat.achievements,
      compositeScore: stat.compositeScore
    }));

    return new Response(
      JSON.stringify({ leaderboard: topProsumers, totalProsumers: rankedStats.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Leaderboard calculation error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});