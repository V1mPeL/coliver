'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const SearchBar: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState<string>(initialQuery);

  const updateSearchParam = useCallback(
    (value: string): void => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim() === '') {
        params.delete('query');
      } else {
        params.set('query', value);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const debouncedUpdateSearchParam = useCallback(
    debounce(updateSearchParam, 2000),
    [updateSearchParam]
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.target.value;
    setQuery(newValue);
    debouncedUpdateSearchParam(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    debouncedUpdateSearchParam(query);
  };

  useEffect(() => {
    const currentQuery = searchParams.get('query') || '';
    setQuery(currentQuery);
  }, [searchParams]);

  return (
    <form
      onSubmit={handleSubmit}
      className='relative w-full max-w-md flex-grow'
    >
      <div className='relative'>
        <input
          type='text'
          value={query}
          onChange={handleInputChange}
          placeholder='Пошук...'
          className='w-full h-12 pl-12 pr-4 rounded-lg border border-neutrals-80 bg-neutrals-90 text-neutrals-black placeholder-neutrals-60 focus:outline-none focus:ring-2 focus:ring-primary-main transition-all duration-300'
        />
        <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-neutrals-60'>
          <FaSearch className='w-5 h-5' />
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
