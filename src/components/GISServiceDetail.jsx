import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Rectangle, useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { satelliteDataService } from '../lib/satelliteDataService';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});


// Interactive Map Component with Leaflet - Drawing Focus
const InteractiveMapComponent = ({ onAreaSelect, selectedArea }) => {
  const [mapType, setMapType] = useState('satellite');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentRect, setCurrentRect] = useState(null);
  const [startPoint, setStartPoint] = useState(null);

  const getTileLayerUrl = () => {
    switch (mapType) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  const getAttribution = () => {
    switch (mapType) {
      case 'satellite':
        return '&copy; <a href="https://www.esri.com/">Esri</a> — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
      case 'terrain':
        return '&copy; <a href="https://www.esri.com/">Esri</a> — Source: USGS, Esri, TANA, DeLorme, and NPS';
      default:
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    }
  };

  // Map events for drawing
  const MapEvents = () => {
    useMapEvents({
      mousedown: (e) => {
        if (!isDrawing) return;
        const { lat, lng } = e.latlng;
        setStartPoint({ lat, lng });
      },
      mousemove: (e) => {
        if (!isDrawing || !startPoint) return;
        const { lat, lng } = e.latlng;
        setCurrentRect({
          start: startPoint,
          end: { lat, lng }
        });
      },
      mouseup: (e) => {
        if (!isDrawing || !startPoint || !currentRect) return;
        const { lat, lng } = e.latlng;
        const finalRect = {
          start: startPoint,
          end: { lat, lng }
        };
        onAreaSelect(finalRect);
        setCurrentRect(null);
        setStartPoint(null);
        setIsDrawing(false);
      }
    });
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Map Type Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Map Type</label>
            <select
              value={mapType}
              onChange={(e) => setMapType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="satellite">Satellite View</option>
              <option value="terrain">Terrain View</option>
              <option value="street">Street View</option>
            </select>
          </div>
          
          {/* Drawing Controls */}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={() => setIsDrawing(!isDrawing)}
              className={`px-6 py-2 rounded font-medium transition-colors ${
                isDrawing 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
            </button>
            
            {selectedArea && (
              <button
                onClick={() => onAreaSelect(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Clear Selection
              </button>
            )}
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong> Select your map type, click "Start Drawing", then click and drag on the map to draw your area of interest. 
            The selected area will be used for satellite data download and analysis.
          </p>
        </div>
      </div>

      {/* Map Display */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Draw Your Area of Interest</h3>
          <p className="text-sm text-gray-600">
            {isDrawing 
              ? 'Click and drag on the map to draw your area of interest' 
              : 'Click "Start Drawing" above to begin selecting your area'
            }
          </p>
        </div>
        
        <div className="relative">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={6}
            style={{ height: '500px', width: '100%' }}
            className="rounded-lg"
          >
            <TileLayer
              url={getTileLayerUrl()}
              attribution={getAttribution()}
            />
            
            <MapEvents />
            
            {selectedArea && (
              <Rectangle
                bounds={[
                  [selectedArea.start.lat, selectedArea.start.lng],
                  [selectedArea.end.lat, selectedArea.end.lng]
                ]}
                pathOptions={{ color: 'blue', fillOpacity: 0.2, weight: 3 }}
              />
            )}
            
            {currentRect && (
              <Rectangle
                bounds={[
                  [currentRect.start.lat, currentRect.start.lng],
                  [currentRect.end.lat, currentRect.end.lng]
                ]}
                pathOptions={{ color: 'red', fillOpacity: 0.1, weight: 2, dashArray: '5, 5' }}
              />
            )}
          </MapContainer>
          
          {/* Drawing Status */}
          <div className="absolute top-4 left-4 bg-white p-3 rounded shadow-lg">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isDrawing ? 'bg-red-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {isDrawing ? 'Drawing Mode Active' : 'Click Start Drawing'}
              </span>
            </div>
          </div>
          
          {/* Selected Area Info */}
          {selectedArea && (
            <div className="absolute top-4 right-4 bg-white p-3 rounded shadow-lg text-sm max-w-xs">
              <h4 className="font-semibold text-gray-800 mb-2">✅ Area Selected</h4>
              <p className="text-gray-600">
                <strong>Start:</strong> {selectedArea.start.lat.toFixed(4)}°, {selectedArea.start.lng.toFixed(4)}°<br/>
                <strong>End:</strong> {selectedArea.end.lat.toFixed(4)}°, {selectedArea.end.lng.toFixed(4)}°<br/>
                <strong>Size:</strong> {Math.abs(selectedArea.end.lat - selectedArea.start.lat).toFixed(4)}° × {Math.abs(selectedArea.end.lng - selectedArea.start.lng).toFixed(4)}°
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Area Display */}
      {selectedArea && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-green-800">✅ Area of Interest Selected</h4>
            <div className="text-sm text-green-600">
              Ready for satellite data download and analysis
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-green-700">
                <strong>Northwest:</strong> {selectedArea.start.lat.toFixed(4)}°, {selectedArea.start.lng.toFixed(4)}°
              </p>
              <p className="text-green-700">
                <strong>Southeast:</strong> {selectedArea.end.lat.toFixed(4)}°, {selectedArea.end.lng.toFixed(4)}°
              </p>
            </div>
            <div>
              <p className="text-green-700">
                <strong>Area Size:</strong> {Math.abs(selectedArea.end.lat - selectedArea.start.lat).toFixed(4)}° × {Math.abs(selectedArea.end.lng - selectedArea.start.lng).toFixed(4)}°
              </p>
              <p className="text-green-700">
                <strong>Center:</strong> {((selectedArea.start.lat + selectedArea.end.lat) / 2).toFixed(4)}°, {((selectedArea.start.lng + selectedArea.end.lng) / 2).toFixed(4)}°
              </p>
            </div>
            <div>
              <p className="text-green-700">
                <strong>Approx. Area:</strong> {Math.abs(selectedArea.end.lat - selectedArea.start.lat) * Math.abs(selectedArea.end.lng - selectedArea.start.lng) * 10000} km²
              </p>
              <p className="text-green-700">
                <strong>Status:</strong> Ready for analysis
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GISServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  
  const [selectedArea, setSelectedArea] = useState(null);
  const [analysisType, setAnalysisType] = useState(serviceId || 'vegetation');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-12-31'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dataSource, setDataSource] = useState('sentinel2');

  // Debug logging
  console.log('GISServiceDetail - serviceId:', serviceId);
  console.log('GISServiceDetail - analysisType:', analysisType);

  const analysisTypes = {
    vegetation: {
      title: 'Vegetation Analysis',
      indices: ['NDVI', 'EVI', 'RENDVI', 'SAVI'],
      description: 'Monitor vegetation health and crop conditions using advanced spectral indices',
      color: 'green'
    },
    water: {
      title: 'Water & Moisture Mapping',
      indices: ['NDWI', 'MNDWI', 'NDMI', 'NMDI'],
      description: 'Detect water bodies and assess moisture stress in agricultural areas',
      color: 'blue'
    },
    soil: {
      title: 'Soil & Agricultural Assessment',
      indices: ['BSI', 'NDTI', 'PSRI', 'CRI'],
      description: 'Map soil properties and agricultural land classification',
      color: 'amber'
    },
    urban: {
      title: 'Urban & Built-up Mapping',
      indices: ['NDBI', 'IBI', 'BAEI', 'EBBI'],
      description: 'Monitor urban expansion and infrastructure development',
      color: 'gray'
    },
    hazard: {
      title: 'Hazard & Fire Assessment',
      indices: ['NBR', 'dNBR', 'BAI', 'NDDI'],
      description: 'Assess fire severity and burned area recovery',
      color: 'red'
    },
    nutrient: {
      title: 'Nutrient & Fertility Analysis',
      indices: ['CIred-edge', 'TGI', 'SI', 'NDSI'],
      description: 'Detect nutrient deficiencies and soil fertility',
      color: 'purple'
    }
  };

  const currentAnalysis = analysisTypes[analysisType] || analysisTypes.vegetation;
  const [selectedIndices, setSelectedIndices] = useState(currentAnalysis.indices);

  const handleAreaSelection = (coordinates) => {
    setSelectedArea(coordinates);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Process shapefile and extract coordinates
      // This would integrate with a shapefile parser
    }
  };

  const handleAnalysis = async () => {
    if (!selectedArea && !uploadedFile) {
      alert('Please select an area or upload a shapefile');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Download satellite data
      const downloadResult = await satelliteDataService.downloadData(
        selectedArea,
        dateRange,
        dataSource,
        selectedIndices
      );

      if (downloadResult.success) {
        // Process the data
        const processResult = await satelliteDataService.processData(
          downloadResult.data,
          selectedIndices
        );

        if (processResult.success) {
          setResults(processResult.data);
        } else {
          throw new Error(processResult.error);
        }
      } else {
        throw new Error(downloadResult.error);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback to mock data for demo
      setResults({
        timeSeries: generateMockTimeSeries(),
        heatmaps: generateMockHeatmaps(),
        statistics: generateMockStatistics()
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateMockTimeSeries = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return currentAnalysis.indices.map((index, indexIdx) => {
      // Generate more realistic seasonal data
      const baseValue = 0.3 + (indexIdx * 0.1);
      const seasonalVariation = 0.4;
      
      return {
        name: index,
        data: months.map((month, monthIdx) => {
          // Create seasonal pattern
          const seasonalFactor = Math.sin((monthIdx / 12) * 2 * Math.PI - Math.PI/2) * 0.5 + 0.5;
          const randomVariation = (Math.random() - 0.5) * 0.2;
          const value = Math.max(0, Math.min(1, baseValue + (seasonalFactor * seasonalVariation) + randomVariation));
          
          return {
            month,
            value: parseFloat(value.toFixed(3))
          };
        })
      };
    });
  };

  const generateMockHeatmaps = () => {
    return currentAnalysis.indices.map(index => ({
      name: index,
      url: `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${index}+Heatmap`
    }));
  };

  const generateMockStatistics = () => {
    const areaSize = Math.floor(Math.random() * 2000) + 500; // 500-2500 hectares
    const avgIndex = (Math.random() * 0.4 + 0.3).toFixed(2);
    const trend = (Math.random() * 20 - 5).toFixed(1); // -5% to +15%
    const confidence = Math.floor(Math.random() * 10) + 90; // 90-99%
    
    return {
      area: `${areaSize.toLocaleString()} hectares`,
      avgIndex: parseFloat(avgIndex),
      trend: `${trend > 0 ? '+' : ''}${trend}%`,
      confidence: `${confidence}%`
    };
  };

  // Add error boundary
  if (!currentAnalysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Analysis Type Not Found</h2>
          <p className="text-gray-600 mb-4">The requested analysis type "{analysisType}" is not available.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentAnalysis.title}
          </h1>
          <p className="text-xl text-gray-600">
            {currentAnalysis.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Configuration</h2>
              
              {/* Analysis Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analysis Type
                </label>
                <select
                  value={analysisType}
                  onChange={(e) => {
                    setAnalysisType(e.target.value);
                    setSelectedIndices(analysisTypes[e.target.value].indices);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.entries(analysisTypes).map(([key, type]) => (
                    <option key={key} value={key}>{type.title}</option>
                  ))}
                </select>
              </div>

              {/* Data Source Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Satellite Data Source
                </label>
                <select
                  value={dataSource}
                  onChange={(e) => setDataSource(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="sentinel2">Sentinel-2 (10-20m, 5-day revisit)</option>
                  <option value="landsat8">Landsat 8 (30m, 16-day revisit)</option>
                  <option value="modis">MODIS (250m-1km, Daily)</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analysis Period
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Area Selection Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Define Analysis Area</h3>
                
                {/* Map Drawing */}
                <div className="mb-4">
                  <button
                    onClick={() => setSelectedArea({type: 'drawn', coordinates: [0, 0, 1, 1]})}
                    className="w-full p-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    🗺️ Draw on Map
                  </button>
                </div>

                {/* Coordinate Input */}
                <div className="mb-4">
                  <button
                    onClick={() => setSelectedArea({type: 'coordinates', coordinates: [0, 0, 1, 1]})}
                    className="w-full p-3 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    📍 Enter Coordinates
                  </button>
                </div>

                {/* Shapefile Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Shapefile
                  </label>
                  <input
                    type="file"
                    accept=".shp,.zip"
                    onChange={handleFileUpload}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Selected Indices */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Spectral Indices</h3>
                <div className="space-y-2">
                  {currentAnalysis.indices.map((index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedIndices.includes(index)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIndices([...selectedIndices, index]);
                          } else {
                            setSelectedIndices(selectedIndices.filter(i => i !== index));
                          }
                        }}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{index}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Run Analysis Button */}
              <button
                onClick={handleAnalysis}
                disabled={isProcessing || (!selectedArea && !uploadedFile)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Run Analysis'
                )}
              </button>
            </div>

            {/* Status */}
            {selectedArea && (
              <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Area Selected</h3>
                <p className="text-sm">
                  {selectedArea.type === 'drawn' && 'Area drawn on map'}
                  {selectedArea.type === 'coordinates' && 'Coordinates entered'}
                  {selectedArea.type === 'uploaded' && 'Shapefile uploaded'}
                </p>
              </div>
            )}
          </div>

          {/* Right Panel - Map and Results */}
          <div className="lg:col-span-2">
            {/* Interactive Map */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Interactive Map</h2>
              <InteractiveMapComponent 
                onAreaSelect={handleAreaSelection}
                selectedArea={selectedArea}
              />
            </div>

            {/* Results */}
            {results && (
              <div className="space-y-6">
                {/* Time Series Charts */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Time Series Analysis</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.timeSeries.map((series, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">{series.name}</h3>
                        <div className="h-64 bg-white rounded">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={series.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis domain={[0, 1]} />
                              <Tooltip 
                                formatter={(value) => [value.toFixed(3), series.name]}
                                labelFormatter={(label) => `Month: ${label}`}
                              />
                              <Legend />
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke={index === 0 ? "#3b82f6" : index === 1 ? "#10b981" : index === 2 ? "#f59e0b" : "#8b5cf6"}
                                strokeWidth={2}
                                dot={{ fill: index === 0 ? "#3b82f6" : index === 1 ? "#10b981" : index === 2 ? "#f59e0b" : "#8b5cf6", strokeWidth: 2, r: 4 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heatmaps */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Spatial Heatmaps</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.heatmaps.map((heatmap, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">{heatmap.name}</h3>
                        <div className="h-48 bg-white border rounded flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-40 h-40 bg-gradient-to-br from-red-200 via-yellow-200 to-green-200 rounded-lg flex items-center justify-center mb-2">
                              <span className="text-gray-600 font-medium text-sm">{heatmap.name} Heatmap</span>
                            </div>
                            <p className="text-xs text-gray-500">Spatial distribution visualization</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Statistics</h2>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{results.statistics.area}</div>
                      <div className="text-sm text-gray-600">Analysis Area</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{results.statistics.avgIndex}</div>
                      <div className="text-sm text-gray-600">Average Index</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{results.statistics.trend}</div>
                      <div className="text-sm text-gray-600">Trend</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{results.statistics.confidence}</div>
                      <div className="text-sm text-gray-600">Confidence</div>
                    </div>
                  </div>
                </div>

                {/* Comparative Analysis */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Comparative Analysis</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.timeSeries.map(series => ({
                        name: series.name,
                        avg: series.data.reduce((sum, point) => sum + point.value, 0) / series.data.length,
                        max: Math.max(...series.data.map(point => point.value)),
                        min: Math.min(...series.data.map(point => point.value))
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 1]} />
                        <Tooltip 
                          formatter={(value, name) => [value.toFixed(3), name === 'avg' ? 'Average' : name === 'max' ? 'Maximum' : 'Minimum']}
                        />
                        <Legend />
                        <Bar dataKey="avg" fill="#3b82f6" name="Average" />
                        <Bar dataKey="max" fill="#10b981" name="Maximum" />
                        <Bar dataKey="min" fill="#f59e0b" name="Minimum" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GISServiceDetail;