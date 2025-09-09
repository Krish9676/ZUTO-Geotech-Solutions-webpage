import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const services = [
  {
    key: 'pest',
    label: 'Pest & Disease Detection',
    illustration: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="24" rx="20" ry="12" fill="#34d399"/><ellipse cx="24" cy="24" rx="10" ry="6" fill="#fbbf24"/><rect x="20" y="18" width="8" height="12" fill="#fff" opacity=".5"/></svg>
    ),
  },
  {
    key: 'gis',
    label: 'GIS & Remote Sensing',
    illustration: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="4" fill="#8b5cf6"/><path d="M16 16h16v4H16zM16 24h16v4H16zM16 32h12v4H16z" fill="#fff"/></svg>
    ),
  },
];

const ServicesTabs = () => {
  const navigate = useNavigate();
  
  const handleServiceClick = (key) => {
    if (key === 'pest') {
      navigate('/pest-disease-service');
    } else if (key === 'gis') {
      // Scroll to solutions section
      const el = document.getElementById('solutions');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const el = document.getElementById(`service-${key}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {services.map(s => (
            <button
              key={s.key}
              onClick={() => handleServiceClick(s.key)}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900 transition group"
            >
              <span className="group-hover:scale-110 transition-transform">{s.illustration}</span>
              <span className="font-semibold text-sm md:text-base">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesTabs;

