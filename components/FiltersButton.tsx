'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const FilterButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    street: '',
    priceMin: '',
    priceMax: '',
    floorMin: '',
    floorMax: '',
    capacity: '',
    preferences: [] as string[],
    amenities: [] as string[],
    currency: '', // Default to empty string for "All currencies"
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Load filters from URL on initialization
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    setFilters({
      city: params.get('city') || '',
      street: params.get('street') || '',
      priceMin: params.get('priceMin') || '',
      priceMax: params.get('priceMax') || '',
      floorMin: params.get('floorMin') || '',
      floorMax: params.get('floorMax') || '',
      capacity: params.get('capacity') || '',
      preferences: params.get('preferences')?.split(',').filter(Boolean) || [],
      amenities: params.get('amenities')?.split(',').filter(Boolean) || [],
      currency: params.get('currency') || '', // Empty string means "All"
    });
  }, [searchParams]);

  // Handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      setFilters((prev) => {
        const currentValues = [
          ...(prev[name as keyof typeof prev] as string[]),
        ];

        if (checked) {
          return { ...prev, [name]: [...currentValues, value] };
        } else {
          return {
            ...prev,
            [name]: currentValues.filter((item) => item !== value),
          };
        }
      });
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      } else if (value && key !== 'currency') {
        params.set(key, value.toString());
      } else if (key === 'currency' && value) {
        params.set(key, value.toString()); // Only set currency if a specific value is selected
      }
    });

    router.push(`${pathname}?${params.toString()}`);
    setIsModalOpen(false);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      city: '',
      street: '',
      priceMin: '',
      priceMax: '',
      floorMin: '',
      floorMax: '',
      capacity: '',
      preferences: [],
      amenities: [],
      currency: '', // Reset to "All"
    });

    router.push(pathname);
    setIsModalOpen(false);
  };

  // Checkbox options
  const preferenceOptions = [
    '📸 Photography',
    '📚 Reading',
    '🎵 Music',
    '🎮 Gaming',
    '🎬 Movies',
    '💻 Technology',
    '💪 Fitness',
  ];

  const amenityOptions = [
    '📶 Wi-Fi',
    '❄️ Air Conditioning',
    '📺 TV',
    '🔥 Heating',
    '🧺 Dryer',
    '🚗 Parking',
    '🐾 Pet Friendly',
    '💻 Workspace',
    '🔒 Security System',
    '🛗 Elevator',
    '🌅 Balcony',
    '📡 Microwave',
    '🍳 Kitchen',
  ];

  // Currency options (including "All")
  const currencyOptions = [
    { value: '', label: 'All' },
    { value: 'UAH', label: 'UAH' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
  ];

  return (
    <>
      {/* Filter button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className='w-[150px] flex items-center justify-center gap-2 h-12 px-4 rounded-lg border border-neutrals-80 bg-neutrals-90 text-neutrals-black hover:bg-primary-main hover:text-neutrals-white transition-all duration-300'
      >
        <span className='bodyB'>Filters</span>
      </button>

      {/* Filter modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md h-[500px] overflow-y-auto'>
            {/* Modal header */}
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-semibold text-neutrals-black'>
                Apply Filters
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-neutrals-60 hover:text-neutrals-black'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
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

            {/* Filter form */}
            <div className='mb-6 space-y-4'>
              {/* City field */}
              <div>
                <label className='block text-neutrals-60 mb-1'>City</label>
                <input
                  type='text'
                  name='city'
                  value={filters.city}
                  onChange={handleFilterChange}
                  className='w-full p-2 border border-neutrals-80 rounded'
                  placeholder='e.g., Lviv'
                />
              </div>

              {/* Street field */}
              <div>
                <label className='block text-neutrals-60 mb-1'>Street</label>
                <input
                  type='text'
                  name='street'
                  value={filters.street}
                  onChange={handleFilterChange}
                  className='w-full p-2 border border-neutrals-80 rounded'
                  placeholder='e.g., Horodotska 14'
                />
              </div>

              {/* Price range with currency */}
              <div>
                <label className='block text-neutrals-60 mb-1'>
                  Price ({filters.currency || 'Any'})
                </label>
                <div className='flex gap-2'>
                  <input
                    type='number'
                    name='priceMin'
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    className='w-1/3 p-2 border border-neutrals-80 rounded'
                    placeholder='From'
                  />
                  <input
                    type='number'
                    name='priceMax'
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                    className='w-1/3 p-2 border border-neutrals-80 rounded'
                    placeholder='To'
                  />
                  <select
                    name='currency'
                    value={filters.currency}
                    onChange={handleFilterChange}
                    className='w-1/3 p-2 border border-neutrals-80 rounded'
                  >
                    {currencyOptions.map((curr) => (
                      <option key={curr.value} value={curr.value}>
                        {curr.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Floor range */}
              <div>
                <label className='block text-neutrals-60 mb-1'>Floor</label>
                <div className='flex gap-2'>
                  <input
                    type='number'
                    name='floorMin'
                    value={filters.floorMin}
                    onChange={handleFilterChange}
                    className='w-1/2 p-2 border border-neutrals-80 rounded'
                    placeholder='From'
                  />
                  <input
                    type='number'
                    name='floorMax'
                    value={filters.floorMax}
                    onChange={handleFilterChange}
                    className='w-1/2 p-2 border border-neutrals-80 rounded'
                    placeholder='To'
                  />
                </div>
              </div>

              {/* Capacity */}
              <div>
                <label className='block text-neutrals-60 mb-1'>
                  Number of People
                </label>
                <select
                  name='capacity'
                  value={filters.capacity}
                  onChange={handleFilterChange}
                  className='w-full p-2 border border-neutrals-80 rounded'
                >
                  <option value=''>Any</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3+</option>
                </select>
              </div>

              {/* Preferences */}
              <div>
                <label className='block text-neutrals-60 mb-1'>
                  Preferences
                </label>
                {preferenceOptions.map((pref) => (
                  <div key={pref} className='flex items-center mb-1'>
                    <input
                      type='checkbox'
                      name='preferences'
                      value={pref}
                      checked={filters.preferences.includes(pref)}
                      onChange={handleFilterChange}
                      className='mr-2'
                    />
                    <span>{pref}</span>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div>
                <label className='block text-neutrals-60 mb-1'>Amenities</label>
                {amenityOptions.map((amenity) => (
                  <div key={amenity} className='flex items-center mb-1'>
                    <input
                      type='checkbox'
                      name='amenities'
                      value={amenity}
                      checked={filters.amenities.includes(amenity)}
                      onChange={handleFilterChange}
                      className='mr-2'
                    />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex justify-between'>
              <button
                onClick={clearFilters}
                className='px-4 py-2 bg-neutrals-90 text-neutrals-black rounded hover:bg-neutrals-80'
              >
                Clear
              </button>
              <button
                onClick={applyFilters}
                className='px-4 py-2 bg-primary-main text-neutrals-white rounded hover:bg-primary-dark'
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterButton;
