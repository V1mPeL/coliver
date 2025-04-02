'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineSearch } from 'react-icons/ai';

const MainPageSearch: React.FC = () => {
  const router = useRouter();
  const [searchCity, setSearchCity] = useState<string>('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (searchCity.trim()) {
      router.push(`/browse?query=${encodeURIComponent(searchCity.trim())}`);
    }
  };

  return (
    <div className='p-4 flex items-center mt-8 h-[55px] w-[300px] sm:w-[480px] md:w-[680px] lg:w-[880px] bg-white rounded-[30px]'>
      <form
        onSubmit={handleSubmit}
        className='w-full flex items-center justify-between'
      >
        <input
          type='text'
          value={searchCity}
          onChange={handleInputChange}
          placeholder='Search location...'
          className='w-[90%] px-8 text-xl font-semibold border-none focus:outline-none'
        />
        <button
          type='submit'
          className='transition-all duration-300 hover:bg-primary-60 bg-primary-main h-[45px] w-[45px] rounded-full flex items-center justify-center'
        >
          <AiOutlineSearch className='text-neutrals-white' />
        </button>
      </form>
    </div>
  );
};

export default MainPageSearch;
