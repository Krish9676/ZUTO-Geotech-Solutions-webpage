const techs = [
  { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'Supabase', logo: 'https://avatars.githubusercontent.com/u/54469796?s=200&v=4' },
  { name: 'HuggingFace', logo: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
  { name: 'Mapbox', logo: 'https://seeklogo.com/images/M/mapbox-logo-09B5A0296E-seeklogo.com.png' },
  { name: 'Hyperledger', logo: 'https://avatars.githubusercontent.com/u/7657900?s=200&v=4' },
  { name: 'GitHub Actions', logo: 'https://avatars.githubusercontent.com/u/44036562?s=200&v=4' },
];

const TechGrid = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-2xl font-bold mb-8">Technology & Open-Source Cred</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-center mb-8">
        {techs.map(t => (
          <div key={t.name} className="flex flex-col items-center">
            <img src={t.logo} alt={t.name} className="w-12 h-12 mb-2" />
            <span className="text-xs font-semibold">{t.name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-green-700 underline font-semibold">View on GitHub</a>
        <span className="text-gray-600 dark:text-gray-300">★ 1.2k stars</span>
        <span className="text-gray-600 dark:text-gray-300">Last commit: 2 days ago</span>
      </div>
    </div>
  </section>
);

export default TechGrid;