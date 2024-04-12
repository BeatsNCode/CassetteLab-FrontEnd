import theme from './theme';
import { ThemeProvider,  } from '@mui/material/styles';
import AppBar from './components/shared/NavBar.tsx';
import { CssBaseline } from '@mui/material';

function App() { 

  return (
    <>
    <ThemeProvider theme={theme}>
      <AppBar></AppBar>
      <CssBaseline />
    </ThemeProvider>
    </>
  )
}

export default App
