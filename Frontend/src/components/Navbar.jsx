import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () => logout();

  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-[#e8630a]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
          </svg>
          <Link to="/" className="ml-2 text-xl font-bold text-gray-800">StreetConnect</Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-[#e8630a] transition">Home</Link>
          <Link to="/marketplace" className="text-gray-600 hover:text-[#e8630a] transition">Marketplace</Link>
          <Link to="/warehouse-locator" className="text-gray-600 hover:text-[#e8630a] transition">Warehouse</Link>
          <Link to="/supplier-login" className="text-gray-600 hover:text-[#e8630a] transition">Suppliers</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-[#e8630a] transition">Dashboard</Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-red-500 transition">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-[#e8630a] transition">Login</Link>
          )}
        </div>

        {/* Hamburger icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-2">
          <Link to="/" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Home</Link>
          <Link to="/marketplace" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Marketplace</Link>
          <Link to="/warehouse-locator" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Warehouse</Link>
          <Link to="/supplier-login" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Suppliers</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 px-4 text-red-600 hover:bg-gray-100">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
