'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CustomLightbox from './CustomLightbox';

interface ImageGalleryProps {
  photos: string[];
}

const ImageGallery = ({ photos }: ImageGalleryProps) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // If there are no photos, return early
  if (!photos || photos.length === 0) {
    return <div>No photos available</div>;
  }

  return (
    <div className='image-gallery-container'>
      {/* Centered Slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1} // Show only 1 photo at a time
        centeredSlides={true} // Center the active slide
        className='w-full max-w-[800px] mx-auto' // Match the approximate width of the 3x2 grid
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)} // Update index when slide changes
      >
        {photos.map((photo, i) => (
          <SwiperSlide key={i}>
            <div
              className='relative w-full h-[300px] md:h-[450px] cursor-pointer' // Match the approximate height of the 3x2 grid
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <Image
                src={photo}
                alt={`Gallery image ${i + 1}`}
                fill
                objectFit='cover' // Use cover to maintain aspect ratio
                className='rounded-lg'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox for full-screen view */}
      {open && (
        <CustomLightbox
          images={photos}
          initialIndex={index}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default ImageGallery;
