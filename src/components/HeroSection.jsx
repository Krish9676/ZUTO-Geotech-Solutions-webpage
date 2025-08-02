import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 to-orange-700/60" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-lg">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              AI-Powered AgriTech Solutions
            </span>
            <br />
            <span className="text-white">
              for the Next Generation of Farming
            </span>
          </h1>
        </div>
        
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-lg md:text-2xl lg:text-3xl mb-8 font-medium drop-shadow">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Modular, cost-free platform with five microservices for pest detection, soil mapping, and traceability
            </span>
          </p>
        </div>

        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#live-demo" 
              className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center justify-center">
                Request Demo
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a 
              href="#api-docs" 
              className="group bg-white/90 hover:bg-white text-green-800 px-8 py-4 rounded-lg font-semibold shadow-lg border border-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center justify-center">
                Try Free API
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-orange-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
      </div>
    </section>
  );
};

export default HeroSection;