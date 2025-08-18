const AboutSection = () => {
  const stats = [
    { number: "20+", label: "Crop Types Supported" },
    { number: "94%", label: "Detection Accuracy" },
    { number: "30%", label: "Cost Reduction" },
    { number: "40%", label: "Yield Increase" }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Proven Results",
      description: "Our solutions deliver measurable improvements in crop yields, cost reduction, and market access for farmers worldwide."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Farmer-Centric Design",
      description: "Built with real farmers in mind, our solutions address the actual challenges faced in modern agriculture."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Scalable Solutions",
      description: "From small family farms to large agricultural enterprises, our platform grows with your business needs."
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">About ZUTO GeoTech Solutions</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We're a forward-thinking AgriTech company dedicated to transforming agriculture through intelligent, data-driven solutions. Our mission is to help farmers increase productivity, reduce costs, and access premium markets through cutting-edge AI technology.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{stat.number}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {values.map((value, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              {value.icon}
            </div>
            <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">{value.description}</p>
          </div>
        ))}
      </div>

      {/* Company Story */}
      <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 mb-6 shadow-sm">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Our Story</h3>
          <div className="max-w-2xl mx-auto text-left space-y-2 text-xs text-gray-600 dark:text-gray-300">
            <p>
              Founded with a vision to democratize agricultural technology, ZUTO GeoTech Solutions emerged from the recognition that small and medium-scale farmers often lack access to the advanced tools that could significantly improve their operations and profitability.
            </p>
            <p>
              We've developed a comprehensive platform that combines artificial intelligence, computer vision, and data analytics to solve real agricultural challenges. Our solutions are designed to be accessible, affordable, and immediately impactful for farmers of all scales.
            </p>
          </div>
        </div>
      </div>

      {/* Team/Founder */}
      <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 shadow-sm">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Leadership</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" 
                alt="Gopi Krishna N" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left max-w-xs">
              <h4 className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">Gopi Krishna N</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1 font-medium">Founder & CEO</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                A passionate entrepreneur and data scientist with deep expertise in AI/ML applications for agriculture. 
                Committed to making advanced farming technology accessible and profitable for farmers worldwide.
              </p>
              <div className="flex space-x-3">
                <a href="mailto:gopik8023@gmail.com" className="text-green-600 hover:text-green-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/gopi-krishna-n-960117174/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection; 