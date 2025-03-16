import React from 'react';
import { fetchSingleListing } from '@/lib/actions/listing.actions';

interface ListingPageProps {
  params: {
    listingId: string;
  };
}

const ListingPage = async ({ params }: ListingPageProps) => {
  const { listingId } = params;
  if (typeof listingId !== 'string') {
    return <div>Invalid listing ID</div>;
  }
  const listing = await fetchSingleListing(listingId);

  return (
    <div className='container mx-auto py-10 max-w-4xl'>
      <div className='bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          {listing.title}
        </h1>

        <div className='mb-4'>
          <h2 className='text-xl font-semibold text-gray-700'>Location</h2>
          <p className='text-gray-600'>
            {listing.city}, {listing.street}
          </p>
          <p className='text-gray-500 text-sm'>
            Coordinates: Lat {listing.coordinates.lat}, Lng{' '}
            {listing.coordinates.lng}
          </p>
        </div>

        {/* Price and Details */}
        <div className='mb-4'>
          <h2 className='text-xl font-semibold text-gray-700'>Details</h2>
          <p className='text-gray-600'>Price: ${listing.price}</p>
          <p className='text-gray-600'>Floor: {listing.floor}</p>
          <p className='text-gray-600'>Capacity: {listing.capacity} people</p>
        </div>

        {listing.description && (
          <div className='mb-4'>
            <h2 className='text-xl font-semibold text-gray-700'>Description</h2>
            <p className='text-gray-600'>{listing.description}</p>
          </div>
        )}

        {listing.preferences.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-xl font-semibold text-gray-700'>Preferences</h2>
            <ul className='list-disc list-inside text-gray-600'>
              {listing.preferences.map((pref: string, index: number) => (
                <li key={index}>{pref}</li>
              ))}
            </ul>
          </div>
        )}

        {listing.amenities.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-xl font-semibold text-gray-700'>Amenities</h2>
            <ul className='list-disc list-inside text-gray-600'>
              {listing.amenities.map((amenity: string, index: number) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        )}

        {/* {listing.photos.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-xl font-semibold text-gray-700'>Photos</h2>
            <div className='grid grid-cols-2 gap-4'>
              {listing.photos
                .filter((photo) => photo)
                .map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Listing photo ${index + 1}`}
                    className='w-full h-32 object-cover rounded-lg'
                  />
                ))}
            </div>
          </div>
        )} */}

        <div className='mb-4'>
          <h2 className='text-xl font-semibold text-gray-700'>Created By</h2>
          <p className='text-gray-600'>Name: {listing.userId.fullName}</p>
          <p className='text-gray-500 text-sm'>Email: {listing.userId.email}</p>
        </div>

        <div className='text-gray-500 text-sm'>
          <p>Created: {listing.createdAt?.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
