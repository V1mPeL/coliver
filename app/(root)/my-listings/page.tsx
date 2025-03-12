'use client';
import NoUser from '@/components/NoUser';
import Spinner from '@/components/Spinner';
import { checkAuth } from '@/lib/actions/user.actions';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await checkAuth();
        setIsUser(result.isAuthenticated);
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

  return <div>page</div>;
};

export default ProfilePage;
