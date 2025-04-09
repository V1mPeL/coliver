// lib/validations/user.validation.ts
import * as z from 'zod';

export const userValidation = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .nonempty('Full name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .nonempty('Password is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^\+[1-9]\d{1,2}\d{9,14}$/,
      '+ followed by country code (1-3 digits) and 9-14 digits '
    ),
  bio: z.string().max(300, 'Bio must not exceed 300 characters'),
  profile_image: z.string().optional(),
});

export const loginValidation = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

export const updateUserValidation = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .nonempty('Full name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^\+[1-9]\d{1,2}\d{9,14}$/,
      '+ followed by country code (1-3 digits) and 9-14 digits '
    ),
  bio: z.string().max(300, 'Bio must not exceed 300 characters'),
  profile_image: z.string().optional(),
});
