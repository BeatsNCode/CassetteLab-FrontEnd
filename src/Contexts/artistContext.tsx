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
    if (!artist && loggedInUser?.id && loggedInUser?.CLToken) {
      axiosInstance(`/artist/`, {
        headers: {
          'Authorization': `Bearer ${loggedInUser.CLToken}`
        }
      })
      .then(response => {
        response.data.results[0]
        setArtist({
          id: response.data.results[0].user, 
          stageName: response.data.results[0].stage_name, 
          location: response.data.results[0].location,
          genres: response.data.results[0].genres});
      })
      .catch(error => {
        console.error("Error fetching artist data:", error);
      });
    }
  }, [loggedInUser?.id, loggedInUser?.CLToken]);

  const value = useMemo(() => ({ artist, setArtist }), [artist, setArtist]);

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
