import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Crop = {
  id: string;
  crop_name: string;
  scientific_name: string;
  soil_type: string;
  suitable_season: string;
  water_requirement: string;
  temperature_range: string;
  rainfall_range: string;
  fertilizer: string;
  growth_duration: string;
  expected_yield: string;
  market_value: string;
  image_url: string;
  created_at: string;
};

export type Profile = {
  id: string;
  full_name: string;
  mobile_number: string;
  village: string;
  district: string;
  state: string;
  farm_size: string;
  soil_type: string;
  irrigation_method: string;
  profile_photo_url: string;
  role: string;
  created_at: string;
};

export type FarmDetail = {
  id: string;
  farmer_id: string;
  soil_type: string;
  soil_ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  rainfall: number;
  temperature: number;
  humidity: number;
  water_availability: string;
  current_season: string;
  organic_carbon?: number;
  farm_size_acres?: number;
  previous_crop?: string;
  irrigation_type?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
};

export type Fertilizer = {
  id: string;
  fertilizer_name: string;
  soil_condition: string;
  quantity: string;
  application_method: string;
  precautions: string;
  created_at: string;
};

export type Disease = {
  id: string;
  crop_name: string;
  disease_name: string;
  symptoms: string;
  causes: string;
  prevention: string;
  treatment: string;
  organic_solution: string;
  image_url: string;
  season: string | null;
  created_at: string;
};

export type MarketPrice = {
  id: string;
  crop_name: string;
  market_name: string;
  current_price: number;
  previous_price: number;
  min_price?: number;
  max_price?: number;
  price_trend: string;
  price_change_pct?: number;
  updated_date: string;
};

export type Recommendation = {
  id: string;
  farmer_id: string;
  crop_id: string;
  confidence: number;
  recommendation_date: string;
};

export type FieldMonitoring = {
  id: string;
  farmer_id: string;
  field_name: string;
  latitude: number;
  longitude: number;
  area_acres: number;
  ndvi_score: number;
  vegetation_health: 'Healthy' | 'Moderate Stress' | 'High Stress';
  moisture_index: number;
  chlorophyll_index: number;
  last_satellite_pass: string;
  created_at: string;
};

export type CropCalendarTask = {
  id: string;
  farmer_id: string;
  crop_name: string;
  stage_name: string;
  stage_order: number;
  task_description: string;
  scheduled_date: string;
  completed: boolean;
  completed_at?: string;
  notes?: string;
  created_at: string;
};

export type PestAlert = {
  id: string;
  farmer_id: string;
  crop_name: string;
  pest_name: string;
  risk_level: 'Low' | 'Medium' | 'High';
  warning_message: string;
  preventive_action: string;
  organic_treatment?: string;
  growth_stage?: string;
  created_at: string;
};

export type IrrigationLog = {
  id: string;
  farmer_id: string;
  crop_name: string;
  growth_stage: string;
  soil_moisture?: number;
  irrigation_required: boolean;
  recommended_time: string;
  water_amount_liters: number;
  reason: string;
  created_at: string;
};

export type FarmNotification = {
  id: string;
  farmer_id: string;
  title: string;
  message: string;
  category: 'weather' | 'irrigation' | 'fertilizer' | 'pest' | 'disease' | 'market' | 'general';
  severity: 'info' | 'warning' | 'critical' | 'success';
  is_read: boolean;
  action_url?: string;
  created_at: string;
};

export type AIConversation = {
  id: string;
  farmer_id: string;
  role: 'user' | 'assistant';
  content: string;
  language: string;
  created_at: string;
};
