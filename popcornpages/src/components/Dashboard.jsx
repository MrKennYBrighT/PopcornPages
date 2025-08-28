import React, { useState } from 'react';
import useUserStore from '../store/userStore';

// Functional component for the user Dashboard
const Dashboard = () => {
  const user = useUserStore((state) => state.user);

  // Mocked values for now — replace with real data when available
  const lastLogin = 'August 27, 2025 at 11:42 PM';
  const accountStatus = 'Active';
  const subscriptionPlan = 'Free Plan';

  // Local state for avatar preview
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);
    }
  };

  return (
    <div className="w-full p-10 text-white bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">Welcome to your Dashboard 🎉</h1>

      {user ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            {/* Avatar display */}
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="absolute top-0 left-0 w-16 h-16 opacity-0 cursor-pointer"
                title="Upload Avatar"
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">Last login: {lastLogin}</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-yellow-300 font-semibold mb-2">Account Status</h2>
              <p>{accountStatus}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-yellow-300 font-semibold mb-2">Subscription</h2>
              <p>{subscriptionPlan}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <a href="/account-settings" className="block text-blue-400 hover:underline">Account Settings</a>
            <a href="/watchlist" className="block text-blue-400 hover:underline">Watchlist</a>
            <a href="/change-password" className="block text-blue-400 hover:underline">Change Password</a>
            <a href="/update-email" className="block text-blue-400 hover:underline">Update Email</a>
            <a href="/delete-account" className="block text-red-400 hover:underline">Delete Account</a>
          </div>

          {/* Beta Features Toggle (visual only) */}
          <div className="mt-6">
            <label className="flex items-center space-x-2">
              <input type="checkbox" disabled className="form-checkbox h-5 w-5 text-yellow-400" />
              <span className="text-gray-300">Enable Beta Features (coming soon)</span>
            </label>
          </div>
        </div>
      ) : (
        <p className="text-lg text-red-400">You are not logged in.</p>
      )}
    </div>
  );
};

export default Dashboard;
