import { createBrowserRouter } from "react-router-dom";
import Homepage from './components/UI/Pages/UIHomePage.tsx';
import SignUp from './components/UI/Auth/signUp.tsx';
import SignIn from './components/UI/Auth/signIn.tsx';
import AccountHomePage from './components/UI/Pages/accountPage.tsx';
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
          <AccountHomePage />
        </ProtectedRoute>
      )
    },
  ]);

export default router;