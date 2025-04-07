import { Suspense } from 'react';
import { checkAuth } from '@/lib/actions/user.actions';
import Spinner from '@/components/Spinner';
import NoUser from '@/components/NoUser';
import { fetchUserListings } from '@/lib/actions/listing.actions';
import UserListings from '@/components/UserListings';

export default async function ProfilePage() {
  let isAuthenticated = false;
  let listings = [];
  let userId = '';
  try {
    const result = await checkAuth();

    isAuthenticated = result.isAuthenticated;
    userId = result?.user?.id || '';
    if (isAuthenticated) {
      listings = await fetchUserListings(userId);
    }
  } catch (error) {
    console.error('Failed to check auth:', error);
    isAuthenticated = false;
  }

  console.log(listings);

  if (!isAuthenticated) {
    return <NoUser />;
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <Suspense fallback={<Spinner />}>
        <UserListings listings={listings} userId={userId} />
      </Suspense>
    </div>
  );
}
