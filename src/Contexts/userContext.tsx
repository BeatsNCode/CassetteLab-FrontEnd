import React, { createContext } from 'react';

export type AuthUser = {
  id: number,
  isLoggedIn: boolean
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
    const logString = window.localStorage.getItem("CLabLogin");
    const clu = window.localStorage.getItem("CLU") ;
    const loggedInBool = logString ? JSON.parse(logString) : null;
    const id = clu ? parseInt(clu, 10) : null;

    if (id) {

      setUser({ id: id, isLoggedIn: loggedInBool })

    }
  }, []);

  return  (
  <UserContext.Provider value={{user, setUser }}>
    {children}
  </UserContext.Provider>
  )
}


