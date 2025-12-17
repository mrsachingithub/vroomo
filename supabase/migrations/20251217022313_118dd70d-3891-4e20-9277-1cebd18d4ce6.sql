-- Allow admins to update profiles (for verification)
CREATE POLICY "Admins can update profiles for verification"
ON public.profiles
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));