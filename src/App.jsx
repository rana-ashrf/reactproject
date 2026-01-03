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
import AddAddress from "./Page/AddAddress"
import OrderReview from "./Page/OrderReview";
import MyOrders from './Page/MyOrders';
import OrderSuccess from './Page/OrderSuccess';
import Coupons from "./Page/Coupons";
import Profile from "./Page/Profile";
import Returns from "./Page/Returns";
import ReturnPolicy from "./Page/ReturnPolicy";
import Settings from "./Page/Settings";
import Shipping from "./Page/Shipping";
import Support from "./Page/Support";
import Reviews from "./Page/Reviews";
import AboutUs from './Page/AboutUs';
import TopsDetails from './Page/TopsDetails';
import BottomDetails from './Page/BottomDetails';
import OuterDetails from './Page/OuterDetails';
import KnitDetails from './Page/KnitDetails';
import SearchResults from './Page/SearchResults';
import NewCollection from './Page/NewCollection';
import ProductDetails from "./Page/ProductDetails";
import SalePage from './Page/SalePage';
import SaleProductDetails from './Page/SaleProductDetails';




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
        <Route path="/tops" element={<Tops/>} />
        <Route path="/bottoms" element={<Bottoms />} />
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/knitwear" element={<KnitWear />} />
        <Route path='/checkout'element={<OrderReview/>}/>
        <Route path='add-address' element={<AddAddress/>}/>
        <Route path='/orders' element={<MyOrders/>}/>
        <Route path='/order-success' element={<OrderSuccess/>}/>
        <Route path='/returns' element={<Returns/>}/>
        <Route path='/return-policy' element={<ReturnPolicy/>}/>
        <Route path='/review' element={<Reviews/>}/>
        <Route path='/settings'element={<Settings/>}/>
        <Route path='/shipping' element={<Shipping/>}/>
        <Route path='/support' element={<Support/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/coupons' element={<Coupons/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path="/tops/:id" element={<TopsDetails />}/>
        <Route path='/bottoms/:id' element={<BottomDetails/>}/>
        <Route path='/outerwear/:id' element={<OuterDetails/>}/>
        <Route path='/knitwear/:id' element={<KnitDetails/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/new-collection' element={<NewCollection/>}/>
        <Route path="/product/:category/:id" element={<ProductDetails />} />
        <Route path='/sale' element={<SalePage/>}/>
        <Route path="/sale/:collection/:id" element={<SaleProductDetails />} />
       
    


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

        <Route path="/dresses/:id" element={<DressDetails />} />

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

