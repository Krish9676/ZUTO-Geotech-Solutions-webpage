const ArchitectureDiagram = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-2xl font-bold mb-8">Zero-Cost, Modular, Cloud-Native Architecture</h2>
      <div className="flex justify-center">
        <svg width="420" height="120" viewBox="0 0 420 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
          <rect x="10" y="40" width="60" height="40" rx="8" fill="#34d399"/>
          <text x="40" y="65" textAnchor="middle" fill="#fff" fontSize="14">User</text>
          <rect x="90" y="40" width="80" height="40" rx="8" fill="#2563eb"/>
          <text x="130" y="65" textAnchor="middle" fill="#fff" fontSize="14">FastAPI</text>
          <rect x="190" y="20" width="80" height="40" rx="8" fill="#10b981"/>
          <text x="230" y="45" textAnchor="middle" fill="#fff" fontSize="14">Supabase</text>
          <rect x="190" y="70" width="80" height="40" rx="8" fill="#fbbf24"/>
          <text x="230" y="95" textAnchor="middle" fill="#fff" fontSize="14">Storage</text>
          <rect x="290" y="40" width="60" height="40" rx="8" fill="#a78bfa"/>
          <text x="320" y="65" textAnchor="middle" fill="#fff" fontSize="14">LLM</text>
          <rect x="370" y="40" width="40" height="40" rx="8" fill="#f87171"/>
          <text x="390" y="65" textAnchor="middle" fill="#fff" fontSize="14">UI</text>
          <polygon points="70,60 90,60 90,65 70,65" fill="#6b7280"/>
          <polygon points="170,60 190,40 190,80 170,60" fill="#6b7280"/>
          <polygon points="270,60 290,60 290,65 270,65" fill="#6b7280"/>
          <polygon points="350,60 370,60 370,65 350,65" fill="#6b7280"/>
        </svg>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Zero-Cost, Modular, Cloud-Native Architecture</p>
    </div>
  </section>
);

export default ArchitectureDiagram;