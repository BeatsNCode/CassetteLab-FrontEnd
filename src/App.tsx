import * as React from 'react';
import * as ReactDOM from 'react-dom';
import theme from './theme';
import { ThemeProvider,  } from '@mui/material/styles';
import AppBar from './components/shared/NavBar.tsx';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from "react-router-dom";
import router from './router.tsx';

function App() { 
  

  return (
    <>
    <ThemeProvider theme={theme}>
      <AppBar></AppBar>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
    </>
  )
}

export default App;
