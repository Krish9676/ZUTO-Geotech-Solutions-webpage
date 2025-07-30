const Contact = () => (
  <section id="contact" className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-xl mx-auto px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <div className="mb-4">
        <p className="mb-2">
          <span className="font-semibold">Email:</span>{' '}
          <a
            href="mailto:gopik8023@gmail.com"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            gopik8023@gmail.com
          </a>
        </p>
        <p className="mb-2">
          <span className="font-semibold">LinkedIn:</span>{' '}
          <a
            href="https://www.linkedin.com/in/gopi-krishna-n-960117174/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Gopi Krishna N
          </a>
        </p>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        Ready to transform your agricultural operations? Get in touch for a personalized demo.
      </p>
    </div>
  </section>
)

export default Contact 