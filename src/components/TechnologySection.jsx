const TechnologySection = () => {
  const techStack = [
    {
      category: "AI & Machine Learning",
      technologies: [
        { name: "Computer Vision", description: "Advanced image recognition for crop analysis" },
        { name: "Predictive Analytics", description: "ML models for yield forecasting and risk assessment" },
        { name: "Natural Language Processing", description: "Intelligent report generation and insights" }
      ]
    },
    {
      category: "Data & Infrastructure",
      technologies: [
        { name: "Cloud Computing", description: "Scalable, secure infrastructure for global operations" },
        { name: "Real-time Processing", description: "Instant analysis and immediate alerts" },
        { name: "Data Security", description: "Enterprise-grade encryption and compliance" }
      ]
    },
    {
      category: "Integration & APIs",
      technologies: [
        { name: "RESTful APIs", description: "Easy integration with existing farm management systems" },
        { name: "Mobile Optimization", description: "Responsive design for field use" },
        { name: "Third-party Integration", description: "Connect with weather, market, and financial services" }
      ]
    }
  ];

  const integrationUseCases = [
    {
      title: "Farm Management Software",
      description: "Integrate pest detection into existing systems",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Mobile Applications",
      description: "Build custom mobile solutions for field workers",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Data Analytics",
      description: "Connect with BI tools for advanced insights",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const aiFeatures = [
    {
      title: "Instant Results",
      description: "Get analysis in seconds, not days",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "High Accuracy",
      description: "94%+ accuracy across 20+ crop types",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Cost Savings",
      description: "Reduce pesticide costs by 30%",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Tools & Technologies</h2>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Built on modern, reliable technologies to ensure consistent performance and scalability
        </p>
      </div>

      {/* AI-Powered Agricultural Solutions */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200 text-center">AI-Powered Agricultural Solutions</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-4">
          Experience cutting-edge technology that transforms farming operations
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {aiFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                {feature.icon}
              </div>
              <h4 className="text-xs font-medium text-gray-800 dark:text-gray-200 mb-1">{feature.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {techStack.map((category, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-600 rounded-lg p-3 shadow-sm">
            <h3 className="text-xs font-medium mb-2 text-gray-800 dark:text-gray-200">{category.category}</h3>
            <div className="space-y-1.5">
              {category.technologies.map((tech, techIndex) => (
                <div key={techIndex} className="text-xs">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5 text-xs">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Integration Use Cases */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
        <h3 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200 text-center">Integration Use Cases</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {integrationUseCases.map((useCase, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                {useCase.icon}
              </div>
              <h4 className="text-xs font-medium text-gray-800 dark:text-gray-200 mb-1">{useCase.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologySection; 