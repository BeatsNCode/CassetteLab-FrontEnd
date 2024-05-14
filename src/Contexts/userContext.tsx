import React, { createContext } from 'react';

export type AuthUser = {
  id: number,
  isLoggedIn: boolean
}

export type UserContextType = {
  user: any;
  setUser: any;
  isAuthenticated: boolean;
  setIsAuthenticated: any;
}

export type UserContextProviderType = {
  children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({children}: UserContextProviderType) => {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("CLabLogin");
    if (token) {
      setIsAuthenticated(true);
      console.log(token, "already authenticated")
    }
  }, []);

  return  (
  <UserContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated }}>
    {children}
  </UserContext.Provider>
  )
}


