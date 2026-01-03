import { useCart } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return <h2 className="empty">Your cart is empty 🛒</h2>;
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cart.map((item) => (
        <Link key={item.id} to={`http://localhost:5174${item.url}/${item.id}`}>
          <div
            className="cart-item"
            key={`${item.id}-${item.size}`}
          >
            <img src={item.image} alt={item.title} />

            <div className="cart-info">
              <h4>{item.title}</h4>
              <p>Size: {item.size}</p>
              <p>₹{item.price}</p>

              <div className="qty">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQty(item.id, item.size, item.qty - 1);
                  }}
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQty(item.id, item.size, item.qty + 1);
                  }}
                >
                  +
                </button>
              </div>

              <button
                className="remove"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromCart(item.id, item.size);
                }}
              >
                Remove
              </button>


            </div>
          </div></Link>
      ))}

      {/* ✅ CHECKOUT FOOTER */}
      <div className="cart-footer">
        <h3>Total: ₹{subtotal}</h3>
        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
