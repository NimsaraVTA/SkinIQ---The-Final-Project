import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SkinIQ from './SkinIQ.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SkinIQ />
  </StrictMode>,
)
