import Image from 'next/image';
import React from 'react';

interface Props {
  title: string;
  text: string;
  image: string;
  id: number;
}

const FeaturesItem = ({ title, text, image, id }: Props) => {
  const isImageLeft = id % 2 !== 0;

  return (
    <div
      className={`flex flex-col md:flex-row ${
        isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } items-start gap-8 mb-12`}
    >
      <div className='h-[200px] md:h-[400px] w-4/5 md:w-1/2 relative scale-80 md:scale-100'>
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover rounded-lg shadow-md'
        />
      </div>
      <div
        className={`w-full md:w-1/2 ${
          isImageLeft ? 'text-center md:text-right' : 'text-center md:text-left'
        }`}
      >
        <h2 className='sh1B text-neutrals-black mb-4 inline-block relative pb-2'>
          {title}{' '}
          <span className='absolute bottom-0 left-0 h-1 w-full bg-primary-main rounded-sm'></span>
        </h2>
        <p
          className={`bodyR text-neutrals-black max-w-md ${
            isImageLeft ? 'mx-auto md:ml-auto md:mr-0' : 'mx-auto md:mx-0'
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default FeaturesItem;
