import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // LOAD WISHLIST
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/wishlist?userId=${user.id}`
        );
        setWishlist(res.data);
      } catch (err) {
        console.error("Failed to load wishlist", err);
      }
    };

    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (product) => {
    if (!user) return;

    const exists = wishlist.find(
      (item) => item.productId === product.id
    );

    if (exists) {
      try {
        await axios.delete(
          `http://localhost:5000/wishlist/${exists.id}`
        );
        setWishlist(
          wishlist.filter((item) => item.id !== exists.id)
        );
      } catch (err) {
        console.error("Failed to remove wishlist item", err);
      }
    } else {
      const payload = {
        userId: user.id,
        productId: product.id,
        name: product.name,
        image: product.image,
        url: product.url,
        price: product.price,
        discount: product.discount || 0
      };

      try {
        const res = await axios.post(
          "http://localhost:5000/wishlist",
          payload
        );
        setWishlist([...wishlist, res.data]);
      } catch (err) {
        console.error("Failed to add wishlist item", err);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    const exists = wishlist.find(
      (item) => item.productId === productId
    );
    if (!exists) return;

    try {
      await axios.delete(
        `http://localhost:5000/wishlist/${exists.id}`
      );
      setWishlist(
        wishlist.filter((i) => i.id !== exists.id)
      );
    } catch (err) {
      console.error("Failed to remove wishlist item", err);
    }
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