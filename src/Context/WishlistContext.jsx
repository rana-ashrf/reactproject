import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const initializedRef = useRef(false);

  // LOAD WISHLIST 
  useEffect(() => {
    if (!user) return;

    const saved =
      JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];

    setWishlist(saved);

 
    initializedRef.current = true;
  }, [user]);

  
  useEffect(() => {
    if (!user) return;
    if (!initializedRef.current) return;

    localStorage.setItem(
      `wishlist_${user.id}`,
      JSON.stringify(wishlist)
    );
  }, [wishlist, user]);


  const toggleWishlist = (product) => {
    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      setWishlist(
        wishlist.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(
      wishlist.filter(
        (item) => item.id !== productId
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
