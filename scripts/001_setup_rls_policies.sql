-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON profiles
  FOR DELETE USING (auth.uid() = id);

-- Calculations table policies
CREATE POLICY "Users can view their own calculations" ON calculations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calculations" ON calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calculations" ON calculations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calculations" ON calculations
  FOR DELETE USING (auth.uid() = user_id);

-- Reports table policies
CREATE POLICY "Users can view their own reports" ON reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports" ON reports
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reports" ON reports
  FOR DELETE USING (auth.uid() = user_id);

-- City rainfall data and roof materials are public read-only
CREATE POLICY "Anyone can view city rainfall data" ON city_rainfall_data
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Anyone can view roof materials" ON roof_materials
  FOR SELECT TO authenticated, anon USING (true);
