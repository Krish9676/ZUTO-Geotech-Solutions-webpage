-- Database Schema for ZUTO GeoTech Solutions
-- Run this in your Supabase SQL editor

-- CHUNK 1: Cleanup and Create Basic Table
-- Run this first
-- Cleanup existing objects
DROP POLICY IF EXISTS "Users can view their own detections" ON detections;
DROP POLICY IF EXISTS "Users can insert their own detections" ON detections;
DROP POLICY IF EXISTS "Users can update their own detections" ON detections;
DROP POLICY IF EXISTS "Users can delete their own detections" ON detections;
DROP POLICY IF EXISTS "Users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP VIEW IF EXISTS recent_detections;
DROP FUNCTION IF EXISTS get_detections_by_crop(TEXT);
DROP FUNCTION IF EXISTS get_detections_by_pest(TEXT);
DROP FUNCTION IF EXISTS get_user_detection_stats();
DROP FUNCTION IF EXISTS update_updated_at();
DROP TRIGGER IF EXISTS update_detections_updated_at ON detections;
DROP TABLE IF EXISTS detections CASCADE;

-- Create fresh table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE detections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    heatmap_url TEXT,
    pest_name TEXT NOT NULL,
    confidence DECIMAL(5, 2) NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
    crop_name TEXT,
    diagnosis TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CHUNK 2: Security, Functions, and Indexes
-- Run this after Chunk 1 succeeds
-- Enable Row Level Security
ALTER TABLE detections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own detections"
    ON detections FOR SELECT
    USING (auth.uid() = created_by);

CREATE POLICY "Users can insert their own detections"
    ON detections FOR INSERT
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own detections"
    ON detections FOR UPDATE
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own detections"
    ON detections FOR DELETE
    USING (auth.uid() = created_by);

-- Create update function and trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_detections_updated_at
    BEFORE UPDATE ON detections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Create performance indexes
CREATE INDEX idx_detections_created_by ON detections(created_by);
CREATE INDEX idx_detections_pest_name ON detections(pest_name);
CREATE INDEX idx_detections_crop_name ON detections(crop_name);
CREATE INDEX idx_detections_created_at ON detections(created_at DESC);
CREATE INDEX idx_detections_confidence ON detections(confidence DESC);

-- CHUNK 3: Views, Helper Functions, and Storage
-- Run this after Chunk 2 succeeds
-- Create view for recent detections
CREATE OR REPLACE VIEW recent_detections AS
SELECT 
    id, image_url, heatmap_url, pest_name, confidence, 
    crop_name, diagnosis, created_at, created_by
FROM detections
WHERE created_by = auth.uid()
ORDER BY created_at DESC
LIMIT 100;

-- Create helper functions
CREATE OR REPLACE FUNCTION get_detections_by_crop(crop TEXT)
RETURNS SETOF detections AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM detections
    WHERE crop_name ILIKE '%' || crop || '%' 
      AND created_by = auth.uid()
    ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_detections_by_pest(pest TEXT)
RETURNS SETOF detections AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM detections
    WHERE pest_name ILIKE '%' || crop || '%' 
      AND created_by = auth.uid()
    ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_detection_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_detections', COUNT(*),
        'unique_pests', COUNT(DISTINCT pest_name),
        'unique_crops', COUNT(DISTINCT crop_name),
        'avg_confidence', ROUND(AVG(confidence), 2),
        'most_recent', MAX(created_at),
        'top_pest', (
            SELECT pest_name FROM detections
            WHERE created_by = auth.uid()
            GROUP BY pest_name ORDER BY COUNT(*) DESC LIMIT 1
        )
    ) INTO result
    FROM detections WHERE created_by = auth.uid();
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Setup storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('crop-images', 'crop-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('heatmaps', 'heatmaps', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id IN ('crop-images', 'heatmaps') AND auth.uid() = owner
    );

CREATE POLICY "Users can update their own images" ON storage.objects
    FOR UPDATE USING (
        bucket_id IN ('crop-images', 'heatmaps') AND auth.uid() = owner
    );

CREATE POLICY "Users can delete their own images" ON storage.objects
    FOR DELETE USING (
        bucket_id IN ('crop-images', 'heatmaps') AND auth.uid() = owner
    );

CREATE POLICY "Public can view images" ON storage.objects
    FOR SELECT USING (bucket_id IN ('crop-images', 'heatmaps'));
