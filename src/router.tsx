import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    createBrowserRouter as Router,
    RouterProvider,
    createBrowserRouter,
  } from "react-router-dom";
import Homepage from './components/UI/UIHomePage.tsx';
import SignUp from './components/UI/signUp.tsx';
import SignIn from './components/UI/signIn.tsx';


  const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />
    }
  //   },
  //   {
  //       path: '/sign-up',
  //       element: <SignUp />
  //   },
  //   {
  //       path: 'sign-in',
  //       element: <SignIn />
  //   }
  ]);

export default router;