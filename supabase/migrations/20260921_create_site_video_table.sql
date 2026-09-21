-- Create site_video table
CREATE TABLE IF NOT EXISTS public.site_video (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  video_url text NOT NULL,
  thumbnail_url text NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_video ENABLE ROW LEVEL SECURITY;

-- Allow public read access to site_video
CREATE POLICY "Allow public read access to site_video" 
ON public.site_video
FOR SELECT
USING (true);

-- Allow authenticated users to insert/update/delete site_video
CREATE POLICY "Allow authenticated users to manage site_video" 
ON public.site_video
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Create fitplate-assets bucket if it doesn't exist (Requires superuser / manual via dashboard)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('fitplate-assets', 'fitplate-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to fitplate-assets bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'fitplate-assets' );

-- Allow authenticated users to insert into fitplate-assets bucket
CREATE POLICY "Auth Insert"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'fitplate-assets' AND auth.role() = 'authenticated' );

-- Allow authenticated users to update/delete from fitplate-assets bucket
CREATE POLICY "Auth Update Delete"
ON storage.objects FOR ALL
USING ( bucket_id = 'fitplate-assets' AND auth.role() = 'authenticated' );
