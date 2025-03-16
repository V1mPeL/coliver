import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type AddressLocation = {
  city: string;
  street: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export async function streetToGeocode({
  address,
}: {
  address: AddressLocation;
}) {
  const addressString = `${address.city}, ${address.street}`;
  const encodedAdress = encodeURIComponent(addressString);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAdress}`;
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CoLiver (example@example.com)',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.length > 0) {
      const result = data[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      };
    } else {
      console.warn('No results found for the address:', addressString);
      return null;
    }
  } catch (error) {
    console.error('Error fetching geocode from Nominatim:', error);
    return null;
  }
}
