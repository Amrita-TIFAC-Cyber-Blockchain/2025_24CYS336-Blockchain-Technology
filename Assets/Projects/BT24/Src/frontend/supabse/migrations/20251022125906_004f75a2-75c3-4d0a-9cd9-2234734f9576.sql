-- Fix: Restrict energy_metrics to only be viewable by nanogrid owners
-- Drop the public policy that allows everyone to view energy metrics
DROP POLICY IF EXISTS "Energy metrics are viewable by everyone" ON energy_metrics;

-- Create a new policy that only allows nanogrid owners to view their own metrics
CREATE POLICY "Nanogrid owners can view their own energy metrics"
ON energy_metrics
FOR SELECT
USING (
  EXISTS (
    SELECT 1 
    FROM nanogrids 
    WHERE nanogrids.id = energy_metrics.nanogrid_id 
    AND nanogrids.owner_id = auth.uid()
  )
);