import { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Image from 'next/image';

interface CustomLightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

const CustomLightbox = ({
  images,
  initialIndex = 0,
  onClose,
}: CustomLightboxProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Закриття по кліку поза слайдером
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setIsOpen(false);
        onClose();
      }
    },
    [onClose]
  );

  // Закриття по клавіші Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Закриття після анімації
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(onClose, 300); // Час анімації
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center'
      onClick={handleOverlayClick}
    >
      <button
        className='absolute top-4 right-4 text-white text-2xl'
        onClick={() => setIsOpen(false)}
      >
        &times;
      </button>
      <Swiper
        initialSlide={initialIndex}
        modules={[Navigation, Pagination, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        effect='slide'
        className='w-full max-w-4xl'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='relative w-full h-[80vh]'>
              <Image
                src={image}
                alt={`Lightbox image ${index + 1}`}
                fill
                objectFit='contain'
                className='rounded-lg'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomLightbox;
