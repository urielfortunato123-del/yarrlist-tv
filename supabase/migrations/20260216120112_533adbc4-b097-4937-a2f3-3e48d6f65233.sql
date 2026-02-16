
-- Table to track page visits with a single row counter
CREATE TABLE public.visit_counter (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  count BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial row
INSERT INTO public.visit_counter (id, count) VALUES (1, 0);

-- Enable RLS
ALTER TABLE public.visit_counter ENABLE ROW LEVEL SECURITY;

-- Anyone can read the count
CREATE POLICY "Anyone can read visit count"
ON public.visit_counter
FOR SELECT
USING (true);

-- Create a function to increment the counter (called via RPC)
CREATE OR REPLACE FUNCTION public.increment_visit_count()
RETURNS BIGINT AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE public.visit_counter SET count = count + 1, updated_at = now() WHERE id = 1
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
