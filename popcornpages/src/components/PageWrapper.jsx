// Importing React for component creation
import React from 'react';

// PageWrapper component to provide consistent layout styling
const PageWrapper = ({ children, fullWidth = false, center = false }) => {
  // Determine layout classes based on 'center' prop
  const layoutClasses = center
    ? 'flex items-center justify-center min-h-screen' // Center content vertically and horizontally
    : '';

  return (
    // Outer container with background, text color, padding, and optional centering
    <div className={`bg-[#0F0F2C] text-white px-4 py-8 ${layoutClasses}`}>
      {/* Inner container with dynamic width based on 'fullWidth' prop */}
      <div className={fullWidth ? 'w-full' : 'max-w-7xl mx-auto'}>
        {/* Render child components passed into PageWrapper */}
        {children}
      </div>
    </div>
  );
};

// Exporting the PageWrapper component
export default PageWrapper;
