import React from 'react';

const Spinner = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'>
      <div className='w-16 h-16 border-4 border-t-primary-main border-opacity-50 rounded-full animate-spin'></div>
    </div>
  );
};

export default Spinner;
