'use client';
import NoUser from '@/components/NoUser';
import { checkAuth } from '@/lib/actions/user.actions';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import CreateListingForm from '@/components/forms/CreateListingForm';

const Page = () => {
  const [isUser, setIsUser] = useState(false);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await checkAuth();
        setIsUser(result.isAuthenticated);
        setUserId(result.user?.id);
      } catch (error) {
        console.error('Failed to check auth:', error);
        setIsUser(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (!isUser) return <NoUser />;

  return (
    <div className='container min-h-screen flex items-center justify-center py-16'>
      <CreateListingForm userId={userId} />
    </div>
  );
};

export default Page;
