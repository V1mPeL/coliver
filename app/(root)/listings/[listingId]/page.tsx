import React, { Suspense } from 'react';
import { fetchSingleListing } from '@/lib/actions/listing.actions';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { IoBedOutline } from 'react-icons/io5';
import { MdOutlineElevator } from 'react-icons/md';
import { BsBuilding } from 'react-icons/bs';
import Image from 'next/image';
import { format } from 'date-fns';
import Button from '@/components/Button';
import parsePhoneNumber from 'libphonenumber-js';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '@/components/gallery/ImageGallery';
import Spinner from '@/components/Spinner';
import ShareDialog from '@/components/ShareDialog';
import SavePost from '@/components/SavePost';
import { checkAuth } from '@/lib/actions/user.actions';
import ListingMap from '@/components/ListingMap';

interface Roommate {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  description?: string;
}

interface CoLivingDetails {
  roommates?: Roommate[];
  houseRules?: string[];
  sharedSpaces?: string;
  schedule?: string;
}

interface User {
  phoneNumber: string;
  profile_image: string;
  fullName: string;
  createdAt: Date;
  email: string;
}

interface Listing {
  photos: string[];
  price: number;
  currency: string;
  city: string;
  street: string;
  userId: User;
  title: string;
  capacity: number;
  floor: number;
  amenities: string[];
  description: string;
  preferences: string[];
  coLivingDetails?: CoLivingDetails;
  coordinates: { lat: number; lng: number };
  createdAt: Date; // Додаємо поле createdAt до типу Listing
}

interface PageProps {
  params: Promise<{ listingId: string }>;
}

