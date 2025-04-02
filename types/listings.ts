export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Roommate {
  _id: string;
  name: string;
  age: number;
  gender: string;
  description: string;
}

export interface CoLivingDetails {
  roommates?: Roommate[];
}

export interface Listing {
  _id: string;
  street: string;
  city: string;
  price: number;
  currency: string;
  floor: number;
  description: string;
  capacity: number;
  photos: string[];
  coLivingDetails?: CoLivingDetails;
  updatedAt: string;
  coordinates: Coordinates;
}
