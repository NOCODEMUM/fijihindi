-- =============================================================================
-- MIGRATION: Launch Strategy Tables
-- =============================================================================
-- Run this migration to add email_signups and feedback tables
-- for the FijiHindi launch strategy

-- =============================================================================
-- EMAIL SIGNUPS TABLE
-- =============================================================================
-- Captures email addresses from landing page and in-app signups
CREATE TABLE IF NOT EXISTS email_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'landing', -- 'landing', 'in-app', 'share', etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_email_signups_email ON email_signups (email);
CREATE INDEX IF NOT EXISTS idx_email_signups_source ON email_signups (source);

-- Enable RLS
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for unauthenticated signups)
DROP POLICY IF EXISTS "Anyone can signup with email" ON email_signups;
CREATE POLICY "Anyone can signup with email" ON email_signups FOR INSERT WITH CHECK (true);

-- Only allow authenticated users to view (for admin purposes)
DROP POLICY IF EXISTS "Only authenticated users can view signups" ON email_signups;
CREATE POLICY "Only authenticated users can view signups" ON email_signups FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================================================
-- FEEDBACK TABLE
-- =============================================================================
-- Captures user feedback from in-app feedback widget
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  email TEXT, -- Optional, for follow-up
  page_url TEXT, -- Where the feedback was submitted from
  user_agent TEXT, -- Browser info for debugging
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for feedback queries
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback (created_at DESC);

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit feedback (unauthenticated users included)
DROP POLICY IF EXISTS "Anyone can submit feedback" ON feedback;
CREATE POLICY "Anyone can submit feedback" ON feedback FOR INSERT WITH CHECK (true);

-- Only allow authenticated users to view feedback (for admin purposes)
DROP POLICY IF EXISTS "Only authenticated users can view feedback" ON feedback;
CREATE POLICY "Only authenticated users can view feedback" ON feedback FOR SELECT USING (auth.role() = 'authenticated');
