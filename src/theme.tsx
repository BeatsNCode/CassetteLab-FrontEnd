import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c0c9c9',
    },
    secondary: {
      main: '#a2a0a0',
    },
    text: {
      primary: '#ff8a80',
    },
    error: {
      main: '#987e7d',
    }
  }
});

export default theme;
