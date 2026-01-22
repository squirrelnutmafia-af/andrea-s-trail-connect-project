-- Create activity type enum
CREATE TYPE public.activity_type AS ENUM ('Hiking', 'Cycling');

-- Create height type enum
CREATE TYPE public.height_type AS ENUM ('height', 'descent');

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  time TEXT NOT NULL,
  duration TEXT NOT NULL,
  organizer TEXT NOT NULL,
  organizer_avatar TEXT,
  image TEXT,
  departure_location TEXT NOT NULL,
  transport_method TEXT NOT NULL,
  activity_type activity_type NOT NULL DEFAULT 'Hiking',
  difficulty TEXT NOT NULL,
  distance TEXT NOT NULL,
  elevation TEXT NOT NULL,
  total_height TEXT NOT NULL,
  height_type height_type NOT NULL DEFAULT 'height',
  coming INTEGER NOT NULL DEFAULT 0,
  available INTEGER,
  waitlist INTEGER,
  participants TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (events are public)
CREATE POLICY "Events are publicly readable" 
ON public.events 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();