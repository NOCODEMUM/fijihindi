-- Migration: Add conversations and user progress tables
-- This migration adds tables for the conversation-based learning feature

-- Conversations content table
-- Stores conversation scripts for Nani phone calls
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  duration TEXT, -- estimated duration like "2-3 min"
  dialogue JSONB NOT NULL, -- Array of exchange objects
  phrases JSONB NOT NULL, -- Array of phrases taught
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on order_index for sorted queries
CREATE INDEX IF NOT EXISTS idx_conversations_order ON conversations(order_index);
CREATE INDEX IF NOT EXISTS idx_conversations_difficulty ON conversations(difficulty);

-- User progress tracking table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  conversations_completed TEXT[] DEFAULT '{}',
  phrases_learned JSONB DEFAULT '[]',
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  total_calls INTEGER DEFAULT 0,
  total_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index on user_id for lookups
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_streak ON user_progress(current_streak DESC);

-- Call history table (optional - for detailed tracking)
CREATE TABLE IF NOT EXISTS call_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  conversation_id TEXT REFERENCES conversations(id),
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  responses_given JSONB DEFAULT '[]', -- User's selected responses
  completed BOOLEAN DEFAULT false,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create index for user's call history
CREATE INDEX IF NOT EXISTS idx_call_history_user_id ON call_history(user_id);
CREATE INDEX IF NOT EXISTS idx_call_history_conversation ON call_history(conversation_id);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations (public read)
CREATE POLICY "Conversations are publicly readable"
  ON conversations FOR SELECT
  USING (is_active = true);

-- RLS Policies for user_progress (users can only see/modify their own)
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for call_history
CREATE POLICY "Users can view own call history"
  ON call_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own call history"
  ON call_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own call history"
  ON call_history FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to update streak
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is the first activity today
  IF OLD.last_activity_date IS NULL OR OLD.last_activity_date < CURRENT_DATE THEN
    -- Check if it's a consecutive day
    IF OLD.last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN
      NEW.current_streak := OLD.current_streak + 1;
    ELSE
      NEW.current_streak := 1;
    END IF;

    -- Update longest streak if current is higher
    IF NEW.current_streak > COALESCE(OLD.longest_streak, 0) THEN
      NEW.longest_streak := NEW.current_streak;
    END IF;

    NEW.last_activity_date := CURRENT_DATE;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for streak updates
DROP TRIGGER IF EXISTS trigger_update_streak ON user_progress;
CREATE TRIGGER trigger_update_streak
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_user_streak();

