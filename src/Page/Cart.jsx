import { useCart } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cart.css";
import Navbar from "./Navbar";

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
      <Navbar textColor="black" />
      <h2 className="text-xl font-semibold mt-18">
        Shopping Cart
      </h2>

      {cart.map((item) => (
        <Link
          key={`${item.productId}-${item.size}`}
          to={`${item.url}/${item.productId}`}
          className="cart-link"
        >
          <div className="cart-item">
            <img src={item.image} alt={item.title} />

            <div className="cart-info">
              <h4>{item.title}</h4>
              <p>Size: {item.size}</p>

              {/* PRICE */}
              <p className="price">
                {item.originalPrice &&
                  item.originalPrice !== item.price && (
                    <span className="old-price">
                      ₹{item.originalPrice}
                    </span>
                  )}
                <span className="new-price">
                  ₹{item.price}
                </span>
              </p>

              {/* QUANTITY */}
              <div className="qty">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQty(
                      item.productId,
                      item.size,
                      item.qty - 1
                    );
                  }}
                >
                  −
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQty(
                      item.productId,
                      item.size,
                      item.qty + 1
                    );
                  }}
                >
                  +
                </button>
              </div>

              {/* REMOVE */}
              <button
                className="remove"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromCart(item.productId, item.size);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </Link>
      ))}

      {/* FOOTER */}
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