import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Added for navigation

const LoginForm = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/'); // Redirect to homepage
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F2C]">
      <div className="flex w-full max-w-6xl items-center justify-between">
        {/* Left Image */}
        <div className="hidden md:block w-1/4">
          <img
            src="/popcorn.jpeg"
            alt="Popcorn left"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Form Box */}
        <div className="bg-[#2C2C5C] p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-yellow-400 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-yellow-400 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-[#2C2C5C] font-semibold py-2 rounded hover:bg-yellow-400 transition"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div className="hidden md:block w-1/4">
          <img
            src="/popcorn.jpeg"
            alt="Popcorn right"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
