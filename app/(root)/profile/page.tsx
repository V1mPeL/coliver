import { getUser } from '@/lib/actions/user.actions';
import Link from 'next/link';

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  bio: string | null;
  _id: string;
}

export const metadata = {
  title: 'User Profile',
  description: 'View and manage your profile information',
};

export default async function ProfilePage() {
  let user: UserProfile | null = null;
  let errorMessage: string | null = null;

  try {
    const result = await getUser();

    if (result && typeof result === 'object') {
      user = {
        fullName: result.fullName,
        email: result.email,
        phoneNumber: result.phoneNumber,
        bio: result.bio || null,
        _id:
          typeof result._id === 'object' ? result._id.toString() : result._id,
      };
    }
  } catch (error: any) {
    errorMessage =
      error.message || 'An error occurred while fetching user data';
  }

  if (errorMessage) {
    return (
      <div className='container min-h-screen flex items-center justify-center'>
        <div className='max-w-4xl w-full p-6 bg-neutrals-white rounded-lg shadow-md'>
          <h1 className='text-primary-60 h2B text-center mb-8'>Profile</h1>
          <p className='text-error-main'>{errorMessage}</p>
          {errorMessage.includes('No authentication token found') && (
            <p>
              Please
              <Link
                href='/sign-in'
                className='text-primary-main hover:underline'
              >
                sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='container min-h-screen flex items-center justify-center'>
        <div className='max-w-4xl w-full p-6 bg-neutrals-white rounded-lg shadow-md'>
          <h1 className='text-primary-60 h2B text-center mb-8'>Profile</h1>
          <p>No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container min-h-screen flex items-center justify-center'>
      <div className='max-w-4xl w-full p-6 bg-neutrals-white rounded-lg shadow-md'>
        <h1 className='text-primary-60 h2B text-center mb-8'>Profile</h1>
        <div className='space-y-4'>
          <p>
            <strong>Full Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio || 'No bio provided'}
          </p>
          <p>
            <strong>User ID:</strong> {user._id}
          </p>
        </div>
      </div>
    </div>
  );
}
