import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LeafletMap from './LeafletMap';
import TimeSeriesVisualization from './TimeSeriesVisualization';
import FarmStatistics from './FarmStatistics';

const GISAnalysisPage = () => {
  const { analysisType } = useParams();
  const navigate = useNavigate();
  const [drawnBoundary, setDrawnBoundary] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  // Debug analysis data changes
  useEffect(() => {
    console.log('=== ANALYSIS DATA CHANGED ===');
    console.log('New analysis data:', analysisData);
    if (analysisData) {
      console.log('Time series length:', analysisData.timeSeries?.length);
      console.log('Metadata:', analysisData.metadata);
    }
  }, [analysisData]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [timeRange, setTimeRange] = useState({
    start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

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

  // Debug logging
  console.log('GISAnalysisPage rendered with analysisType:', analysisType);

  const currentAnalysis = analysisTypes[analysisType] || analysisTypes.vegetation;
  
  // If no valid analysis type, show error
  if (!analysisType || !analysisTypes[analysisType]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Analysis Type</h1>
          <p className="text-gray-600 mb-4">
            The analysis type "{analysisType}" is not valid. 
            Please select a valid analysis type from the services page.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Handle boundary selection from map
  const handleBoundarySelect = (coordinates) => {
    console.log('=== BOUNDARY SELECTED ===');
    console.log('Coordinates received:', coordinates);
    console.log('Number of points:', coordinates?.length);
    setDrawnBoundary(coordinates);
  };

  // Handle data download completion
  const handleDataDownloaded = (data) => {
    setAnalysisData(data);
  };

  // Handle data download
  const handleDownload = async () => {
    if (!drawnBoundary || drawnBoundary.length < 3) {
      alert('Please draw a valid boundary with at least 3 points');
      return;
    }
    
    if (selectedIndices.length === 0) {
      alert('Please select at least one index to analyze');
      return;
    }

    console.log('=== STARTING DATA DOWNLOAD ===');
    console.log('Drawn boundary:', drawnBoundary);
    console.log('Selected indices:', selectedIndices);
    console.log('Time range:', timeRange);

    setIsDownloading(true);
    
    try {
      // Simulate API call for data download
      console.log('Simulating API call...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock time series data
      console.log('Generating mock data...');
      const mockData = generateMockTimeSeriesData();
      console.log('=== GENERATED MOCK DATA ===');
      console.log('Mock data:', mockData);
      console.log('Time series data length:', mockData.timeSeries?.length);
      console.log('Available indices in data:', mockData.metadata?.indices);
      console.log('First data point:', mockData.timeSeries?.[0]);
      
      console.log('Setting analysis data...');
      setAnalysisData(mockData);
      console.log('Analysis data set successfully!');
      
      // Scroll to results section
      setTimeout(() => {
        const resultsSection = document.querySelector('[data-results-section]');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Error downloading data. Please try again.');
    } finally {
      setIsDownloading(false);
      console.log('Download process completed');
    }
  };

  const generateMockTimeSeriesData = () => {
    const dates = [];
    const startDate = new Date(timeRange.start);
    const endDate = new Date(timeRange.end);
    
    // Generate dates with 16-day intervals (typical satellite revisit)
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 16)) {
      dates.push(d.toISOString().split('T')[0]);
    }

    const data = dates.map(date => {
      const baseData = { date };
      selectedIndices.forEach(index => {
        // Generate realistic values based on index type
        let value;
        if (index.includes('NDVI') || index.includes('EVI') || index.includes('SAVI')) {
          value = Math.random() * 0.8 + 0.1; // 0.1 to 0.9
        } else if (index.includes('NDWI') || index.includes('MNDWI')) {
          value = Math.random() * 0.6 - 0.3; // -0.3 to 0.3
        } else if (index.includes('BSI') || index.includes('NDTI')) {
          value = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
        } else {
          value = Math.random() * 0.8 + 0.1;
        }
        baseData[index] = parseFloat(value.toFixed(3));
      });
      return baseData;
    });

    return {
      timeSeries: data,
      metadata: {
        boundary: drawnBoundary,
        timeRange: timeRange,
        indices: selectedIndices,
        totalImages: Math.ceil((endDate - startDate) / (16 * 24 * 60 * 60 * 1000))
      }
    };
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Content Grid */}
        <div className="grid xl:grid-cols-4 gap-8">
          {/* Left Column - Map (3/4 width) */}
          <div className="xl:col-span-3 space-y-8">
            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Farm Boundary Mapping</h2>
                <p className="text-gray-600">
                  Use the interactive map below to draw your farm boundary. You can either draw directly on the map using the drawing tools or enter coordinates manually.
                </p>
              </div>
              <div className="p-4">
                <div className="h-[500px] w-full">
                  <LeafletMap 
                    onBoundarySelect={handleBoundarySelect}
                    initialCenter={[28.6139, 77.2090]}
                    initialZoom={10}
                  />
                </div>
              </div>
            </div>

            {/* Configuration Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analysis Configuration</h3>
                <p className="text-gray-600">Configure your analysis parameters and download satellite data.</p>
              </div>
              <div className="p-6 space-y-6">
                {/* Time Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Time Range</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={timeRange.start}
                        onChange={(e) => setTimeRange(prev => ({ ...prev, start: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">End Date</label>
                      <input
                        type="date"
                        value={timeRange.end}
                        onChange={(e) => setTimeRange(prev => ({ ...prev, end: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Index Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Indices to Analyze ({selectedIndices.length} selected)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {currentAnalysis.indices.map(index => (
                      <label key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
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
                          className="mr-3 text-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-700">{index}</span>
                      </label>
                    ))}
                  </div>
                </div>

                        {/* Download Button */}
                        <div className="pt-4 space-y-3">
                          <button
                            onClick={handleDownload}
                            disabled={!drawnBoundary || selectedIndices.length === 0 || isDownloading}
                            className={`w-full px-6 py-4 rounded-lg font-medium text-lg transition-colors ${
                              !drawnBoundary || selectedIndices.length === 0 || isDownloading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                            }`}
                          >
                            {isDownloading ? (
                              <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                Downloading & Processing Satellite Data...
                              </div>
                            ) : (
                              `Download Data & Analyze (${selectedIndices.length} indices)`
                            )}
                          </button>
                          
                          {/* Test Button - Remove in production */}
                          {process.env.NODE_ENV === 'development' && (
                            <button
                              onClick={() => {
                                const testData = generateMockTimeSeriesData();
                                console.log('Test data generated:', testData);
                                setAnalysisData(testData);
                              }}
                              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                            >
                              🧪 Generate Test Data
                            </button>
                          )}
                        </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results (1/4 width) */}
          <div className="xl:col-span-1 space-y-6">
            {/* Farm Statistics */}
            {drawnBoundary && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Farm Statistics</h3>
                </div>
                <div className="p-4">
                  <FarmStatistics 
                    boundary={drawnBoundary}
                    analysisData={analysisData}
                  />
                </div>
              </div>
            )}

            {/* Status Messages */}
            {!drawnBoundary && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-400 text-xl">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      No Farm Boundary Defined
                    </h3>
                    <p className="mt-1 text-sm text-yellow-700">
                      Please draw your farm boundary on the map to proceed with analysis.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {drawnBoundary && !analysisData && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-blue-400 text-xl">ℹ️</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Ready for Analysis
                    </h3>
                    <p className="mt-1 text-sm text-blue-700">
                      Select indices and click "Download Data & Analyze" to see results.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section - Full Width */}
        {analysisData && (
          <div className="mt-8 space-y-8" data-results-section>
            {/* Time Series Analysis */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Time Series Analysis</h3>
                <p className="text-gray-600 mt-1">Interactive charts showing temporal changes in spectral indices</p>
              </div>
              <div className="p-6">
                {analysisData && analysisData.timeSeries && analysisData.timeSeries.length > 0 ? (
                  <div>
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded text-sm">
                      <p className="text-green-800">✅ Data loaded successfully! Time series data: {analysisData.timeSeries.length} points</p>
                    </div>
                    <TimeSeriesVisualization 
                      data={analysisData}
                      metadata={analysisData?.metadata}
                    />
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">📊</div>
                    <p>No time series data available. Please check the console for debugging information.</p>
                    <div className="mt-4 text-sm text-gray-400 max-w-4xl mx-auto">
                      <p>Data structure:</p>
                      <pre className="text-xs overflow-auto max-h-40 bg-gray-100 p-2 rounded">
                        {JSON.stringify(analysisData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Debug Section - Remove this in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Debug Info</h4>
            <div className="text-sm text-yellow-700">
              <p><strong>Analysis Data:</strong> {analysisData ? 'Present' : 'Not present'}</p>
              <p><strong>Drawn Boundary:</strong> {drawnBoundary ? 'Present' : 'Not present'}</p>
              <p><strong>Selected Indices:</strong> {selectedIndices.length}</p>
              <p><strong>Is Downloading:</strong> {isDownloading ? 'Yes' : 'No'}</p>
              {analysisData && (
                <div className="mt-2">
                  <p><strong>Time Series Data Length:</strong> {analysisData.timeSeries?.length || 0}</p>
                  <p><strong>Available Indices:</strong> {JSON.stringify(analysisData.metadata?.indices || [])}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GISAnalysisPage;