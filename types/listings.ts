export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Roommate {
  _id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  description: string;
}

export interface CoLivingDetails {
  roommates?: Roommate[];
  houseRules?: string[];
  sharedSpaces?: string;
  schedule?: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profile_image: string;
  createdAt: string; // ISO string
}

export interface Listing {
  _id: string;
  title: string;
  street: string;
  city: string;
  price: number;
  currency: 'USD' | 'EUR' | 'UAH';
  floor: number;
  description: string;
  capacity: number;
  photos: string[];
  userId: User;
  coLivingDetails?: CoLivingDetails;
  updatedAt: string;
  coordinates: Coordinates;
  preferences: string[];
  amenities: string[];
}
