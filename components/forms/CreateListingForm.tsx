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
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import { Input } from '../ui/input';
// import toast from 'react-hot-toast';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { listingValidation } from '@/lib/validations/listing.validation';
import { IoCameraOutline } from 'react-icons/io5';

const CreateListingForm = () => {
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const form = useForm<z.infer<typeof listingValidation>>({
    resolver: zodResolver(listingValidation),
    defaultValues: {
      title: '',
      city: '',
      street: '',
      price: 0,
      floor: 0,
      preferences: [],
      amenities: [],
      description: '',
      capacity: 1,
      photos: [],
    },
  });

  const onSubmit = () => {
    setIsSubmitting(true);
  };

  const handleReset = () => {
    form.reset();
    setUploadedPhotos([]);
  };

  const handlePhotoUpload = () => {
    // This is just a placeholder for photo handling functionality
    console.log('Photo upload triggered');
  };

  return (
    <div className='container min-h-screen py-10'>
      <div className='max-w-7xl mx-auto bg-neutrals-white rounded-xl shadow-lg overflow-hidden'>
        <h1 className='text-primary-60 h2B text-center py-6 border-b border-gray-100'>
          Create Listing
        </h1>

        <div className='flex flex-col lg:flex-row'>
          {/* Main form section */}
          <div className='flex-1 p-6'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                {/* Basic details section */}
                <div className='mb-8'>
                  <h2 className='text-xl font-semibold text-primary-60 mb-4 pb-2 border-b border-gray-100'>
                    Basic Information
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black font-semibold'>
                            Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='Cozy room in new building...'
                              className='w-full border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-1 focus:ring-primary-60 py-2 px-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-error-main text-sm mt-1' />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='price'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black font-semibold'>
                            Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='$750'
                              className='w-full border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-1 focus:ring-primary-60 py-2 px-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-error-main text-sm mt-1' />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Location section */}
                <div className='mb-8'>
                  <h2 className='text-xl font-semibold text-primary-60 mb-4 pb-2 border-b border-gray-100'>
                    Location
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormField
                      control={form.control}
                      name='city'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black font-semibold'>
                            City
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='Lviv'
                              className='w-full border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-1 focus:ring-primary-60 py-2 px-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-error-main text-sm mt-1' />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='street'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black font-semibold'>
                            Street
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='Ploshcha Rynok'
                              className='w-full border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-1 focus:ring-primary-60 py-2 px-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-error-main text-sm mt-1' />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Property details section */}
                <div className='mb-8'>
                  <h2 className='text-xl font-semibold text-primary-60 mb-4 pb-2 border-b border-gray-100'>
                    Property Details
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormField
                      control={form.control}
                      name='floor'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black font-semibold'>
                            Floor
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='2'
                              className='w-full border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-1 focus:ring-primary-60 py-2 px-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-error-main text-sm mt-1' />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='capacity'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black font-semibold'>
                            Capacity
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='1'
                              className='w-full border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-1 focus:ring-primary-60 py-2 px-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-error-main text-sm mt-1' />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Features & Description */}
                <div className='mb-8'>
                  <h2 className='text-xl font-semibold text-primary-60 mb-4 pb-2 border-b border-gray-100'>
                    Features & Description
                  </h2>

                  <div className='space-y-6'>
                    <FormField
                      control={form.control}
                      name='preferences'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black font-semibold'>
                            Preferences
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='Sport, music...'
                              className='w-full border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-1 focus:ring-primary-60 py-2 px-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-error-main text-sm mt-1' />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='amenities'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black font-semibold'>
                            Amenities
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='Wi-Fi, TV...'
                              className='w-full border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-1 focus:ring-primary-60 py-2 px-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-error-main text-sm mt-1' />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black font-semibold'>
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder='Describe your property...'
                              className='w-full border border-primary-60 rounded-md text-neutrals-black focus:outline-none focus:ring-1 focus:ring-primary-60 py-2 px-4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-error-main text-sm mt-1' />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className='flex gap-4 items-center pt-4'>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='bg-primary-main text-neutrals-white rounded-[33px] px-6 py-3 sh3B hover:bg-primary-60 transition-colors disabled:bg-neutrals-40 disabled:cursor-not-allowed'
                  >
                    {isSubmitting ? 'Creating...' : 'Create Listing'}
                  </Button>
                  <Button
                    type='reset'
                    onClick={handleReset}
                    disabled={isSubmitting}
                    className='border border-primary-main bg-transparent text-primary-main hover:bg-primary-main hover:text-neutrals-white rounded-[33px] px-6 py-3 sh3B disabled:border-neutrals-40 disabled:text-neutrals-40 disabled:cursor-not-allowed'
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Photo upload section */}
          <div className='lg:w-1/3 bg-gray-50 p-6 border-l border-gray-100'>
            <h2 className='text-xl font-semibold text-primary-60 mb-4'>
              Photos
            </h2>

            <div className='space-y-4'>
              <div
                className='border-2 border-dashed border-primary-60 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors'
                onClick={handlePhotoUpload}
              >
                <IoCameraOutline size={48} className='text-primary-60 mb-2' />
                <p className='text-center text-gray-600'>
                  Click to upload photos
                </p>
                <p className='text-center text-gray-400 text-sm'>
                  Recommended size: 1200 x 800px
                </p>
              </div>

              {uploadedPhotos.length > 0 ? (
                <div className='grid grid-cols-2 gap-2'>
                  {/* This would display uploaded photos */}
                </div>
              ) : (
                <div className='bg-white rounded-lg p-4 text-center'>
                  <p className='text-gray-500'>No photos uploaded yet</p>
                  <p className='text-sm text-gray-400'>
                    You can upload up to 8 photos
                  </p>
                </div>
              )}

              <input
                type='file'
                multiple
                accept='image/*'
                className='hidden'
                id='photo-upload'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingForm;
