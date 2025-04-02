'use client';

import React, { useState, useEffect } from 'react';
import BigMap from '@/components/BigMap';
import FiltersWidget from '@/components/FiltersWidget';
import ListingsList from '@/components/ListingsList';
import { ListingsContextProvider } from '@/contexts/ListingsContext';
import { fetchListings } from '@/lib/actions/listing.actions';
import Spinner from '@/components/Spinner';
import { Listing } from '@/types/listings';
import { MdOutlineMap } from 'react-icons/md';

const BrowsePage = () => {
  const [initialListings, setInitialListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    const loadListings = async () => {
      try {
        const { listings } = await fetchListings();
        setInitialListings(listings);
      } catch (error: any) {
        console.error('Error fetching listings:', error.message);
        setError(error.message);
        setInitialListings([]);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  if (loading) {
    return (
      <div className='w-full min-h-screen pt-16 flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full min-h-screen pt-16 flex justify-center items-center'>
        <p className='text-red-500'>Loading error: {error}</p>
      </div>
    );
  }

  return (
    <ListingsContextProvider initialListings={initialListings}>
      <div className='w-full min-h-screen pt-16 flex flex-col'>
        <div className='bg-white w-full mx-auto px-4 sm:px-6 md:px-10'>
          <div className='w-full flex flex-col md:flex-row gap-4'>
            <div className='w-full md:w-1/2 py-5'>
              <FiltersWidget />
              <ListingsList listings={initialListings} />
            </div>
            <div className='hidden md:block md:w-1/2'>
              <BigMap />
            </div>
          </div>
        </div>

        {/* Mobile map toggle button and map container */}
        <div className='md:hidden px-4 sm:px-6 pb-4'>
          <button
            onClick={() => setIsMapVisible(!isMapVisible)}
            className='flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary-main text-neutrals-white rounded-md hover:bg-blue-600 transition-colors'
          >
            {isMapVisible ? 'Hide Map' : 'Show Map'}
            <MdOutlineMap />
          </button>
          {isMapVisible && (
            <div className='mt-4 h-[400px] w-full'>
              <BigMap />
            </div>
          )}
        </div>
      </div>
    </ListingsContextProvider>
  );
};

export default BrowsePage;
