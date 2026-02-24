import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import axios from "axios";
import { getFinalPrice } from "../utils/price";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // LOAD CART FROM API
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/cart?userId=${user.id}`
        );
        setCart(res.data);
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    };

    fetchCart();
  }, [user]);

  // ADD TO CART
  const addToCart = async (product, size) => {
    if (!user) return;

    const finalPrice = getFinalPrice(
      product.price,
      product.discount
    );

    const exists = cart.find(
      (item) =>
        item.productId === product.id && item.size === size
    );
    if (exists) return;

    const payload = {
      userId: user.id,
      productId: product.id, // original product id
      title: product.name,
      image: product.image,
      url: product.url,           // should exist in your db for navigation
      collection: product.collection, // for price sync etc
      size,
      qty: 1,
      price: finalPrice,
      originalPrice: product.price
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/cart",
        payload
      );
      setCart([...cart, res.data]);
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const isInCart = (productId, size) =>
    cart.some(
      (item) =>
        item.productId === productId && item.size === size
    );

  const removeFromCart = async (productId, size) => {
    const item = cart.find(
      (i) => i.productId === productId && i.size === size
    );
    if (!item) return;

    try {
      await axios.delete(
        `http://localhost:5000/cart/${item.id}`
      );
      setCart(cart.filter((i) => i.id !== item.id));
    } catch (err) {
      console.error("Failed to remove cart item", err);
    }
  };

  const updateQty = async (productId, size, qty) => {
    if (qty < 1) return;

    const item = cart.find(
      (i) => i.productId === productId && i.size === size
    );
    if (!item) return;

    try {
      const res = await axios.patch(
        `http://localhost:5000/cart/${item.id}`,
        { qty }
      );
      setCart(
        cart.map((i) => (i.id === item.id ? res.data : i))
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const clearCart = async () => {
    try {
      await Promise.all(
        cart.map((i) =>
          axios.delete(`http://localhost:5000/cart/${i.id}`)
        )
      );
      setCart([]);
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        isInCart,
        removeFromCart,
        updateQty,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);