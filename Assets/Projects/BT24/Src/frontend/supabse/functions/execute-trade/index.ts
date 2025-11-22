// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { crypto } from 'https://deno.land/std@0.224.0/crypto/mod.ts';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const tradeSchema = z.object({
  senderId: z.string().uuid(),
  receiverId: z.string().uuid(),
  amountKwh: z.number().positive().max(10000),
  pricePerKwh: z.number().positive().max(1000)
});

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

    // Parse and validate input
    const requestBody = await req.json();
    const validated = tradeSchema.parse(requestBody);
    const { senderId, receiverId, amountKwh, pricePerKwh } = validated;

    // Authorization check: ensure the authenticated user is the sender
    if (user.id !== senderId) {
      throw new Error('Forbidden: Not authorized to execute trade on behalf of sender');
    }

    console.log('Executing trade:', { senderId, receiverId, amountKwh, pricePerKwh, userId: user.id });

    // Use service role client for database operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get sender and receiver profiles with wallet addresses
    const { data: sender, error: senderError } = await supabaseAdmin
      .from('profiles')
      .select('wallet_address, id')
      .eq('id', senderId)
      .single();

    if (senderError) throw new Error(`Sender not found: ${senderError.message}`);

    const { data: receiver, error: receiverError } = await supabaseAdmin
      .from('profiles')
      .select('wallet_address, id')
      .eq('id', receiverId)
      .single();

    if (receiverError) throw new Error(`Receiver not found: ${receiverError.message}`);

    // Additional authorization: Verify sender owns a nanogrid with this wallet address
    const { data: senderNanogrid, error: nanogridError } = await supabaseAdmin
      .from('nanogrids')
      .select('id, owner_id')
      .eq('wallet_address', sender.wallet_address)
      .eq('owner_id', senderId)
      .maybeSingle();

    if (nanogridError) {
      console.error('Error checking nanogrid ownership:', nanogridError);
    }
    
    if (!senderNanogrid) {
      console.warn('Trade executed without verified nanogrid ownership for sender:', senderId);
    }

    // Generate blockchain-like transaction hash
    const hashInput = `${sender.wallet_address}${receiver.wallet_address}${amountKwh}${Date.now()}`;
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(hashInput)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const transactionHash = '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Simulate block number (in real blockchain this would be actual block height)
    const blockNumber = Math.floor(Date.now() / 1000);

    // Create transaction record
    const { data: transaction, error: txError } = await supabaseAdmin
      .from('transactions')
      .insert({
        transaction_hash: transactionHash,
        sender_id: senderId,
        receiver_id: receiverId,
        sender_address: sender.wallet_address,
        receiver_address: receiver.wallet_address,
        amount_kwh: amountKwh,
        price_per_kwh: pricePerKwh,
        status: 'completed',
        block_number: blockNumber,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (txError) throw new Error(`Transaction failed: ${txError.message}`);

    // Audit log for security monitoring
    console.log('Transaction completed:', {
      transactionId: transaction.id,
      transactionHash: transaction.transaction_hash,
      senderId,
      receiverId,
      amountKwh,
      pricePerKwh,
      totalCost: amountKwh * pricePerKwh,
      timestamp: new Date().toISOString(),
      authenticatedUser: user.id,
      nanogridVerified: !!senderNanogrid
    });

    return new Response(
      JSON.stringify({
        success: true,
        transaction,
        message: 'Trade executed successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error executing trade:', error);
    
    // Return appropriate status codes
    const status = error.message.includes('Unauthorized') ? 401 : 
                   error.message.includes('Forbidden') ? 403 :
                   error.message.includes('validation') ? 400 : 500;
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
