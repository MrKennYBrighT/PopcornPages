// Importing React to use JSX and component features
import React from 'react';
// Importing custom hook to access user data from global store
import useUserStore from '../store/userStore';

// Functional component for the user Dashboard
const Dashboard = () => {
  // Accessing the 'user' object from the global state using the custom hook
  const user = useUserStore((state) => state.user);

  return (
    // Main container with padding and white text
    <div className="p-10 text-white">
      {/* Dashboard heading with styling and celebratory emoji */}
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">Welcome to your Dashboard 🎉</h1>

      {/* Conditional rendering based on user login status */}
      {user ? (
        // If user is logged in, display their name and email
        <p className="text-lg">Hello, {user.name}! Your email is {user.email}.</p>
      ) : (
        // If no user is found, show a warning message
        <p className="text-lg text-red-400">You are not logged in.</p>
      )}
    </div>
  );
};

// Exporting the Dashboard component for use in other parts of the app
export default Dashboard;
