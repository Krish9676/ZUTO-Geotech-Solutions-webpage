const HeroSection = () => (
  <section
    className="relative h-[90vh] flex items-center justify-center text-white"
    style={{
      backgroundImage:
        'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 to-orange-700/60" />
    <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
        AI-Powered AgriTech: Zero-Cost to Scale
      </h1>
      <p className="text-lg md:text-2xl mb-8 font-medium drop-shadow">
        Five modular microservices—Pest ID, Anomaly Detection, Soil Mapping, Traceability & Weather Risk—built on free, open-source tech.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <a href="#live-demo" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition">Get a Live Demo</a>
        <a href="#api-docs" className="bg-white/90 hover:bg-white text-green-800 px-8 py-3 rounded-lg font-semibold shadow-lg border border-green-600 transition">View Docs</a>
      </div>
    </div>
  </section>
);

export default HeroSection;