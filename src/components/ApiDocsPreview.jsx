import React from 'react';

const ApiDocsPreview = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Crop Disease Detection API
          </h1>
          <p className="text-xl text-gray-600">
            FastAPI-powered backend for AI-driven crop pest and disease detection
          </p>
        </div>

        {/* API Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Base URL</h3>
              <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                {import.meta.env.VITE_API_BASE_URL || 'https://crop-disease-detection-api-0spd.onrender.com'}
              </code>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">API Version</h3>
              <p className="text-gray-700">v1.0.0</p>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Endpoints</h2>
          
          {/* Upload Endpoint */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-3">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mr-3">
                POST
              </span>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                /api/upload
              </code>
            </div>
            <p className="text-gray-700 mb-3">Upload an image for pest/disease detection</p>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <p className="font-medium mb-2">Parameters:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li><code>file</code> - Image file (JPG, PNG, GIF)</li>
                <li><code>crop_name</code> - Optional crop type</li>
              </ul>
            </div>
          </div>

          {/* History Endpoint */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-3">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-3">
                GET
              </span>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                /api/history
              </code>
            </div>
            <p className="text-gray-700 mb-3">Get all detection history</p>
          </div>

          {/* Specific Detection Endpoint */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-3">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-3">
                GET
              </span>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                /api/detections/{'{detection_id}'}
              </code>
            </div>
            <p className="text-gray-700 mb-3">Get a specific detection by ID</p>
          </div>

          {/* Health Check Endpoints */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-3">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-3">
                GET
              </span>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                /health, /ready
              </code>
            </div>
            <p className="text-gray-700 mb-3">Health and readiness checks</p>
          </div>
        </div>

        {/* Response Format */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Response Format</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`{
  "id": "uuid-string",
  "prediction": "Pest/Disease Name",
  "confidence": 95.5,
  "image_url": "https://storage.example.com/images/uuid.jpg",
  "heatmap_url": "https://storage.example.com/heatmaps/uuid.jpg",
  "diagnosis": "Detailed diagnosis from LLaMA model",
  "crop_name": "Rice"
}`}
            </pre>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">AI-Powered Detection</h3>
                  <p className="text-sm text-gray-600">Advanced machine learning models for accurate pest and disease identification</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Heatmap Generation</h3>
                  <p className="text-sm text-gray-600">Visual explanation of AI decision-making process</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">LLaMA Integration</h3>
                  <p className="text-sm text-gray-600">Natural language diagnosis and treatment recommendations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">FastAPI Performance</h3>
                  <p className="text-sm text-gray-600">High-performance async API with automatic documentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Usage Examples</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">JavaScript/React</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`const formData = new FormData();
formData.append('file', imageFile);
formData.append('crop_name', 'Rice');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result.prediction); // Pest/Disease name
console.log(result.confidence); // Confidence score
console.log(result.heatmap_url); // Heatmap visualization`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Python</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`import requests

with open('crop_image.jpg', 'rb') as f:
    files = {'file': f}
    data = {'crop_name': 'Rice'}
    
    response = requests.post(
        'http://localhost:8000/api/upload',
        files=files,
        data=data
    )
    
result = response.json()
print(f"Detection: {result['prediction']}")
print(f"Confidence: {result['confidence']}%")`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocsPreview;