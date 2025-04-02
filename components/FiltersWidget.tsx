'use client';
import React from 'react';
import SortingSelect from './SortingSelect';
import CurrencyPicker from './CurrencyPicker';
import SearchBar from './Searchbar';
import FilterButton from './FiltersButton';

const FiltersWidget = () => {
  return (
    <div className='h-[150px] flex flex-col justify-center '>
      <div className='w-full flex justify-between items-center gap-3'>
        <SortingSelect />
        <CurrencyPicker />
      </div>
      <div className='mt-5 w-full flex justify-between items-center gap-3'>
        <SearchBar />
        <FilterButton />
      </div>
    </div>
  );
};

export default FiltersWidget;