-- Insert initial conversation data
INSERT INTO conversations (id, title, description, difficulty, duration, dialogue, phrases, order_index) VALUES
(
  'intro-greeting',
  'First Hello',
  'Learn basic greetings and introductions',
  'beginner',
  '2-3 min',
  '[
    {"id": "1", "speaker": "nani", "fijiHindi": "Namaste beta! Kaise ho?", "english": "Hello dear! How are you?"},
    {"id": "2", "speaker": "user", "fijiHindi": "", "english": "", "options": [
      {"fijiHindi": "Namaste Nani! Mein theek hoon.", "english": "Hello Nani! I am fine."},
      {"fijiHindi": "Namaste! Bahut achchha hoon.", "english": "Hello! I am very good."},
      {"fijiHindi": "Nani! Mein khush hoon aapko dekh ke.", "english": "Nani! I am happy to see you."}
    ]},
    {"id": "3", "speaker": "nani", "fijiHindi": "Bahut achchha! Tum Fiji Hindi seekhna chahte ho?", "english": "Very good! You want to learn Fiji Hindi?"},
    {"id": "4", "speaker": "user", "fijiHindi": "", "english": "", "options": [
      {"fijiHindi": "Haan Nani, mein seekhna chahta hoon.", "english": "Yes Nani, I want to learn."},
      {"fijiHindi": "Bilkul! Sikhaao mujhe.", "english": "Absolutely! Teach me."},
      {"fijiHindi": "Haan, please sikhaao.", "english": "Yes, please teach."}
    ]},
    {"id": "5", "speaker": "nani", "fijiHindi": "Achchha beta! Hum roz baat karenge. Ab phone rakh do, phir milenge!", "english": "Good dear! We will talk every day. Hang up now, see you later!"}
  ]'::jsonb,
  '["Namaste - Hello/Greetings", "Kaise ho? - How are you?", "Mein theek hoon - I am fine", "Bahut achchha - Very good", "Phir milenge - See you later"]'::jsonb,
  1
),
(
  'morning-checkin',
  'Morning Check-in',
  'Practice daily morning greetings',
  'beginner',
  '2-3 min',
  '[
    {"id": "1", "speaker": "nani", "fijiHindi": "Good morning beta! Subah ho gayi, uth gaye?", "english": "Good morning dear! Morning has come, did you wake up?"},
    {"id": "2", "speaker": "user", "fijiHindi": "", "english": "", "options": [
      {"fijiHindi": "Haan Nani, abhi utha.", "english": "Yes Nani, just woke up."},
      {"fijiHindi": "Good morning Nani! Haan, uth gaya.", "english": "Good morning Nani! Yes, I woke up."}
    ]},
    {"id": "3", "speaker": "nani", "fijiHindi": "Achchha hai! Naashta kiya?", "english": "That''s good! Did you have breakfast?"},
    {"id": "4", "speaker": "user", "fijiHindi": "", "english": "", "options": [
      {"fijiHindi": "Haan, naashta kar liya.", "english": "Yes, I had breakfast."},
      {"fijiHindi": "Chai pi liya bas.", "english": "Just had chai."}
    ]},
    {"id": "5", "speaker": "nani", "fijiHindi": "Theek hai beta. Khaana zaroori hai! Dhyan rakhna apna.", "english": "Okay dear. Food is important! Take care of yourself."}
  ]'::jsonb,
  '["Subah - Morning", "Uth gaye? - Did you wake up?", "Naashta - Breakfast", "Chai - Tea", "Dhyan rakhna - Take care"]'::jsonb,
  2
),
(
  'family-talk',
  'Family Talk',
  'Learn about family and relatives',
  'beginner',
  '3-4 min',
  '[
    {"id": "1", "speaker": "nani", "fijiHindi": "Beta, tumhara parivar kaise hai?", "english": "Dear, how is your family?"},
    {"id": "2", "speaker": "user", "fijiHindi": "", "english": "", "options": [
      {"fijiHindi": "Sab theek hai Nani.", "english": "Everyone is fine Nani."},
      {"fijiHindi": "Maa-Baap theek hai.", "english": "Mom and Dad are fine."}
    ]},
    {"id": "3", "speaker": "nani", "fijiHindi": "Bahut achchha! Tumhara Maa kya kar rahi hai?", "english": "Very good! What is your mother doing?"},
    {"id": "4", "speaker": "user", "fijiHindi": "", "english": "", "options": [
      {"fijiHindi": "Maa ghar pe hai.", "english": "Mom is at home."},
      {"fijiHindi": "Maa khana bana rahi hai.", "english": "Mom is cooking food."}
    ]},
    {"id": "5", "speaker": "nani", "fijiHindi": "Aur Baap? Unko mera namaste bolna!", "english": "And Dad? Tell him my greetings!"},
    {"id": "6", "speaker": "user", "fijiHindi": "", "english": "", "options": [
      {"fijiHindi": "Zaroor Nani, bol dunga.", "english": "Sure Nani, I will tell him."}
    ]},
    {"id": "7", "speaker": "nani", "fijiHindi": "Parivar sabse zaroori hai. Yaad rakhna!", "english": "Family is most important. Remember that!"}
  ]'::jsonb,
  '["Parivar - Family", "Maa - Mother", "Baap - Father", "Ghar - Home", "Khana - Food", "Namaste bolna - Say greetings"]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  difficulty = EXCLUDED.difficulty,
  duration = EXCLUDED.duration,
  dialogue = EXCLUDED.dialogue,
  phrases = EXCLUDED.phrases,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();
