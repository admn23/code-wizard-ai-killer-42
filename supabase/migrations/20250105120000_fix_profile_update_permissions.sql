-- Fix profile update permissions by ensuring RLS policies are properly configured
-- This migration addresses the "permission denied for table users" error

-- First, let's ensure we have all the necessary policies for the profiles table
-- Drop existing policies if they exist to recreate them with correct permissions
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Recreate policies with more explicit permissions
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Ensure the table has RLS enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;

-- Ensure the trigger function has proper permissions
ALTER FUNCTION public.handle_new_user() SECURITY DEFINER;

-- Add a function to safely update profiles with proper error handling
CREATE OR REPLACE FUNCTION public.update_user_profile(
  profile_id UUID,
  new_full_name TEXT DEFAULT NULL,
  new_email TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Check if the user is updating their own profile
  IF auth.uid() != profile_id THEN
    RAISE EXCEPTION 'You can only update your own profile';
  END IF;
  
  -- Update the profile
  UPDATE public.profiles 
  SET 
    full_name = COALESCE(new_full_name, full_name),
    email = COALESCE(new_email, email),
    updated_at = now()
  WHERE id = profile_id;
  
  -- Check if the update was successful
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Profile not found or update failed';
  END IF;
END;
$$;

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION public.update_user_profile TO authenticated;
