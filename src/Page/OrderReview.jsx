import { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/OrderReview.css";
import { useAuth } from "../Context/AuthContext";

function OrderReview() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);

  /* ================= LOAD COUPONS ================= */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("coupons")) || [];
    setCoupons(stored);
  }, []);

  /* ================= TOTAL ================= */
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const address = JSON.parse(
    localStorage.getItem(`address_${user.id}`)
  );

  const isExpired = (expiry) =>
    new Date(expiry) < new Date();

  /* ================= APPLY COUPON ================= */
  const applyCoupon = () => {
    const coupon = coupons.find(
      (c) =>
        c.code === couponCode.toUpperCase() &&
        c.active
    );

    if (!coupon) return toast.error("Invalid coupon");
    if (coupon.used) return toast.error("Coupon already used");
    if (isExpired(coupon.expiry))
      return toast.error("Coupon expired");

    /* ✅ MINIMUM ORDER CHECK (FIX) */
    if (total < coupon.minAmount) {
      return toast.error(
        `Minimum order ₹${coupon.minAmount} required`
      );
    }

    const discountAmount =
      coupon.type === "percentage"
        ? (total * coupon.value) / 100
        : coupon.value;

    if (discountAmount <= 0)
      return toast.error("Invalid discount");

    setDiscount(discountAmount);
    setAppliedCoupon(coupon.code);

    toast.success(`Coupon ${coupon.code} applied`);
  };

  /* ================= REMOVE COUPON ================= */
  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const finalAmount = total - discount;

  /* ================= PLACE ORDER ================= */
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

    const ordersKey = `orders_${user.id}`;
    const existingOrders =
      JSON.parse(localStorage.getItem(ordersKey)) || [];

    localStorage.setItem(
      ordersKey,
      JSON.stringify([newOrder, ...existingOrders])
    );

    /* MARK COUPON AS USED */
    if (appliedCoupon) {
      const updatedCoupons = coupons.map((c) =>
        c.code === appliedCoupon
          ? { ...c, used: true }
          : c
      );
      localStorage.setItem(
        "coupons",
        JSON.stringify(updatedCoupons)
      );
    }

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
        <div
          className="checkout-product-card"
          key={`${item.id}-${item.size}`}
        >
          <img src={item.image} alt={item.title} />
          <div>
            <p>{item.title}</p>
            <p>Qty: {item.qty}</p>
            <p className="price">
              ₹{item.price * item.qty}
            </p>
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

      {/* PRICE DETAILS */}
      <div className="price-card">
        <div className="row">
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>

        {discount > 0 && (
          <div className="row discount">
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
