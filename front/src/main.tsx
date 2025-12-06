import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/dark.css'
import './styles/light.css'
import './styles/index.css'
import './styles/Button.css'
import './styles/Table.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
