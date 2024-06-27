import theme from './theme';
import { ThemeProvider,  } from '@mui/material/styles';
import AppBar from './components/shared/NavBar.tsx';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from "react-router-dom";
import router from './router.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserContextProvider } from './Contexts/userContext.tsx';
import { ArtistProvider } from './Contexts/artistContext.tsx';

function App() { 

  return (
    <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH as string}>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <ArtistProvider>
          <AppBar></AppBar>
          <CssBaseline />
          <RouterProvider router={router} />
          </ArtistProvider>
        </UserContextProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
    </>
  )
}

export default App;
