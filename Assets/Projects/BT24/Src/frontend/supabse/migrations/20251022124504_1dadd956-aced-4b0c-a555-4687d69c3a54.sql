-- Fix RLS policies to restrict public access to sensitive data

-- 1. Fix profiles table - restrict to user's own profile
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- 2. Fix nanogrids table - restrict to owner's nanogrids
DROP POLICY IF EXISTS "Nanogrids are viewable by everyone" ON public.nanogrids;

CREATE POLICY "Users can view their own nanogrids" 
ON public.nanogrids 
FOR SELECT 
USING (auth.uid() = owner_id);

-- 3. Fix transactions table - restrict to sender/receiver
DROP POLICY IF EXISTS "Transactions are viewable by everyone" ON public.transactions;

CREATE POLICY "Users can view their own transactions" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() IN (sender_id, receiver_id));

-- 4. Fix market_orders table - restrict to user's orders
DROP POLICY IF EXISTS "Market orders are viewable by everyone" ON public.market_orders;

CREATE POLICY "Users can view their own orders" 
ON public.market_orders 
FOR SELECT 
USING (auth.uid() = user_id);