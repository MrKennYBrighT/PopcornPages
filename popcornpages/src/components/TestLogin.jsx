import React from 'react';

const TestLogin = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Popcorn Image */}
      <div className="hidden md:block md:w-1/3">
        <img
          src="/popcorn.jpeg"
          alt="Popcorn"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Center Form */}
      <div className="w-full md:w-1/3 flex items-center justify-center bg-[#0F0F2C] px-6">
        <div className="w-full max-w-md bg-[#2C2C5C] p-8 rounded-lg shadow-lg text-white">
          <h2 className="text-yellow-400 text-2xl font-bold mb-6 text-center">
            Welcome Back TEST
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Right Popcorn Image */}
      <div className="hidden md:block md:w-1/3">
        <img
          src="/popcorn.jpeg"
          alt="Popcorn"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default TestLogin;
