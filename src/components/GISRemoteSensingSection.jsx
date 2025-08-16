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
    <section data-section="gis-remote-sensing" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">GIS & Remote Sensing Solutions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Advanced satellite imagery analysis using cutting-edge spectral indices for precision agriculture, 
            environmental monitoring, and urban planning applications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gisServices.map(service => (
            <div key={service.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Key Indices:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-4">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <span className="font-semibold">Business Impact:</span> {service.businessValue}
                  </p>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => handleServiceClick(service.id)}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
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
