import React from 'react';

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen bg-white ">
      <div className="relative">
        <div className="w-25 h-25 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;