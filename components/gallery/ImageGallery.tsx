'use client';

import Image from 'next/image';
import Fancybox from './Fancybox';
import Carousel from './Carousel';

interface PhotoGalleryProps {
  photos: string[];
}

const ImageGallery = ({ photos }: PhotoGalleryProps) => {
  if (!photos || photos.length === 0) {
    return <div className='text-center py-4'>No photos available</div>;
  }

  return (
    <div className='w-full photo-gallery'>
      <Fancybox
        options={{
          Carousel: {
            infinite: true,
          },
        }}
      >
        <Carousel
          options={{
            infinite: true,
            Navigation: true,
            Thumbs: {
              type: 'modern',
              minCount: 1,
            },
          }}
        >
          {photos.map((image, index) => (
            <div
              key={index}
              className='f-carousel__slide'
              data-fancybox='gallery'
              data-src={image}
              data-thumb-src={image}
            >
              <Image
                src={image}
                alt={`Apartments image ${index + 1}`}
                width={0} // Видаляємо фіксовану ширину, покладаємося на CSS
                height={0} // Видаляємо фіксовану висоту, покладаємося на CSS
                className='rounded-lg object-cover w-full h-auto'
                loading='lazy'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              />
            </div>
          ))}
        </Carousel>
      </Fancybox>
    </div>
  );
};

export default ImageGallery;