const ListingPage = async ({ params }: PageProps) => {
  const { listingId } = await params;
  if (typeof listingId !== 'string') {
    return (
      <div className='text-red-500 text-center py-10'>Invalid listing ID</div>
    );
  }

  const user = await checkAuth();

  const userSavedListings = user.user?.savedListings || [];

  const listing: Listing = await fetchSingleListing(listingId);
  const phoneNumber = parsePhoneNumber(listing.userId.phoneNumber);

  return (
    <div className='container mx-auto w-full py-10 md:py-20'>
      <Suspense fallback={<Spinner />}>
        {/* Gallery and contact section */}
        <div className='flex flex-col lg:flex-row lg:justify-between lg:gap-10 mb-10'>
          {/* Gallery section */}
          <div className='w-full lg:flex-1 mb-6 lg:mb-0 mt-10 md:mt-0'>
            <ImageGallery photos={listing.photos} />
          </div>
          {/* Contact section */}
          <div className='bg-neutrals-90 w-full lg:w-[400px] p-4 self-start'>
            <div className='flex justify-between flex-col'>
              <div className='flex justify-between items-center w-full'>
                <span className='sh2B'>
                  <span className='tracking-wide'>
                    {formatPrice(listing.price)}
                  </span>{' '}
                  {listing.currency}
                </span>
                <div className='flex items-center gap-4 text-2xl font-bold'>
                  <ShareDialog listingId={listingId} />
                  <SavePost
                    listingId={listingId}
                    userId={user.user?.id}
                    userSavedListings={userSavedListings}
                  />
                </div>
              </div>
              <p className='sh3B mt-2'>
                {listing.city}, {listing.street}
              </p>
              <div className='flex items-start mt-4 gap-2'>
                <Image
                  src={listing.userId.profile_image}
                  alt='Creator Image'
                  width={60}
                  height={60}
                  className='rounded-full'
                />
                <div>
                  <p className='sh3B'>{listing.userId.fullName}</p>
                  <p>
                    Member since{' '}
                    {format(listing.userId.createdAt, 'dd.MM.yyyy')}
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-center gap-2 mt-4 w-full'>
                <Button
                  tel={listing.userId.phoneNumber}
                  className='gap-2 !sh3S w-full justify-center rounded-md'
                >
                  <FaPhoneAlt /> {phoneNumber?.formatInternational()}
                </Button>
                <Button
                  mailto={listing.userId.email}
                  className='gap-2 !sh3S w-full justify-center rounded-md !bg-neutrals-black hover:!bg-neutrals-20'
                >
                  <MdOutlineMail /> <span>Send mail</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Listing title, price, location, and creation date */}
        <div className='w-full'>
          <div className='border-t pt-6 mt-6'>
            <div className='flex flex-col md:flex-row md:items-start md:justify-between'>
              <div>
                <h2 className='h2B text-neutrals-black'>{listing.title}</h2>
                <p className='sh3S mt-2 text-neutrals-30'>
                  {listing.city}, st. {listing.street}
                </p>
                <p className='sh3S mt-1 text-neutrals-30'>
                  Posted on: {format(listing.createdAt, 'dd.MM.yyyy HH:mm')}
                </p>
              </div>
              <span className='sh2B mt-2 md:mt-0'>
                <span className='tracking-wide'>
                  {formatPrice(listing.price)}
                </span>{' '}
                {listing.currency}
              </span>
            </div>
          </div>
        </div>

        {/* Main info */}
        <div className='space-y-8'>
          {/* Details */}
          <div>
            <div className='flex flex-wrap gap-4 items-center mb-6 p-4 bg-neutrals-95 rounded-md'>
              <div className='flex items-center'>
                <IoBedOutline className='text-xl mr-2' />
                <span className='sh3S'>Capacity: {listing.capacity}</span>
              </div>
              <div className='flex items-center'>
                <BsBuilding className='text-xl mr-2' />
                <span className='sh3S'>Floor: {listing.floor}</span>
              </div>
              <div className='flex items-center'>
                <MdOutlineElevator className='text-xl mr-2' />
                <span className='sh3S'>
                  {listing.amenities.includes('🛗 Elevator')
                    ? 'Elevator available'
                    : 'No elevator'}
                </span>
              </div>
            </div>

            {/* Description, Preferences, Amenities + Map */}
            <div className='flex flex-col lg:flex-row lg:gap-6 mb-6'>
              {/* Left column: Description, Preferences, Amenities */}
              <div className='w-full lg:w-[65%] space-y-6'>
                {/* Description */}
                <div>
                  <h3 className='h3B mb-3'>Description</h3>
                  <p className='sh3S text-neutrals-20'>{listing.description}</p>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className='h3B mb-6 text-center'>Preferences</h3>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {listing.preferences.map(
                      (preference: string, index: number) => (
                        <span key={index} className='sh3S'>
                          {preference}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className='h3B mb-6 text-center'>Amenities</h3>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {listing.amenities.map((amenity: string, index: number) => (
                      <div key={index} className='flex items-center'>
                        <span className='sh3S'>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: Map */}
              <div className='w-full lg:w-[35%] mt-6 lg:mt-0 relative'>
                <div
                  className='w-full h-[300px] bg-neutrals-black flex items-center justify-center rounded-md'
                  style={{ marginTop: '60px', zIndex: 1 }}
                >
                  <ListingMap
                    coordinates={{
                      lat: listing.coordinates.lat,
                      lng: listing.coordinates.lng,
                    }}
                    city={listing.city}
                    street={listing.street}
                  />
                </div>
              </div>
            </div>

            {/* Co-Living Details */}
            <div className='mb-6'>
              <h3 className='h3B mb-6 text-center'>Co-Living Details</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {/* Roommates */}
                {listing.coLivingDetails?.roommates &&
                  listing.coLivingDetails.roommates.length > 0 && (
                    <div className='p-6 bg-neutrals-95 rounded-lg shadow-md border border-neutrals-90 hover:shadow-lg transition-shadow'>
                      <h3 className='h3B mb-4 text-center text-primary-main'>
                        Housemates
                      </h3>
                      <ul className='space-y-4'>
                        {listing.coLivingDetails.roommates.map(
                          (roommate: Roommate, index: number) => (
                            <li
                              key={index}
                              className='pb-3 border-b border-neutrals-90 last:border-0'
                            >
                              <div className='flex items-center justify-between mb-1'>
                                <span className='sh3B text-neutrals-10'>
                                  {roommate.name}
                                </span>
                                <span className='text-sm px-2 py-1 bg-neutrals-90 rounded-full'>
                                  {roommate.age} yrs, {roommate.gender}
                                </span>
                              </div>
                              {roommate.description && (
                                <p className='text-sm mt-1 text-neutrals-20 italic'>
                                  &quot;{roommate.description}&quot;
                                </p>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                {/* House Rules */}
                {listing.coLivingDetails?.houseRules &&
                  listing.coLivingDetails.houseRules.length > 0 && (
                    <div className='p-6 bg-neutrals-95 rounded-lg shadow-md border border-neutrals-90 hover:shadow-lg transition-shadow'>
                      <h3 className='h3B mb-4 text-center text-primary-main'>
                        House Rules
                      </h3>
                      <ul className='space-y-2'>
                        {listing.coLivingDetails.houseRules.map(
                          (rule: string, index: number) => (
                            <li key={index} className='flex items-start mb-2'>
                              <div className='min-w-6 h-6 mr-2 flex items-center justify-center bg-neutrals-90 rounded-full text-neutrals-10 font-semibold'>
                                {index + 1}
                              </div>
                              <span className='sh3S text-neutrals-20 pt-0.5'>
                                {rule}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                {/* Shared Spaces */}
                {listing.coLivingDetails?.sharedSpaces && (
                  <div className='p-6 bg-neutrals-95 rounded-lg shadow-md border border-neutrals-90 hover:shadow-lg transition-shadow'>
                    <h3 className='h3B mb-4 text-center text-primary-main'>
                      Shared Spaces
                    </h3>
                    <div className='bg-white p-4 rounded-md shadow-sm'>
                      <p className='sh3S text-neutrals-20 whitespace-pre-line'>
                        {listing.coLivingDetails.sharedSpaces}
                      </p>
                    </div>
                  </div>
                )}
                {/* Schedule */}
                {listing.coLivingDetails?.schedule && (
                  <div className='p-6 bg-neutrals-95 rounded-lg shadow-md border border-neutrals-90 hover:shadow-lg transition-shadow'>
                    <h3 className='h3B mb-4 text-center text-primary-main'>
                      Schedule
                    </h3>
                    <div className='bg-white p-4 rounded-md shadow-sm'>
                      <p className='sh3S text-neutrals-20 whitespace-pre-line'>
                        {listing.coLivingDetails.schedule}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default ListingPage;
