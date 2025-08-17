// Importing React and useState for managing form inputs
import React, { useState } from 'react';
// Custom hook to access authentication logic
import { useAuthStore } from '../store/useAuthStore';
// Toast notifications for user feedback
import { toast } from 'react-hot-toast';
// Navigation hook from React Router
import { useNavigate } from 'react-router-dom'; // Added for navigation

// Login form component
const LoginForm = () => {
  // Access login function from auth store
  const { login } = useAuthStore();

  // Local state for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Initialize navigation for redirecting after login
  const navigate = useNavigate(); // Initialize navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    try {
      // Attempt login with provided credentials
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/'); // Redirect to homepage
    } catch (err) {
      // Show error message if login fails
      toast.error(err.message);
    }
  };

  return (
    // Full-screen container with centered content and dark background
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
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Login</h2>

          {/* Login form */}
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-white text-[#2C2C5C] font-semibold py-2 rounded hover:bg-yellow-400 transition"
            >
              Log In
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
  );
};

// Exporting the LoginForm component
export default LoginForm;
