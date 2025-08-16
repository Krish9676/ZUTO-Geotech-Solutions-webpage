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

  return (
    <section id="technology" className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Tools & Technologies</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built on modern, reliable technologies to ensure consistent performance and scalability
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {techStack.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium mb-3 text-gray-800 dark:text-gray-200">{category.category}</h3>
              <div className="space-y-2">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="text-xs">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection; 