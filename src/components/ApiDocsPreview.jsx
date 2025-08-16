const ApiDocsPreview = () => (
  <section id="api-docs" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Seamless Integration for Your Business</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Connect our AI-powered agricultural solutions with your existing farm management systems
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Developer-Friendly APIs</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">RESTful Design</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Standard HTTP methods for easy integration</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Comprehensive Documentation</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Interactive API docs with code examples</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Multiple SDKs</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Python, JavaScript, and mobile SDKs available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <img
              src="https://raw.githubusercontent.com/swagger-api/swagger-ui/master/docs/assets/logo_header.png"
              alt="API Documentation"
              className="w-full max-w-sm mx-auto rounded shadow-sm mb-4"
            />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive API Explorer</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Test endpoints directly in your browser</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-sm text-green-800 dark:text-green-200">
              <span className="font-semibold">Business Benefit:</span> Reduce development time by 60% with our ready-to-use APIs
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Integration Use Cases</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Farm Management Software</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Integrate pest detection into existing systems</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Mobile Applications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Build custom mobile solutions for field workers</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Data Analytics</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connect with BI tools for advanced insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ApiDocsPreview;