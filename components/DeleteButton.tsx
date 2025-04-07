'use client';
import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { deleteListing } from '@/lib/actions/listing.actions';

const DeleteButton = ({
  listingId,
  userId,
}: {
  listingId: string;
  userId: string;
}) => {
  async function handleDelete() {
    try {
      const result = await deleteListing(listingId, userId);

      if (result.success) {
        toast.success('Listing deleted successfully!');
        window.location.reload();
      } else {
        toast.error('Failed to delete listing. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to delete listing. Please try again.');
      console.error('Delete error:', error);
    }
    // console.log('delete');
  }

  return (
    <button
      className='flex gap-1 items-center text-error-main hover:underline'
      onClick={handleDelete}
    >
      <FaRegTrashCan />
      Delete
    </button>
  );
};

export default DeleteButton;
