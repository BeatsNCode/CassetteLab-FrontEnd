import React, { createContext, useMemo } from 'react';


export type AuthUser = {
  id: number,
  isLoggedIn: boolean,
  CLToken: any,
  isNewUser: boolean
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
        const token = window.localStorage.getItem("CLToken");
        const id = clu ? parseInt(clu, 10) : null;
        const userType = window.localStorage.getItem("isNewUser");
        const newUserBool = userType ? JSON.parse(userType) : null;

    
        if (id !== null) {
    
          setUser({ id: id, isLoggedIn: loggedInBool, CLToken: token, isNewUser: newUserBool })

    
        }
      } catch (error) {
          console.error('Failed to fetch user data', error);
      } finally { 
        setLoading(false)
      }
    };

    fetchUser()
  }, []);

  const contextValue = useMemo(() => ({ user, setUser, loading }), [user, loading]);

  return  (
  <UserContext.Provider value={contextValue}>
    {children}
  </UserContext.Provider>
  )
}


