-- Create function to search restaurants via Google Places API
CREATE OR REPLACE FUNCTION search_restaurants(
  location_lat DECIMAL,
  location_lng DECIMAL,
  search_radius INTEGER DEFAULT 5000,
  search_keywords TEXT[] DEFAULT ARRAY['vegan', 'vegetarian']
) RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  -- This function will be called by the edge function
  -- For now, return a simple structure that can be extended
  SELECT json_build_object(
    'success', true,
    'message', 'Function ready for Google Places API integration'
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Create users table for broccoli points leaderboard
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  broccoli_points INTEGER DEFAULT 0,
  total_reservations INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create broccoli points history table
CREATE TABLE IF NOT EXISTS public.broccoli_points_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  restaurant_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broccoli_points_history ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view all profiles" ON public.user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Policies for broccoli_points_history
CREATE POLICY "Users can view all point history" ON public.broccoli_points_history
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own point history" ON public.broccoli_points_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to get leaderboard
CREATE OR REPLACE FUNCTION get_broccoli_leaderboard(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  rank INTEGER,
  user_id UUID,
  username TEXT,
  display_name TEXT,
  avatar_url TEXT,
  broccoli_points INTEGER,
  total_reservations INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROW_NUMBER() OVER (ORDER BY up.broccoli_points DESC) as rank,
    up.user_id,
    up.username,
    up.display_name,
    up.avatar_url,
    up.broccoli_points,
    up.total_reservations
  FROM public.user_profiles up
  WHERE up.broccoli_points > 0
  ORDER BY up.broccoli_points DESC
  LIMIT limit_count;
END;
$$;

-- Create function to add broccoli points
CREATE OR REPLACE FUNCTION add_broccoli_points(
  p_user_id UUID,
  p_points INTEGER,
  p_reason TEXT,
  p_restaurant_name TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert point history
  INSERT INTO public.broccoli_points_history (user_id, points, reason, restaurant_name)
  VALUES (p_user_id, p_points, p_reason, p_restaurant_name);
  
  -- Update user profile
  INSERT INTO public.user_profiles (user_id, broccoli_points)
  VALUES (p_user_id, p_points)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    broccoli_points = public.user_profiles.broccoli_points + p_points,
    updated_at = NOW();
END;
$$;