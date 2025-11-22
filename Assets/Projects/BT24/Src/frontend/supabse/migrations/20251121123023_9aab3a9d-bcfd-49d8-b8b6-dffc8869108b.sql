-- Create leaderboard and achievements tables
CREATE TABLE public.prosumer_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  total_energy_traded NUMERIC DEFAULT 0,
  total_revenue NUMERIC DEFAULT 0,
  carbon_offset_kg NUMERIC DEFAULT 0,
  energy_efficiency_score NUMERIC DEFAULT 0,
  trading_streak_days INTEGER DEFAULT 0,
  last_trade_date TIMESTAMP WITH TIME ZONE,
  rank INTEGER,
  achievements JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  threshold_value NUMERIC NOT NULL,
  threshold_type TEXT NOT NULL,
  reward_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.carbon_footprint (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  nanogrid_id INTEGER NOT NULL,
  date DATE NOT NULL,
  solar_generation_kwh NUMERIC NOT NULL,
  grid_consumption_kwh NUMERIC DEFAULT 0,
  carbon_saved_kg NUMERIC NOT NULL,
  carbon_emitted_kg NUMERIC DEFAULT 0,
  net_carbon_kg NUMERIC NOT NULL,
  trees_equivalent NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, nanogrid_id, date)
);

CREATE TABLE public.community_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  activity_type TEXT NOT NULL,
  content JSONB NOT NULL,
  visibility TEXT DEFAULT 'public',
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.prosumer_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carbon_footprint ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_feed ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prosumer_stats
CREATE POLICY "Users can view all prosumer stats" ON public.prosumer_stats
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own stats" ON public.prosumer_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" ON public.prosumer_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Everyone can view achievements" ON public.achievements
  FOR SELECT USING (true);

-- RLS Policies for carbon_footprint
CREATE POLICY "Users can view their own carbon data" ON public.carbon_footprint
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own carbon data" ON public.carbon_footprint
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for community_feed
CREATE POLICY "Users can view public feed" ON public.community_feed
  FOR SELECT USING (visibility = 'public' OR auth.uid() = user_id);

CREATE POLICY "Users can create their own posts" ON public.community_feed
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON public.community_feed
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" ON public.community_feed
  FOR DELETE USING (auth.uid() = user_id);

-- Add updated_at trigger
CREATE TRIGGER update_prosumer_stats_updated_at
  BEFORE UPDATE ON public.prosumer_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default achievements
INSERT INTO public.achievements (name, description, icon, category, threshold_value, threshold_type, reward_points) VALUES
  ('First Trade', 'Complete your first energy trade', '🌟', 'trading', 1, 'trades_count', 10),
  ('Green Pioneer', 'Trade 100 kWh of clean energy', '🌱', 'energy', 100, 'energy_traded', 50),
  ('Carbon Hero', 'Offset 500 kg of CO2', '🌍', 'carbon', 500, 'carbon_offset', 100),
  ('Efficiency Expert', 'Maintain 90% efficiency for 7 days', '⚡', 'efficiency', 90, 'efficiency_score', 75),
  ('Trading Streak', 'Trade for 30 consecutive days', '🔥', 'streak', 30, 'streak_days', 150),
  ('Energy Champion', 'Trade 1000 kWh total', '👑', 'energy', 1000, 'energy_traded', 200),
  ('Community Leader', 'Help 10 other prosumers', '🤝', 'social', 10, 'community_helps', 100),
  ('Solar Master', 'Generate 500 kWh from solar', '☀️', 'generation', 500, 'solar_generated', 125);

-- Enable realtime for community feed
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_feed;