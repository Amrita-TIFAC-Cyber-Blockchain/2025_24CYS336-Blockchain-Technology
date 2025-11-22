-- Add DELETE policies for user-managed tables

-- Allow users to delete their own profiles (GDPR compliance)
CREATE POLICY "Users can delete their own profile"
ON profiles FOR DELETE
USING (auth.uid() = id);

-- Allow users to delete their own nanogrids
CREATE POLICY "Users can delete their own nanogrids"
ON nanogrids FOR DELETE
USING (auth.uid() = owner_id);

-- Allow users to cancel their own active market orders
CREATE POLICY "Users can delete their own active orders"
ON market_orders FOR DELETE
USING (auth.uid() = user_id AND status = 'active');

-- Note: energy_metrics and transactions are kept immutable for audit trail purposes