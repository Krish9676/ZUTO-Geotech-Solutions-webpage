const benefits = [
  {
    title: 'Cost-Free First',
    icon: (
      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
    ),
    desc: 'No upfront costs. Start building and scaling with zero financial risk.'
  },
  {
    title: 'Modular & API-First',
    icon: (
      <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ),
    desc: 'Pick and choose microservices. Integrate via robust APIs.'
  },
  {
    title: 'Future-Proof & Scalable',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/></svg>
    ),
    desc: 'Built on open standards. Ready for tomorrow’s challenges.'
  },
];

const Benefits = () => (
  <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((b, i) => (
          <div key={b.title} className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 flex flex-col items-center text-center hover:shadow-lg transition">
            <div className="mb-4 animate-bounce">{b.icon}</div>
            <h3 className="text-xl font-bold mb-2">{b.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;