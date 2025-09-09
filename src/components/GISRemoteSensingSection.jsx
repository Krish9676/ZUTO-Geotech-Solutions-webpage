import { useState } from 'react';
import { Link } from 'react-router-dom';

const GISRemoteSensingSection = () => {
  const [activeTab, setActiveTab] = useState('vegetation');

  const analysisTypes = [
    {
      id: 'vegetation',
      title: 'Vegetation Analysis',
      description: 'Advanced vegetation health monitoring using NDVI, EVI, RENDVI and other indices for crop monitoring and forest assessment.',
      indices: ['NDVI', 'EVI', 'RENDVI', 'SAVI'],
      impact: 'Improve crop monitoring accuracy by 25-40% and enable early stress detection',
      color: 'green',
      icon: '🌱'
    },
    {
      id: 'water',
      title: 'Water & Moisture Mapping',
      description: 'Comprehensive water body detection, wetland mapping, and moisture stress assessment for agricultural and environmental monitoring.',
      indices: ['NDWI', 'MNDWI', 'NDMI', 'NMDI'],
      impact: 'Optimize irrigation management and reduce water waste by 30-50%',
      color: 'blue',
      icon: '💧'
    },
    {
      id: 'soil',
      title: 'Soil & Agricultural Assessment',
      description: 'Soil property mapping, tillage monitoring, and agricultural land classification using advanced spectral indices.',
      indices: ['BSI', 'NDTI', 'PSRI', 'CRI'],
      impact: 'Reduce fertilizer costs by 20-35% through precision soil mapping',
      color: 'amber',
      icon: '🌾'
    },
    {
      id: 'urban',
      title: 'Urban & Built-up Mapping',
      description: 'Urban expansion monitoring, built-up area extraction, and infrastructure development tracking for city planning.',
      indices: ['NDBI', 'IBI', 'BAEI', 'EBBI'],
      impact: 'Enable accurate urban planning and infrastructure development tracking',
      color: 'gray',
      icon: '🏙️'
    },
    {
      id: 'hazard',
      title: 'Hazard & Fire Assessment',
      description: 'Fire severity mapping, burned area assessment, and post-fire recovery monitoring for disaster management.',
      indices: ['NBR', 'dNBR', 'BAI', 'NDDI'],
      impact: 'Improve disaster response and recovery planning efficiency by 40-60%',
      color: 'red',
      icon: '🔥'
    },
    {
      id: 'nutrient',
      title: 'Nutrient & Fertility Analysis',
      description: 'Advanced nutrient deficiency detection, chlorophyll estimation, and soil fertility assessment using red-edge bands.',
      indices: ['CIred-edge', 'TGI', 'SI', 'NDSI'],
      impact: 'Increase crop yields by 15-30% through precision nutrient management',
      color: 'purple',
      icon: '🧪'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      green: 'from-green-500 to-green-600 bg-green-100 text-green-800 border-green-200',
      blue: 'from-blue-500 to-blue-600 bg-blue-100 text-blue-800 border-blue-200',
      amber: 'from-amber-500 to-amber-600 bg-amber-100 text-amber-800 border-amber-200',
      gray: 'from-gray-500 to-gray-600 bg-gray-100 text-gray-800 border-gray-200',
      red: 'from-red-500 to-red-600 bg-red-100 text-red-800 border-red-200',
      purple: 'from-purple-500 to-purple-600 bg-purple-100 text-purple-800 border-purple-200'
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <section id="gis-remote-sensing" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            GIS & Remote Sensing Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Advanced satellite imagery analysis using cutting-edge spectral indices for precision agriculture, 
            environmental monitoring, and urban planning applications.
          </p>
        </div>

        {/* Analysis Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {analysisTypes.map((type) => (
            <div
              key={type.id}
              className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border ${
                activeTab === type.id ? 'border-blue-500 ring-1 ring-blue-200' : 'border-gray-200'
              }`}
              onClick={() => setActiveTab(type.id)}
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">{type.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900">{type.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-3 text-xs leading-relaxed">{type.description}</p>
              
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-1 text-xs">Key Indices:</h4>
                <div className="flex flex-wrap gap-1">
                  {type.indices.map((index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(type.color).split(' ')[1]}`}
                    >
                      {index}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-1 text-xs">Business Impact:</h4>
                <p className="text-xs text-gray-600">{type.impact}</p>
              </div>
              
              <Link
                to={`/gis-service/${type.id}`}
                className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium text-white bg-gradient-to-r ${getColorClasses(type.color).split(' ').slice(0, 2).join(' ')} hover:shadow-sm transition-all duration-200`}
              >
                Explore Indices
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Complete Analysis Workflow
          </h3>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🗺️</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1 text-sm">Interactive Mapping</h4>
              <p className="text-xs text-gray-600">Draw bounding boxes or upload shapefiles to define analysis areas</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">📡</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1 text-sm">Data Download</h4>
              <p className="text-xs text-gray-600">Automated satellite data retrieval from Sentinel-2, Landsat, and MODIS</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">📊</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1 text-sm">Time Series Analysis</h4>
              <p className="text-xs text-gray-600">Interactive charts showing temporal changes in spectral indices</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🔥</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1 text-sm">Heatmap Visualization</h4>
              <p className="text-xs text-gray-600">Spatial distribution maps with advanced color schemes</p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">Powered by Open Source Data</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-1 text-sm">Sentinel-2 (ESA)</h4>
              <p className="text-xs opacity-90">10-20m resolution, 5-day revisit, free access</p>
            </div>
            <div>
              <h4 className="font-medium mb-1 text-sm">Landsat 8/9 (NASA)</h4>
              <p className="text-xs opacity-90">30m resolution, 16-day revisit, free access</p>
            </div>
            <div>
              <h4 className="font-medium mb-1 text-sm">MODIS (NASA)</h4>
              <p className="text-xs opacity-90">250m-1km resolution, daily updates, free access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GISRemoteSensingSection;