import { useRef } from 'react';

const services = [
  {
    key: 'pest',
    label: 'Pest & Disease ID',
    illustration: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="24" rx="20" ry="12" fill="#34d399"/><ellipse cx="24" cy="24" rx="10" ry="6" fill="#fbbf24"/><rect x="20" y="18" width="8" height="12" fill="#fff" opacity=".5"/></svg>
    ),
  },
  {
    key: 'anomaly',
    label: 'Anomaly & Risk',
    illustration: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none"><rect x="8" y="20" width="32" height="8" fill="#f87171"/><rect x="22" y="8" width="4" height="32" fill="#2563eb"/><circle cx="24" cy="24" r="6" fill="#fff" opacity=".5"/></svg>
    ),
  },
  {
    key: 'soil',
    label: 'Soil Mapping',
    illustration: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none"><rect x="8" y="32" width="32" height="8" fill="#a3e635"/><rect x="8" y="24" width="32" height="8" fill="#fbbf24"/><rect x="8" y="16" width="32" height="8" fill="#f59e42"/></svg>
    ),
  },
  {
    key: 'trace',
    label: 'Traceability',
    illustration: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none"><rect x="12" y="12" width="24" height="24" rx="4" fill="#fbbf24"/><rect x="20" y="20" width="8" height="8" fill="#fff"/><rect x="16" y="16" width="4" height="4" fill="#fff"/><rect x="28" y="16" width="4" height="4" fill="#fff"/><rect x="16" y="28" width="4" height="4" fill="#fff"/><rect x="28" y="28" width="4" height="4" fill="#fff"/></svg>
    ),
  },
  {
    key: 'weather',
    label: 'Weather & GIS',
    illustration: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="32" rx="16" ry="8" fill="#60a5fa"/><ellipse cx="24" cy="24" rx="10" ry="4" fill="#fbbf24"/><ellipse cx="24" cy="16" rx="6" ry="2" fill="#fff"/></svg>
    ),
  },
];

const ServicesTabs = () => {
  const handleScroll = key => {
    const el = document.getElementById(`service-${key}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {services.map(s => (
            <button
              key={s.key}
              onClick={() => handleScroll(s.key)}
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