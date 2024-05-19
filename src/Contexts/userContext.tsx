import React, { createContext } from 'react';

export type AuthUser = {
  id: number,
  isLoggedIn: boolean
}

export type UserContextType = {
  user: any;
  setUser: any;
  loading: boolean;
}

export type UserContextProviderType = {
  children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({children}: UserContextProviderType) => {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const logString = window.localStorage.getItem("CLabLogin");
        const clu = window.localStorage.getItem("CLU") ;
        const loggedInBool = logString ? JSON.parse(logString) : null;
        const id = clu ? parseInt(clu, 10) : null;
    
    
        if (id !== null) {
    
          setUser({ id: id, isLoggedIn: loggedInBool })
    
        }
      } catch (error) {
          console.error('Failed to fetch user data', error);
      } finally { 
        setLoading(false)
      }
    };

    fetchUser()
  }, []);

  return  (
  <UserContext.Provider value={{user, setUser, loading }}>
    {children}
  </UserContext.Provider>
  )
}


