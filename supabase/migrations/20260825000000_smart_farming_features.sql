/*
# Smart Farming Extended Features Schema
Adds tables for Crop Calendar, Pest Alerts, Satellite Field Monitoring,
Irrigation Logs, Notifications, and AI Conversations.
*/

-- 1. Field Monitoring & Satellite Data
CREATE TABLE IF NOT EXISTS field_monitoring (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  field_name text NOT NULL DEFAULT 'Main Field',
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  area_acres numeric DEFAULT 1.0,
  ndvi_score numeric, -- 0.0 to 1.0
  vegetation_health text, -- 'Healthy', 'Moderate Stress', 'High Stress'
  moisture_index numeric,
  chlorophyll_index numeric,
  last_satellite_pass timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE field_monitoring ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_field_monitoring" ON field_monitoring;
CREATE POLICY "select_own_field_monitoring" ON field_monitoring FOR SELECT
  TO authenticated USING (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "insert_own_field_monitoring" ON field_monitoring;
CREATE POLICY "insert_own_field_monitoring" ON field_monitoring FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "update_own_field_monitoring" ON field_monitoring;
CREATE POLICY "update_own_field_monitoring" ON field_monitoring FOR UPDATE
  TO authenticated USING (auth.uid() = farmer_id) WITH CHECK (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "delete_own_field_monitoring" ON field_monitoring;
CREATE POLICY "delete_own_field_monitoring" ON field_monitoring FOR DELETE
  TO authenticated USING (auth.uid() = farmer_id);

-- 2. Crop Calendar Tasks
CREATE TABLE IF NOT EXISTS crop_calendar_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  crop_name text NOT NULL,
  stage_name text NOT NULL,
  stage_order integer NOT NULL,
  task_description text NOT NULL,
  scheduled_date date NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE crop_calendar_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_crop_calendar_tasks" ON crop_calendar_tasks;
CREATE POLICY "select_own_crop_calendar_tasks" ON crop_calendar_tasks FOR SELECT
  TO authenticated USING (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "insert_own_crop_calendar_tasks" ON crop_calendar_tasks;
CREATE POLICY "insert_own_crop_calendar_tasks" ON crop_calendar_tasks FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "update_own_crop_calendar_tasks" ON crop_calendar_tasks;
CREATE POLICY "update_own_crop_calendar_tasks" ON crop_calendar_tasks FOR UPDATE
  TO authenticated USING (auth.uid() = farmer_id) WITH CHECK (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "delete_own_crop_calendar_tasks" ON crop_calendar_tasks;
CREATE POLICY "delete_own_crop_calendar_tasks" ON crop_calendar_tasks FOR DELETE
  TO authenticated USING (auth.uid() = farmer_id);

-- 3. Pest Alerts & Predictions
CREATE TABLE IF NOT EXISTS pest_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  crop_name text NOT NULL,
  pest_name text NOT NULL,
  risk_level text NOT NULL, -- 'Low', 'Medium', 'High'
  warning_message text NOT NULL,
  preventive_action text NOT NULL,
  organic_treatment text,
  growth_stage text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pest_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_pest_alerts" ON pest_alerts;
CREATE POLICY "select_own_pest_alerts" ON pest_alerts FOR SELECT
  TO authenticated USING (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "insert_own_pest_alerts" ON pest_alerts;
CREATE POLICY "insert_own_pest_alerts" ON pest_alerts FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "delete_own_pest_alerts" ON pest_alerts;
CREATE POLICY "delete_own_pest_alerts" ON pest_alerts FOR DELETE
  TO authenticated USING (auth.uid() = farmer_id);

-- 4. Irrigation Recommendations & Logs
CREATE TABLE IF NOT EXISTS irrigation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  crop_name text NOT NULL,
  growth_stage text NOT NULL,
  soil_moisture numeric,
  irrigation_required boolean NOT NULL,
  recommended_time text,
  water_amount_liters numeric,
  reason text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE irrigation_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_irrigation_logs" ON irrigation_logs;
CREATE POLICY "select_own_irrigation_logs" ON irrigation_logs FOR SELECT
  TO authenticated USING (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "insert_own_irrigation_logs" ON irrigation_logs;
CREATE POLICY "insert_own_irrigation_logs" ON irrigation_logs FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = farmer_id);

-- 5. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  category text NOT NULL, -- 'weather', 'irrigation', 'fertilizer', 'pest', 'disease', 'market'
  severity text NOT NULL DEFAULT 'info', -- 'info', 'warning', 'critical', 'success'
  is_read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_notifications" ON notifications;
CREATE POLICY "select_own_notifications" ON notifications FOR SELECT
  TO authenticated USING (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "update_own_notifications" ON notifications;
CREATE POLICY "update_own_notifications" ON notifications FOR UPDATE
  TO authenticated USING (auth.uid() = farmer_id) WITH CHECK (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "insert_own_notifications" ON notifications;
CREATE POLICY "insert_own_notifications" ON notifications FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "delete_own_notifications" ON notifications;
CREATE POLICY "delete_own_notifications" ON notifications FOR DELETE
  TO authenticated USING (auth.uid() = farmer_id);

-- 6. AI Chat Conversations
CREATE TABLE IF NOT EXISTS ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  role text NOT NULL, -- 'user' or 'assistant'
  content text NOT NULL,
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_ai_conversations" ON ai_conversations;
CREATE POLICY "select_own_ai_conversations" ON ai_conversations FOR SELECT
  TO authenticated USING (auth.uid() = farmer_id);

DROP POLICY IF EXISTS "insert_own_ai_conversations" ON ai_conversations;
CREATE POLICY "insert_own_ai_conversations" ON ai_conversations FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = farmer_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_crop_calendar_farmer ON crop_calendar_tasks(farmer_id, scheduled_date);
CREATE INDEX IF NOT EXISTS idx_pest_alerts_farmer ON pest_alerts(farmer_id);
CREATE INDEX IF NOT EXISTS idx_irrigation_logs_farmer ON irrigation_logs(farmer_id);
CREATE INDEX IF NOT EXISTS idx_notifications_farmer ON notifications(farmer_id, is_read);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_farmer ON ai_conversations(farmer_id);
