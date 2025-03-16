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
  floor: number;
  preferences: string[];
  amenities: string[];
  description: string;
  capacity: number;
  photos: string[];
  coordinates: Coordinates;
  userId: string;
}

export async function createListing({
  title,
  city,
  street,
  price,
  floor,
  preferences,
  amenities,
  description,
  capacity,
  photos,
  coordinates,
  userId,
}: Params) {
  try {
    connectToDataBase();

    const createdListing = await Listing.create({
      title,
      city,
      street,
      price,
      floor,
      preferences,
      amenities,
      description,
      capacity,
      photos,
      coordinates,
      userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { listings: createdListing._id },
    });

    return { success: true, listingId: createdListing._id };
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
