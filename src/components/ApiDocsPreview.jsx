const ApiDocsPreview = () => (
  <section id="api-docs" className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-2xl font-bold mb-6">API Documentation Preview</h2>
      <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
        <img
          src="https://raw.githubusercontent.com/swagger-api/swagger-ui/master/docs/assets/logo_header.png"
          alt="Swagger UI Preview"
          className="w-full max-w-md rounded shadow border mb-4 md:mb-0"
        />
        <ul className="text-left space-y-3 text-lg">
          <li>Auto-generated OpenAPI docs</li>
          <li>Sandbox “Try it out” requests</li>
          <li>Comprehensive endpoint reference</li>
        </ul>
      </div>
    </div>
  </section>
);

export default ApiDocsPreview;