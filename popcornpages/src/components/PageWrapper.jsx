import React from 'react';

const PageWrapper = ({ children, fullWidth = false, center = false }) => {
  const layoutClasses = center
    ? 'flex items-center justify-center min-h-screen'
    : '';

  return (
    <div className={`bg-[#0F0F2C] text-white px-4 py-8 ${layoutClasses}`}>
      <div className={fullWidth ? 'w-full' : 'max-w-7xl mx-auto'}>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
