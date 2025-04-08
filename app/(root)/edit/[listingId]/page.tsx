import { Suspense } from 'react';
import { checkAuth } from '@/lib/actions/user.actions';
import { fetchSingleListing } from '@/lib/actions/listing.actions';
import Spinner from '@/components/Spinner';
import NoUser from '@/components/NoUser';
import CreateListingForm from '@/components/forms/CreateListingForm';

// Use the correct page props interface
interface PageProps {
  params: { listingId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EditListingPage({ params }: PageProps) {
  const { listingId } = params;

  let isAuthenticated = false;
  let userId: string | null = null;
  let listing = null;

  // Check authentication
  try {
    const result = await checkAuth();
    isAuthenticated = result.isAuthenticated;
    if (isAuthenticated && result.user) {
      userId = result.user.id;
    }
  } catch (error) {
    console.log('Failed to check auth:', error);
    isAuthenticated = false;
  }

  if (!isAuthenticated || !userId) {
    return <NoUser />;
  }

  // Fetch the listing and verify ownership
  try {
    const fetchedListing = await fetchSingleListing(listingId);
    if (!fetchedListing) {
      return (
        <div className='min-h-screen flex justify-center items-center'>
          <p className='text-red-500'>Listing not found.</p>
        </div>
      );
    }

    console.log(fetchedListing);

    if (fetchedListing.userId._id.toString() !== userId) {
      return (
        <div className='min-h-screen flex justify-center items-center'>
          <p className='text-red-500'>
            You are not authorized to edit this listing.
          </p>
        </div>
      );
    }

    const listingData = fetchedListing.toObject();

    listing = {
      ...listingData,
      _id: listingData._id.toString(),
      userId: {
        _id: listingData.userId._id.toString(),
        fullName: listingData.userId.fullName,
        email: listingData.userId.email,
        phoneNumber: listingData.userId.phoneNumber,
        profile_image: listingData.userId.profile_image,
        createdAt: listingData.userId.createdAt.toISOString(),
      },
      createdAt: listingData.createdAt.toISOString(),
      updatedAt: listingData.updatedAt.toISOString(),
      coordinates: {
        lat: listingData.coordinates.lat,
        lng: listingData.coordinates.lng,
      },
      coLivingDetails: listingData.coLivingDetails
        ? {
            roommates: listingData.coLivingDetails.roommates
              ? listingData.coLivingDetails.roommates.map((roommate: any) => ({
                  ...roommate,
                  _id: roommate._id.toString(),
                }))
              : [],
            houseRules: listingData.coLivingDetails.houseRules,
            sharedSpaces: listingData.coLivingDetails.sharedSpaces,
            schedule: listingData.coLivingDetails.schedule,
          }
        : undefined,
    };
  } catch (error) {
    console.error('Failed to fetch listing:', error);
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-red-500'>
          Error loading listing. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<Spinner />}>
      <CreateListingForm userId={userId} listing={listing} />
    </Suspense>
  );
}
