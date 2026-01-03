import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { WishlistProvider } from './Context/WishlistContext'
import { CartProvider } from './Context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <App/>
        </CartProvider>
      </WishlistProvider>     
    </AuthProvider>    
    </BrowserRouter>
  </StrictMode>,
)
