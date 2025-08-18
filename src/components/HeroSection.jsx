import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden"
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
        <div className="absolute top-20 left-10 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-32 right-20 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Smart Farming Solutions
            </span>
            <br />
            <span className="text-white">
              That Drive Real Results
            </span>
          </h1>
        </div>
        
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-base md:text-xl lg:text-2xl mb-6 font-medium drop-shadow">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Increase crop yields by 20-40%, reduce costs by 30%, and access premium markets with our AI-powered agricultural platform
            </span>
          </p>
        </div>

        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <Link 
              to="/pest-disease-service" 
              className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm"
            >
              <span className="flex items-center justify-center">
                Try Free Demo
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <a 
              href="#contact" 
              className="group bg-white/90 hover:bg-white text-green-800 px-6 py-3 rounded-lg font-semibold shadow-lg border border-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm"
            >
              <span className="flex items-center justify-center">
                Get Started Today
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-orange-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
      </div>
    </section>
  );
};

export default HeroSection;