import { useNavigate } from "react-router-dom";
import "../styles/MyOrders.css";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // safety: if not logged in yet, don't call

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/orders?userId=${user.id}`
        );

        // sort by date: latest first
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );

        setOrders(sorted);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const cancelOrder = async (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    try {
      const res = await axios.patch(
        `http://localhost:5000/orders/${orderId}`,
        { status: "Cancelled" }
      );
      setOrders(orders.map((o) => (o.id === orderId ? res.data : o)));
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  const handleReturn = async (order, item) => {
    try {
      const returnData = {
        userId: user.id,
        orderId: order.id,
        productId: item.productId,
        productName: item.title,
        image: item.image,
        size: item.size,
        qty: item.qty,
        orderDate: order.orderDate,
        reason: "Size issue",
        status: "Return Requested",
        refund: null,
      };

      // save return request in json-server
      await axios.post("http://localhost:5000/returns", returnData);

      const updatedOrder = {
        ...order,
        items: order.items.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, returnStatus: "Returned" }
            : i
        ),
      };

      await axios.put(
        `http://localhost:5000/orders/${order.id}`,
        updatedOrder
      );

      setOrders(orders.map((o) => (o.id === order.id ? updatedOrder : o)));

      navigate("/returns");
    } catch (err) {
      console.error("Return error:", err);
    }
  };

  if (!user) {
    return (
      <h2 className="empty">
        Please login to view your orders 🧾
      </h2>
    );
  }

  if (loading) {
    return <h2 className="empty">Loading your orders...</h2>;
  }

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

          <p>
            Order Date:{" "}
            {order.orderDate
              ? new Date(order.orderDate).toDateString()
              : order.orderDate}
          </p>
          <p>
            Expected Delivery:{" "}
            {order.deliveryDate
              ? new Date(order.deliveryDate).toDateString()
              : order.deliveryDate}
          </p>

          {order.items.map((item) => (
            <div
              className="order-item"
              key={item.productId + item.size}
            >
              <img src={item.image} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <p>Size: {item.size}</p>
                <p>Qty: {item.qty}</p>
                <p>₹{item.price * item.qty}</p>

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