'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface CurrencyOption {
  value: string;
  label: string;
}

const CurrencyPicker: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCurrency = searchParams.get('currency') || ''; // Default to empty string
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>(initialCurrency);

  const currencies: CurrencyOption[] = [
    { value: 'UAH', label: 'UAH' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
  ];

  const updateCurrencyParam = (value: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('currency', value); // Always set the currency parameter
    } else {
      params.delete('currency'); // Remove the parameter to show all currencies
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCurrencyChange = (value: string): void => {
    setSelectedCurrency(value);
    updateCurrencyParam(value);
  };

  // Add a function to clear the currency selection
  const clearCurrencySelection = (): void => {
    setSelectedCurrency('');
    updateCurrencyParam('');
  };

  useEffect(() => {
    const currentCurrency = searchParams.get('currency') || '';
    setSelectedCurrency(currentCurrency);
  }, [searchParams]);

  return (
    <div className='inline-flex rounded-[16px] overflow-hidden bg-gray-100 p-1'>
      {currencies.map((currency) => (
        <button
          key={currency.value}
          className={`bodyB py-2 px-4 rounded-[12px] transition-all duration-200 ${
            selectedCurrency === currency.value
              ? 'bg-primary-main text-neutrals-white'
              : 'bg-transparent hover:bg-primary-main hover:text-neutrals-white'
          }`}
          onClick={() => handleCurrencyChange(currency.value)}
        >
          {currency.label}
        </button>
      ))}
      {/* Add a button to clear the currency selection */}
      <button
        className={`bodyB py-2 px-4 rounded-[12px] transition-all duration-200 ${
          selectedCurrency === ''
            ? 'bg-primary-main text-neutrals-white'
            : 'bg-transparent hover:bg-primary-main hover:text-neutrals-white'
        }`}
        onClick={clearCurrencySelection}
      >
        All
      </button>
    </div>
  );
};

export default CurrencyPicker;
