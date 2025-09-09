import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const services = [
  {
    key: 'pest',
    title: 'Pest & Disease Detection',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    description: 'AI-powered identification of crop pests and diseases from smartphone photos',
    features: [
      'Instant pest and disease identification',
      'Treatment recommendations and prevention tips',
      'Crop-specific analysis for 20+ major crops',
      'Mobile-friendly interface for field use',
      'Historical tracking and trend analysis'
    ],
    businessValue: 'Prevent up to 80% of crop losses and reduce pesticide costs by 30%',
    cta: 'Try Demo',
    demoLink: '/pest-disease-service'
  }
];

const gisAnalysisTypes = [
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

const ServiceDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('vegetation');

  const handleAnalysis = async (type) => {
    // Navigate to the dedicated analysis page
    navigate(`/gis-analysis/${type}`);
  };

  return (
  <section id="solutions" className="py-12 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-3">Our Agricultural Solutions</h2>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Comprehensive AI-powered tools designed to solve real farming challenges and drive business growth
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pest & Disease Detection Service - Header style */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 h-full">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Pest & Disease Detection
              </h2>
              <p className="text-xs text-gray-600">
                AI-powered identification of crop pests and diseases from smartphone photos with advanced machine learning algorithms for precision agriculture.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 gap-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-2">
                <h4 className="font-medium text-gray-900 mb-1 text-xs">Key Features:</h4>
                <ul className="space-y-1">
                  {services[0].features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-2 h-2 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-2">
                <h4 className="font-medium text-gray-900 mb-1 text-xs">Supported Crops:</h4>
                <p className="text-xs text-gray-600">21+ major crops including rice, wheat, maize, tomato, potato, and more</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-2">
                <h4 className="font-medium text-gray-900 mb-1 text-xs">Disease Classes:</h4>
                <p className="text-xs text-gray-600">15 disease classes per crop with 95%+ accuracy</p>
              </div>

              <div className="bg-green-50 rounded-lg p-2">
                <h4 className="font-medium text-green-800 mb-1 text-xs">Business Impact:</h4>
                <p className="text-xs text-green-700">{services[0].businessValue}</p>
              </div>
            </div>

            <div className="text-center">
              <a 
                href={services[0].demoLink} 
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-xs font-medium transition-colors"
              >
                {services[0].cta}
              </a>
            </div>
          </div>
        </div>

        {/* GIS & Remote Sensing Solutions Section - Takes up 2/3 of the width */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              GIS & Remote Sensing Solutions
            </h2>
            <p className="text-xs text-gray-600">
              Advanced satellite imagery analysis using cutting-edge spectral indices for precision agriculture, 
              environmental monitoring, and urban planning applications.
            </p>
          </div>

          {/* Analysis Types Grid - 3 columns, 2 rows */}
          <div className="grid grid-cols-3 gap-2">
            {gisAnalysisTypes.map((type) => (
              <div
                key={type.id}
                className={`bg-white rounded-lg shadow-md p-2 hover:shadow-lg transition-all duration-300 border h-full cursor-pointer ${
                  activeTab === type.id ? 'border-blue-500 ring-1 ring-blue-200' : 'border-gray-200'
                }`}
                onClick={() => setActiveTab(type.id)}
              >
                <div className="flex flex-col items-center text-center mb-2">
                  <span className="text-xl mb-1">{type.icon}</span>
                  <h3 className="text-xs font-semibold text-gray-900 leading-tight">{type.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-2 text-xs leading-tight text-center">{type.description}</p>
                
                <div className="mb-2">
                  <h4 className="font-medium text-gray-900 mb-1 text-xs text-center">Key Indices:</h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {type.indices.map((index) => (
                      <span
                        key={index}
                        className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getColorClasses(type.color).split(' ')[1]}`}
                      >
                        {index}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-2">
                  <h4 className="font-medium text-gray-900 mb-1 text-xs text-center">Business Impact:</h4>
                  <p className="text-xs text-gray-600 text-center leading-tight">{type.impact}</p>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAnalysis(type.id);
                    }}
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white bg-gradient-to-r ${getColorClasses(type.color).split(' ').slice(0, 2).join(' ')} hover:shadow-sm transition-all duration-200`}
                  >
                    Analyze
                    <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
  );
};

export default ServiceDetail;