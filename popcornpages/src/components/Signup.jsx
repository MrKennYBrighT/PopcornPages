import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';
import PageWrapper from './PageWrapper';
import { useNavigate } from 'react-router-dom'; // ✅ Added for redirect

const Signup = () => {
  const { signup, loading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      toast.success(`Welcome aboard, ${name || 'friend'}!`);
      toast.success('Verification email sent! Please check your inbox.');
      navigate('/login'); // ✅ Redirect to login page
    } catch (err) {
      toast.error(err.message || 'Signup failed');
    }
  };

  return (
    <PageWrapper fullWidth center>
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
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-yellow-400 mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your name"
                />
              </div>
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
                  placeholder="Create a password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-semibold py-2 rounded transition ${
                  loading
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-white text-[#2C2C5C] hover:bg-yellow-400'
                }`}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
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
    </PageWrapper>
  );
};

export default Signup;
