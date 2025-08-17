// Importing React and useState for managing form inputs
import React, { useState } from 'react';
// Custom hook to access signup logic and loading state
import { useAuthStore } from '../store/useAuthStore';
// Toast notifications for user feedback
import { toast } from 'react-hot-toast';
// Layout wrapper for consistent styling
import PageWrapper from './PageWrapper';
// Navigation hook from React Router
import { useNavigate } from 'react-router-dom'; // ✅ Added for redirect

// Signup form component
const Signup = () => {
  // Access signup function and loading state from auth store
  const { signup, loading } = useAuthStore();

  // Local state for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Initialize navigation for redirecting after signup
  const navigate = useNavigate(); // ✅ Initialize navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    try {
      // Attempt signup with provided credentials
      await signup(email, password, name);
      toast.success(`Welcome aboard, ${name || 'friend'}!`);
      toast.success('Verification email sent! Please check your inbox.');
      navigate('/login'); // ✅ Redirect to login page
    } catch (err) {
      // Show error message if signup fails
      toast.error(err.message || 'Signup failed');
    }
  };

  return (
    // Use PageWrapper for layout and centering
    <PageWrapper fullWidth center>
      {/* Full-screen container with dark background */}
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F2C]">
        {/* Responsive layout for form and images */}
        <div className="flex w-full max-w-6xl items-center justify-between">
          
          {/* Left Image (visible on medium screens and up) */}
          <div className="hidden md:block w-1/4">
            <img
              src="/popcorn.jpeg"
              alt="Popcorn left"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Form Box */}
          <div className="bg-[#2C2C5C] p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
            {/* Form heading */}
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Sign Up</h2>

            {/* Signup form */}
            <form onSubmit={handleSubmit}>
              {/* Name input field */}
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

              {/* Email input field */}
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

              {/* Password input field */}
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

              {/* Submit button with loading state */}
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

          {/* Right Image (visible on medium screens and up) */}
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

// Exporting the Signup component
export default Signup;
