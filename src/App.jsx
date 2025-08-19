import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Benefits from './components/Benefits';
import ServiceDetail from './components/ServiceDetail';
import TechnologySection from './components/TechnologySection';
import LiveDemoWidget from './components/LiveDemoWidget';
import ApiDocsPreview from './components/ApiDocsPreview';
import AboutSection from './components/AboutSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PestDiseaseService from './components/services/PestDiseaseService';
import GISRemoteSensingSection from './components/GISRemoteSensingSection';
import GISServiceDetail from './components/GISServiceDetail';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Landing Page Component
const LandingPage = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <Benefits />
      <ServiceDetail />
      <GISRemoteSensingSection />
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <TechnologySection />
            <AboutSection />
          </div>
        </div>
      </div>
      <ApiDocsPreview />
      <Contact />
    </main>
    <Footer />
    <ChatWidget />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pest-disease-service" 
              element={
                <ProtectedRoute>
                  <PestDiseaseService />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/gis-service/:serviceId" 
              element={
                <ProtectedRoute>
                  <GISServiceDetail />
                </ProtectedRoute>
              } 
            />
            
            {/* API Documentation Route */}
            <Route path="/api-docs" element={<ApiDocsPreview />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 