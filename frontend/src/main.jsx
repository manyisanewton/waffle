import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SeoProvider } from './components/seo/SeoProvider'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <SeoProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </SeoProvider>
  </StrictMode>
)

if (container?.hasChildNodes()) {
  hydrateRoot(container, app)
} else if (container) {
  createRoot(container).render(app)
}
