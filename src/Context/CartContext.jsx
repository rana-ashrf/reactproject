import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage initially
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  const addToCart = (product, size) => {
    const exists = cart.find(
      (item) => item.id === product.id && item.size === size
    );

    if (exists) return;

    setCart([...cart, { ...product, size, qty: 1 }]);
  };

  // CHECK IF PRODUCT IS IN CART
  const isInCart = (id, size) => {
    return cart.some((item) => item.id === id && item.size === size);
  };

  // REMOVE FROM CART
  const removeFromCart = (id, size) => {
    setCart(cart.filter((item) => !(item.id === id && item.size === size)));
  };

  // UPDATE QUANTITY
  const updateQty = (id, size, qty) => {
    if (qty < 1) return;
    setCart(
      cart.map((item) =>
        item.id === id && item.size === size ? { ...item, qty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        isInCart,
        removeFromCart,
        updateQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
