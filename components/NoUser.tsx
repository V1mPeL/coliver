import React from 'react';
import Button from '@/components/Button';
import Link from 'next/link';

const NoUser = () => {
  return (
    <div className='min-h-screen flex justify-center items-center pt-16 px-4'>
      <div className='flex flex-col items-center gap-4 max-w-md w-full text-center'>
        <h2 className='h3B text-primary-main text-lg sm:text-xl md:text-2xl'>
          Please login into your account to interact with this page!
        </h2>
        <Link href='/sign-in'>
          <Button className='bg-primary-main text-neutrals-white rounded-[33px] px-5 py-2 sh3B hover:bg-primary-60 transition-colors'>
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoUser;
