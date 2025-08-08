import React from 'react';

const LoginForm = () => {
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
          <form>
            <div className="mb-4">
              <label className="block text-yellow-400 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-yellow-400 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your password"
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
