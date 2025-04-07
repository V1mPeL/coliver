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

interface UpdateParams extends Params {
  listingId: string;
}

interface Filters {
  city?: string;
  street?: string;
  priceMin?: string;
  priceMax?: string;
  floorMin?: string;
  floorMax?: string;
  capacity?: string;
  preferences?: string[];
  amenities?: string[];
  currency?: string;
  sorting?: string;
  query?: string;
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

export async function updateListing({
  listingId,
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
}: UpdateParams) {
  try {
    await connectToDataBase();

    // Find the listing and verify ownership
    const listing = await Listing.findById(listingId);
    if (!listing) {
      throw new Error('Listing not found');
    }

    if (listing.userId.toString() !== userId) {
      throw new Error('You are not authorized to update this listing');
    }

    // Update the listing
    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      {
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
        coLivingDetails,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedListing) {
      throw new Error('Failed to update listing');
    }

    return { success: true, listingId: updatedListing._id.toString() };
  } catch (error: any) {
    throw new Error(`Failed to update listing: ${error.message}`);
  }
}

export async function deleteListing(listingId: string, userId: string) {
  await connectToDataBase();
  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      throw new Error('Listing not found');
    }

    if (listing.userId.toString() !== userId) {
      throw new Error('You are not authorized to update this listing');
    }

    await Listing.findByIdAndDelete(listingId);
    return { success: true };
  } catch (error: any) {
    throw new Error(`Failed to delete listing: ${error.message}`);
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

export async function fetchUserListings(userId: string) {
  connectToDataBase();

  try {
    const listings = await Listing.find({ userId });

    return listings;
  } catch (error: any) {
    throw new Error(`Unable to fetch listing ${error.message}`);
  }
}

export async function fetchListings(filters: Filters = {}) {
  await connectToDataBase();

  try {
    const query: any = {};

    if (filters.query) {
      const searchRegex = { $regex: filters.query, $options: 'i' };
      query.$or = [{ street: searchRegex }, { description: searchRegex }];
    }

    // Apply city filter (case-insensitive)
    if (filters.city) {
      query.city = { $regex: filters.city, $options: 'i' };
    }

    // Apply street filter (case-insensitive)
    if (filters.street) {
      query.street = { $regex: filters.street, $options: 'i' };
    }

    // Apply price range filter
    if (filters.priceMin || filters.priceMax) {
      query.price = {};
      if (filters.priceMin) {
        query.price.$gte = Number(filters.priceMin);
      }
      if (filters.priceMax) {
        query.price.$lte = Number(filters.priceMax);
      }
    }

    // Apply currency filter
    if (filters.currency) {
      query.currency = filters.currency;
    }

    // Apply floor range filter
    if (filters.floorMin || filters.floorMax) {
      query.floor = {};
      if (filters.floorMin) {
        query.floor.$gte = Number(filters.floorMin);
      }
      if (filters.floorMax) {
        query.floor.$lte = Number(filters.floorMax);
      }
    }

    // Apply capacity filter
    if (filters.capacity) {
      if (filters.capacity === '3') {
        query.capacity = { $gte: 3 }; // For "3+" option
      } else {
        query.capacity = Number(filters.capacity);
      }
    }

    // Apply preferences filter (all preferences must match)
    if (filters.preferences && filters.preferences.length > 0) {
      query.preferences = { $all: filters.preferences };
    }

    // Apply amenities filter (all amenities must match)
    if (filters.amenities && filters.amenities.length > 0) {
      query.amenities = { $all: filters.amenities };
    }

    let sortOption: any = { createdAt: 'desc' }; // Default sorting: newest first
    if (filters.sorting) {
      switch (filters.sorting) {
        case 'price-asc':
          sortOption = { price: 'asc' };
          break;
        case 'price-desc':
          sortOption = { price: 'desc' };
          break;
        case 'date-newest':
          sortOption = { createdAt: 'desc' };
          break;
        case 'date-oldest':
          sortOption = { createdAt: 'asc' };
          break;
        default:
          sortOption = { createdAt: 'desc' }; // Fallback to default
      }
    }

    // Build the query with filters
    const listingsQuery = Listing.find(query)
      .select(
        '_id street city price currency floor description capacity photos coLivingDetails.roommates updatedAt coordinates'
      )
      .sort(sortOption);

    const listings = await listingsQuery.exec();

    // Serialize the listings
    const serializedListings = listings.map((listing) => {
      const plainListing = listing.toObject();
      return {
        ...plainListing,
        _id: plainListing._id.toString(),
        createdAt: plainListing.createdAt?.toISOString(),
        updatedAt: plainListing.updatedAt.toISOString(),
        coordinates: {
          lat: plainListing.coordinates.lat,
          lng: plainListing.coordinates.lng,
        },
        coLivingDetails: plainListing.coLivingDetails
          ? {
              roommates: plainListing.coLivingDetails.roommates
                ? plainListing.coLivingDetails.roommates.map(
                    (roommate: any) => ({
                      ...roommate,
                      _id: roommate._id.toString(),
                    })
                  )
                : [],
            }
          : undefined,
      };
    });

    return { success: true, listings: serializedListings };
  } catch (error: any) {
    throw new Error(`Unable to fetch listings: ${error.message}`);
  }
}
