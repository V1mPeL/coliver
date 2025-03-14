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
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { listingValidation } from '@/lib/validations/listing.validation';
import { IoCameraOutline } from 'react-icons/io5';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { amenities, preferences } from '@/constants/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { streetToGeocode } from '@/lib/utils';

const CreateListingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

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

  const onSubmit = async (values: z.infer<typeof listingValidation>) => {
    setIsSubmitting(true);
    // Дописати функцію перетворення міста і вулиці в координати, створити функцію в lib/utils
    const geocodedAddress = streetToGeocode({
      address: { city: values.city, street: values.street },
    });
    console.log(geocodedAddress);
    console.log(values);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    form.reset();
    setUploadedPhotos([]);
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string[]) => void
  ) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      const invalidFiles = files.filter((file) => !file.type.includes('image'));
      if (invalidFiles.length > 0) {
        toast.error('Please upload only image files');
        return;
      }

      const currentPhotoCount = uploadedPhotos.length;
      if (currentPhotoCount + files.length > 8) {
        toast.error('You can upload a maximum of 8 photos');
        return;
      }

      const newPhotos: string[] = [];
      let completed = 0;

      files.forEach((file, index) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          const imageDataUrl = event.target?.result?.toString() || '';
          newPhotos[index] = imageDataUrl;
          completed++;

          if (completed === files.length) {
            setUploadedPhotos((prev) => [...prev, ...newPhotos]);
            const currentPhotos = form.getValues('photos') || [];
            fieldChange([
              ...(currentPhotos.filter(Boolean) as string[]),
              ...newPhotos,
            ]);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className='container min-h-screen py-10'>
      <div className='max-w-7xl mx-auto bg-neutrals-white rounded-xl shadow-lg overflow-hidden'>
        <h1 className='text-primary-60 h2B text-center py-6 border-b border-gray-100'>
          Create Listing
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='p-6'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Main form section - takes up 2/3 of space */}
              <div className='lg:col-span-2 space-y-8'>
                {/* Basic details section */}
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                            <div className='grid grid-cols-2 gap-2'>
                              {preferences.map((preference, index) => (
                                <div
                                  key={index}
                                  className='flex items-center space-x-2'
                                >
                                  <Checkbox
                                    checked={field.value.includes(
                                      preference.name
                                    )}
                                    onCheckedChange={(checked) => {
                                      const updatedPreferences = checked
                                        ? [...field.value, preference.name]
                                        : field.value.filter(
                                            (p) => p !== preference.name
                                          );
                                      field.onChange(updatedPreferences);
                                    }}
                                    className='border-primary-60 data-[state=checked]:bg-primary-60 data-[state=checked]:text-neutrals-white'
                                  />
                                  <label className='text-sm text-gray-700 flex items-center space-x-1'>
                                    <span>{preference.icon}</span>
                                    <span>{preference.name}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
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
                            <div className='grid grid-cols-2 gap-2'>
                              {amenities.map((amenity, index) => (
                                <div
                                  key={index}
                                  className='flex items-center space-x-2'
                                >
                                  <Checkbox
                                    checked={field.value.includes(amenity.name)}
                                    onCheckedChange={(checked) => {
                                      const updatedAmenities = checked
                                        ? [...field.value, amenity.name]
                                        : field.value.filter(
                                            (p) => p !== amenity.name
                                          );
                                      field.onChange(updatedAmenities);
                                    }}
                                    className='border-primary-60 data-[state=checked]:bg-primary-60 data-[state=checked]:text-neutrals-white'
                                  />
                                  <label className='text-sm text-gray-700 flex items-center space-x-1'>
                                    <span>{amenity.icon}</span>
                                    <span>{amenity.name}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
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
              </div>

              {/* Photo upload section - takes up 1/3 of space */}
              <div className='bg-gray-50 p-6 rounded-lg border border-gray-100'>
                <h2 className='text-xl font-semibold text-primary-60 mb-4'>
                  Photos
                </h2>

                <FormField
                  control={form.control}
                  name='photos'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='space-y-4'>
                          <FormLabel
                            htmlFor='photo-upload'
                            className='border-2 border-dashed border-primary-60 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors'
                          >
                            <IoCameraOutline
                              size={48}
                              className='text-primary-60 mb-2'
                            />
                            <p className='text-center text-gray-600'>
                              Click to upload photos
                            </p>
                            <p className='text-center text-gray-400 text-sm'>
                              Recommended size: 1200 x 800px
                            </p>
                          </FormLabel>

                          {uploadedPhotos.length > 0 ? (
                            <div className='grid grid-cols-2 gap-2'>
                              {uploadedPhotos.map((photo, index) => (
                                <div
                                  key={index}
                                  className='relative w-full h-24'
                                >
                                  <Image
                                    src={photo}
                                    alt={`Uploaded Photo ${index + 1}`}
                                    layout='fill'
                                    objectFit='cover'
                                    className='rounded-lg'
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className='bg-white rounded-lg p-4 text-center'>
                              <p className='text-gray-500'>
                                No photos uploaded yet
                              </p>
                              <p className='text-sm text-gray-400'>
                                You can upload up to 8 photos
                              </p>
                            </div>
                          )}

                          <Input
                            type='file'
                            multiple
                            accept='image/*'
                            className='hidden'
                            id='photo-upload'
                            onChange={(e) => handleImage(e, field.onChange)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-error-main text-sm mt-1' />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='flex gap-4 items-center mt-8 pt-4 border-t border-gray-100'>
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
    </div>
  );
};

export default CreateListingForm;
