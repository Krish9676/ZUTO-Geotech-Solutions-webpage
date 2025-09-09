import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GISAnalysisPage = () => {
  const { analysisType } = useParams();
  const navigate = useNavigate();
  const [drawnBoundary, setDrawnBoundary] = useState(null);
  const [timeRange, setTimeRange] = useState({ start: '', end: '' });
  const [isDownloading, setIsDownloading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [farmStats, setFarmStats] = useState(null);

  const analysisTypes = {
    vegetation: {
      title: 'Vegetation Analysis',
      indices: ['NDVI', 'EVI', 'RENDVI', 'SAVI'],
      color: 'green',
      icon: '🌱'
    },
    water: {
      title: 'Water & Moisture Mapping',
      indices: ['NDWI', 'MNDWI', 'NDMI', 'NMDI'],
      color: 'blue',
      icon: '💧'
    },
    soil: {
      title: 'Soil & Agricultural Assessment',
      indices: ['BSI', 'NDTI', 'PSRI', 'CRI'],
      color: 'amber',
      icon: '🌾'
    },
    urban: {
      title: 'Urban & Built-up Mapping',
      indices: ['NDBI', 'IBI', 'BAEI', 'EBBI'],
      color: 'gray',
      icon: '🏙️'
    },
    hazard: {
      title: 'Hazard & Fire Assessment',
      indices: ['NBR', 'dNBR', 'BAI', 'NDDI'],
      color: 'red',
      icon: '🔥'
    },
    nutrient: {
      title: 'Nutrient & Fertility Analysis',
      indices: ['CIred-edge', 'TGI', 'SI', 'NDSI'],
      color: 'purple',
      icon: '🧪'
    }
  };

  const currentAnalysis = analysisTypes[analysisType] || analysisTypes.vegetation;

  // Handle boundary input
  const handleBoundaryInput = (coordinates) => {
    setDrawnBoundary(coordinates);
    setFarmStats(calculateFarmStats(coordinates));
  };

  const handleDownload = async () => {
    if (!drawnBoundary || !timeRange.start || !timeRange.end) {
      alert('Please draw a boundary and select time range');
      return;
    }

    setIsDownloading(true);
    
    // Simulate data download and processing
    setTimeout(() => {
      const mockData = generateMockAnalysisData();
      setAnalysisData(mockData);
      setFarmStats(calculateFarmStats(drawnBoundary));
      setIsDownloading(false);
    }, 3000);
  };

  const generateMockAnalysisData = () => {
    const dates = [];
    const startDate = new Date(timeRange.start);
    const endDate = new Date(timeRange.end);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 16)) {
      dates.push(d.toISOString().split('T')[0]);
    }

    const data = dates.map(date => {
      const baseData = { date };
      currentAnalysis.indices.forEach(index => {
        baseData[index] = Math.random() * 0.8 + 0.1; // Random values between 0.1 and 0.9
      });
      return baseData;
    });

    return data;
  };

  const calculateFarmStats = (boundary) => {
    if (!boundary || boundary.length < 3) return null;

    // Calculate area using shoelace formula
    let area = 0;
    const n = boundary.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += boundary[i][0] * boundary[j][1];
      area -= boundary[j][0] * boundary[i][1];
    }
    area = Math.abs(area) / 2;

    // Convert to hectares (rough approximation)
    const areaInHectares = area * 11132 * 11132 / 10000;

    return {
      area: areaInHectares,
      perimeter: calculatePerimeter(boundary),
      center: calculateCenter(boundary),
      boundingBox: calculateBoundingBox(boundary)
    };
  };

  const calculatePerimeter = (boundary) => {
    let perimeter = 0;
    for (let i = 0; i < boundary.length - 1; i++) {
      const lat1 = boundary[i][0];
      const lng1 = boundary[i][1];
      const lat2 = boundary[i + 1][0];
      const lng2 = boundary[i + 1][1];
      
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLng = (lng2 - lng1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      perimeter += R * c;
    }
    return perimeter;
  };

  const calculateCenter = (boundary) => {
    let lat = 0, lng = 0;
    boundary.forEach(point => {
      lat += point[0];
      lng += point[1];
    });
    return {
      lat: lat / boundary.length,
      lng: lng / boundary.length
    };
  };

  const calculateBoundingBox = (boundary) => {
    let minLat = Infinity, maxLat = -Infinity;
    let minLng = Infinity, maxLng = -Infinity;
    
    boundary.forEach(point => {
      minLat = Math.min(minLat, point[0]);
      maxLat = Math.max(maxLat, point[0]);
      minLng = Math.min(minLng, point[1]);
      maxLng = Math.max(maxLng, point[1]);
    });
    
    return { minLat, maxLat, minLng, maxLng };
  };

  const getColorForIndex = (index) => {
    const colors = {
      'NDVI': '#00ff00',
      'EVI': '#32cd32',
      'RENDVI': '#228b22',
      'SAVI': '#90ee90',
      'NDWI': '#0000ff',
      'MNDWI': '#4169e1',
      'NDMI': '#1e90ff',
      'NMDI': '#87ceeb',
      'BSI': '#ffa500',
      'NDTI': '#ff8c00',
      'PSRI': '#ff7f50',
      'CRI': '#ff6347',
      'NDBI': '#808080',
      'IBI': '#696969',
      'BAEI': '#a9a9a9',
      'EBBI': '#c0c0c0',
      'NBR': '#ff0000',
      'dNBR': '#dc143c',
      'BAI': '#b22222',
      'NDDI': '#8b0000',
      'CIred-edge': '#800080',
      'TGI': '#9370db',
      'SI': '#8a2be2',
      'NDSI': '#9932cc'
    };
    return colors[index] || '#000000';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{currentAnalysis.icon}</span>
                <h1 className="text-xl font-bold text-gray-900">{currentAnalysis.title}</h1>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Interactive Analysis & Visualization
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Farm Boundary Mapping</h2>
                <p className="text-sm text-gray-600">
                  Enter your farm boundary coordinates manually or use the map interface below.
                </p>
              </div>
              <div className="p-4">
                {/* Simple coordinate input for now */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Farm Boundary Coordinates (Lat, Lng)
                    </label>
                    <textarea
                      placeholder="Enter coordinates in format: [[lat1, lng1], [lat2, lng2], [lat3, lng3], ...]"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      onChange={(e) => {
                        try {
                          const coords = JSON.parse(e.target.value);
                          if (Array.isArray(coords) && coords.length >= 3) {
                            handleBoundaryInput(coords);
                          }
                        } catch (err) {
                          // Invalid JSON, ignore
                        }
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Example: [[28.6139, 77.2090], [28.6149, 77.2090], [28.6149, 77.2100], [28.6139, 77.2100]]
                    </p>
                  </div>
                  
                  {/* Quick preset buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const coords = [
                          [28.6139, 77.2090],
                          [28.6149, 77.2090],
                          [28.6149, 77.2100],
                          [28.6139, 77.2100],
                          [28.6139, 77.2090]
                        ];
                        handleBoundaryInput(coords);
                      }}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Use Sample Boundary
                    </button>
                    <button
                      onClick={() => setDrawnBoundary(null)}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      Clear Boundary
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Range and Download */}
            <div className="mt-4 bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Parameters</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={timeRange.start}
                    onChange={(e) => setTimeRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={timeRange.end}
                    onChange={(e) => setTimeRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Indices to Analyze</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {currentAnalysis.indices.map(index => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedIndices.includes(index)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIndices(prev => [...prev, index]);
                          } else {
                            setSelectedIndices(prev => prev.filter(i => i !== index));
                          }
                        }}
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{index}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={!drawnBoundary || !timeRange.start || !timeRange.end || isDownloading}
                className={`mt-4 w-full px-4 py-2 rounded-md font-medium ${
                  !drawnBoundary || !timeRange.start || !timeRange.end || isDownloading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isDownloading ? 'Downloading & Processing...' : 'Download Data & Analyze'}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Farm Statistics */}
            {farmStats && (
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Statistics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Area:</span>
                    <span className="text-sm font-medium">{farmStats.area.toFixed(2)} hectares</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Perimeter:</span>
                    <span className="text-sm font-medium">{farmStats.perimeter.toFixed(2)} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Center Lat:</span>
                    <span className="text-sm font-medium">{farmStats.center.lat.toFixed(4)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Center Lng:</span>
                    <span className="text-sm font-medium">{farmStats.center.lng.toFixed(4)}°</span>
                  </div>
                </div>
              </div>
            )}

            {/* Time Series Chart */}
            {analysisData && (
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Series Analysis</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analysisData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 10 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      {selectedIndices.map(index => (
                        <Line
                          key={index}
                          type="monotone"
                          dataKey={index}
                          stroke={getColorForIndex(index)}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Heatmap Visualization */}
            {analysisData && (
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Spectral Indices Heatmap</h3>
                <div className="space-y-2">
                  {selectedIndices.map(index => {
                    const values = analysisData.map(d => d[index]);
                    const min = Math.min(...values);
                    const max = Math.max(...values);
                    const avg = values.reduce((a, b) => a + b, 0) / values.length;
                    
                    return (
                      <div key={index} className="border rounded p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{index}</span>
                          <span className="text-xs text-gray-600">Avg: {avg.toFixed(3)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{
                              width: `${((avg - min) / (max - min)) * 100}%`,
                              backgroundColor: getColorForIndex(index)
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{min.toFixed(3)}</span>
                          <span>{max.toFixed(3)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GISAnalysisPage;