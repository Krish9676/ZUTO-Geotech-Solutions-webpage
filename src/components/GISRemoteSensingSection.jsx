import { useNavigate } from 'react-router-dom';

const gisServices = [
  {
    id: 'vegetation-analysis',
    title: 'Vegetation Analysis',
    description: 'Advanced vegetation health monitoring using NDVI, EVI, RENDVI and other indices for crop monitoring and forest assessment.',
    features: ['NDVI', 'EVI', 'RENDVI', 'SAVI', 'GNDVI', 'OSAVI', 'PSRI', 'CRI'],
    businessValue: 'Improve crop monitoring accuracy by 25-40% and enable early stress detection'
  },
  {
    id: 'water-moisture-mapping',
    title: 'Water & Moisture Mapping',
    description: 'Comprehensive water body detection, wetland mapping, and moisture stress assessment for agricultural and environmental monitoring.',
    features: ['NDWI', 'MNDWI', 'NDMI', 'NMDI', 'MSI', 'NDDI'],
    businessValue: 'Optimize irrigation management and reduce water waste by 30-50%'
  },
  {
    id: 'soil-agricultural-assessment',
    title: 'Soil & Agricultural Assessment',
    description: 'Soil property mapping, tillage monitoring, and agricultural land classification using advanced spectral indices.',
    features: ['BSI', 'NDTI', 'PSRI', 'CRI', 'CMR', 'CAI', 'IOR'],
    businessValue: 'Reduce fertilizer costs by 20-35% through precision soil mapping'
  },
  {
    id: 'urban-builtup-mapping',
    title: 'Urban & Built-up Mapping',
    description: 'Urban expansion monitoring, built-up area extraction, and infrastructure development tracking for city planning.',
    features: ['NDBI', 'IBI', 'BAEI', 'EBBI'],
    businessValue: 'Enable accurate urban planning and infrastructure development tracking'
  },
  {
    id: 'hazard-fire-assessment',
    title: 'Hazard & Fire Assessment',
    description: 'Fire severity mapping, burned area assessment, and post-fire recovery monitoring for disaster management.',
    features: ['NBR', 'dNBR', 'BAI', 'NDDI'],
    businessValue: 'Improve disaster response and recovery planning efficiency by 40-60%'
  },
  {
    id: 'nutrient-fertility-analysis',
    title: 'Nutrient & Fertility Analysis',
    description: 'Advanced nutrient deficiency detection, chlorophyll estimation, and soil fertility assessment using red-edge bands.',
    features: ['CIred-edge', 'TGI', 'SI', 'NDSI', 'CAI', 'MSR'],
    businessValue: 'Increase crop yields by 15-30% through precision nutrient management'
  }
];

const GISRemoteSensingSection = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    navigate(`/gis-service/${serviceId}`);
  };

  return (
    <section data-section="gis-remote-sensing" className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">GIS & Remote Sensing Solutions</h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Advanced satellite imagery analysis using cutting-edge spectral indices for precision agriculture, 
            environmental monitoring, and urban planning applications.
          </p>
        </div>
        
        <div className="grid grid-cols-6 gap-4">
          {gisServices.map(service => (
            <div key={service.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{service.description}</p>
                
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-xs">Key Indices:</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded mb-3">
                  <p className="text-xs text-green-800 dark:text-green-200">
                    <span className="font-semibold">Business Impact:</span> {service.businessValue}
                  </p>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => handleServiceClick(service.id)}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-xs font-medium transition-colors"
                  >
                    Explore Indices
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GISRemoteSensingSection;
