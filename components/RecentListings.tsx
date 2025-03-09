import React from 'react';
import ThumbnailSmall from './ThumbnailSmall';

const RecentListings = () => {
  return (
    <div className='py-4 w-full'>
      <div className='container'>
        <h1 className='h2B text-neutrals-black mb-8 '>Recently added</h1>
        <div className='flex items-center justify-between'>
          <ThumbnailSmall />
          <ThumbnailSmall />
          <ThumbnailSmall />
          <ThumbnailSmall />
        </div>
      </div>
    </div>
  );
};

export default RecentListings;
