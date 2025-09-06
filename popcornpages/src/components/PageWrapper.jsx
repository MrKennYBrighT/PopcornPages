import React from 'react';

const PageWrapper = ({ children, fullWidth = false, center = false }) => {
  const layoutClasses = center
    ? 'flex items-center justify-center min-h-screen'
    : 'min-h-screen';

  return (
    <div className={`w-screen overflow-x-hidden bg-[#0F0F2C] text-white flex flex-col ${layoutClasses}`}>
      <main className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={fullWidth ? 'w-full' : ''}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageWrapper;
