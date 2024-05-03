import * as React from 'react';
import * as ReactDOM from 'react-dom';
import theme from './theme';
import { ThemeProvider,  } from '@mui/material/styles';
import AppBar from './components/shared/NavBar.tsx';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from "react-router-dom";
import router from './router.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() { 


  return (
    <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH as string}>
      <ThemeProvider theme={theme}>
          <AppBar></AppBar>
          <CssBaseline />
          <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
    </>
  )
}

export default App;
