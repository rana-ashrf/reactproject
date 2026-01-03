import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/OrderReview.css";

function OrderReview() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const address = JSON.parse(localStorage.getItem("address"));

  /* COUPON RULES */
  const coupons = [
    {
      code: "SAVE20",
      type: "percent",
      value: 20,
      minAmount: 1999,
      expiry: "2025-12-31",
      used: false,
    },
    {
      code: "FIRSTBUY",
      type: "flat",
      value: 300,
      minAmount: 0,
      expiry: "2025-01-05",
      used: true,
    },
    {
      code: "FESTIVE10",
      type: "percent",
      value: 10,
      minAmount: 0,
      expiry: "2024-12-10",
      used: false,
    },
    {
      code: "NORETURN5OFF",
      type: "percent",
      value: 10,
      minAmount: 0,
      expiry: "2026-02-10",
      used: false,
    }
  ];

  /* CHECK EXPIRY */
  const isExpired = (expiry) => {
    return new Date(expiry) < new Date();
  };

  /* APPLY COUPON */
  const applyCoupon = () => {
    const coupon = coupons.find(
      (c) => c.code === couponCode.toUpperCase()
    );

    if (!coupon) {
      toast.error("Invalid coupon code");
      return;
    }

    if (coupon.used) {
      toast.error("This coupon is already used");
      return;
    }

    if (isExpired(coupon.expiry)) {
      toast.error("This coupon has expired");
      return;
    }

    if (total < coupon.minAmount) {
      toast.error(`Minimum order ₹${coupon.minAmount} required`);
      return;
    }

    let discountAmount = 0;

    if (coupon.type === "percent") {
      discountAmount = (total * coupon.value) / 100;
    } else {
      discountAmount = coupon.value;
    }

    setDiscount(discountAmount);
    setAppliedCoupon(coupon.code);
    toast.success(`Coupon ${coupon.code} applied`);
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const finalAmount = total - discount;

  /* PLACE ORDER */
  const placeOrder = () => {
    if (cart.length === 0) return;

    const today = new Date();
    const delivery = new Date();
    delivery.setDate(today.getDate() + 7);

    const newOrder = {
      id: "ORD" + Date.now(),
      items: cart,
      status: "Placed",
      orderDate: today.toDateString(),
      deliveryDate: delivery.toDateString(),
      totalAmount: finalAmount,
      coupon: appliedCoupon,
      discount,
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    clearCart();
    navigate("/order-success");
  };

  return (
    <div className="checkout-container">

      {/* ADDRESS */}
      <div
        className="address-card"
        onClick={() => navigate("/add-address")}
      >
        {address ? (
          <>
            <p><b>{address.name}</b></p>
            <p>{address.house}, {address.area}</p>
            <p>{address.city}, {address.state} - {address.pincode}</p>
            <p>📞 {address.phone}</p>
          </>
        ) : (
          <p>Add delivery address</p>
        )}
        <span className="change-btn">
          {address ? "Change" : "Add"}
        </span>
      </div>

      {/* PRODUCTS */}
      {cart.map((item) => (
        <div className="checkout-product-card" key={item.id}>
          <img src={item.image} alt={item.title} />
          <div>
            <p>{item.title}</p>
            <p>Qty: {item.qty}</p>
            <p>₹{item.price * item.qty}</p>
          </div>
        </div>
      ))}

      {/* COUPON */}
      <div className="coupon-card">
        {appliedCoupon ? (
          <div className="coupon-applied">
            <span>Coupon Applied: {appliedCoupon}</span>
            <button onClick={removeCoupon}>Remove</button>
          </div>
        ) : (
          <div className="coupon-input">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={applyCoupon}>Apply</button>
          </div>
        )}
      </div>

      {/* PRICE */}
      <div className="price-card">
        <div className="row">
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>

        {discount > 0 && (
          <div className="row">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}

        <div className="row total">
          <span>Payable Amount</span>
          <span>₹{finalAmount}</span>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="payment-card">
        <label>
          <input type="radio" defaultChecked />
          Cash On Delivery
        </label>
      </div>

      <button
        className="place-order-btn"
        onClick={placeOrder}
        disabled={cart.length === 0}
      >
        PLACE ORDER
      </button>

    </div>
  );
}

export default OrderReview;
