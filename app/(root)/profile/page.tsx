'use client';

import { getUser } from '@/lib/actions/user.actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Схема валідації для форми
const UserValidation = z.object({
  profile_photo: z.string().optional(),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
});

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  bio: string | null;
  _id: string;
  image?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getUser();
        if (result && typeof result === 'object') {
          setUser({
            fullName: result.fullName,
            email: result.email,
            phoneNumber: result.phoneNumber,
            bio: result.bio || null,
            _id:
              typeof result._id === 'object'
                ? result._id.toString()
                : result._id,
            image: result.image || '/assets/user-avatar.jpg', // Використовуємо заглушку, якщо фото відсутнє
          });
        }
      } catch (error: any) {
        if (error.message.includes('No authentication token found')) {
          router.push('/sign-in');
        }
        console.error('Error fetching user:', error.message);
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || '',
      fullName: user?.fullName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      bio: user?.bio || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        profile_photo: user.image || '',
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        bio: user.bio || '',
      });
    }
  }, [user, form]);

  const handleImage = {};

  // Обробка відправлення форми
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {};

  if (loading) {
    return (
      <div className='container min-h-screen flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className='container min-h-screen flex items-center justify-center py-10'>
      <div className='max-w-4xl w-full bg-neutrals-white dark:bg-neutrals-20 rounded-lg shadow-lg p-8'>
        <div className='flex flex-col items-center mb-3'>
          <div className='relative w-32 h-32 mb-4'>
            <Image
              src={
                form.watch('profile_photo') ||
                user.image ||
                '/assets/user-avatar.jpg' // Використовуємо заглушку, якщо фото відсутнє
              }
              alt='Profile Photo'
              layout='fill'
              objectFit='cover'
              className='rounded-full border-4 border-primary-60'
            />
          </div>
          <h1 className='text-primary-60 h2B text-center'>{user.fullName}</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 flex flex-col items-center'
          >
            <FormField
              control={form.control}
              name='profile_photo'
              render={({ field }) => (
                <FormItem className='flex items-center gap-4'>
                  <FormLabel className='cursor-pointer'>
                    <span className='text-primary-60 hover:underline'>
                      Change Photo
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      className='hidden'
                      // onChange={}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem className='flex flex-col md:flex-row md:items-center justify-between md:gap-4 w-full max-w-lg'>
                  <FormLabel className='text-black dark:text-neutrals-white text-lg font-semibold min-w-[150px] text-left'>
                    Full Name
                  </FormLabel>
                  <div className='w-full md:w-auto'>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Your Name'
                        className='w-full md:w-[300px] border border-primary-60 rounded-md text-neutrals-black dark:text-neutrals-white focus:outline-none focus:ring-0 focus:border-primary-60 py-2 px-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-error-main text-sm mt-1' />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='flex flex-col md:flex-row md:items-center justify-between md:gap-4 w-full max-w-lg'>
                  <FormLabel className='text-black dark:text-neutrals-white text-lg font-semibold min-w-[150px] text-left'>
                    Email
                  </FormLabel>
                  <div className='w-full md:w-auto'>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='example@gmail.com'
                        className='w-full md:w-[300px] border border-primary-60 rounded-md text-neutrals-black dark:text-neutrals-white focus:outline-none focus:ring-0 focus:border-primary-60 py-2 px-4'
                        {...field}
                        disabled // Email зазвичай не дозволяють змінювати
                      />
                    </FormControl>
                    <FormMessage className='text-error-main text-sm mt-1' />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem className='flex flex-col md:flex-row md:items-center justify-between md:gap-4 w-full max-w-lg'>
                  <FormLabel className='text-black dark:text-neutrals-white text-lg font-semibold min-w-[150px] text-left'>
                    Phone Number
                  </FormLabel>
                  <div className='w-full md:w-auto'>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='+380671112233'
                        className='w-full md:w-[300px] border border-primary-60 rounded-md text-neutrals-black dark:text-neutrals-white focus:outline-none focus:ring-0 focus:border-primary-60 py-2 px-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-error-main text-sm mt-1' />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem className='flex flex-col md:flex-row md:items-start justify-between md:gap-4 w-full max-w-lg'>
                  <FormLabel className='text-black dark:text-neutrals-white text-lg font-semibold min-w-[150px] text-left'>
                    Bio
                  </FormLabel>
                  <div className='w-full md:w-auto'>
                    <FormControl>
                      <Textarea
                        rows={4}
                        className='w-full md:w-[300px] border border-primary-60 rounded-md text-neutrals-black dark:text-neutrals-white focus:outline-none focus:ring-0 focus:border-primary-60 py-2 px-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-error-main text-sm mt-1' />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='bg-primary-main text-neutrals-white rounded-[33px] px-5 py-2 sh3B hover:bg-primary-60 transition-colors'
            >
              Update Profile
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
