-- Enable RLS on existing tables if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create nanogrid_history table for storing historical metrics
CREATE TABLE IF NOT EXISTS public.nanogrid_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nanogrid_id INTEGER NOT NULL,
  solar_output DECIMAL(10,2) NOT NULL,
  load_demand DECIMAL(10,2) NOT NULL,
  battery_soc DECIMAL(5,2) NOT NULL,
  power_balance DECIMAL(10,2) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create ai_predictions table for storing AI prediction history
CREATE TABLE IF NOT EXISTS public.ai_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nanogrid_id INTEGER NOT NULL,
  prediction_type TEXT NOT NULL,
  predicted_value DECIMAL(10,2),
  confidence DECIMAL(5,2),
  actual_value DECIMAL(10,2),
  accuracy DECIMAL(5,2),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create automation_rules table for user-defined automated actions
CREATE TABLE IF NOT EXISTS public.automation_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nanogrid_id INTEGER,
  rule_name TEXT NOT NULL,
  rule_type TEXT NOT NULL,
  conditions JSONB NOT NULL,
  actions JSONB NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  last_triggered TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create analytics_reports table for generated insights
CREATE TABLE IF NOT EXISTS public.analytics_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nanogrid_id INTEGER,
  report_type TEXT NOT NULL,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  metrics JSONB NOT NULL,
  insights JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create alert_config table for user alert preferences
CREATE TABLE IF NOT EXISTS public.alert_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  threshold_value DECIMAL(10,2),
  conditions JSONB,
  notification_methods JSONB DEFAULT '["in_app"]'::jsonb,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_nanogrid_history_user_id ON public.nanogrid_history(user_id);
CREATE INDEX idx_nanogrid_history_nanogrid_id ON public.nanogrid_history(nanogrid_id);
CREATE INDEX idx_nanogrid_history_timestamp ON public.nanogrid_history(timestamp);
CREATE INDEX idx_ai_predictions_user_id ON public.ai_predictions(user_id);
CREATE INDEX idx_ai_predictions_nanogrid_id ON public.ai_predictions(nanogrid_id);
CREATE INDEX idx_automation_rules_user_id ON public.automation_rules(user_id);
CREATE INDEX idx_automation_rules_enabled ON public.automation_rules(enabled);
CREATE INDEX idx_analytics_reports_user_id ON public.analytics_reports(user_id);
CREATE INDEX idx_alert_config_user_id ON public.alert_config(user_id);

-- RLS Policies for nanogrid_history
CREATE POLICY "Users can view their own nanogrid history"
  ON public.nanogrid_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own nanogrid history"
  ON public.nanogrid_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for ai_predictions
CREATE POLICY "Users can view their own AI predictions"
  ON public.ai_predictions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI predictions"
  ON public.ai_predictions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for automation_rules
CREATE POLICY "Users can view their own automation rules"
  ON public.automation_rules FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own automation rules"
  ON public.automation_rules FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own automation rules"
  ON public.automation_rules FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own automation rules"
  ON public.automation_rules FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for analytics_reports
CREATE POLICY "Users can view their own analytics reports"
  ON public.analytics_reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics reports"
  ON public.analytics_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for alert_config
CREATE POLICY "Users can view their own alert config"
  ON public.alert_config FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alert config"
  ON public.alert_config FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alert config"
  ON public.alert_config FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alert config"
  ON public.alert_config FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_automation_rules_updated_at
  BEFORE UPDATE ON public.automation_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alert_config_updated_at
  BEFORE UPDATE ON public.alert_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.automation_rules;
ALTER PUBLICATION supabase_realtime ADD TABLE public.alert_config;