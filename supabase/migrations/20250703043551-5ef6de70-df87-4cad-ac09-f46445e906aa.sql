
-- Update the handle_new_user function to give 5 credits instead of 250
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, plan_type, credits_remaining, tasks_this_month)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email,
    'Free',
    5,
    0
  );
  
  INSERT INTO public.user_credits (user_id, credits_remaining, plan_type)
  VALUES (NEW.id, 5, 'Free');
  
  RETURN NEW;
END;
$$;

-- Update default values for existing columns to reflect the new plan structure
ALTER TABLE public.profiles ALTER COLUMN credits_remaining SET DEFAULT 5;
ALTER TABLE public.profiles ALTER COLUMN plan_type SET DEFAULT 'Free';
ALTER TABLE public.user_credits ALTER COLUMN credits_remaining SET DEFAULT 5;
ALTER TABLE public.user_credits ALTER COLUMN plan_type SET DEFAULT 'Free';
