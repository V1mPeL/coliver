import { Suspense } from 'react';
import { checkAuth } from '@/lib/actions/user.actions';
import Spinner from '@/components/Spinner';
import NoUser from '@/components/NoUser';
import { fetchUserListings } from '@/lib/actions/listing.actions';
import UserListings from '@/components/UserListings';

export default async function MyListings() {
  let isAuthenticated = false;
  let userListings = [];
  let savedListings = [];
  let userId = '';
  let savedListingsIds = [];
  try {
    const result = await checkAuth();

    isAuthenticated = result.isAuthenticated;
    userId = result?.user?.id || '';
    savedListingsIds = result?.user?.savedListings || [];
    if (isAuthenticated) {
      const listingsData = await fetchUserListings(userId);
      userListings = listingsData.listings;
      savedListings = listingsData.savedListings;
    }
  } catch (error) {
    console.error('Failed to check auth:', error);
    isAuthenticated = false;
  }

  if (!isAuthenticated) {
    return <NoUser />;
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center p-16'>
      <Suspense fallback={<Spinner />}>
        <UserListings listings={userListings} userId={userId} />
        <UserListings
          listings={savedListings}
          userId={userId}
          isSaved={true}
          savedListingsIds={savedListingsIds}
        />
      </Suspense>
    </div>
  );
}
