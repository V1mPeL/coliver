'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '@/components/ui/textarea';
import { loginValidation } from '@/lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import Button from '../Button';
import Link from 'next/link';

const SignUpForm = () => {
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginValidation>) => {
    console.log('Form submitted with values:', values);
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <div className='container min-h-screen flex items-center justify-center'>
      <div className='max-w-4xl w-full max-[768px]:h-auto rounded-lg bg-neutrals-white p-6 shadow-md'>
        <h1 className='text-primary-60 h2B text-center mb-8'>Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 flex flex-col items-center'
            noValidate // Вимкнення стандартної валідації HTML5
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='flex flex-col md:flex-row md:items-center md:gap-4'>
                  <FormLabel className='text-black text-lg md:text-xl font-semibold min-w-[150px] text-left'>
                    Email
                  </FormLabel>
                  <div className='w-full md:w-auto'>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='example@gmail.com'
                        autoComplete='off' // Вимкнення автозаповнення для email
                        className='w-[300px] max-[768px]:w-full md:w-[500px] border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-0 focus:border-primary-60 py-2 px-4 autofill:bg-transparent invalid:bg-transparent' // Додано autofill:bg-transparent і invalid:bg-transparent
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
              name='password'
              render={({ field }) => (
                <FormItem className='flex flex-col md:flex-row md:items-center md:gap-4'>
                  <FormLabel className='text-black text-lg md:text-xl font-semibold min-w-[150px] text-left'>
                    Password
                  </FormLabel>
                  <div className='w-full md:w-auto'>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Password'
                        autoComplete='new-password' // Вимкнення автозаповнення для password
                        className='w-[300px] max-[768px]:w-full md:w-[500px] border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-0 focus:border-primary-60 py-2 px-4 autofill:bg-transparent invalid:bg-transparent' // Додано autofill:bg-transparent і invalid:bg-transparent
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-error-main text-sm mt-1' />
                  </div>
                </FormItem>
              )}
            />

            {/* <div className='flex gap-4 items-center'> */}
            <Button
              type='submit'
              className='bg-primary-main text-neutrals-white rounded-[33px] px-5 py-2 sh3B hover:bg-primary-60 transition-colors'
            >
              Login
            </Button>
            {/* </div> */}

            <div className='mt-4 text-center'>
              <p className='text-neutrals-black text-sm'>
                Don&apos;t have an account yet?{' '}
                <Link
                  href='/sign-up'
                  className='text-primary-main hover:underline'
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
