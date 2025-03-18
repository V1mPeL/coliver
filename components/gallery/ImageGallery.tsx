'use client';
import { useState } from 'react';
import Image from 'next/image';
import CustomLightbox from './CustomLightbox';

interface ImageGalleryProps {
  photos: string[];
}

const ImageGallery = ({ photos }: ImageGalleryProps) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
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

      {open && (
        <CustomLightbox
          images={photos}
          initialIndex={index}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ImageGallery;
