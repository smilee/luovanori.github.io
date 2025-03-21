import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.tsx'
import P2FortuneTeller from './pages/P2FortuneTellerPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/p2" element={<P2FortuneTeller />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
