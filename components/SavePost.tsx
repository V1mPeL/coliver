'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  addToFavourite,
  removeFromFavourite,
} from '@/lib/actions/user.actions';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

interface SavePostProps {
  listingId: string;
  userId: string;
  userSavedListings: string[];
}

const SavePost = ({ listingId, userId, userSavedListings }: SavePostProps) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(userSavedListings.includes(listingId));
  }, [userSavedListings, listingId]);

  const handleListingSave = async () => {
    try {
      if (isSaved) {
        const result = await removeFromFavourite(listingId, userId);
        if (result.success) {
          setIsSaved(false);
          toast.success(result.message);
        }
      } else {
        const result = await addToFavourite(listingId, userId);
        if (result.success) {
          setIsSaved(true);
          toast.success(result.message);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <button
      onClick={handleListingSave}
      aria-label={isSaved ? 'Remove from favourites' : 'Add to favourites'}
      className={`text-2xl font-bold transition-colors transform hover:scale-110 ${
        isSaved ? 'text-primary-60' : 'text-neutrals-30 hover:text-primary-60'
      }`}
    >
      {isSaved ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default SavePost;
