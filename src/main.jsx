import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// After a new deploy, an open tab or a cached page can ask for code chunks that no longer
// exist. Reload once to pick up the new version instead of showing a blank page.
window.addEventListener('vite:preloadError', (event) => {
  let last = 0
  try { last = Number(sessionStorage.getItem('chunk-reload-at')) || 0 } catch { /* storage unavailable */ }
  if (Date.now() - last < 10000) return
  try { sessionStorage.setItem('chunk-reload-at', String(Date.now())) } catch { /* storage unavailable */ }
  event.preventDefault()
  window.location.reload()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)