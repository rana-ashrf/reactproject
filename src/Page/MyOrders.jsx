import { useNavigate } from "react-router-dom";
import "../styles/MyOrders.css";

function MyOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const navigate = useNavigate();

  // CANCEL ORDER
  const cancelOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status: "Cancelled" }
        : order
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    window.location.reload();
  };

  // MARK AS DELIVERED (DEV ONLY)
  const markAsDelivered = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status: "Delivered" }
        : order
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    window.location.reload();
  };

  // HANDLE RETURN
  const handleReturn = (order, item) => {
    const existingReturns =
      JSON.parse(localStorage.getItem("returns")) || [];

    const returnData = {
      orderId: order.id,
      productName: item.title,
      image: item.image,
      size: item.size,
      qty: item.qty,
      orderDate: order.orderDate,
      reason: "Size issue",
      status: "Return Requested",
      refund: null
    };

    localStorage.setItem(
      "returns",
      JSON.stringify([returnData, ...existingReturns])
    );

    navigate("/returns");
  };

  if (orders.length === 0) {
    return <h2 className="empty">No orders yet 📦</h2>;
  }

  return (
    <div className="orders-container">
      <h2 className="text-xl font-semibold">My Orders</h2>
     
      {orders.map(order => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <p><b>Order ID:</b> #{order.id}</p>
            <p className="status">{order.status}</p>
          </div>

          <p>Order Date: {order.orderDate}</p>
          <p>Expected Delivery: {order.deliveryDate}</p>

          {order.items.map(item => (
            <div className="order-item" key={item.id + item.size}>
              <img src={item.image} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <p>Size: {item.size}</p>
                <p>Qty: {item.qty}</p>
                <p>₹{item.price * item.qty}</p>

                {/* RETURN – only after delivery */}
                {order.status === "Delivered" && (
                  <button
                    className="retrn-btn"
                    onClick={() => handleReturn(order, item)}
                  >
                    Return
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* DEV BUTTON – simulate delivery */}
          {order.status !== "Delivered" && order.status !== "Cancelled" && (
            <button
              onClick={() => markAsDelivered(order.id)}
              className="retrn-btn"
            >
              Delivered
            </button>
          )}

          {/* CANCEL – only when placed */}
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
