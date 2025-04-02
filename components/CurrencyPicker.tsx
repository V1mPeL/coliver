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
  const initialCurrency = searchParams.get('currency') || 'UAH';
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>(initialCurrency);

  const currencies: CurrencyOption[] = [
    { value: 'UAH', label: 'UAH' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
  ];

  const updateCurrencyParam = (value: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'UAH') {
      params.delete('currency');
    } else {
      params.set('currency', value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCurrencyChange = (value: string): void => {
    setSelectedCurrency(value);
    updateCurrencyParam(value);
  };

  useEffect(() => {
    const currentCurrency = searchParams.get('currency') || 'UAH';
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
              : 'bg-transparent hover:bg-primary-main'
          }`}
          onClick={() => handleCurrencyChange(currency.value)}
        >
          {currency.label}
        </button>
      ))}
    </div>
  );
};

export default CurrencyPicker;
