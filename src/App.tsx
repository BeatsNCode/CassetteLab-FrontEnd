import theme from './theme';
import { ThemeProvider,  } from '@mui/material/styles';
import AppBar from './components/shared/NavBar.tsx';
import { CssBaseline } from '@mui/material';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
// } from "react-router-dom";
import Homepage from './components/UI/UIHomePage.tsx';

function App() { 

  return (
    <>
    <ThemeProvider theme={theme}>
      <AppBar></AppBar>
      <CssBaseline />
      {/* <Router>



      </Router> */}
    <Homepage></Homepage>
    </ThemeProvider>
    </>
  )
}

export default App
