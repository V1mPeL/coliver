// app/profile/page.tsx (без 'use client')
import toast from 'react-hot-toast'; // Імпортуємо toast для серверного використання (потрібна серверна інтеграція, наприклад, через контекст)
import { getUser } from '@/lib/actions/user.actions';

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  bio: string | null;
  _id: string;
}

export default async function ProfilePage() {
  let user: UserProfile | null = null;

  try {
    user = await getUser();
  } catch (error: any) {
    // Обробка помилок на сервері (наприклад, перенаправлення через middleware або рендеринг помилки)
    return (
      <div className='container min-h-screen flex items-center justify-center'>
        <div className='max-w-4xl w-full p-6 bg-neutrals-white rounded-lg shadow-md'>
          <h1 className='text-primary-60 h2B text-center mb-8'>Profile</h1>
          <p className='text-error-main'>{error.message}</p>
          {error.message.includes('No authentication token found') && (
            <p>
              Please{' '}
              <a
                href='/auth/sign-in'
                className='text-primary-main hover:underline'
              >
                sign in
              </a>
              .
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
