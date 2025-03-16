import * as z from 'zod';

export const listingValidation = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .nonempty('Title is required'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .nonempty('City is required'),
  street: z
    .string()
    .min(2, 'Street must be at least 2 characters')
    .nonempty('Street is required'),
  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: 'Price must be a valid number' })
    .refine((val) => val >= 0, { message: 'Price must be a positive number' }),
  floor: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: 'Floor must be a valid number' })
    .refine((val) => Number.isInteger(val), {
      message: 'Floor must be an integer',
    })
    .refine((val) => val >= 0, { message: 'Floor cannot be negative' }),
  preferences: z
    .array(z.string().min(1, 'Preference cannot be empty'))
    .min(0, 'Preferences can be empty')
    .max(10, 'Maximum 10 preferences allowed'),
  amenities: z
    .array(z.string().min(1, 'Amenity cannot be empty'))
    .min(0, 'Amenities can be empty')
    .max(10, 'Maximum 10 amenities allowed'),
  description: z
    .string()
    .max(1000, 'Description must not exceed 1000 characters'),
  capacity: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'Capacity must be a valid number',
    })
    .refine((val) => Number.isInteger(val), {
      message: 'Capacity must be an integer',
    })
    .refine((val) => val >= 1, { message: 'Capacity must be at least 1' }),
  photos: z
    .array(z.string().url('Each photo must be a valid URL'))
    .min(1, 'At least one photo is required')
    .max(10, 'Maximum 10 photos allowed'),
});
