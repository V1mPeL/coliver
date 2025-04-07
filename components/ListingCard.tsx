import Image from 'next/image';
import React, { useState } from 'react';
import { MdBed } from 'react-icons/md';
import { IoPeopleSharp } from 'react-icons/io5';
import { FaRegBuilding } from 'react-icons/fa';
import { MdOutlineUpdate } from 'react-icons/md';
import Button from './Button';
import { Listing } from '@/types/listings';
import { useListingsContext } from '@/contexts/ListingsContext';
import { formatPrice } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { format } from 'date-fns';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const { setHoveredListingId } = useListingsContext();
  const coLiversCount = listing.coLivingDetails?.roommates?.length || 0;
  const [index, setIndex] = useState(0);

  return (
    <div
      className='w-full flex flex-col sm:flex-row gap-3 sm:gap-6 shadow-md rounded-lg mb-4 bg-white overflow-hidden'
      onMouseEnter={() => setHoveredListingId(listing._id)}
      onMouseLeave={() => setHoveredListingId(null)}
    >
      <div className='relative w-full sm:w-1/2 h-[200px] sm:h-[250px] md:h-[320px]'>
        {listing.photos && listing.photos.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            className='w-full h-full'
            onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
          >
            {listing.photos.map((photo, idx) => (
              <SwiperSlide key={idx}>
                <div className='relative w-full h-full'>
                  <Image
                    src={photo}
                    alt={`Listing photo ${idx + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className='rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none'
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className='relative w-full h-full'>
            <Image
              src='/assets/features_search.png'
              alt='Default apartments image'
              fill
              style={{ objectFit: 'cover' }}
              className='rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none'
            />
          </div>
        )}
      </div>

      <div className='text-neutrals-black w-full sm:w-1/2 flex flex-col py-2 px-3 md:px-4'>
        <div className='flex-grow'>
          <div className='flex justify-between items-start'>
            <h2 className='text-xl md:text-2xl font-bold mb-1'>
              {formatPrice(listing.price)} {listing.currency}
            </h2>
            <p className='text-xs text-neutrals-60 flex items-center gap-1 md:hidden'>
              <MdOutlineUpdate size={12} />
              <span>
                {format(new Date(listing.updatedAt), 'dd.MM.yyyy, HH:mm:ss')}
              </span>
            </p>
          </div>
          <p className='font-bold text-base md:text-lg'>{listing.street}</p>
          <p className='text-neutrals-60 mt-1 md:mt-2 text-sm'>
            street {listing.street}, {listing.city}
          </p>
          <p className='mt-2 md:mt-3 text-xs md:text-sm line-clamp-3'>
            {listing.description}
          </p>

          <ul className='grid grid-cols-2 gap-2 md:gap-3 mt-3 md:mt-4 list-none'>
            <li className='flex items-center gap-1 md:gap-2 text-sm md:text-base font-medium md:font-semibold'>
              <MdBed size={18} />
              <span>Capacity: {listing.capacity}</span>
            </li>
            <li className='flex items-center gap-1 md:gap-2 text-sm md:text-base font-medium md:font-semibold'>
              <FaRegBuilding size={16} />
              <span>Floor: {listing.floor}</span>
            </li>
            <li className='flex items-center gap-1 md:gap-2 text-sm md:text-base font-medium md:font-semibold'>
              <IoPeopleSharp size={18} />
              <span>Colivers: {coLiversCount}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className='text-neutrals-60 mt-3 md:mt-4 hidden md:flex gap-2 items-center text-sm'>
            <MdOutlineUpdate size={16} />
            <span>{new Date(listing.updatedAt).toLocaleString('uk-UA')}</span>
          </p>

          <Button
            href={`/listings/${listing._id}`}
            className='mt-2 md:mt-4 bg-blue-600 hover:bg-blue-700 text-white py-1.5 md:py-2 w-full sm:w-[200px] justify-center rounded-md text-center text-sm md:text-base font-medium'
          >
            Browse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
