'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Listing } from '@/types/listings';

interface ListingsContextType {
  listings: Listing[];
  hoveredListingId: string | null;
  setHoveredListingId: (id: string | null) => void;
}

const ListingsContext = createContext<ListingsContextType | undefined>(
  undefined
);

export const ListingsContextProvider = ({
  children,
  initialListings,
}: {
  children: ReactNode;
  initialListings: Listing[];
}) => {
  const [listings] = useState<Listing[]>(initialListings);
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);

  return (
    <ListingsContext.Provider
      value={{ listings, hoveredListingId, setHoveredListingId }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export const useListingsContext = () => {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error(
      'useListingsContext must be used within a ListingsContextProvider'
    );
  }
  return context;
};
