'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BigMap from '@/components/BigMap';
import FiltersWidget from '@/components/FiltersWidget';
import ListingsList from '@/components/ListingsList';
import { ListingsContextProvider } from '@/contexts/ListingsContext';
import { fetchListings } from '@/lib/actions/listing.actions';
import Spinner from '@/components/Spinner';
import { Listing } from '@/types/listings';

// Separate component that uses useSearchParams
const BrowseContent = () => {
  const [initialListings, setInitialListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      try {
        const filters = {
          city: searchParams.get('city') || undefined,
          street: searchParams.get('street') || undefined,
          priceMin: searchParams.get('priceMin') || undefined,
          priceMax: searchParams.get('priceMax') || undefined,
          floorMin: searchParams.get('floorMin') || undefined,
          floorMax: searchParams.get('floorMax') || undefined,
          capacity: searchParams.get('capacity') || undefined,
          preferences: searchParams
            .get('preferences')
            ?.split(',')
            .filter(Boolean),
          amenities: searchParams.get('amenities')?.split(',').filter(Boolean),
          currency: searchParams.get('currency') || undefined,
          sorting: searchParams.get('sorting') || undefined,
          query: searchParams.get('query') || undefined,
        };

        const { listings } = await fetchListings(filters);
        setInitialListings(listings);
      } catch (error: any) {
        console.error('Error fetching listings:', error.message);
        setError(error.message);
        setInitialListings([]);
      } finally {
        setLoading(false);
      }
    };

    const handleResize = () => {
      setShowMap(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    loadListings();

    return () => window.removeEventListener('resize', handleResize);
  }, [searchParams]);

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
      <div className='w-full min-h-screen pt-16'>
        <div className='bg-white w-full mx-auto px-4 sm:px-6 md:px-10'>
          <div className='md:hidden flex justify-center my-3'>
            <button
              onClick={() => setShowMap(!showMap)}
              className='bg-blue-600 text-white px-4 py-2 rounded-md'
            >
              {showMap ? 'Show Listings' : 'Show Map'}
            </button>
          </div>

          <div className='w-full flex flex-col md:flex-row justify-between gap-6'>
            <div
              className={`w-full md:w-1/2 pt-5 ${
                showMap ? 'hidden md:block' : 'block'
              }`}
            >
              <FiltersWidget />
              <ListingsList listings={initialListings} />
            </div>
            <div
              className={`w-full md:w-1/2 h-[50vh] md:h-[calc(100vh-4rem)] ${
                showMap ? 'block' : 'hidden md:block'
              }`}
            >
              <BigMap />
            </div>
          </div>
        </div>
      </div>
    </ListingsContextProvider>
  );
};

// Main page component with Suspense
const BrowsePage = () => {
  return (
    <Suspense
      fallback={
        <div className='w-full min-h-screen pt-16 flex justify-center items-center'>
          <Spinner />
        </div>
      }
    >
      <BrowseContent />
    </Suspense>
  );
};

export default BrowsePage;
