import SignUpForm from '@/components/forms/SignUpForm';
import React from 'react';

const page = () => {
  return (
    <div
      className='inset-0 bg-cover bg-center z-0 w-full h-screen'
      style={{ backgroundImage: `url(/assets/auth-background.jpg)` }}
    >
      <div className='absolute inset-0 bg-black/30 z-10'></div>
      <div className='absolute z-20 text-white flex items-center justify-center w-full h-full'>
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
