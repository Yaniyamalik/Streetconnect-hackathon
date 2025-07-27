import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WharehouseListLoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp
      ? 'https://streetconnect-hackathon.onrender.com/api/warehouseowners/signup'
      : 'https://streetconnect-hackathon.onrender.com/api/warehouseowners/login';

    const payload = isSignUp
      ? { fullname, email, password }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || 'Authentication failed');
        return;
      }

      // Optional: Save token/user info
      localStorage.setItem('warehouseToken', data?.token);
      localStorage.setItem('warehouseOwner', JSON.stringify(data?.user));

      // Navigate to listing page
      navigate('/list-warehouse');
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Try again later.');
    }
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
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
