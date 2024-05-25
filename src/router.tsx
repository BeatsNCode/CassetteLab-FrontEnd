import { createBrowserRouter } from "react-router-dom";
import Homepage from './components/UI/Pages/UIHomePage.tsx';
import SignUp from './components/UI/Auth/signUp.tsx';
import SignIn from './components/UI/Auth/signIn.tsx';
import AccountPage from './components/UI/Pages/accountPage.tsx';
import ArtistRegistrationPage from './components/UI/Pages/artistRegistrationPage.tsx';
import ArtistProfilePage from "./components/UI/Pages/artistProfilePage.tsx";
import AccountDashboard from './components/UI/Pages/artistDashboard.tsx';
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
      path: '/account',
      element: (
        <ProtectedRoute>
          <AccountPage />
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
          <AccountDashboard />
        </ProtectedRoute>
      )
    }
  ]);

export default router;