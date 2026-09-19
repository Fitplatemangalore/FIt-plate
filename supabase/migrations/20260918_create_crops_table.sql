-- Create crops table for Urban Vertical Farming homepage
CREATE TABLE IF NOT EXISTS public.crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  icon TEXT DEFAULT 'leaf',
  icon_url TEXT,
  link TEXT DEFAULT '/varieties',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for anon and authenticated users)
CREATE POLICY "Public read crops"
  ON public.crops
  FOR SELECT
  USING (true);

-- Allow full access for authenticated users (admin)
CREATE POLICY "Admin full access crops"
  ON public.crops
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert initial seed crops
INSERT INTO public.crops (name, subtitle, image_url, icon, link, sort_order)
VALUES
  (
    'LEAFY GREENS',
    'Fresh Greens. Grow Closer.',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    'leaf',
    '/varieties',
    0
  ),
  (
    'HERBS',
    'Fresh Greens. Grow Closer.',
    '/assets/img/509ecd51682b66965b96a807ecc89477.jpg',
    'herbs',
    '/varieties',
    1
  ),
  (
    'EDIBLE FLOWERS',
    'Fresh Greens. Grow Closer.',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80',
    'flower',
    '/varieties',
    2
  ),
  (
    'MICROGREENS',
    'Small Greens. Big Nutrition',
    '/assets/img/d4077bf9785efe29a21bd1df1c010651.jpg',
    'microgreens',
    '/microgreens',
    3
  ),
  (
    'FRUITS',
    'Fresh Greens. Grow Closer.',
    'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
    'fruits',
    '/varieties',
    4
  ),
  (
    'SAFFRON',
    'Fresh Greens. Grow Closer.',
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    'saffron',
    '/varieties',
    5
  );
