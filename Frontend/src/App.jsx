// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import MarketplacePage from './pages/MarketplacePage';
// import ContactPage from './pages/ContactPage';
 import './styles/tailwind.css';
 import { CartProvider } from './context/Cartcontext';
import MarketplacePage from './pages/MarketplacePage';
import WarehouseLocatorPage from './pages/WarehouseLocatorPage';
import CapsuleBookingPage from './pages/CapsuleBookingPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguaueContext';
import Dashboard from './components/dashboard/dashboard';
import SLogin from './components/Auth/SLogin';
import WarehouseListingPage from './pages/WarehouseListingPage';
import WharehouseListLoginPage from './pages/wharehouseListLoginPage'; 
import SDashboard from './components/dashboard/Sdashboard';
import SSignup from './components/Auth/SSignup';
 
// Import other pages as needed

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/warehouse-locator" element={<WarehouseLocatorPage />} />
                  <Route path="/capsule-booking/:warehouseId" element={<CapsuleBookingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/supplier-login" element={<SLogin />} />
                  <Route path="/supplier-dashboard" element={<SDashboard />} />
                  <Route path="/register" element={<SSignup />} />
                      <Route path="/list-warehouse" element={<WarehouseListingPage />} />
              <Route path="/WharehouseListLoginPage" element={<WharehouseListLoginPage />} /> {/* ✅ New route */}
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}


export default App;
