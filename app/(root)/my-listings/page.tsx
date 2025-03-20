import { Suspense } from 'react';
import { checkAuth } from '@/lib/actions/user.actions';
import Spinner from '@/components/Spinner';
import NoUser from '@/components/NoUser';

export default async function ProfilePage() {
  let isAuthenticated = false;
  try {
    const result = await checkAuth();
    isAuthenticated = result.isAuthenticated;
  } catch (error) {
    console.error('Failed to check auth:', error);
    isAuthenticated = false;
  }

  if (!isAuthenticated) {
    return <NoUser />;
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <Suspense fallback={<Spinner />}>
        <div>page</div>
      </Suspense>
    </div>
  );
}
