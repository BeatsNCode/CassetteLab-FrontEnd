import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('ProtectedRoute must be used within a UserContextProvider');
  }

  const { user, loading } = context;

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return user && user.isLoggedIn ? <>{children}</> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
