import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart } from 'recharts';

const TimeSeriesVisualization = ({ data, metadata }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [showHeatmap, setShowHeatmap] = useState(false);

  const timeSeriesData = data?.timeSeries || [];
  const availableIndices = data?.metadata?.indices || [];

  // Debug logging
  console.log('TimeSeriesVisualization - data:', data);
  console.log('TimeSeriesVisualization - timeSeriesData:', timeSeriesData);
  console.log('TimeSeriesVisualization - availableIndices:', availableIndices);

  // Initialize selected indices with all available indices
  useMemo(() => {
    if (availableIndices.length > 0 && selectedIndices.length === 0) {
      setSelectedIndices([...availableIndices]);
    }
  }, [availableIndices, selectedIndices.length]);

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

  const getCategoryColor = (category) => {
    const colors = {
      vegetation: 'text-green-600',
      water: 'text-blue-600',
      soil: 'text-amber-600',
      urban: 'text-gray-600',
      hazard: 'text-red-600',
      nutrient: 'text-purple-600',
      other: 'text-gray-600'
    };
    return colors[category] || 'text-gray-600';
  };

  const calculateStatistics = (index) => {
    const values = timeSeriesData.map(d => d[index]).filter(v => !isNaN(v));
    if (values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const median = sorted[Math.floor(sorted.length / 2)];
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const std = Math.sqrt(values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / values.length);

    return { mean, median, min, max, std, count: values.length };
  };

  const renderChart = () => {
    if (timeSeriesData.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">📊</div>
          <p>No data available for chart rendering</p>
        </div>
      );
    }

    if (selectedIndices.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">📊</div>
          <p>Please select at least one index to display</p>
        </div>
      );
    }

    const commonProps = {
      data: timeSeriesData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip 
              formatter={(value, name) => [value.toFixed(3), name]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            {selectedIndices.map(index => (
              <Line
                key={index}
                type="monotone"
                dataKey={index}
                stroke={getColorForIndex(index)}
                strokeWidth={2}
                dot={{ r: 3 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip 
              formatter={(value, name) => [value.toFixed(3), name]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            {selectedIndices.map((index, i) => (
              <Area
                key={index}
                type="monotone"
                dataKey={index}
                stackId="1"
                stroke={getColorForIndex(index)}
                fill={getColorForIndex(index)}
                fillOpacity={0.6}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip 
              formatter={(value, name) => [value.toFixed(3), name]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            {selectedIndices.map(index => (
              <Bar
                key={index}
                dataKey={index}
                fill={getColorForIndex(index)}
                opacity={0.8}
              />
            ))}
          </BarChart>
        );

      default:
        return null;
    }
  };

  const renderHeatmap = () => {
    if (timeSeriesData.length === 0) return null;

    const maxValue = Math.max(...timeSeriesData.flatMap(d => 
      selectedIndices.map(index => d[index] || 0)
    ));
    const minValue = Math.min(...timeSeriesData.flatMap(d => 
      selectedIndices.map(index => d[index] || 0)
    ));

    return (
      <div className="space-y-4">
        {selectedIndices.map(index => {
          const stats = calculateStatistics(index);
          if (!stats) return null;

          return (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">{index}</h4>
                <span className={`text-sm ${getCategoryColor(getIndexCategory(index))}`}>
                  {getIndexCategory(index).toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2">
                {timeSeriesData.map((point, i) => {
                  const value = point[index];
                  if (value === undefined || isNaN(value)) return null;
                  
                  const normalizedValue = (value - minValue) / (maxValue - minValue);
                  const intensity = Math.max(0.1, normalizedValue);
                  
                  return (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600 w-20">{point.date}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div
                          className="h-4 rounded-full"
                          style={{
                            width: `${intensity * 100}%`,
                            backgroundColor: getColorForIndex(index),
                            opacity: 0.7
                          }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                          {value.toFixed(3)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!data || timeSeriesData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <div className="text-4xl mb-2">📊</div>
        <p>No time series data available. Please download data first.</p>
        <div className="mt-4 text-sm text-gray-400 max-w-4xl mx-auto">
          <p>Debug: data = {data ? 'present' : 'null'}</p>
          <p>Debug: timeSeriesData length = {timeSeriesData.length}</p>
          <p>Debug: availableIndices = {JSON.stringify(availableIndices)}</p>
          {data && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-left">
              <p className="font-semibold">Full data structure:</p>
              <pre className="text-xs overflow-auto max-h-40">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">Time Series Analysis</h3>
            <div className="flex space-x-2">
              {['line', 'area', 'bar'].map(type => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-3 py-1 text-sm rounded capitalize ${
                    chartType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showHeatmap}
                onChange={(e) => setShowHeatmap(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Show Heatmap</span>
            </label>
          </div>
        </div>

        {/* Index Selection */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Indices to Display ({selectedIndices.length} selected)
          </label>
          <div className="flex flex-wrap gap-2">
            {availableIndices.map(index => (
              <button
                key={index}
                onClick={() => {
                  setSelectedIndices(prev => 
                    prev.includes(index)
                      ? prev.filter(i => i !== index)
                      : [...prev, index]
                  );
                }}
                className={`px-3 py-1 text-sm rounded border ${
                  selectedIndices.includes(index)
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {index}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        {showHeatmap ? (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Spectral Indices Heatmap</h4>
            {renderHeatmap()}
          </div>
        ) : (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Time Series Chart</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Statistics Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Statistical Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedIndices.map(index => {
            const stats = calculateStatistics(index);
            if (!stats) return null;

            return (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{index}</h5>
                  <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(getIndexCategory(index))} bg-opacity-10`}>
                    {getIndexCategory(index)}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mean:</span>
                    <span className="font-medium">{stats.mean.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Median:</span>
                    <span className="font-medium">{stats.median.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min:</span>
                    <span className="font-medium">{stats.min.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max:</span>
                    <span className="font-medium">{stats.max.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Std Dev:</span>
                    <span className="font-medium">{stats.std.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Count:</span>
                    <span className="font-medium">{stats.count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesVisualization;
