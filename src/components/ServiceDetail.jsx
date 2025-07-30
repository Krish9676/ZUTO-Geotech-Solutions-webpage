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
  Supabase: <img src="https://avatars.githubusercontent.com/u/54469796?s=200&v=4" alt="Supabase" className="w-7 h-7 rounded" />,
  Llama: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Llama" className="w-7 h-7" />,
  Mapbox: <img src="https://seeklogo.com/images/M/mapbox-logo-09B5A0296E-seeklogo.com.png" alt="Mapbox" className="w-7 h-7" />,
  Hyperledger: <img src="https://avatars.githubusercontent.com/u/7657900?s=200&v=4" alt="Hyperledger" className="w-7 h-7 rounded" />,
};

const ServiceDetail = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-6xl mx-auto px-4 flex flex-col gap-16">
      {services.map((s, i) => (
        <div
          key={s.key}
          id={`service-${s.key}`}
          className={`flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-8 md:gap-16`}
        >
          <div className="md:w-1/2 w-full flex justify-center">
            <img src={s.img} alt={s.title} className="rounded-xl shadow-lg w-full max-w-xs md:max-w-sm" />
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl font-bold mb-4">{s.title}</h2>
            <ul className="mb-4 list-disc pl-5 space-y-1">
              {s.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <div className="flex gap-3 mb-4">
              {s.tech.map(t => (
                <span key={t} title={t}>{techIcons[t]}</span>
              ))}
            </div>
            <a href={s.code} className="text-green-700 underline mr-4">Code/API Reference</a>
            <a href="#live-demo" className="inline-block mt-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition">{s.cta}</a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ServiceDetail;