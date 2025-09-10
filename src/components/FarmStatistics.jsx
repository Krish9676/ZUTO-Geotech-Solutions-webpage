import { useMemo } from 'react';

const FarmStatistics = ({ boundary, analysisData }) => {
  // Define helper functions first
  const calculateTrend = (values) => {
    if (values.length < 2) return 'stable';
    const n = values.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = values;
    
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    
    if (slope > 0.01) return 'increasing';
    if (slope < -0.01) return 'decreasing';
    return 'stable';
  };

  const calculateVariability = (values) => {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const cv = Math.sqrt(variance) / mean;
    
    if (cv < 0.1) return 'low';
    if (cv < 0.3) return 'medium';
    return 'high';
  };

  const farmStats = useMemo(() => {
    if (!boundary || boundary.length < 3) return null;

    // Calculate area using shoelace formula
    let area = 0;
    const n = boundary.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += boundary[i][1] * boundary[j][0]; // lng * lat
      area -= boundary[j][1] * boundary[i][0]; // lng * lat
    }
    area = Math.abs(area) / 2;

    // Convert to hectares using proper lat/lng conversion
    const lat = boundary[0][0]; // Use first coordinate's latitude
    const latRad = (lat * Math.PI) / 180;
    const metersPerDegreeLat = 111320; // meters per degree latitude
    const metersPerDegreeLng = 111320 * Math.cos(latRad); // meters per degree longitude at this latitude
    
    const squareMeters = area * metersPerDegreeLat * metersPerDegreeLng;
    const areaInHectares = squareMeters / 10000;

    // Calculate perimeter
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

    // Calculate center
    let centerLat = 0, centerLng = 0;
    boundary.forEach(point => {
      centerLat += point[0];
      centerLng += point[1];
    });

    // Calculate bounding box
    let minLat = Infinity, maxLat = -Infinity;
    let minLng = Infinity, maxLng = -Infinity;
    
    boundary.forEach(point => {
      minLat = Math.min(minLat, point[0]);
      maxLat = Math.max(maxLat, point[0]);
      minLng = Math.min(minLng, point[1]);
      maxLng = Math.max(maxLng, point[1]);
    });

    return {
      area: areaInHectares,
      perimeter: perimeter,
      center: {
        lat: centerLat / boundary.length,
        lng: centerLng / boundary.length
      },
      boundingBox: { minLat, maxLat, minLng, maxLng },
      dimensions: {
        width: maxLng - minLng,
        height: maxLat - minLat
      }
    };
  }, [boundary]);

  const analysisStats = useMemo(() => {
    if (!analysisData?.timeSeries) return null;

    const timeSeries = analysisData.timeSeries;
    const indices = analysisData.metadata?.indices || [];
    
    const stats = {};
    indices.forEach(index => {
      const values = timeSeries.map(d => d[index]).filter(v => !isNaN(v));
      if (values.length > 0) {
        const sorted = [...values].sort((a, b) => a - b);
        stats[index] = {
          mean: values.reduce((a, b) => a + b, 0) / values.length,
          median: sorted[Math.floor(sorted.length / 2)],
          min: sorted[0],
          max: sorted[sorted.length - 1],
          std: Math.sqrt(values.reduce((sq, n) => sq + Math.pow(n - (values.reduce((a, b) => a + b, 0) / values.length), 2), 0) / values.length),
          trend: calculateTrend(values),
          variability: calculateVariability(values)
        };
      }
    });

    return stats;
  }, [analysisData]);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      default: return '➡️';
    }
  };

  const getVariabilityColor = (variability) => {
    switch (variability) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getIndexCategory = (index) => {
    const categories = {
      'NDVI': 'vegetation', 'EVI': 'vegetation', 'RENDVI': 'vegetation', 'SAVI': 'vegetation',
      'NDWI': 'water', 'MNDWI': 'water', 'NDMI': 'water', 'NMDI': 'water',
      'BSI': 'soil', 'NDTI': 'soil', 'PSRI': 'soil', 'CRI': 'soil',
      'NDBI': 'urban', 'IBI': 'urban', 'BAEI': 'urban', 'EBBI': 'urban',
      'NBR': 'hazard', 'dNBR': 'hazard', 'BAI': 'hazard', 'NDDI': 'hazard',
      'CIred-edge': 'nutrient', 'TGI': 'nutrient', 'SI': 'nutrient', 'NDSI': 'nutrient'
    };
    return categories[index] || 'other';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      vegetation: '🌱',
      water: '💧',
      soil: '🌾',
      urban: '🏙️',
      hazard: '🔥',
      nutrient: '🧪',
      other: '📊'
    };
    return icons[category] || '📊';
  };

  if (!farmStats) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📏</div>
          <p>No farm boundary defined. Please draw a boundary on the map.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Farm Geometry Statistics */}
      <div>
        <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
          <span className="text-lg mr-2">📏</span>
          Farm Geometry
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xs">📐</span>
                </div>
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-gray-500">Area</p>
                <p className="text-sm font-semibold text-gray-900">
                  {farmStats.area.toFixed(2)} ha
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xs">📏</span>
                </div>
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-gray-500">Perimeter</p>
                <p className="text-sm font-semibold text-gray-900">
                  {farmStats.perimeter.toFixed(2)} km
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-xs">📍</span>
                </div>
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-gray-500">Center</p>
                <p className="text-xs font-semibold text-gray-900">
                  {farmStats.center.lat.toFixed(4)}°, {farmStats.center.lng.toFixed(4)}°
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 text-xs">📦</span>
                </div>
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-gray-500">Dimensions</p>
                <p className="text-xs font-semibold text-gray-900">
                  {farmStats.dimensions.width.toFixed(4)}° × {farmStats.dimensions.height.toFixed(4)}°
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bounding Box Details */}
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-2 text-sm">Bounding Box</h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-600">N:</span>
              <span className="ml-1 font-mono">{farmStats.boundingBox.maxLat.toFixed(4)}°</span>
            </div>
            <div>
              <span className="text-gray-600">S:</span>
              <span className="ml-1 font-mono">{farmStats.boundingBox.minLat.toFixed(4)}°</span>
            </div>
            <div>
              <span className="text-gray-600">E:</span>
              <span className="ml-1 font-mono">{farmStats.boundingBox.maxLng.toFixed(4)}°</span>
            </div>
            <div>
              <span className="text-gray-600">W:</span>
              <span className="ml-1 font-mono">{farmStats.boundingBox.minLng.toFixed(4)}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Statistics */}
      {analysisStats && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">📊</span>
            Spectral Analysis Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(analysisStats).map(([index, stats]) => {
              const category = getIndexCategory(index);
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{index}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(category)}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mean:</span>
                      <span className="font-medium">{stats.mean.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Range:</span>
                      <span className="font-medium">
                        {stats.min.toFixed(3)} - {stats.max.toFixed(3)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Std Dev:</span>
                      <span className="font-medium">{stats.std.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Trend:</span>
                      <span className="font-medium flex items-center">
                        {getTrendIcon(stats.trend)} {stats.trend}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Variability:</span>
                      <span className={`font-medium ${getVariabilityColor(stats.variability)}`}>
                        {stats.variability}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Data Quality Metrics */}
      {analysisData?.metadata && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">🔍</span>
            Data Quality & Coverage
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">📅</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Time Period</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {analysisData.metadata.timeRange?.start} to {analysisData.metadata.timeRange?.end}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">🛰️</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Satellites</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {analysisData.metadata.satellites?.length || 0} sources
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-sm">📊</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Total Images</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {analysisData.metadata.totalImages || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Analysis Parameters</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Indices Analyzed:</span>
                <span className="ml-2 font-medium">{analysisData.metadata.indices?.length || 0}</span>
              </div>
              <div>
                <span className="text-gray-600">Cloud Cover:</span>
                <span className="ml-2 font-medium">≤ {analysisData.metadata.cloudCover || 0}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmStatistics;
