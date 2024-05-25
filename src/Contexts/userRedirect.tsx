import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';

const withRedirectToDashboard = (Component: any) => {
  const RedirectComponent = (props: any) => {
    const { user } = useContext(UserContext);

    if (user && user.isLoggedIn && !user.isNewUser) {
      return <Navigate to="/dashboard" />;
    }

    if (user && user.isLoggedIn && user.isNewUser) {
      return <Navigate to="/artist-new" />;
    }

    return <Component {...props} />;
  };

  return RedirectComponent;
};

export default withRedirectToDashboard;
