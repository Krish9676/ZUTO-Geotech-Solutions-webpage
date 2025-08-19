# FastAPI Backend Integration Guide

This guide explains how to integrate your FastAPI backend with the updated frontend for crop disease detection.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in your frontend root directory:

```bash
# API Configuration
VITE_API_BASE_URL=https://crop-disease-detection-api-0spd.onrender.com

# Supabase Configuration (for user management)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. API Backend Status

Your FastAPI backend is already deployed and running at:
`https://crop-disease-detection-api-0spd.onrender.com`

The frontend will automatically connect to this deployed API.

### 3. Start the Frontend

```bash
npm run dev
```

## 🔧 API Integration Details

### Updated Components

1. **API Service Layer** (`src/lib/api.js`)
   - Centralized API communication
   - Error handling and response formatting
   - Support for all FastAPI endpoints

2. **PestDiseaseService** (`src/components/services/PestDiseaseService.jsx`)
   - Direct integration with FastAPI `/api/upload` endpoint
   - Automatic heatmap display
   - Improved error handling

3. **Dashboard** (`src/components/dashboard/Dashboard.jsx`)
   - API status indicators
   - Enhanced detection history display

4. **API Documentation** (`src/components/ApiDocsPreview.jsx`)
   - Comprehensive API reference
   - Code examples in multiple languages

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload image for pest/disease detection |
| `/api/history` | GET | Get all detection history |
| `/api/detections/{id}` | GET | Get specific detection by ID |
| `/health` | GET | Health check |
| `/ready` | GET | Readiness check |

### Response Format

```json
{
  "id": "uuid-string",
  "prediction": "Pest/Disease Name",
  "confidence": 95.5,
  "image_url": "https://storage.example.com/images/uuid.jpg",
  "heatmap_url": "https://storage.example.com/heatmaps/uuid.jpg",
  "diagnosis": "Detailed diagnosis from LLaMA model",
  "crop_name": "Rice"
}
```

## 🎯 Key Features

### 1. **AI-Powered Detection**
- Advanced machine learning models
- Real-time image analysis
- High accuracy pest and disease identification

### 2. **Heatmap Generation**
- Visual explanation of AI decisions
- Helps users understand detection focus areas
- Generated automatically for each analysis

### 3. **LLaMA Integration**
- Natural language diagnosis
- Treatment recommendations
- Context-aware crop information

### 4. **FastAPI Performance**
- Async processing
- High throughput
- Automatic API documentation

## 🔄 Data Flow

1. **User Upload**: Image + crop selection
2. **API Call**: Frontend → FastAPI backend
3. **AI Processing**: Model inference + heatmap generation
4. **LLaMA Analysis**: Natural language diagnosis
5. **Storage**: Results saved to Supabase
6. **Response**: Frontend displays results with heatmap

## 🛠️ Configuration

### Frontend Configuration (`src/config/api.js`)

```javascript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  TIMEOUT: 30000,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
};
```

### Supported Crops

The system supports 21 crop types:
- Grains: Rice, Maize, Wheat, Mustard
- Vegetables: Onion, Potato, Tomato, Cabbage, Cauliflower, Brinjal
- Fruits: Mango, Banana, Papaya, Pomegranate, Oranges, Grapes
- Others: Cotton, Chilli, Sugarcane, Tobacco, Soyabean

## 🚨 Error Handling

The frontend now includes comprehensive error handling:

- **File Validation**: Format, size, and type checking
- **API Errors**: Network issues, server errors, validation errors
- **User Feedback**: Clear error messages and recovery suggestions

## 📱 Mobile Compatibility

The API responses are formatted for mobile app compatibility:

- Consistent field names (`prediction`, `confidence`, `image_url`)
- Standardized response structure
- Mobile-friendly image URLs

## 🔍 Testing

### Test API Endpoints

```bash
# Health check
curl http://localhost:8000/health

# Ready check
curl http://localhost:8000/ready

# Upload test (replace with actual image path)
curl -X POST http://localhost:8000/api/upload \
  -F "file=@test_image.jpg" \
  -F "crop_name=Rice"
```

### Frontend Testing

1. **File Upload**: Test various image formats and sizes
2. **Crop Selection**: Verify all supported crops work
3. **Error Handling**: Test invalid files and network issues
4. **Results Display**: Check heatmap and diagnosis display

## 🚀 Deployment

### Production Environment

1. **Update Environment Variables**:
   ```bash
   VITE_API_BASE_URL=https://your-api-domain.com
   ```

2. **CORS Configuration**: Ensure your FastAPI backend allows your frontend domain

3. **SSL**: Use HTTPS for production deployments

### Docker Deployment

```dockerfile
# Example Dockerfile for FastAPI backend
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://reactjs.org/docs/)

## 🤝 Support

For issues or questions:

1. Check the API logs for backend errors
2. Verify environment variable configuration
3. Test API endpoints directly with curl/Postman
4. Check browser console for frontend errors

## 🔄 Migration Notes

### From Previous Implementation

- **Removed**: Direct Supabase storage upload for images
- **Added**: Direct FastAPI integration
- **Enhanced**: Error handling and validation
- **New**: Heatmap display and API status indicators

The new implementation provides a more streamlined, efficient, and user-friendly experience while maintaining all existing functionality.
