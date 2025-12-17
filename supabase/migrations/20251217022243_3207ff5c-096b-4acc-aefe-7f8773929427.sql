-- Add is_verified column to profiles for mechanic verification
ALTER TABLE public.profiles 
ADD COLUMN is_verified boolean DEFAULT false;

-- Add verified_at timestamp
ALTER TABLE public.profiles 
ADD COLUMN verified_at timestamp with time zone;

-- Add verified_by to track which admin verified
ALTER TABLE public.profiles 
ADD COLUMN verified_by uuid;