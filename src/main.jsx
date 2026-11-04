import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "../public/css/fonts.css";
// fons awesome
import "../public/css/allfony.css";
import "../public/js/allfont.js";

// react router 
import {BrowserRouter  } from "react-router";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
