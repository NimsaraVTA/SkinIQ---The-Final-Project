import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SkinIQ from './SkinIQ.jsx'
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SkinIQ />
  </StrictMode>,
)
