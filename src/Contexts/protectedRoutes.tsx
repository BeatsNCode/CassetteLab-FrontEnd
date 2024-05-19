import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './userContext';

const ProtectedRoute = ({}: {children: React.ReactNode}) => {
  const { user } = React.useContext(UserContext);

  return user && user.isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;