import { createBrowserRouter } from "react-router-dom";
import Homepage from './components/UI/Pages/UIHomePage.tsx';
import SignUp from './components/UI/Auth/signUp.tsx';
import SignIn from './components/UI/Auth/signIn.tsx';
import AccountSettingsPage from './components/UI/Pages/accountSettings/accountSettingsPage.tsx';
import ArtistRegistrationPage from './components/UI/Pages/artistPages/artistRegistrationPage.tsx';
import ArtistProfilePage from "./components/UI/Pages/artistPages/artistProfilePage.tsx";
import ArtistDashboard from './components/UI/Pages/artistPages/artistDashboard.tsx';
import ProtectedRoute from './Contexts/protectedRoutes.tsx';

  const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />,
    },
    {
        path: '/sign-up',
        element: <SignUp />
    },
    {
        path: '/sign-in',
        element: <SignIn />
    },
    {
      path: '/settings',
      element: (
        <ProtectedRoute>
          <AccountSettingsPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/artist-new',
      element: (
        <ProtectedRoute>
          <ArtistRegistrationPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <ArtistProfilePage />
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <ArtistDashboard />
        </ProtectedRoute>
      )
    }
  ]);

export default router;