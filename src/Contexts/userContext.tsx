import React, { createContext } from 'react';

export type AuthUser = {
  id: number
}

export type UserContextType = {
  user: any;
  setUser: any;
}

export type UserContextProviderType = {
  children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({children}: UserContextProviderType) => {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  return  (
  <UserContext.Provider value={{user, setUser}}>
    {children}
  </UserContext.Provider>
  )
}
