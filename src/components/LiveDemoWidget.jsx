import { useState } from 'react';

const LiveDemoWidget = () => {
  const [img, setImg] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImg(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setTimeout(() => {
      setResult('Heatmap overlay: Pest detected!');
    }, 1200);
  };

  return (
    <section id="live-demo" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Try Pest & Disease ID Demo</h2>
        <input type="file" accept="image/*" onChange={handleUpload} className="mb-4" />
        {img && (
          <div className="mb-4 flex flex-col items-center">
            <img src={img} alt="Upload preview" className="w-64 h-64 object-cover rounded shadow mb-2" />
            <button onClick={handleAnalyze} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition">Analyze</button>
          </div>
        )}
        {result && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded shadow">
            <span className="font-bold">{result}</span>
          </div>
        )}
        <div className="mt-8">
          <a href="#" className="text-green-700 underline">Sign up to get your API key</a>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoWidget;