const testimonials = [
  {
    quote: 'ToviAgriTech helped us identify crop issues before they spread. The free tier is a game changer!',
    name: 'Ravi Kumar',
    farm: 'GreenFields Farm',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Farmers.png',
  },
  {
    quote: 'The soil mapping and weather risk tools are incredibly easy to use and accurate.',
    name: 'Priya Singh',
    farm: 'Sunrise Orchards',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Logo-farm.png',
  },
];

const Testimonials = () => (
  <section className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-2xl font-bold mb-8">Customer Success & Testimonials</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
            <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover" />
            <blockquote className="italic mb-4">“{t.quote}”</blockquote>
            <div className="flex items-center gap-2">
              <img src={t.logo} alt="Partner logo" className="w-8 h-8" />
              <span className="font-semibold">{t.name}</span>
              <span className="text-gray-500 dark:text-gray-400">({t.farm})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;