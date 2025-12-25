import { useState } from 'react'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";

import Home from "./Page/Home"
import Login from "./Page/Login"
import Register from "./Page/Register"
import Account from "./Page/Account"
import Dresses from "./Page/Dresses"
import Bottoms from "./Page/Bottoms"
import Splashscreen from './Components/Splashscreen'
import OuterWear from './Page/OuterWear';
import Tops from './Page/Tops';
import KnitWear from './Page/KnitWear';
import ProtectedRoute from './Page/ProtectedRoute';
import ButtonNav from "./Page/BottomNav";
import Wishlist from './Page/Wishlist';
import Cart from './Page/Cart';
import DressDetails from './Page/DressDetails';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Splashscreen onFinish={() => setLoading(false)} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/outerwear" element={<OuterWear />} />
        <Route path="/tops" element={<Tops />} />
        <Route path="/bottoms" element={<Bottoms />} />
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/knitwear" element={<KnitWear />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route path="/buttonNav" element={<ButtonNav />} />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route path="/dress/:id" element={<DressDetails />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        closeButton={false}
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;

