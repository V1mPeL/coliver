import React from 'react';
import ListingCard from './ListingCard';
import { useListingsContext } from '@/contexts/ListingsContext';
import { Listing } from '@/types/listings';

interface ListingsListProps {
  listings?: Listing[];
}

const ListingsList = ({ listings }: ListingsListProps) => {
  // Get the listings from context instead of props if needed
  const { listings: contextListings } = useListingsContext();
  const itemsToRender = listings || contextListings;

  return (
    <div className='w-full pt-2 md:pt-4 pb-15'>
      <div className='h-[400px] md:h-[580px] overflow-y-scroll pr-1'>
        {itemsToRender && itemsToRender.length > 0 ? (
          itemsToRender.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))
        ) : (
          <p className='text-center py-4'>No listings available</p>
        )}
      </div>
    </div>
  );
};

export default ListingsList;
