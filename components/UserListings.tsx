import Image from 'next/image';
import Link from 'next/link';
import { IoPeopleSharp } from 'react-icons/io5';
import { FaRegBuilding } from 'react-icons/fa';

import DeleteButton from './DeleteButton';

interface Listing {
  _id: string;
  photos?: string[];
  title: string;
  price: number;
  currency: string;
  street: string;
  city: string;
  capacity: number;
  floor: number;
  description: string;
  amenities?: string[];
}

export default function UserListings({
  listings,
  userId,
}: {
  listings: Listing[];
  userId: string;
}) {
  if (!listings || listings.length === 0) {
    return (
      <div className='text-center py-12'>
        <h2 className='text-2xl font-semibold mb-4'>
          You don't have any listings yet
        </h2>
        <p className='text-gray-600 mb-6'>
          Create your first listing to start finding roommates
        </p>
        <Link
          href='/listing/create'
          className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition'
        >
          Create a Listing
        </Link>
      </div>
    );
  }

  function handleDelete() {}

  return (
    <div className='w-full max-w-7xl mx-auto px-4 pt-16'>
      <h1 className='text-3xl font-bold mb-8'>Your Listings</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {listings.map((listing) => (
          <div
            key={listing._id.toString()}
            className='bg-white rounded-lg shadow-md overflow-hidden'
          >
            {/* Image Carousel */}
            <div className='relative h-64 w-full'>
              {listing.photos && listing.photos.length > 0 ? (
                <Image
                  src={listing.photos[0]}
                  alt={listing.title}
                  fill
                  className='object-cover'
                />
              ) : (
                <div className='bg-gray-200 h-full w-full flex items-center justify-center'>
                  <p className='text-gray-500'>No image available</p>
                </div>
              )}
            </div>

            {/* Listing Details */}
            <div className='p-4'>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold line-clamp-1'>
                  {listing.title}
                </h2>
                <p className='font-bold text-blue-600'>
                  {listing.price} {listing.currency}
                </p>
              </div>

              <p className=' text-gray-600'>
                {listing.street}, {listing.city}
              </p>

              <div className='flex items-center mt-2 text-gray-600'>
                <IoPeopleSharp size={16} className='flex-shrink-0' />
                <p className='ml-1'>Capacity: {listing.capacity}</p>

                <FaRegBuilding size={16} className='flex-shrink-0 ml-4' />
                <p className='ml-1'>Floor: {listing.floor}</p>
              </div>

              <p className='mt-3 text-gray-700 line-clamp-2 h-[50px]'>
                {listing.description}
              </p>

              <div className='mt-4 flex flex-wrap gap-2'>
                {listing.amenities &&
                  listing.amenities.slice(0, 4).map((amenity, index) => (
                    <span
                      key={index}
                      className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'
                    >
                      {amenity}
                    </span>
                  ))}
                {listing.amenities && listing.amenities.length > 4 && (
                  <span className='text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full'>
                    +{listing.amenities.length - 4} more
                  </span>
                )}
              </div>

              <div className='mt-4 flex justify-between'>
                <Link
                  href={`/listings/${listing._id}`}
                  className='text-blue-600 hover:underline'
                >
                  View Details
                </Link>
                <div className=' flex items-center gap-3'>
                  <Link
                    href={`/edit/${listing._id}`}
                    className='text-blue-600 hover:underline'
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    listingId={listing._id.toString()}
                    userId={userId}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
