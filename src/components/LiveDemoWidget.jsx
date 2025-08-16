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
      setResult('Early detection: Leaf blight detected with 94% confidence. Immediate treatment recommended to prevent 30% yield loss.');
    }, 1200);
  };

  return (
    <section id="live-demo" className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">See the Power of AI in Action</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Experience how our pest detection technology can save your crops and increase your profits
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm inline-block">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-green-600">Business Impact:</span> Early detection can prevent up to 80% of crop losses
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Try Our Pest Detection Demo</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload a photo of your crop
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUpload} 
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
            />
          </div>

          {img && (
            <div className="mb-6 flex flex-col items-center">
              <img src={img} alt="Upload preview" className="w-64 h-64 object-cover rounded-lg shadow-md mb-4" />
              <button 
                onClick={handleAnalyze} 
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition-colors"
              >
                Analyze for Pests & Diseases
              </button>
            </div>
          )}

          {result && (
            <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold text-green-800 dark:text-green-200">Analysis Complete</span>
              </div>
              <p className="text-green-700 dark:text-green-300">{result}</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instant Results</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get analysis in seconds, not days</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">High Accuracy</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">94%+ accuracy across 20+ crop types</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cost Savings</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Reduce pesticide costs by 30%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to protect your crops and increase your profits?
          </p>
          <a 
            href="/register" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Your Free Trial
          </a>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoWidget;