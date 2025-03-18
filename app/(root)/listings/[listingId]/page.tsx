import React from 'react';
import { fetchSingleListing } from '@/lib/actions/listing.actions';
import { IoMdShare } from 'react-icons/io';
import { FaRegHeart, FaPhoneAlt } from 'react-icons/fa';
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

  const listing = await fetchSingleListing(listingId);
  const phoneNumber = parsePhoneNumber(listing.userId.phoneNumber);

  return (
    <div className='container mx-auto w-full py-10 md:py-20'>
      {/* Gallery and contact section */}
      <div className='flex flex-col lg:flex-row lg:justify-between lg:gap-10 mb-10'>
        {/* Gallery section */}
        <div className='w-full lg:flex-1 mb-6 lg:mb-0'>
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
                <button>
                  <IoMdShare />
                </button>
                <button>
                  <FaRegHeart />
                </button>
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
                  Member since {format(listing.userId.createdAt, 'dd.MM.yyyy')}
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

      {/* Listing title, price, and location */}
      <div className='w-full'>
        <div className='border-t pt-6 mt-6'>
          <div className='flex flex-col md:flex-row md:items-start md:justify-between'>
            <div>
              <h2 className='h2B text-neutrals-black'>{listing.title}</h2>
              <p className='sh3S mt-2 text-neutrals-30'>
                {listing.city}, st. {listing.street}
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

          {/* Description */}
          <div className='mb-6'>
            <h3 className='h3B mb-3'>Description</h3>
            <p className='sh3S text-neutrals-20'>{listing.description}</p>
          </div>

          {/* Preferences */}
          <div className='mb-6'>
            <h3 className='h3B mb-6 text-center'>Preferences</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {listing.preferences.map((preference: string, index: number) => (
                <span key={index} className='sh3S'>
                  {preference}
                </span>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className='mb-6'>
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

        {/* Map placeholder - moved to the bottom */}
        <div className='w-full'>
          <div className='w-full h-[300px] bg-neutrals-95 flex items-center justify-center rounded-md mt-0'>
            <div className='text-center'>
              <p className='sh3B mb-2'>Map will be displayed here</p>
              <p className='text-sm text-neutrals-30'>
                {listing.city}, {listing.street}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
