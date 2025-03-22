'use client';
import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Вирішуємо, чи використовувати слайдер
  const useSlider = isMobile || photos.length > 6;

  return (
    <div className='image-gallery-container'>
      {useSlider ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={isMobile ? 1 : 3}
          className='w-full'
        >
          {photos.map((photo, i) => (
            <SwiperSlide key={i}>
              <div
                className='relative w-full h-48 cursor-pointer'
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              >
                <Image
                  src={photo}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  objectFit='cover'
                  className='rounded-lg'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {photos.map((photo, i) => (
            <div
              key={i}
              className='relative w-full h-48 cursor-pointer'
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <Image
                src={photo}
                alt={`Gallery image ${i + 1}`}
                fill
                objectFit='cover'
                className='rounded-lg'
              />
            </div>
          ))}
        </div>
      )}

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
