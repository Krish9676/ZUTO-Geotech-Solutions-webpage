# ZUTO GeoTech Solutions - Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account with database access
- Your Pest & Disease Classification API endpoint

## Step 1: Environment Configuration

Create a `.env` file in the root directory with your Supabase credentials:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://kvzbyvmtcbtkzftvksnk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2emJ5dm10Y2J0a3pmdHZrc25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODAxMzUsImV4cCI6MjA2OTk1NjEzNX0.nDWs_xXIdyd7e295BR3vkfeaUHJwbUca4K8iFbpDjWQ

# API Configuration
VITE_PEST_DISEASE_API_URL=https://crop-disease-detection-api-0spd.onrender.com
```

## Step 2: Database Setup

Run the following SQL commands in your Supabase SQL editor in the exact order:

### CHUNK 1: Cleanup and Create Basic Table
```sql
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
```

### CHUNK 2: Security, Functions, and Indexes
```sql
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
```

### CHUNK 3: Views, Helper Functions, and Storage
```sql
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
    WHERE pest_name ILIKE '%' || pest || '%' 
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
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Start Development Server

```bash
npm run dev
```

## Step 5: Test the Application

1. Open your browser and navigate to `http://localhost:5173`
2. Click "Pest & Disease Service" or "Request Demo"
3. You'll be redirected to the login page
4. Create a new account or log in
5. Upload an image for pest and disease classification
6. View results and check your dashboard

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx          # User login form
│   │   └── Register.jsx       # User registration form
│   ├── dashboard/
│   │   └── Dashboard.jsx      # User dashboard with stats
│   ├── services/
│   │   └── PestDiseaseService.jsx  # Main service page
│   ├── Navbar.jsx             # Navigation with company name
│   ├── HeroSection.jsx        # Hero section with service link
│   └── ServicesTabs.jsx       # Service tabs with navigation
├── contexts/
│   └── AuthContext.jsx        # Authentication context
├── lib/
│   └── supabase.js            # Supabase client configuration
└── App.jsx                    # Main app with routing
```

## Key Features

- **User Authentication**: Sign up, login, and session management
- **Image Upload**: Drag & drop or click to upload images
- **AI Analysis**: Integration with your pest/disease classification API
- **Database Storage**: Secure storage of analysis results with RLS
- **User Dashboard**: View analysis history and statistics
- **Responsive Design**: Mobile-friendly interface

## API Integration

The application expects your API to return data in this format:

```json
{
  "pest_name": "Aphids",
  "confidence": 95.5,
  "crop_name": "Tomato",
  "diagnosis": "Aphid infestation detected",
  "recommendations": [
    "Apply neem oil",
    "Introduce ladybugs",
    "Remove affected leaves"
  ]
}
```

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env` file is in the root directory
   - Restart the development server after creating `.env`

2. **Database Connection Errors**
   - Verify Supabase URL and key in `.env`
   - Check if database schema was created successfully

3. **Image Upload Failures**
   - Ensure storage buckets are created
   - Check storage policies are in place

4. **Authentication Issues**
   - Verify Supabase authentication is enabled
   - Check if email confirmation is required

### Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all SQL commands executed successfully
3. Ensure environment variables are correctly set
4. Check Supabase dashboard for any policy errors

## Deployment

### Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

## Security Notes

- Environment variables are prefixed with `VITE_` for client-side access
- Row Level Security (RLS) ensures users can only access their own data
- Supabase handles authentication securely
- Images are stored in Supabase Storage with proper access controls

## Next Steps

1. Customize the UI to match your brand
2. Add more services as needed
3. Implement additional features like export functionality
4. Set up monitoring and analytics
5. Configure backup and recovery procedures
