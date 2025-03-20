'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import type { Icon, IconOptions } from 'leaflet';

interface Coordinates {
  lat: number;
  lng: number;
}

interface ListingMapProps {
  coordinates: Coordinates;
  city: string;
  street: string;
}

// Dynamically import all components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

const ListingMap = ({ coordinates, city, street }: ListingMapProps) => {
  // Use proper typing with useState
  const [icon, setIcon] = useState<Icon<IconOptions> | null>(null);

  // Create the icon on the client side only
  useEffect(() => {
    // Import Leaflet dynamically to avoid SSR issues
    import('leaflet').then((L) => {
      const customIcon = L.icon({
        iconUrl: '/assets/marker.png',
        iconRetinaUrl: '/assets/marker.png',
        iconSize: [25, 41],
      });
      setIcon(customIcon);
    });
  }, []);

  // Return null or a loading state until icon is ready
  if (!icon) {
    return (
      <div className='rounded-md bg-gray-100 w-full h-full flex items-center justify-center'>
        Loading map...
      </div>
    );
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      className='rounded-md'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        minZoom={0}
        maxZoom={20}
      />
      <Marker position={[coordinates.lat, coordinates.lng]} icon={icon}>
        <Popup>{`${city}, ${street}`}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default ListingMap;
