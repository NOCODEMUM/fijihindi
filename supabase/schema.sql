-- =============================================================================
-- FIJIHINDI SUPABASE SCHEMA
-- =============================================================================
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- USERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  name TEXT,
  current_city TEXT,
  current_country TEXT,
  fiji_origin TEXT,
  faith TEXT CHECK (faith IN ('hindu', 'muslim', 'christian', 'sikh', 'other')),
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add faith column if table already exists (for migrations)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'faith') THEN
    ALTER TABLE users ADD COLUMN faith TEXT CHECK (faith IN ('hindu', 'muslim', 'christian', 'sikh', 'other'));
  END IF;
END $$;

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_location ON users (current_country, current_city);
CREATE INDEX IF NOT EXISTS idx_users_origin ON users (fiji_origin);
CREATE INDEX IF NOT EXISTS idx_users_faith ON users (faith);

-- =============================================================================
-- FAMILY MEMBERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT,
  relationship_type TEXT NOT NULL,
  parent_member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for family members
CREATE INDEX IF NOT EXISTS idx_family_members_user ON family_members (user_id);
CREATE INDEX IF NOT EXISTS idx_family_members_parent ON family_members (parent_member_id);

-- =============================================================================
-- RELATIONSHIPS MASTER TABLE
-- =============================================================================
-- This stores the master list of all family relationship terms with faith variations
CREATE TABLE IF NOT EXISTS relationships_master (
  id TEXT PRIMARY KEY,
  english TEXT NOT NULL,
  description TEXT,
  side TEXT NOT NULL CHECK (side IN ('paternal', 'maternal', 'self', 'spouse', 'child')),
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'neutral')),
  generation INTEGER NOT NULL,
  can_add_from TEXT[] DEFAULT '{}',

  -- Faith-specific terms stored as JSONB
  -- Each contains: { primary, alternate?, formal?, informal? }
  terms_hindu JSONB NOT NULL DEFAULT '{}',
  terms_muslim JSONB NOT NULL DEFAULT '{}',
  terms_christian JSONB NOT NULL DEFAULT '{}',
  terms_sikh JSONB NOT NULL DEFAULT '{}',
  terms_other JSONB NOT NULL DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for relationships
CREATE INDEX IF NOT EXISTS idx_relationships_side ON relationships_master (side);
CREATE INDEX IF NOT EXISTS idx_relationships_generation ON relationships_master (generation);
CREATE INDEX IF NOT EXISTS idx_relationships_gender ON relationships_master (gender);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships_master ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Anyone can view anonymized locations" ON users;
DROP POLICY IF EXISTS "Public users can read all users" ON users;

-- Users policies
CREATE POLICY "Public users can read all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Family members policies
DROP POLICY IF EXISTS "Users can view own family" ON family_members;
DROP POLICY IF EXISTS "Users can insert own family" ON family_members;
DROP POLICY IF EXISTS "Users can update own family" ON family_members;
DROP POLICY IF EXISTS "Users can delete own family" ON family_members;

CREATE POLICY "Users can view own family" ON family_members FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own family" ON family_members FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own family" ON family_members FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own family" ON family_members FOR DELETE USING (user_id = auth.uid());

-- Relationships master - read-only for everyone
DROP POLICY IF EXISTS "Anyone can read relationships" ON relationships_master;
CREATE POLICY "Anyone can read relationships" ON relationships_master FOR SELECT USING (true);

-- =============================================================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_family_members_updated_at ON family_members;
CREATE TRIGGER update_family_members_updated_at
  BEFORE UPDATE ON family_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_relationships_master_updated_at ON relationships_master;
CREATE TRIGGER update_relationships_master_updated_at
  BEFORE UPDATE ON relationships_master
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- VIEWS
-- =============================================================================

-- Diaspora statistics view
CREATE OR REPLACE VIEW diaspora_stats AS
SELECT
  current_country,
  current_city,
  COUNT(*) as user_count,
  array_agg(DISTINCT fiji_origin) FILTER (WHERE fiji_origin IS NOT NULL) as fiji_origins,
  AVG(lat) as avg_lat,
  AVG(lng) as avg_lng
FROM users
WHERE lat IS NOT NULL AND lng IS NOT NULL
GROUP BY current_country, current_city
ORDER BY user_count DESC;

-- Faith distribution view
CREATE OR REPLACE VIEW faith_distribution AS
SELECT
  faith,
  COUNT(*) as user_count,
  ROUND(COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER(), 0), 2) as percentage
FROM users
WHERE faith IS NOT NULL
GROUP BY faith
ORDER BY user_count DESC;

-- Grant access to views
GRANT SELECT ON diaspora_stats TO anon, authenticated;
GRANT SELECT ON faith_distribution TO anon, authenticated;

-- =============================================================================
-- FUNCTION TO BULK INSERT RELATIONSHIPS
-- =============================================================================

CREATE OR REPLACE FUNCTION bulk_upsert_relationships(relationships JSONB)
RETURNS void AS $$
DECLARE
  rel JSONB;
BEGIN
  FOR rel IN SELECT * FROM jsonb_array_elements(relationships)
  LOOP
    INSERT INTO relationships_master (
      id, english, description, side, gender, generation, can_add_from,
      terms_hindu, terms_muslim, terms_christian, terms_sikh, terms_other
    ) VALUES (
      rel->>'id',
      rel->>'english',
      rel->>'description',
      rel->>'side',
      rel->>'gender',
      (rel->>'generation')::INTEGER,
      ARRAY(SELECT jsonb_array_elements_text(rel->'can_add_from')),
      COALESCE(rel->'terms_hindu', '{}'),
      COALESCE(rel->'terms_muslim', '{}'),
      COALESCE(rel->'terms_christian', '{}'),
      COALESCE(rel->'terms_sikh', '{}'),
      COALESCE(rel->'terms_other', '{}')
    )
    ON CONFLICT (id) DO UPDATE SET
      english = EXCLUDED.english,
      description = EXCLUDED.description,
      side = EXCLUDED.side,
      gender = EXCLUDED.gender,
      generation = EXCLUDED.generation,
      can_add_from = EXCLUDED.can_add_from,
      terms_hindu = EXCLUDED.terms_hindu,
      terms_muslim = EXCLUDED.terms_muslim,
      terms_christian = EXCLUDED.terms_christian,
      terms_sikh = EXCLUDED.terms_sikh,
      terms_other = EXCLUDED.terms_other,
      updated_at = NOW();
  END LOOP;
END;
$$ LANGUAGE plpgsql;
