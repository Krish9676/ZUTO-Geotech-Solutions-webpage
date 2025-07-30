import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Benefits from './components/Benefits'
import ServiceDetail from './components/ServiceDetail'
import LiveDemoWidget from './components/LiveDemoWidget'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import ApiDocsPreview from './components/ApiDocsPreview'
import PricingTable from './components/PricingTable'
import Testimonials from './components/Testimonials'
import TechGrid from './components/TechGrid'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main>
        <HeroSection />
        <Benefits />
        <ServiceDetail />
        <LiveDemoWidget />
        <ArchitectureDiagram />
        <ApiDocsPreview />
        <PricingTable />
        <Testimonials />
        <TechGrid />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App 