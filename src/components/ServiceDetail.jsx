const services = [
  {
    key: 'pest',
    title: 'Pest & Disease ID',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    features: [
      'Upload image → get heatmap + diagnosis',
      'AI-powered pest/disease detection',
      'Instant feedback, mobile-ready',
    ],
    tech: ['FastAPI', 'Supabase', 'Llama'],
    code: '#',
    cta: 'Try Pest ID API →',
  },
  {
    key: 'anomaly',
    title: 'Anomaly & Risk',
    img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
    features: [
      'Sensor data ingestion',
      'Real-time anomaly alerts',
      'Risk scoring dashboard',
    ],
    tech: ['FastAPI', 'Supabase'],
    code: '#',
    cta: 'View Anomaly Demo →',
  },
  {
    key: 'soil',
    title: 'Soil Mapping',
    img: 'https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&w=600&q=80',
    features: [
      'Upload GPS/soil data',
      'Visualize soil strata',
      'Export geoJSON maps',
    ],
    tech: ['Mapbox', 'Supabase'],
    code: '#',
    cta: 'View Soil Map Demo →',
  },
  {
    key: 'trace',
    title: 'Traceability',
    img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80',
    features: [
      'QR code for every crate',
      'Track produce from field to shelf',
      'Blockchain-backed records',
    ],
    tech: ['Hyperledger', 'Supabase'],
    code: '#',
    cta: 'Try Traceability API →',
  },
  {
    key: 'weather',
    title: 'Weather & GIS',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    features: [
      'Weather overlays on farm map',
      'GIS risk zone visualization',
      'API for weather risk scoring',
    ],
    tech: ['Mapbox', 'Supabase'],
    code: '#',
    cta: 'Try Weather API →',
  },
];

const techIcons = {
  FastAPI: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" alt="FastAPI" className="w-7 h-7" />,
  Supabase: <img src="https://avatars.githubusercontent.com/u/54469796?s=200&v=4" alt="Supabase" className="w-7 h-7" />,
  Llama: <img src="https://ollama.ai/favicon-32x32.png" alt="Llama" className="w-7 h-7" />,
  Mapbox: <img src="https://seeklogo.com/images/M/mapbox-logo-09B5A0296E-seeklogo.com.png" alt="Mapbox" className="w-7 h-7" />,
  Hyperledger: <img src="https://avatars.githubusercontent.com/u/7657900?s=200&v=4" alt="Hyperledger" className="w-7 h-7" />,
};

const ServiceDetail = () => (
  <section id="solutions" className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Solutions</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Five modular microservices designed to address every aspect of modern farming
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => (
          <div key={service.key} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img src={service.img} alt={service.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 mb-4">
                {service.tech.map(tech => (
                  <div key={tech} className="flex items-center gap-1">
                    {techIcons[tech]}
                    <span className="text-xs text-gray-500">{tech}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <a href={service.code} className="text-green-600 hover:text-green-700 text-sm font-medium">
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