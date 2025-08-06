import React from 'react';

// This is the top navigation bar that shows the logo and menu links
const Navbar = () => {
  return (
    // Main navbar container with background color and spacing
    <nav className="bg-[#1C1C3C] text-white px-20 py-6 flex justify-between items-center">
      
      {/* Logo on the left side */}
      <h1 className="text-[#FFD966] font-bebas text-3xl">Popcorn Pages</h1>
      
      {/* Navigation links on the right side */}
      <div className="flex space-x-8 text-[16px] font-montserrat">
        <a href="#" className="hover:text-[#FF6B6B]">Browse Movies</a>
        <a href="#" className="hover:text-[#FF6B6B]">Start Popping</a>
        <a href="#" className="hover:text-[#FF6B6B]">Log In</a>
        <a href="#" className="hover:text-[#FF6B6B]">Sign Up</a>
      </div>
    </nav>
  );
};

export default Navbar;
