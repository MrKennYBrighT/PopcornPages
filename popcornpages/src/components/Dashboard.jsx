import React from 'react';
import useUserStore from '../store/userStore';

const Dashboard = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">Welcome to your Dashboard 🎉</h1>
      {user ? (
        <p className="text-lg">Hello, {user.name}! Your email is {user.email}.</p>
      ) : (
        <p className="text-lg text-red-400">You are not logged in.</p>
      )}
    </div>
  );
};

export default Dashboard;
