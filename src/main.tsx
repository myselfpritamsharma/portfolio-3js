import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register service worker in production for offline support.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/portfolio-3js/sw.js', { scope: '/portfolio-3js/' })
      .catch(() => {
        // SW registration is best-effort; silent fail is acceptable.
      });
  });
}
