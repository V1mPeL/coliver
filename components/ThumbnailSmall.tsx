import React from 'react';

const ThumbnailSmall = () => {
  return (
    <div className='w-64 rounded overflow-hidden shadow-sm bg-white'>
      {/* Skeleton image placeholder - зменшена висота */}
      <div className='h-32 bg-gray-200 animate-pulse relative'>
        {/* Skeleton badge placeholder */}
        <div className='absolute top-2 left-2 w-8 h-4 rounded-full bg-gray-300 animate-pulse'></div>
      </div>

      {/* Skeleton content - зменшені відступи */}
      <div className='p-2'>
        {/* Skeleton location text */}
        <div className='h-3 w-3/4 bg-gray-200 rounded animate-pulse mb-2'></div>

        {/* Skeleton property details */}
        <div className='h-4 w-full bg-gray-200 rounded animate-pulse mb-2'></div>

        {/* Skeleton price */}
        <div className='h-5 w-1/2 bg-gray-300 rounded animate-pulse mb-1'></div>

        {/* Skeleton deposit info */}
        <div className='h-3 w-3/4 bg-gray-200 rounded animate-pulse'></div>
      </div>
    </div>
  );
};

export default ThumbnailSmall;
