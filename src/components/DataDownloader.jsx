import { useState } from 'react';

const DataDownloader = ({ boundary, onDataDownloaded, isDownloading, setIsDownloading }) => {
  const [timeRange, setTimeRange] = useState({
    start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year ago
    end: new Date().toISOString().split('T')[0] // today
  });
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedSatellites, setSelectedSatellites] = useState(['sentinel2']);
  const [cloudCover, setCloudCover] = useState(20);

  const availableIndices = [
    { id: 'NDVI', name: 'NDVI', description: 'Normalized Difference Vegetation Index', category: 'vegetation' },
    { id: 'EVI', name: 'EVI', description: 'Enhanced Vegetation Index', category: 'vegetation' },
    { id: 'RENDVI', name: 'RENDVI', description: 'Red Edge NDVI', category: 'vegetation' },
    { id: 'SAVI', name: 'SAVI', description: 'Soil Adjusted Vegetation Index', category: 'vegetation' },
    { id: 'NDWI', name: 'NDWI', description: 'Normalized Difference Water Index', category: 'water' },
    { id: 'MNDWI', name: 'MNDWI', description: 'Modified NDWI', category: 'water' },
    { id: 'NDMI', name: 'NDMI', description: 'Normalized Difference Moisture Index', category: 'water' },
    { id: 'NMDI', name: 'NMDI', description: 'Normalized Multi-band Drought Index', category: 'water' },
    { id: 'BSI', name: 'BSI', description: 'Bare Soil Index', category: 'soil' },
    { id: 'NDTI', name: 'NDTI', description: 'Normalized Difference Tillage Index', category: 'soil' },
    { id: 'PSRI', name: 'PSRI', description: 'Plant Senescence Reflectance Index', category: 'soil' },
    { id: 'CRI', name: 'CRI', description: 'Carotenoid Reflectance Index', category: 'soil' },
    { id: 'NDBI', name: 'NDBI', description: 'Normalized Difference Built-up Index', category: 'urban' },
    { id: 'IBI', name: 'IBI', description: 'Index-based Built-up Index', category: 'urban' },
    { id: 'BAEI', name: 'BAEI', description: 'Built-up Area Extraction Index', category: 'urban' },
    { id: 'EBBI', name: 'EBBI', description: 'Enhanced Built-up and Bareness Index', category: 'urban' },
    { id: 'NBR', name: 'NBR', description: 'Normalized Burn Ratio', category: 'hazard' },
    { id: 'dNBR', name: 'dNBR', description: 'Delta Normalized Burn Ratio', category: 'hazard' },
    { id: 'BAI', name: 'BAI', description: 'Burn Area Index', category: 'hazard' },
    { id: 'NDDI', name: 'NDDI', description: 'Normalized Difference Drought Index', category: 'hazard' },
    { id: 'CIred-edge', name: 'CIred-edge', description: 'Chlorophyll Index Red Edge', category: 'nutrient' },
    { id: 'TGI', name: 'TGI', description: 'Triangular Greenness Index', category: 'nutrient' },
    { id: 'SI', name: 'SI', description: 'Structure Index', category: 'nutrient' },
    { id: 'NDSI', name: 'NDSI', description: 'Normalized Difference Structure Index', category: 'nutrient' }
  ];

  const satelliteOptions = [
    { id: 'sentinel2', name: 'Sentinel-2', description: '10-20m resolution, 5-day revisit', free: true },
    { id: 'landsat8', name: 'Landsat 8', description: '30m resolution, 16-day revisit', free: true },
    { id: 'landsat9', name: 'Landsat 9', description: '30m resolution, 16-day revisit', free: true },
    { id: 'modis', name: 'MODIS', description: '250m-1km resolution, daily', free: true }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      vegetation: 'bg-green-100 text-green-800 border-green-200',
      water: 'bg-blue-100 text-blue-800 border-blue-200',
      soil: 'bg-amber-100 text-amber-800 border-amber-200',
      urban: 'bg-gray-100 text-gray-800 border-gray-200',
      hazard: 'bg-red-100 text-red-800 border-red-200',
      nutrient: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleIndexToggle = (indexId) => {
    setSelectedIndices(prev => 
      prev.includes(indexId) 
        ? prev.filter(id => id !== indexId)
        : [...prev, indexId]
    );
  };

  const handleSatelliteToggle = (satelliteId) => {
    setSelectedSatellites(prev => 
      prev.includes(satelliteId) 
        ? prev.filter(id => id !== satelliteId)
        : [...prev, satelliteId]
    );
  };

  const handleDownload = async () => {
    if (!boundary || selectedIndices.length === 0 || selectedSatellites.length === 0) {
      alert('Please select a boundary, indices, and satellites');
      return;
    }

    setIsDownloading(true);
    
    try {
      // Simulate API call for data download
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock time series data
      const mockData = generateMockTimeSeriesData();
      onDataDownloaded(mockData);
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Error downloading data. Please try again.');
    } finally {
      setIsDownloading(false);
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
      selectedIndices.forEach(indexId => {
        const index = availableIndices.find(i => i.id === indexId);
        if (index) {
          // Generate realistic values based on index type
          let value;
          switch (index.category) {
            case 'vegetation':
              value = Math.random() * 0.8 + 0.1; // 0.1 to 0.9
              break;
            case 'water':
              value = Math.random() * 0.6 - 0.3; // -0.3 to 0.3
              break;
            case 'soil':
              value = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
              break;
            case 'urban':
              value = Math.random() * 0.3; // 0 to 0.3
              break;
            case 'hazard':
              value = Math.random() * 0.6 - 0.3; // -0.3 to 0.3
              break;
            case 'nutrient':
              value = Math.random() * 0.5 + 0.2; // 0.2 to 0.7
              break;
            default:
              value = Math.random() * 0.8 + 0.1;
          }
          baseData[indexId] = parseFloat(value.toFixed(3));
        }
      });
      return baseData;
    });

    return {
      timeSeries: data,
      metadata: {
        boundary: boundary,
        timeRange: timeRange,
        indices: selectedIndices,
        satellites: selectedSatellites,
        cloudCover: cloudCover,
        totalImages: Math.ceil((endDate - startDate) / (16 * 24 * 60 * 60 * 1000))
      }
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Download Configuration</h3>
      
      {/* Time Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Start Date</label>
            <input
              type="date"
              value={timeRange.start}
              onChange={(e) => setTimeRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">End Date</label>
            <input
              type="date"
              value={timeRange.end}
              onChange={(e) => setTimeRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Satellite Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Satellite Data Sources</label>
        <div className="grid grid-cols-2 gap-2">
          {satelliteOptions.map(satellite => (
            <label key={satellite.id} className="flex items-center p-2 border rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedSatellites.includes(satellite.id)}
                onChange={() => handleSatelliteToggle(satellite.id)}
                className="mr-2 text-blue-600"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{satellite.name}</div>
                <div className="text-xs text-gray-600">{satellite.description}</div>
                {satellite.free && (
                  <span className="inline-block px-1 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                    Free
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Cloud Cover */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maximum Cloud Cover: {cloudCover}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={cloudCover}
          onChange={(e) => setCloudCover(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0% (Clear)</span>
          <span>100% (Cloudy)</span>
        </div>
      </div>

      {/* Index Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Spectral Indices ({selectedIndices.length} selected)
        </label>
        <div className="max-h-48 overflow-y-auto border rounded-md p-2">
          {availableIndices.map(index => (
            <label key={index.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={selectedIndices.includes(index.id)}
                onChange={() => handleIndexToggle(index.id)}
                className="mr-2 text-blue-600"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{index.name}</span>
                  <span className={`px-2 py-0.5 text-xs rounded border ${getCategoryColor(index.category)}`}>
                    {index.category}
                  </span>
                </div>
                <div className="text-xs text-gray-600">{index.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={!boundary || selectedIndices.length === 0 || selectedSatellites.length === 0 || isDownloading}
        className={`w-full px-4 py-3 rounded-md font-medium transition-colors ${
          !boundary || selectedIndices.length === 0 || selectedSatellites.length === 0 || isDownloading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isDownloading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Downloading & Processing...
          </div>
        ) : (
          `Download Data (${selectedIndices.length} indices, ${selectedSatellites.length} satellites)`
        )}
      </button>

      {/* Status */}
      {boundary && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-green-800">
              Boundary ready for analysis ({boundary.length} points)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataDownloader;
