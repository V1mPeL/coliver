import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ThumbnailSmallProps {
  listing?: {
    _id: string;
    photos: string[];
    price: number;
    currency: string;
    street: string;
    city: string;
    capacity: number;
    floor: number;
  };
}

const ThumbnailSmall: React.FC<ThumbnailSmallProps> = ({ listing }) => {
  if (!listing) {
    return (
      <div className='w-[calc(50%-0.5rem)] sm:w-[calc(25%-0.5rem)] h-64 bg-gray-200 rounded-lg animate-pulse' />
    );
  }

  return (
    <Link
      href={`/listings/${listing._id}`}
      className='w-[calc(50%-0.5rem)] sm:w-[calc(25%-0.5rem)]'
    >
      <div className='relative w-full h-40 rounded-lg overflow-hidden'>
        {listing.photos && listing.photos.length > 0 ? (
          <Image
            src={listing.photos[0]}
            alt={listing.street}
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
          />
        ) : (
          <div className='w-full h-full bg-gray-300 flex items-center justify-center'>
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className='mt-2'>
        <h3 className='text-lg font-semibold'>{`${listing.price} ${listing.currency}`}</h3>
        <p className='text-sm text-gray-600'>{`${listing.street}, ${listing.city}`}</p>
        <p className='text-sm text-gray-600'>{`Capacity: ${listing.capacity} | Floor: ${listing.floor}`}</p>
      </div>
    </Link>
  );
};

export default ThumbnailSmall;
