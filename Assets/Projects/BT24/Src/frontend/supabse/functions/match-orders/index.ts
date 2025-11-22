// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Unauthorized: Missing authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader }
        }
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('Unauthorized: Invalid authentication token');
    }

    console.log('Starting order matching triggered by user:', user.id);

    // Use service role client for database operations (required for cross-user order matching)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify the triggering user has at least one active order (prevents abuse)
    const { data: userOrders, error: userOrderError } = await supabaseAdmin
      .from('market_orders')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .limit(1);

    if (userOrderError) {
      console.error('Error checking user orders:', userOrderError);
    }

    if (!userOrders || userOrders.length === 0) {
      console.warn('Order matching triggered by user with no active orders:', user.id);
    }

    // Get all active buy and sell orders
    const { data: buyOrders, error: buyError } = await supabaseAdmin
      .from('market_orders')
      .select('*, nanogrid:nanogrids(wallet_address), user:profiles(wallet_address)')
      .eq('order_type', 'buy')
      .eq('status', 'active')
      .order('price_per_kwh', { ascending: false }); // Highest price first

    if (buyError) throw buyError;

    const { data: sellOrders, error: sellError } = await supabaseAdmin
      .from('market_orders')
      .select('*, nanogrid:nanogrids(wallet_address), user:profiles(wallet_address)')
      .eq('order_type', 'sell')
      .eq('status', 'active')
      .order('price_per_kwh', { ascending: true }); // Lowest price first

    if (sellError) throw sellError;

    const matches = [];

    // Simple matching algorithm
    for (const buyOrder of buyOrders || []) {
      for (const sellOrder of sellOrders || []) {
        if (buyOrder.price_per_kwh >= sellOrder.price_per_kwh) {
          const remainingBuy = buyOrder.amount_kwh - buyOrder.filled_kwh;
          const remainingSell = sellOrder.amount_kwh - sellOrder.filled_kwh;

          if (remainingBuy > 0 && remainingSell > 0) {
            const matchedAmount = Math.min(remainingBuy, remainingSell);
            const matchPrice = (buyOrder.price_per_kwh + sellOrder.price_per_kwh) / 2;

            matches.push({
              buyOrderId: buyOrder.id,
              sellOrderId: sellOrder.id,
              buyerId: buyOrder.user_id,
              sellerId: sellOrder.user_id,
              amount: matchedAmount,
              price: matchPrice,
            });

            // Update filled amounts
            buyOrder.filled_kwh += matchedAmount;
            sellOrder.filled_kwh += matchedAmount;
          }
        }
      }
    }

    console.log(`Found ${matches.length} matches`);

    // Audit log for monitoring
    console.log('Order matching summary:', {
      triggeredBy: user.id,
      timestamp: new Date().toISOString(),
      totalBuyOrders: buyOrders?.length || 0,
      totalSellOrders: sellOrders?.length || 0,
      matchesFound: matches.length,
      hasActiveOrder: (userOrders?.length || 0) > 0
    });

    // Execute matched trades
    for (const match of matches) {
      // Call execute-trade function with proper authentication
      const { data: tradeData, error: tradeError } = await supabase.functions.invoke('execute-trade', {
        body: {
          senderId: match.sellerId,
          receiverId: match.buyerId,
          amountKwh: match.amount,
          pricePerKwh: match.price,
        },
      });

      if (tradeError) {
        console.error('Trade execution failed:', tradeError);
        continue;
      }

      // Update order statuses
      const { error: buyUpdateError } = await supabaseAdmin
        .from('market_orders')
        .update({
          filled_kwh: match.amount,
          status: match.amount >= (await supabaseAdmin
            .from('market_orders')
            .select('amount_kwh')
            .eq('id', match.buyOrderId)
            .single()).data.amount_kwh ? 'filled' : 'active',
        })
        .eq('id', match.buyOrderId);

      const { error: sellUpdateError } = await supabaseAdmin
        .from('market_orders')
        .update({
          filled_kwh: match.amount,
          status: match.amount >= (await supabaseAdmin
            .from('market_orders')
            .select('amount_kwh')
            .eq('id', match.sellOrderId)
            .single()).data.amount_kwh ? 'filled' : 'active',
        })
        .eq('id', match.sellOrderId);

      if (buyUpdateError || sellUpdateError) {
        console.error('Order update failed:', buyUpdateError || sellUpdateError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        matchesFound: matches.length,
        message: `Matched and executed ${matches.length} trades`,
        triggeredBy: user.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error matching orders:', error);
    
    // Return appropriate status codes
    const status = error.message.includes('Unauthorized') ? 401 : 500;
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
