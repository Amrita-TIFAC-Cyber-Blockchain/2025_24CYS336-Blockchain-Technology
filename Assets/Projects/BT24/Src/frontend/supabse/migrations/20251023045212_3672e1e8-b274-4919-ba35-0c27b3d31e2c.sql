-- Fix search_path for update_updated_at function
-- This prevents potential schema injection attacks by ensuring the function
-- only accesses objects in the public schema

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;