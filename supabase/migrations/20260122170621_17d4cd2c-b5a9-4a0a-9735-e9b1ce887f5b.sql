-- Add new columns to events table for the Create Event flow
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS has_disclaimer boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS route_id text,
ADD COLUMN IF NOT EXISTS transport_details jsonb;

-- Update activity_type enum to include more types
ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'Climbing';
ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'Skiing';
ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'Bouldering';
ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'Social';

-- Create RLS policy to allow inserts (events are publicly readable, anyone can create)
CREATE POLICY "Anyone can create events"
ON public.events
FOR INSERT
WITH CHECK (true);