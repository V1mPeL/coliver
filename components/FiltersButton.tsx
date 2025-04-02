'use client';
import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

const FilterButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className='w-[150px] flex items-center justify-center gap-2 h-12 px-4 rounded-lg border border-neutrals-80 bg-neutrals-90 text-neutrals-black hover:bg-primary-main hover:text-neutrals-white transition-all duration-300'
      >
        <FaFilter className='w-4 h-4' />
        <span className='bodyB'>Filters</span>
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-semibold text-neutrals-black'>
                Apply Filters
              </h2>
              <button
                onClick={handleCloseModal}
                className='text-neutrals-60 hover:text-neutrals-black'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div className='mb-6'>
              <p className='text-neutrals-60'>Тут будуть фільтри...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterButton;
