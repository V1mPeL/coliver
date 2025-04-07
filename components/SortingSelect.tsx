'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSortAmountDownAlt } from 'react-icons/fa';

interface SortOption {
  value: string;
  label: string;
}

const SortingSelect: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSort = searchParams.get('sorting') || 'date-newest'; // Default to 'date-newest'
  const [sortValue, setSortValue] = useState<string>(initialSort);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const options: SortOption[] = [
    { value: 'price-asc', label: 'By lowest price' },
    { value: 'price-desc', label: 'By highest price' },
    { value: 'date-newest', label: 'Newest first' },
    { value: 'date-oldest', label: 'Oldest first' },
  ];

  const updateSortParam = (value: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'date-newest') {
      params.delete('sorting'); // Remove sorting param for default option
    } else {
      params.set('sorting', value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleOptionClick = (value: string): void => {
    setSortValue(value);
    updateSortParam(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const currentSort = searchParams.get('sorting') || 'date-newest';
    setSortValue(currentSort);
  }, [searchParams]);

  const currentLabel =
    options.find((option) => option.value === sortValue)?.label || 'Sort by';

  return (
    <div className='relative' ref={dropdownRef}>
      <div
        className='transition-all duration-300 bodyB w-full h-10 px-4 flex items-center justify-between rounded-lg cursor-pointer border border-neutrals-80 bg-neutrals-90 hover:bg-primary-main hover:text-neutrals-white'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='hidden sm:block mr-2'>{currentLabel}</span>
        <FaSortAmountDownAlt />
      </div>

      {isOpen && (
        <div className='absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 overflow-hidden p-3 flex flex-col gap-1'>
          {options.map((option) => (
            <div
              key={option.value}
              className={`bodyB px-4 py-2 cursor-pointer hover:bg-primary-main rounded-lg hover:text-neutrals-white transition-colors ${
                sortValue === option.value
                  ? 'bg-primary-main text-neutrals-white'
                  : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortingSelect;
