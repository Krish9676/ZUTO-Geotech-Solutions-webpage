const AboutSection = () => {
  const stats = [
    { number: "5", label: "Microservices" },
    { number: "92%", label: "Model Accuracy" },
    { number: "24/7", label: "Support" },
    { number: "100%", label: "Open Source" }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Cost-Free Innovation",
      description: "We believe advanced farming technology should be accessible to all farmers, regardless of scale."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Community-Driven",
      description: "Built by farmers, for farmers. Our solutions evolve based on real-world feedback and needs."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "AI-Powered Insights",
      description: "Leveraging cutting-edge AI to provide actionable insights that improve farming outcomes."
    }
  ];

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About Tovi Geotech Solutions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing agriculture through AI-powered, modular solutions that make advanced farming technology accessible to everyone. Our platform combines cutting-edge machine learning with practical farming needs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Team/Founder */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Meet the Founder</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" 
                  alt="Gopi Krishna N" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left max-w-md">
                <h4 className="text-xl font-semibold mb-2">Gopi Krishna N</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Data Scientist and AgriTech enthusiast with a passion for making advanced farming technology accessible to all. 
                  Specializing in AI/ML solutions for agriculture.
                </p>
                <div className="flex space-x-4">
                  <a href="mailto:gopik8023@gmail.com" className="text-green-600 hover:text-green-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/gopi-krishna-n-960117174/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 