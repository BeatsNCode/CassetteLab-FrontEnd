import { createBrowserRouter } from "react-router-dom";
import Homepage from './components/UI/UIHomePage.tsx';
import SignUp from './components/UI/signUp.tsx';
import SignIn from './components/UI/signIn.tsx';
import AccountHomePage from './components/UI/accountPage.tsx';


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
      element: <AccountHomePage />
  },
  ]);

export default router;