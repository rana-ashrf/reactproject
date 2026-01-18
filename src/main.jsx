import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { WishlistProvider } from './Context/WishlistContext'
import { CartProvider } from './Context/CartContext.jsx'
import { AdminAuthProvider } from './Context/AdminAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AdminAuthProvider>
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
  </AdminAuthProvider>
);
