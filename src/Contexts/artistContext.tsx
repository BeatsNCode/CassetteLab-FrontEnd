import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { UserContext } from './userContext';

type Artist = {
  id: number;
  stageName: string;
  location: string;
  genres: string[];
};

type ArtistContextType = {
  artist: Artist | null;
  setArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
};

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export const ArtistProvider = ({ children }: { children: ReactNode }) => {
  const userContext = useContext(UserContext);
  const loggedInUser = userContext?.user;
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      if (!loggedInUser?.id || !loggedInUser?.CLToken) return;

      try {
        const response = await axiosInstance.get('/artist/', {
          headers: {
            'Authorization': `Bearer ${loggedInUser.CLToken}`
          }
        });

        const artistData = response.data.results[0];

        if (artistData) {
          setArtist({
            id: artistData.user,
            stageName: artistData.stage_name,
            location: artistData.location,
            genres: artistData.genres
          });
        } else {
          console.warn('No artist data found');
          setArtist(null);
        }
      } catch (error) {
        console.error('Failed to fetch artist data', error);
        setArtist(null);
      }
    };

    fetchArtist();
  }, [loggedInUser]);

  const value = useMemo(() => ({ artist, setArtist }), [artist]);

  return (
    <ArtistContext.Provider value={value}>
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtist = (): ArtistContextType => {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error('useArtist must be used within an ArtistProvider');
  }
  return context;
};
