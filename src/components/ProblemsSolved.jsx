const ProblemsSolved = () => {
  const problems = [
    {
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      title: "Crop Disease Detection",
      stat: "10x Faster",
      description: "Detect crop diseases 10x faster with explainable AI",
      impact: "92% model accuracy"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Yield Optimization",
      stat: "3x Improvement",
      description: "Improve harvest yields with data-driven insights",
      impact: "$500/ha savings"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Supply Chain Traceability",
      stat: "100% Transparency",
      description: "Track produce from field to shelf with blockchain",
      impact: "Real-time QR codes"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: "Weather Risk Management",
      stat: "24/7 Monitoring",
      description: "Real-time weather alerts and risk scoring",
      impact: "GIS risk zone visualization"
    }
  ];

  return (
    <section id="problems" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Problems We Solve</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Modern farming faces complex challenges. Our AI-powered solutions address the most critical pain points.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
              <div className="text-2xl font-bold text-green-600 mb-2">{problem.stat}</div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{problem.description}</p>
              <div className="text-sm font-medium text-green-700 dark:text-green-400">
                {problem.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSolved; 