import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { cropDiseaseAPI } from '../../lib/api';
import { API_CONFIG, validateFile } from '../../config/api';
import CompactApiDocs from '../CompactApiDocs';

const PestDiseaseService = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(''); // New state for selected crop
  const [cropList, setCropList] = useState([
    'banana', 'brinjal', 'cabbage', 'cauliflower', 'chilli', 'cotton', 'grapes', 
    'maize', 'mango', 'mustard', 'onion', 'oranges', 'papaya', 'pomegranade', 
    'potato', 'rice', 'soyabean', 'sugarcane', 'tobacco', 'tomato', 'wheat'
  ]); // Start with static crops
  const [loadingCrops, setLoadingCrops] = useState(false); // Start as not loading
  const fileInputRef = useRef(null);


  // Helper function to format crop names for display
  const formatCropName = (crop) => {
    return crop.charAt(0).toUpperCase() + crop.slice(1).replace(/_/g, ' ');
  };

  // Load crops from API on component mount (non-blocking)
  useEffect(() => {
    const loadCrops = async () => {
      try {
        const response = await cropDiseaseAPI.getCrops();
        if (response.success && Array.isArray(response.data)) {
          setCropList(response.data);
        }
      } catch (error) {
        console.error('Failed to load crops from API:', error);
      }
    };

    // Try to load from API in background (non-blocking)
    loadCrops();
  }, []);

  const handleFileSelect = (file) => {
    try {
      validateFile(file);
      setSelectedFile(file);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    if (!selectedCrop) {
      setError('Please select a crop name');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Call the FastAPI backend directly
      const apiResponse = await cropDiseaseAPI.analyzeImage(selectedFile, selectedCrop);
      console.log('API Response:', apiResponse);
      
      if (!apiResponse.success) {
        throw new Error(apiResponse.error || 'Failed to analyze image');
      }
      
      const apiResults = apiResponse.data;
      
      // Save to database using the new detections table schema (skip in demo mode)
      if (!isDemoMode) {
        const { error: dbError } = await supabase
          .from('detections')
          .insert({
            image_url: apiResults.image_url,
            heatmap_url: apiResults.heatmap_url,
            pest_name: apiResults.prediction,
            confidence: apiResults.confidence,
            crop_name: selectedCrop,
            diagnosis: apiResults.diagnosis,
            created_by: user.id
          });

        if (dbError) throw dbError;
      }

      setResults(apiResults);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // For demo purposes, allow usage without authentication
  const isDemoMode = !user;

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pest & Disease Classification
          </h1>
          <p className="text-xl text-gray-600">
            Upload an image of your crop to identify pests and diseases using AI
          </p>
          {isDemoMode && (
            <div className="mt-4 p-3 bg-blue-100 border border-blue-300 text-blue-700 rounded-lg">
              <p className="text-sm">
                <strong>Demo Mode:</strong> You're using the free demo. Results won't be saved to your account.
                <button
                  onClick={() => navigate('/login')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Sign in to save results
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Crop Selection Dropdown */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="crop-select" className="block text-lg font-medium text-gray-900 mb-3">
              Select Crop Type:
            </label>
            <select
              id="crop-select"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              disabled={loadingCrops}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {loadingCrops ? 'Loading crops...' : '-- Please select a crop --'}
              </option>
              {Array.isArray(cropList) && cropList.map((crop) => (
                <option key={crop} value={crop}>
                  {formatCropName(crop)}
                </option>
              ))}
            </select>
            {loadingCrops && (
              <p className="text-sm text-gray-500 mt-2">
                Loading available crops from the API...
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upload Image</h2>
            
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-xs mx-auto rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                      setResults(null);
                    }}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-gray-600">
                    <span className="font-medium text-green-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
          </div>

          {selectedFile && selectedCrop && (
            <div className="text-center">
              <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          )}
        </div>

        {results && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Detection Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crop:</span>
                    <span className="font-medium">{formatCropName(selectedCrop)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pest/Disease:</span>
                    <span className="font-medium">{results.prediction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confidence:</span>
                    <span className="font-medium">{results.confidence}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Diagnosis</h3>
                <p className="text-gray-700">
                  {results.diagnosis || 'No diagnosis available'}
                </p>
              </div>
            </div>

            {/* Heatmap Display */}
            {results.heatmap_url && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">AI Analysis Heatmap</h3>
                <div className="text-center">
                  <img
                    src={results.heatmap_url}
                    alt="AI Analysis Heatmap"
                    className="max-w-md mx-auto rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    This heatmap shows the areas the AI focused on for detection
                  </p>
                </div>
              </div>
            )}

            {/* Original Image */}
            {results.image_url && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Original Image</h3>
                <div className="text-center">
                  <img
                    src={results.image_url}
                    alt="Original Crop Image"
                    className="max-w-md mx-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* How It Works Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Select Crop</h3>
                <p className="text-gray-600">Choose from 21 supported crop types using our crop-aware AI model</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Upload Image</h3>
                <p className="text-gray-600">Take a photo of your crop or upload an existing image (160x160px optimized)</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Results</h3>
                <p className="text-gray-700">Receive crop-specific disease predictions with 15 disease classes per crop</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Crop-Aware Model Features</h3>
              <div className="space-y-2 text-sm text-green-700">
                <div>
                  <p><strong>21 Crops Supported:</strong> banana, brinjal, cabbage, cauliflower, chilli, cotton, grapes, maize, mango, mustard, onion, oranges, papaya, pomegranade, potato, rice, soyabean, sugarcane, tobacco, tomato, wheat</p>
                </div>
                <div>
                  <p><strong>15 Disease Classes per Crop:</strong> healthy, bacterial_blight, anthracnose, leaf_spot, rust, verticillium_wilt, fusarium_wilt, leaf_curl, mosaic_virus, leaf_mold, early_blight, late_blight, root_rot, alternaria_blight, phomopsis_blight</p>
                </div>
              </div>
            </div>
          </div>

          {/* API Documentation Section */}
          <div className="h-96">
            <CompactApiDocs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestDiseaseService;
