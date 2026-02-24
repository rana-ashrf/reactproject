import { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/OrderReview.css";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

function OrderReview() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);

  const [address, setAddress] = useState(null); // 👈 address from json-server

  /* ================= LOAD COUPONS (localStorage) ================= */
  useEffect(() => {
  const fetchCoupons = async () => {
    try {
      const res = await axios.get("http://localhost:5000/coupons");
      setCoupons(res.data);
    } catch (err) {
      console.error("Failed to load coupons:", err);
    }
  };
  fetchCoupons();
}, []);

  /* ================= LOAD ADDRESS (json-server) ================= */
  useEffect(() => {
    if (!user) return;

    const fetchAddress = async () => {
      try {
        // get default address for this user
        const res = await axios.get(
          `http://localhost:5000/addresses?userId=${user.id}&isDefault=true`
        );
        setAddress(res.data[0] || null);
      } catch (err) {
        console.error("Failed to load address:", err);
      }
    };

    fetchAddress();
  }, [user]);

  /* ================= TOTAL ================= */
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const isExpired = (expiry) => new Date(expiry) < new Date();

  /* ================= APPLY COUPON ================= */
  const applyCoupon = () => {
    const coupon = coupons.find(
      (c) =>
        c.code === couponCode.toUpperCase() &&
        c.active
    );

    if (!coupon) return toast.error("Invalid coupon");
    if (coupon.used) return toast.error("Coupon already used");
    if (isExpired(coupon.expiry)) return toast.error("Coupon expired");

    // ✅ Minimum order check
    if (total < coupon.minAmount) {
      return toast.error(`Minimum order ₹${coupon.minAmount} required`);
    }

    const discountAmount =
      coupon.type === "percentage"
        ? (total * coupon.value) / 100
        : coupon.value;

    if (discountAmount <= 0) return toast.error("Invalid discount");

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

  /* ================= PLACE ORDER (JSON-SERVER) ================= */
  const placeOrder = async () => {
    if (cart.length === 0) return;

    if (!address) {
      toast.error("Please add a delivery address");
      return;
    }

    try {
      const today = new Date();
      const delivery = new Date();
      delivery.setDate(today.getDate() + 7);

      const newOrder = {
        // json-server will create numeric id
        userId: user.id,
        items: cart, // cart items snapshot
        status: "Placed",
        orderDate: today.toISOString(),      // ISO is good for sorting
        deliveryDate: delivery.toISOString(),
        totalAmount: finalAmount,
        coupon: appliedCoupon,
        discount,
        address, // 👈 snapshot of current address object
      };

      // ✅ save to /orders in db.json
      const res = await axios.post(
        "http://localhost:5000/orders",
        newOrder
      );

      // mark coupon as used (still in localStorage)
      if (appliedCoupon) {
  const coupon = coupons.find((c) => c.code === appliedCoupon);
  if (coupon) {
    await axios.patch(
      `http://localhost:5000/coupons/${coupon.id}`,
      { used: true }
    );
    setCoupons(
      coupons.map((c) =>
        c.id === coupon.id ? { ...c, used: true } : c
      )
    );
  }
}

      clearCart();
      toast.success(`Order #${res.data.id} placed successfully`);
      navigate("/order-success");
    } catch (err) {
      console.error("Place order error:", err);
      toast.error("Could not place order. Please try again.");
    }
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
            <p>
              <b>{address.name}</b>
            </p>
            <p>
              {address.house}, {address.area}
            </p>
            <p>
              {address.city}, {address.state} - {address.pincode}
            </p>
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
            <p className="price">₹{item.price * item.qty}</p>
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