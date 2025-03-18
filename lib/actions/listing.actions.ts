'use server';

import Listing from '../models/listing.model';
import User from '../models/user.model';

import { connectToDataBase } from '../mongoose';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Params {
  title: string;
  city: string;
  street: string;
  price: number;
  currency: string;
  floor: number;
  preferences: string[];
  amenities: string[];
  description: string;
  capacity: number;
  photos: string[];
  coordinates: Coordinates;
  userId: string;
  coLivingDetails?: {
    roommates?: {
      name: string;
      age: number;
      gender: 'Male' | 'Female' | 'Other';
      description?: string;
    }[];
    houseRules?: string[];
    sharedSpaces?: string;
    schedule?: string;
  };
}

export async function createListing({
  title,
  city,
  street,
  price,
  currency,
  floor,
  preferences,
  amenities,
  description,
  capacity,
  photos,
  coordinates,
  userId,
  coLivingDetails,
}: Params) {
  try {
    connectToDataBase();

    const createdListing = await Listing.create({
      title,
      city,
      street,
      price,
      currency,
      floor,
      preferences,
      amenities,
      description,
      capacity,
      photos,
      coordinates,
      userId,
      coLivingDetails, // Додано нове поле
    });

    await User.findByIdAndUpdate(userId, {
      $push: { listings: createdListing._id },
    });

    return { success: true, listingId: createdListing._id.toString() };
  } catch (error: any) {
    throw new Error(`Failed to create listing: ${error.message}`);
  }
}

export async function fetchSingleListing(listingId: string) {
  connectToDataBase();
  try {
    const listing = await Listing.findById(listingId).populate({
      path: 'userId',
      model: User,
      select: 'fullName email phoneNumber profile_image createdAt',
    });

    return listing;
  } catch (error: any) {
    throw new Error(`Unable to fetch listing ${error.message}`);
  }
}
