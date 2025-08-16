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
  },
  {
    key: 'anomaly',
    title: 'Crop Health Monitoring',
    img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
    description: 'Continuous monitoring and early warning system for crop health issues',
    features: [
      'Real-time crop health monitoring',
      'Early warning alerts for potential issues',
      'Weather impact assessment',
      'Growth stage tracking and optimization',
      'Automated reporting and insights'
    ],
    businessValue: 'Optimize crop management and increase yields by 20-40%',
    cta: 'Learn More',
    demoLink: '#'
  },
  {
    key: 'soil',
    title: 'Soil Analysis & Mapping',
    img: 'https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&w=600&q=80',
    description: 'Comprehensive soil health assessment and precision mapping solutions',
    features: [
      'Soil composition and nutrient analysis',
      'Precision mapping for variable rate application',
      'Fertilizer optimization recommendations',
      'Soil health trend monitoring',
      'Export to farm management software'
    ],
    businessValue: 'Reduce fertilizer costs by 25% and improve soil health long-term',
    cta: 'Learn More',
    demoLink: '#'
  },
  {
    key: 'trace',
    title: 'Supply Chain Traceability',
    img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80',
    description: 'End-to-end traceability from farm to consumer with blockchain verification',
    features: [
      'QR code tracking for every product batch',
      'Blockchain-verified authenticity',
      'Quality certification and compliance',
      'Consumer transparency and trust',
      'Export documentation automation'
    ],
    businessValue: 'Access premium markets with 15-25% higher pricing',
    cta: 'Learn More',
    demoLink: '#'
  },
  {
    key: 'weather',
    title: 'Weather Risk Management',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    description: 'Advanced weather forecasting and risk assessment for agricultural planning',
    features: [
      'Hyperlocal weather forecasting',
      'Risk assessment and mitigation planning',
      'Crop-specific weather alerts',
      'Insurance and financial planning support',
      'Historical weather pattern analysis'
    ],
    businessValue: 'Minimize weather-related losses and optimize planting schedules',
    cta: 'Learn More',
    demoLink: '#'
  },
];

const ServiceDetail = () => (
  <section id="solutions" className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Agricultural Solutions</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive AI-powered tools designed to solve real farming challenges and drive business growth
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => (
          <div key={service.key} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img src={service.img} alt={service.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{service.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-4">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <span className="font-semibold">Business Impact:</span> {service.businessValue}
                </p>
              </div>

              <div className="text-center">
                <a 
                  href={service.demoLink} 
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {service.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceDetail;