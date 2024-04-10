import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import theme from './theme';
// import { CssBaseline } from '@mui/material';

// import { ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
      <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>,
);

