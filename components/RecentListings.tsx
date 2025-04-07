// components/RecentListings.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThumbnailSmall from './ThumbnailSmall';
import { fetchListings } from '@/lib/actions/listing.actions';

interface Listing {
  _id: string;
  street: string;
  city: string;
  price: number;
  currency: string;
  floor: number;
  description: string;
  capacity: number;
  photos: string[];
  coLivingDetails?: {
    roommates?: {
      name: string;
      age: number;
      gender: 'Male' | 'Female' | 'Other';
      description?: string;
    }[];
  };
  updatedAt: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const RecentListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecentListings = async () => {
      setLoading(true);
      try {
        const { listings } = await fetchListings({
          sorting: 'date-newest', // Sort by newest first
        });
        // Slice the listings array to the first 4
        setListings(listings.slice(0, 4));
      } catch (error: any) {
        console.error('Error fetching recent listings:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecentListings();
  }, []);

  if (loading) {
    return (
      <div className='py-4 w-full'>
        <div className='container'>
          <div className='flex justify-between items-center'>
            <h1 className='h2B text-neutrals-black mb-8'>Recently added</h1>
            <Link href='/browse' className='text-primary-main hover:underline'>
              View more
            </Link>
          </div>
          <div className='flex items-center justify-between gap-2 flex-wrap'>
            <ThumbnailSmall />
            <ThumbnailSmall />
            <ThumbnailSmall />
            <ThumbnailSmall />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='py-4 w-full'>
        <div className='container'>
          <div className='flex justify-between items-center'>
            <h1 className='h2B text-neutrals-black mb-8'>Recently added</h1>
            <Link href='/browse' className='text-primary-main hover:underline'>
              View more
            </Link>
          </div>
          <p className='text-red-500'>Error loading recent listings: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='py-4 w-full'>
      <div className='container'>
        <div className='flex justify-between items-center'>
          <h1 className='h2B text-neutrals-black mb-8'>Recently added</h1>
          <Link href='/browse' className='text-primary-main hover:underline'>
            View more
          </Link>
        </div>
        <div className='flex items-center gap-4 flex-wrap'>
          {listings.length > 0 ? (
            listings.map((listing) => (
              <ThumbnailSmall key={listing._id} listing={listing} />
            ))
          ) : (
            <p className='text-gray-600'>No recent listings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentListings;
