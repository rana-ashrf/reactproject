import { useNavigate } from "react-router-dom";
import "../styles/MyOrders.css";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";

function MyOrders() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const ordersKey = `orders_${user.id}`;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem(ordersKey)) || [];
    setOrders(storedOrders);
  }, [ordersKey]);

  /* ---------------- CANCEL ORDER ---------------- */
  const cancelOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: "Cancelled" }
        : order
    );

    localStorage.setItem(
      ordersKey,
      JSON.stringify(updatedOrders)
    );
    setOrders(updatedOrders);
  };

  /* ---------------- RETURN PRODUCT ---------------- */
  const handleReturn = (order, item) => {
    const returnsKey = `returns_${user.id}`;
    const ordersKey = `orders_${user.id}`;

    /* 1️⃣ SAVE RETURN */
    const existingReturns =
      JSON.parse(localStorage.getItem(returnsKey)) || [];

    const returnData = {
      orderId: order.id,
      productId: item.id,
      productName: item.title,
      image: item.image,
      size: item.size,
      qty: item.qty,
      orderDate: order.orderDate,
      reason: "Size issue",
      status: "Return Requested",
      refund: null,
    };

    localStorage.setItem(
      returnsKey,
      JSON.stringify([returnData, ...existingReturns])
    );

    /* 2️⃣ UPDATE ORDER ITEM STATUS */
    const updatedOrders = orders.map((o) => {
      if (o.id === order.id) {
        return {
          ...o,
          items: o.items.map((i) =>
            i.id === item.id && i.size === item.size
              ? { ...i, returnStatus: "Returned" }
              : i
          ),
        };
      }
      return o;
    });

    localStorage.setItem(
      ordersKey,
      JSON.stringify(updatedOrders)
    );

    navigate("/returns");
  };


  if (orders.length === 0) {
    return <h2 className="empty">No orders yet 📦</h2>;
  }

  return (
    <div className="orders-container">
      <h2 className="text-xl font-semibold">My Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <p>
              <b>Order ID:</b> #{order.id}
            </p>
            <p className="status">{order.status}</p>
          </div>

          <p>Order Date: {order.orderDate}</p>
          <p>Expected Delivery: {order.deliveryDate}</p>

          {order.items.map((item) => (
            <div
              className="order-item"
              key={item.id + item.size}
            >
              <img src={item.image} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <p>Size: {item.size}</p>
                <p>Qty: {item.qty}</p>
                <p>₹{item.price * item.qty}</p>

                {/* ✅ RETURN STATUS */}
                {item.returned && (
                  <p
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    Returned
                  </p>
                )}

                {/* ✅ RETURN BUTTON */}
                {item.returnStatus === "Returned" ? (
                  <span className="text-sm text-green-600 font-medium">
                    Returned
                  </span>
                ) : (
                  order.status === "Delivered" && (
                    <button
                      className="retrn-btn"
                      onClick={() => handleReturn(order, item)}
                    >
                      Return
                    </button>
                  )
                )}

              </div>
            </div>
          ))}

          {/* CANCEL */}
          {order.status === "Placed" && (
            <button
              className="cancel-btn"
              onClick={() => cancelOrder(order.id)}
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
