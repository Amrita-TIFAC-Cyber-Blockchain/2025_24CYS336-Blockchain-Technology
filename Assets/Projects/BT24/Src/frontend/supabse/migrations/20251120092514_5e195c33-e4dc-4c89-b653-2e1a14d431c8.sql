-- Enable RLS on all new tables
ALTER TABLE public.nanogrid_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_config ENABLE ROW LEVEL SECURITY;

-- Fix search path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;