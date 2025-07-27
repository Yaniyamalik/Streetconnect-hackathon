import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WharehouseListLoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/list-warehouse'); // 🔁 Redirect to listing page
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 font-semibold rounded-l-lg ${
              !isSignUp ? 'bg-[#e8630a] text-white' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-2 font-semibold rounded-r-lg ${
              isSignUp ? 'bg-[#e8630a] text-white' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
          />
          <button
            type="submit"
            className="w-full bg-[#e8630a] hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
          >
            {isSignUp ? 'Create Account' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WharehouseListLoginPage;
