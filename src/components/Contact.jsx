const Contact = () => (
  <section id="contact" className="py-12 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Get Started Today</h2>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
          Ready to transform your agricultural operations? Let's discuss how our solutions can drive your business growth.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Leadership */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Leadership</h3>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" 
                alt="Gopi Krishna N" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Gopi Krishna N</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">Founder & CEO</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <a href="mailto:gopik8023@gmail.com" className="text-green-600 hover:text-green-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/gopi-krishna-n-960117174/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Email</p>
                <a
                  href="mailto:gopik8023@gmail.com"
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  gopik8023@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/gopi-krishna-n-960117174/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Gopi Krishna N
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Response Time</p>
                <p className="text-gray-900 dark:text-white font-medium text-sm">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Inquiries */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Business Inquiries</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1">
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Free Consultation</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Schedule a personalized demo</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1">
                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Partnership Opportunities</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Explore collaboration possibilities</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 dark:bg-purple-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Custom Solutions</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Tailored implementations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Ready to Get Started?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            Join hundreds of farmers who are already transforming their operations with our AI-powered solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
            >
              Start Free Trial
            </a>
            <a
              href="mailto:gopik8023@gmail.com?subject=Business%20Inquiry%20-%20ZUTO%20GeoTech%20Solutions"
              className="bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact; 