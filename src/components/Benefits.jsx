const benefits = [
  {
    title: 'Pest & Disease Identification',
    icon: (
      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    ),
    desc: 'AI-powered detection and identification of crop pests and diseases.'
  },
  {
    title: 'Anomaly & Risk Detection',
    icon: (
      <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
    ),
    desc: 'Real-time monitoring and early warning systems for agricultural risks.'
  },
  {
    title: 'Soil Fertility Mapping',
    icon: (
      <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/></svg>
    ),
    desc: 'Comprehensive soil analysis and fertility mapping for optimal crop planning.'
  },
  {
    title: 'Supply Chain Traceability',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    ),
    desc: 'End-to-end traceability from farm to consumer with blockchain technology.'
  },
  {
    title: 'Weather Monitoring',
    icon: (
      <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
    ),
    desc: 'Advanced weather forecasting and climate monitoring for agricultural planning.'
  },
];

const Benefits = () => (
  <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {benefits.map((b, i) => (
          <div key={b.title} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition">
            <div className="mb-4 animate-bounce">{b.icon}</div>
            <h3 className="text-lg font-bold mb-2">{b.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;