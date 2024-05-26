import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { UserContext } from './userContext';

type Artist = {
  id: number;
  stage_name: string;
  location: string;
  genres: object;
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
    if (loggedInUser?.id && loggedInUser?.CLToken) {
      axiosInstance(`/artist/`, {
        headers: {
          'Authorization': `Bearer ${loggedInUser.CLToken}`
        }
      })
      .then(response => {
        setArtist(response.data.results[0]);
        console.log("Artist data fetched:", response.data.results[0]);
      })
      .catch(error => {
        console.error("Error fetching artist data:", error);
      });
    }
  }, [loggedInUser?.id, loggedInUser?.CLToken]);

  return (
    <ArtistContext.Provider value={{ artist, setArtist }}>
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
