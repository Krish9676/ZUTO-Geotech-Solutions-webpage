const ApiDocsPreview = () => (
  <section id="api-docs" className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Developer-Friendly APIs</h2>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Connect our AI-powered agricultural solutions with your existing farm management systems
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">API Features</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">RESTful Design</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Standard HTTP methods for easy integration</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1">
                  <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Comprehensive Documentation</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Interactive API docs with code examples</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1">
                  <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Multiple SDKs</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Python, JavaScript, and mobile SDKs available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <img
              src="https://raw.githubusercontent.com/swagger-api/swagger-ui/master/docs/assets/logo_header.png"
              alt="API Documentation"
              className="w-full max-w-sm mx-auto rounded shadow-sm mb-4"
            />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive API Explorer</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Test endpoints directly in your browser</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ApiDocsPreview;