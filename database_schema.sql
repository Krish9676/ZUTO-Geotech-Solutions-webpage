-- =========================
-- CHUNK 1: Cleanup & Table
-- =========================
-- ===== CLEANUP EXISTING POLICIES FIRST =====
DROP POLICY IF EXISTS "Users can view their own detections" ON detections;
DROP POLICY IF EXISTS "Users can insert their own detections" ON detections;
DROP POLICY IF EXISTS "Anon can insert detections" ON detections;
DROP POLICY IF EXISTS "Users can update their own detections" ON detections;
DROP POLICY IF EXISTS "Users can delete their own detections" ON detections;

-- ===== THEN DROP TABLE =====
DROP TABLE IF EXISTS detections CASCADE;

-- ===== CREATE TABLE AGAIN =====
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

-- =========================
-- CHUNK 2: Enable RLS
-- =========================
ALTER TABLE detections ENABLE ROW LEVEL SECURITY;

-- =========================
-- CHUNK 3: RLS Policies
-- =========================

-- Allow authenticated users to view their own detections
CREATE POLICY "Users can view their own detections"
    ON detections FOR SELECT
    USING (auth.uid() = created_by);

-- Allow authenticated users to insert their own detections
CREATE POLICY "Users can insert their own detections"
    ON detections FOR INSERT
    WITH CHECK (auth.uid() = created_by);

-- Allow anonymous (anon key) inserts when no auth.uid is present
CREATE POLICY "Anon can insert detections"
    ON detections FOR INSERT
    WITH CHECK (auth.uid() IS NULL);

-- Allow authenticated users to update their own detections
CREATE POLICY "Users can update their own detections"
    ON detections FOR UPDATE
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

-- Allow authenticated users to delete their own detections
CREATE POLICY "Users can delete their own detections"
    ON detections FOR DELETE
    USING (auth.uid() = created_by);

-- =========================
-- CHUNK 4: Trigger for updated_at
-- =========================

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

-- =========================
-- CHUNK 5: Indexes
-- =========================
CREATE INDEX idx_detections_created_by ON detections(created_by);
CREATE INDEX idx_detections_pest_name ON detections(pest_name);
CREATE INDEX idx_detections_crop_name ON detections(crop_name);
CREATE INDEX idx_detections_created_at ON detections(created_at DESC);
CREATE INDEX idx_detections_confidence ON detections(confidence DESC);
