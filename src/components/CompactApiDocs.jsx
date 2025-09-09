import { useState } from 'react';

const CompactApiDocs = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'endpoints', label: 'Endpoints' },
    { id: 'examples', label: 'Examples' }
  ];

  const apiInfo = {
    baseUrl: 'https://crop-disease-detection-api-0spd.onrender.com',
    version: 'v1.0.0'
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/api/upload',
      description: 'Upload image for pest/disease detection',
      params: ['file (JPG, PNG, GIF)', 'crop_name (optional)']
    },
    {
      method: 'GET',
      path: '/api/history',
      description: 'Get all detection history'
    },
    {
      method: 'GET',
      path: '/api/detections/{id}',
      description: 'Get specific detection by ID'
    },
    {
      method: 'GET',
      path: '/health, /ready',
      description: 'Health and readiness checks'
    }
  ];

  const responseExample = {
    id: "uuid-string",
    prediction: "Pest/Disease Name",
    confidence: 95.5,
    image_url: "https://storage.example.com/images/uuid.jpg",
    heatmap_url: "https://storage.example.com/heatmaps/uuid.jpg",
    diagnosis: "Detailed diagnosis from LLaMA model",
    crop_name: "Rice"
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Crop Disease Detection API</h2>
        <div className="text-sm text-gray-500">
          <span className="font-medium">{apiInfo.version}</span>
        </div>
      </div>

      {/* API Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm">
          <span className="font-medium text-gray-700">Base URL:</span>
          <span className="text-gray-600 ml-2 font-mono text-xs">{apiInfo.baseUrl}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-green-100 text-green-800 font-medium'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="h-64 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• AI-powered pest/disease detection</li>
                <li>• Heatmap generation for visual explanation</li>
                <li>• LLaMA integration for diagnosis</li>
                <li>• FastAPI performance with async support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Response Format</h3>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                <pre>{JSON.stringify(responseExample, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'endpoints' && (
          <div className="space-y-3">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-3">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    endpoint.method === 'POST' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <span className="font-mono text-sm text-gray-700">{endpoint.path}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{endpoint.description}</p>
                {endpoint.params && (
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Parameters:</span> {endpoint.params.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">JavaScript/React</h3>
              <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                <pre>{`const formData = new FormData();
formData.append('file', imageFile);
formData.append('crop_name', 'Rice');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result.prediction);`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Python</h3>
              <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                <pre>{`import requests

with open('crop_image.jpg', 'rb') as f:
    files = {'file': f}
    data = {'crop_name': 'Rice'}
    
    response = requests.post(
        'http://localhost:8000/api/upload',
        files=files,
        data=data
    )
    
result = response.json()
print(f"Detection: {result['prediction']}")`}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompactApiDocs;
