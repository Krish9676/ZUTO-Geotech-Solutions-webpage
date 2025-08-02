const TechnologySection = () => {
  const techStack = [
    {
      category: "Backend & APIs",
      technologies: [
        { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", color: "bg-green-500" },
        { name: "Supabase", logo: "https://avatars.githubusercontent.com/u/54469796?s=200&v=4", color: "bg-blue-500" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "bg-blue-600" }
      ]
    },
    {
      category: "AI & ML",
      technologies: [
        { name: "HuggingFace", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", color: "bg-yellow-500" },
        { name: "Ollama", logo: "https://ollama.ai/favicon-32x32.png", color: "bg-purple-500" },
        { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", color: "bg-orange-500" }
      ]
    },
    {
      category: "Frontend & UI",
      technologies: [
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "bg-blue-400" },
        { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", color: "bg-cyan-500" },
        { name: "Vite", logo: "https://vitejs.dev/logo.svg", color: "bg-purple-600" }
      ]
    },
    {
      category: "Data & Maps",
      technologies: [
        { name: "Mapbox", logo: "https://seeklogo.com/images/M/mapbox-logo-09B5A0296E-seeklogo.com.png", color: "bg-blue-500" },
        { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "bg-blue-700" },
        { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", color: "bg-red-500" }
      ]
    }
  ];

  return (
    <section id="technology" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Built on modern, scalable technologies for enterprise-grade performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">{category.category}</h3>
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <img src={tech.logo} alt={tech.name} className="w-8 h-8 rounded" />
                    <span className="font-medium text-sm">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Architecture Highlights</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Microservices</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Modular, scalable architecture</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">API-First</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">RESTful APIs for easy integration</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Secure</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Enterprise-grade security</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection; 