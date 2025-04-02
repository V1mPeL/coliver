'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import type { Icon, IconOptions } from 'leaflet';
import { useListingsContext } from '@/contexts/ListingsContext';
import Link from 'next/link';

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

const BigMap = () => {
  const { listings, hoveredListingId } = useListingsContext();
  const [icon, setIcon] = useState<Icon<IconOptions> | null>(null);
  const [hoverIcon, setHoverIcon] = useState<Icon<IconOptions> | null>(null);

  useEffect(() => {
    import('leaflet').then((L) => {
      const customIcon = L.icon({
        iconUrl: '/assets/marker2.png',
        iconRetinaUrl: '/assets/marker2.png',
        iconSize: [25, 41],
      });
      setIcon(customIcon);

      const hoverIcon = L.icon({
        iconUrl: '/assets/marker.png',
        iconRetinaUrl: '/assets/marker.png',
        iconSize: [25, 41],
      });
      setHoverIcon(hoverIcon);
    });
  }, []);

  if (!icon || !hoverIcon) {
    return (
      <div className='rounded-md bg-gray-100 w-full h-full flex items-center justify-center'>
        Loading map...
      </div>
    );
  }

  const center: [number, number] =
    listings.length > 0
      ? [listings[0].coordinates.lat, listings[0].coordinates.lng]
      : [49.837665328610285, 24.025957049387088];

  return (
    <div className='w-full h-full'>
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        className='rounded-md'
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          minZoom={0}
          maxZoom={20}
        />
        {listings.map((listing) => (
          <Marker
            key={listing._id}
            position={[listing.coordinates.lat, listing.coordinates.lng]}
            icon={hoveredListingId === listing._id ? hoverIcon : icon}
          >
            <Popup>
              <div className='flex flex-col gap-2'>
                {`${listing.city}, ${listing.street}`}
                <Link href={`/listings/${listing._id}`}>Watch listing</Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BigMap;
