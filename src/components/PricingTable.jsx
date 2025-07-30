const PricingTable = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-2xl font-bold mb-8">Pricing & Scale-Up Path</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow">
          <thead>
            <tr>
              <th className="px-6 py-4 text-lg font-semibold border-b">Free Tier Capabilities</th>
              <th className="px-6 py-4 text-lg font-semibold border-b">Upgrade Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 border-b">1 GB storage, 500 MB DB</td>
              <td className="px-6 py-4 border-b">Pay-as-you-go Supabase, GPU inference hosting</td>
            </tr>
            <tr>
              <td className="px-6 py-4 border-b">Unlimited API calls (fair use)</td>
              <td className="px-6 py-4 border-b">Enterprise SLAs, custom limits</td>
            </tr>
            <tr>
              <td className="px-6 py-4">Community support</td>
              <td className="px-6 py-4">Priority support, onboarding</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <a href="#contact" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow transition">Contact Sales for Enterprise</a>
      </div>
    </div>
  </section>
);

export default PricingTable;