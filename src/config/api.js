// API Configuration
export const API_CONFIG = {
  // Base URL for the FastAPI backend
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://crop-disease-detection-api-0spd.onrender.com',
  
  // API endpoints
  ENDPOINTS: {
    UPLOAD: '/api/upload',
    HISTORY: '/api/history',
    DETECTION: '/api/detections',
    CROPS: '/api/crops',
    HEALTH: '/health',
    READY: '/ready'
  },
  
  // Default timeout for API calls (in milliseconds)
  TIMEOUT: 30000,
  
  // Supported image formats
  SUPPORTED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  
  // Maximum file size (10MB)
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  
  // Crop types supported by the new crop-aware multicrop model (21 crops)
  SUPPORTED_CROPS: [
    'banana', 'brinjal', 'cabbage', 'cauliflower', 'chilli', 'cotton', 'grapes', 
    'maize', 'mango', 'mustard', 'onion', 'oranges', 'papaya', 'pomegranade', 
    'potato', 'rice', 'soyabean', 'sugarcane', 'tobacco', 'tomato', 'wheat'
  ]
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to validate file
export const validateFile = (file) => {
  if (!file) {
    throw new Error('No file selected');
  }
  
  if (!API_CONFIG.SUPPORTED_FORMATS.includes(file.type)) {
    throw new Error('Unsupported file format. Please use JPG, PNG, or GIF');
  }
  
  if (file.size > API_CONFIG.MAX_FILE_SIZE) {
    throw new Error('File size too large. Maximum size is 10MB');
  }
  
  return true;
};
