import React, { createContext } from 'react';

export type AuthUser = {
  id: any,
  isLoggedIn: any
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

  React.useEffect(() => {
    const token = window.localStorage.getItem("CLabLogin");
    const id = window.localStorage.getItem("CLU");
    if (id) {

      setUser({ id: id, isLoggedIn: token })

    }
  }, []);

  return  (
  <UserContext.Provider value={{user, setUser }}>
    {children}
  </UserContext.Provider>
  )
}


