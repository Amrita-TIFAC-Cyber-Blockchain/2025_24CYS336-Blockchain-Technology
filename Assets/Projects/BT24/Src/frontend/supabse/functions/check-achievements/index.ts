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

    // Get user's current stats
    const { data: stats } = await supabaseClient
      .from('prosumer_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!stats) {
      // Create initial stats if they don't exist
      await supabaseClient
        .from('prosumer_stats')
        .insert({
          user_id: user.id,
          total_energy_traded: 0,
          total_revenue: 0,
          carbon_offset_kg: 0,
          energy_efficiency_score: 0,
          trading_streak_days: 0,
          achievements: []
        });
      return new Response(
        JSON.stringify({ newAchievements: [], totalPoints: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get all achievements
    const { data: allAchievements } = await supabaseClient
      .from('achievements')
      .select('*');

    // Get user's transactions for additional metrics
    const { data: transactions } = await supabaseClient
      .from('transactions')
      .select('*')
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .eq('status', 'completed');

    const tradesCount = transactions?.length || 0;

    // Check which achievements are unlocked
    const unlockedAchievements = stats.achievements || [];
    const newAchievements: any[] = [];
    let totalPoints = 0;

    allAchievements?.forEach(achievement => {
      // Skip if already unlocked
      if (unlockedAchievements.includes(achievement.id)) {
        return;
      }

      let unlocked = false;
      
      switch (achievement.threshold_type) {
        case 'trades_count':
          unlocked = tradesCount >= achievement.threshold_value;
          break;
        case 'energy_traded':
          unlocked = stats.total_energy_traded >= achievement.threshold_value;
          break;
        case 'carbon_offset':
          unlocked = stats.carbon_offset_kg >= achievement.threshold_value;
          break;
        case 'efficiency_score':
          unlocked = stats.energy_efficiency_score >= achievement.threshold_value;
          break;
        case 'streak_days':
          unlocked = stats.trading_streak_days >= achievement.threshold_value;
          break;
        case 'solar_generated':
          // Would need additional tracking
          break;
      }

      if (unlocked) {
        newAchievements.push(achievement);
        totalPoints += achievement.reward_points;
      }
    });

    // Update user's achievements if there are new ones
    if (newAchievements.length > 0) {
      const updatedAchievements = [
        ...unlockedAchievements,
        ...newAchievements.map(a => a.id)
      ];

      await supabaseClient
        .from('prosumer_stats')
        .update({
          achievements: updatedAchievements,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      // Post to community feed
      await supabaseClient
        .from('community_feed')
        .insert({
          user_id: user.id,
          activity_type: 'achievement_unlocked',
          content: {
            achievements: newAchievements.map(a => ({
              name: a.name,
              icon: a.icon,
              points: a.reward_points
            }))
          },
          visibility: 'public'
        });
    }

    return new Response(
      JSON.stringify({
        newAchievements: newAchievements.map(a => ({
          id: a.id,
          name: a.name,
          description: a.description,
          icon: a.icon,
          category: a.category,
          points: a.reward_points
        })),
        totalPoints,
        allUnlocked: [...unlockedAchievements, ...newAchievements.map(a => a.id)].length,
        totalAvailable: allAchievements?.length || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Achievement check error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});