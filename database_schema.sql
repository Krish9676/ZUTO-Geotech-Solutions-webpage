-- Database Schema for ZUTO GeoTech Solutions
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create analysis_history table
CREATE TABLE IF NOT EXISTS analysis_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    image_url TEXT,
    results JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own analysis history
CREATE POLICY "Users can view own analysis history" ON analysis_history
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own analysis history
CREATE POLICY "Users can insert own analysis history" ON analysis_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own analysis history
CREATE POLICY "Users can update own analysis history" ON analysis_history
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own analysis history
CREATE POLICY "Users can delete own analysis history" ON analysis_history
    FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_analysis_history_user_id ON analysis_history(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_history_created_at ON analysis_history(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_analysis_history_updated_at 
    BEFORE UPDATE ON analysis_history 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
