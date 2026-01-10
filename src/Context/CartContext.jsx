import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";
import { getFinalPrice } from "../utils/price";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const initializedRef = useRef(false);


  useEffect(() => {
    if (!user) return;

    const saved =
      JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];

    setCart(saved);
    initializedRef.current = true;
  }, [user]);

  
  useEffect(() => {
    if (!user) return;
    if (!initializedRef.current) return;

    localStorage.setItem(
      `cart_${user.id}`,
      JSON.stringify(cart)
    );
  }, [cart, user]);

  //ADD TO CART 
  const addToCart = (product, size) => {
    const finalPrice = getFinalPrice(
      product.price,
      product.discount
    );

    const exists = cart.find(
      (item) => item.id === product.id && item.size === size
    );

    if (exists) return;

    setCart([
      ...cart,
      {
        ...product,
        price: finalPrice,
        originalPrice: product.price,
        size,
        qty: 1,
        userId: user.id
      },
    ]);
  };

  const isInCart = (id, size) =>
    cart.some(item => item.id === id && item.size === size);

  const removeFromCart = (id, size) => {
    setCart(
      cart.filter(
        item => !(item.id === id && item.size === size)
      )
    );
  };

  const updateQty = (id, size, qty) => {
    if (qty < 1) return;
    setCart(
      cart.map(item =>
        item.id === id && item.size === size
          ? { ...item, qty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

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
