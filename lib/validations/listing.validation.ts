import * as z from 'zod';

const roommateValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .nonempty('Name is required'),
  age: z.number().min(0, 'Age cannot be negative'),
  gender: z.enum(['Male', 'Female', 'Other'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Gender must be Male, Female, or Other',
  }),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional(),
});

const coLivingDetailsValidation = z
  .object({
    roommates: z
      .array(roommateValidation)
      .min(0, 'At least one roommate can be added')
      .optional(),
    houseRules: z
      .array(z.string().min(1, 'Rule cannot be empty'))
      .min(0, 'House rules can be empty')
      .optional(),
    sharedSpaces: z
      .string()
      .max(500, 'Shared spaces description must not exceed 500 characters')
      .optional(),
    schedule: z
      .string()
      .max(500, 'Schedule must not exceed 500 characters')
      .optional(),
  })
  .optional();

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
  currency: z.string().refine((val) => ['USD', 'EUR', 'UAH'].includes(val), {
    message: 'Currency must be one of USD, EUR, UAH',
  }),

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
    .min(0, 'Preferences can be empty'),
  amenities: z
    .array(z.string().min(1, 'Amenity cannot be empty'))
    .min(0, 'Amenities can be empty'),
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
  coLivingDetails: coLivingDetailsValidation,
});
