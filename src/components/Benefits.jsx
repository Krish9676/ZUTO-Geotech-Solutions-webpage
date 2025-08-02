const benefits = [
  {
    title: 'Cost-Free Innovation',
    icon: (
      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    desc: 'Zero upfront costs with pay-as-you-grow pricing model.'
  },
  {
    title: 'Modular & API-First',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    desc: 'Use only what you need with easy API integration.'
  },
  {
    title: 'Future-Proof & Scalable',
    icon: (
      <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    desc: 'Cloud-native architecture that grows with your farm.'
  },
  {
    title: '92% Model Accuracy',
    icon: (
      <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    desc: 'Industry-leading AI models for reliable predictions.'
  },
  {
    title: '24/7 Support',
    icon: (
      <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
      </svg>
    ),
    desc: 'Round-the-clock assistance for your farming needs.'
  },
];

const Benefits = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose ToviAgriTech?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Built for modern farmers who demand reliability, scalability, and innovation
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