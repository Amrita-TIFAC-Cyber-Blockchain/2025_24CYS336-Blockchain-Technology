-- Create enum for transaction status
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');

-- Create enum for nanogrid status
CREATE TYPE nanogrid_status AS ENUM ('online', 'offline', 'maintenance');

-- Create profiles table for user wallets
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_address TEXT UNIQUE NOT NULL,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create nanogrids table
CREATE TABLE public.nanogrids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nanogrid_id INTEGER UNIQUE NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  wallet_address TEXT NOT NULL,
  name TEXT NOT NULL,
  location TEXT,
  solar_capacity DECIMAL(10, 2) NOT NULL DEFAULT 0,
  battery_capacity DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status nanogrid_status NOT NULL DEFAULT 'online',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create energy_metrics table for real-time data
CREATE TABLE public.energy_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nanogrid_id UUID REFERENCES public.nanogrids(id) ON DELETE CASCADE NOT NULL,
  solar_output DECIMAL(10, 2) NOT NULL DEFAULT 0,
  load_demand DECIMAL(10, 2) NOT NULL DEFAULT 0,
  battery_soc DECIMAL(5, 2) NOT NULL DEFAULT 0,
  power_balance DECIMAL(10, 2) GENERATED ALWAYS AS (solar_output - load_demand) STORED,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create transactions table (blockchain ledger)
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_hash TEXT UNIQUE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  sender_address TEXT NOT NULL,
  receiver_address TEXT NOT NULL,
  amount_kwh DECIMAL(10, 3) NOT NULL,
  price_per_kwh DECIMAL(10, 4) NOT NULL,
  total_cost DECIMAL(10, 2) GENERATED ALWAYS AS (amount_kwh * price_per_kwh) STORED,
  status transaction_status NOT NULL DEFAULT 'pending',
  block_number BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Create market_orders table
CREATE TABLE public.market_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nanogrid_id UUID REFERENCES public.nanogrids(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  order_type TEXT NOT NULL CHECK (order_type IN ('buy', 'sell')),
  amount_kwh DECIMAL(10, 3) NOT NULL,
  price_per_kwh DECIMAL(10, 4) NOT NULL,
  filled_kwh DECIMAL(10, 3) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'filled', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nanogrids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.energy_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_orders ENABLE ROW LEVEL SECURITY;

-- Profiles policies (users can read all profiles but only update their own)
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Nanogrids policies
CREATE POLICY "Nanogrids are viewable by everyone"
  ON public.nanogrids FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own nanogrids"
  ON public.nanogrids FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own nanogrids"
  ON public.nanogrids FOR UPDATE
  USING (auth.uid() = owner_id);

-- Energy metrics policies
CREATE POLICY "Energy metrics are viewable by everyone"
  ON public.energy_metrics FOR SELECT
  USING (true);

CREATE POLICY "Nanogrid owners can insert energy metrics"
  ON public.energy_metrics FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.nanogrids
      WHERE nanogrids.id = energy_metrics.nanogrid_id AND nanogrids.owner_id = auth.uid()
    )
  );

-- Transactions policies (public ledger - everyone can read)
CREATE POLICY "Transactions are viewable by everyone"
  ON public.transactions FOR SELECT
  USING (true);

CREATE POLICY "Users can create transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Market orders policies
CREATE POLICY "Market orders are viewable by everyone"
  ON public.market_orders FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own orders"
  ON public.market_orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
  ON public.market_orders FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_nanogrids_owner ON public.nanogrids(owner_id);
CREATE INDEX idx_energy_metrics_nanogrid ON public.energy_metrics(nanogrid_id);
CREATE INDEX idx_energy_metrics_timestamp ON public.energy_metrics(timestamp DESC);
CREATE INDEX idx_transactions_sender ON public.transactions(sender_id);
CREATE INDEX idx_transactions_receiver ON public.transactions(receiver_id);
CREATE INDEX idx_transactions_created ON public.transactions(created_at DESC);
CREATE INDEX idx_market_orders_nanogrid ON public.market_orders(nanogrid_id);
CREATE INDEX idx_market_orders_status ON public.market_orders(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_nanogrids_updated_at
  BEFORE UPDATE ON public.nanogrids
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_market_orders_updated_at
  BEFORE UPDATE ON public.market_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, wallet_address, display_name)
  VALUES (
    NEW.id,
    '0x' || substring(md5(random()::text) from 1 for 40),
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.energy_metrics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.market_orders;