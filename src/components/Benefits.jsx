const benefits = [
  {
    title: 'Increase Crop Yields',
    icon: (
      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v4m4-4v4m4-4v4M8 11v4m4-4v4m4-4v4" />
      </svg>
    ),
    desc: 'Early pest detection and disease prevention can increase yields by 20-40%.'
  },
  {
    title: 'Reduce Pesticide Costs',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    desc: 'Targeted treatment reduces chemical usage and saves up to 30% on input costs.'
  },
  {
    title: 'Prevent Crop Losses',
    icon: (
      <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    desc: 'Real-time monitoring prevents up to 80% of crop losses from pests and diseases.'
  },
  {
    title: 'Improve Market Access',
    icon: (
      <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    desc: 'Traceability and quality assurance open doors to premium markets and better pricing.'
  },
  {
    title: 'Optimize Resource Use',
    icon: (
      <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    desc: 'Data-driven insights help optimize water, fertilizer, and labor allocation.'
  },
];

const Benefits = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Transform Your Farming Business</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Our AI-powered solutions deliver measurable results that directly impact your bottom line
        </p>
      </div>
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