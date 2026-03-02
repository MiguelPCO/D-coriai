-- interior-ai schema
-- Ejecutar en Supabase SQL Editor: app.supabase.com > SQL Editor

-- Tabla de generaciones
CREATE TABLE IF NOT EXISTS generations (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Input
  prompt           TEXT NOT NULL,
  style            VARCHAR(50),
  input_image_url  TEXT,           -- imagen subida por el usuario (Supabase Storage)

  -- Output
  output_image_url TEXT,           -- imagen generada (Supabase Storage)
  status           TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  replicate_id     TEXT,           -- ID de predicción de Replicate (para polling)
  error_message    TEXT,

  -- Meta
  created_at       TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Row Level Security
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "generations: own"
  ON generations
  FOR ALL
  USING (auth.uid() = user_id);

-- Índices
CREATE INDEX IF NOT EXISTS idx_generations_user
  ON generations(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_generations_status
  ON generations(status)
  WHERE status IN ('pending', 'processing');

-- Storage buckets (ejecutar también en Supabase Storage)
-- Bucket: "generations" con acceso público para las imágenes generadas
-- INSERT INTO storage.buckets (id, name, public) VALUES ('generations', 'generations', true);
