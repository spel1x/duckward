import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import App from './App'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#282c34',
      paper: '#21252b'
    },
    primary: {
      main: '#61afef'
    },
    secondary: {
      main: '#c678dd'
    },
    error: {
      main: '#e06c75'
    },
    success: {
      main: '#98c379'
    },
    text: {
      primary: '#abb2bf',
      secondary: '#5c6370'
    },
    divider: '#3e4452'
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
)
