// lib/validations/listing.validation.ts
import { z } from 'zod';

export const listingValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  city: z.string().min(1, 'City is required'),
  street: z.string().min(1, 'Street is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  currency: z.enum(['USD', 'EUR', 'UAH']),
  floor: z.number().int().min(0, 'Floor must be a non-negative integer'),
  preferences: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  description: z.string().min(1, 'Description is required'),
  capacity: z.number().int().min(1, 'Capacity must be at least 1'),
  photos: z.array(z.string()).optional(),
  coLivingDetails: z
    .object({
      roommates: z
        .array(
          z.object({
            name: z.string().min(1, 'Roommate name is required'),
            age: z.number().int().min(0, 'Age must be a non-negative integer'),
            gender: z.enum(['Male', 'Female', 'Other']),
            description: z.string().optional(),
          })
        )
        .optional(),
      houseRules: z.array(z.string()).optional(),
      sharedSpaces: z.string().optional(),
      schedule: z.string().optional(),
    })
    .optional(),
});
