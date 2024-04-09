// import { useState } from 'react'
import theme from './theme'
import { ThemeProvider,  } from '@mui/material/styles';
import './App.css'


function App() { 

  return (
    <>
    <ThemeProvider theme={theme}>
      <h1>CassetteLab</h1>


    </ThemeProvider>
      
    </>
  )
}

export default App
