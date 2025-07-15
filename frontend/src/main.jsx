import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/Provider.jsx'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <Analytics/>
    <AppProvider>
      <App />
    </AppProvider>
    </BrowserRouter>
  
)
