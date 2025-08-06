import React from 'react';
import Navbar from './components/Navbar';

// This is the main app container. We will add all page sections here one by one.
function App() {
  return (
    // Full screen background with default font and white text
    <div className="bg-[#1C1C3C] min-h-screen text-white font-inter">
      
      {/* Show the Navbar at the top */}
      <Navbar />

      {/* Next section will be the Hero area */}
    </div>
  );
}

export default App;
