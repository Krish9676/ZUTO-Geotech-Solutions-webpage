import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Benefits from './components/Benefits'
import ProblemsSolved from './components/ProblemsSolved'
import ServiceDetail from './components/ServiceDetail'
import TechnologySection from './components/TechnologySection'
import LiveDemoWidget from './components/LiveDemoWidget'
import ApiDocsPreview from './components/ApiDocsPreview'
import PricingTable from './components/PricingTable'
import Testimonials from './components/Testimonials'
import AboutSection from './components/AboutSection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main>
        <HeroSection />
        <Benefits />
        <ProblemsSolved />
        <ServiceDetail />
        <TechnologySection />
        <LiveDemoWidget />
        <ApiDocsPreview />
        <PricingTable />
        <Testimonials />
        <AboutSection />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App 