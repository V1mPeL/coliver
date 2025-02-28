'use client';
import { useState } from 'react';
import { z } from 'zod';
import { Form, FormControl, FormField } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchCityValidation } from '@/lib/validations/searchValidation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MainPageSearch = () => {
  const router = useRouter();
  const onSubmit = (values: z.infer<typeof searchCityValidation>) => {
    router.push(`/browse?city=${values.search_city}`);
  };

  const form = useForm<z.infer<typeof searchCityValidation>>({
    resolver: zodResolver(searchCityValidation),
    defaultValues: {
      search_city: '',
    },
  });

  return (
    <div className='p-4 flex items-center mt-8 h-[55px] w-[300px] sm:w-[480px] md:w-[680px] lg:w-[880px] bg-white rounded-[30px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='search_city'
            render={({ field }) => (
              <FormControl>
                <div className=' flex items-center justify-between'>
                  <Input
                    type='text'
                    placeholder='Search location...'
                    className='w-[90%] px-8 !text-xl !font-semibold border-none no-focus '
                    {...field}
                  />
                  <Button
                    type='submit'
                    className='transition-all duration-300 hover:bg-primary-60 bg-primary-main h-[45px] w-[45px] rounded-full'
                  >
                    <Image
                      src='/assets/search.svg'
                      alt='searcg'
                      width={70}
                      height={70}
                    />
                  </Button>
                </div>
              </FormControl>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default MainPageSearch;
