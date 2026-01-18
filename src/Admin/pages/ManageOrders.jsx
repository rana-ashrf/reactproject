import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    const usersRes = await axios.get("http://localhost:5000/users");
    let allOrders = [];

    usersRes.data.forEach((user) => {
      const userOrders =
        JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];

      userOrders.forEach((order) => {
        allOrders.push({
          ...order,
          userId: user.id,
          customer: user.username,
          email: user.email,
        });
      });
    });

    setOrders(allOrders.reverse());
  };

  /* STATS */
  const totalOrders = orders.length;
  const pending = orders.filter((o) => o.status === "Placed").length;
  const shipped = orders.filter((o) => o.status === "Shipped").length;
  const completed = orders.filter((o) => o.status === "Delivered").length;

  /* FILTER */
  const filteredOrders = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toString().includes(search)
  );

  /* UPDATE STATUS */
  const updateStatus = (order, newStatus) => {
    const key = `orders_${order.userId}`;
    const userOrders = JSON.parse(localStorage.getItem(key)) || [];

    const updatedOrders = userOrders.map((o) =>
      o.id === order.id ? { ...o, status: newStatus } : o
    );

    localStorage.setItem(key, JSON.stringify(updatedOrders));
    fetchAllOrders();
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <main style={main}>
        <h2 style={heading}>Orders</h2>

        {/* STATS */}
        <div style={statsGrid}>
          <StatCard label="Total Orders" value={totalOrders} icon="📦" bg="#eef2ff" />
          <StatCard label="Pending" value={pending} icon="⏳" bg="#fef3c7" />
          <StatCard label="Shipped" value={shipped} icon="🚚" bg="#dbeafe" />
          <StatCard label="Completed" value={completed} icon="✅" bg="#dcfce7" />
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

        {/* TABLE */}
        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead style={thead}>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((o) => (
                <tr
                  key={o.id}
                  style={row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td>#{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.orderDate}</td>
                  <td>
                    <span
                      style={{
                        ...badge,
                        background:
                          o.status === "Delivered"
                            ? "#dcfce7"
                            : o.status === "Shipped"
                            ? "#dbeafe"
                            : "#fef3c7",
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td>₹{o.totalAmount}</td>
                  <td>
                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(o, e.target.value)
                      }
                      style={select}
                    >
                      <option value="Placed">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ManageOrders;

/* COMPONENTS */

const StatCard = ({ label, value, icon, bg }) => (
  <div style={{ ...stat, background: bg }}>
    <div style={iconCircle}>{icon}</div>
    <p style={statLabel}>{label}</p>
    <h2 style={statValue}>{value}</h2>
  </div>
);

/* STYLES */

const main = {
  marginLeft: 260,
  padding: 30,
  width: "100%",
  background: "#f1f5f9",
};

const heading = {
  fontSize: 24,
  fontWeight: 700,
  marginBottom: 10,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: 20,
  margin: "25px 0",
};

const stat = {
  padding: 22,
  borderRadius: 18,
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  
};

const iconCircle = {
  fontSize: 30,
  width: 54,
  height: 54,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 10px",
};

const statLabel = {
  color: "#475569",
  fontSize: 14,
  height:"23px"
};

const statValue = {
  fontSize: 20,
  fontWeight: 500,
};

const searchInput = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  marginBottom: 20,
  width: 300,
};

const table = {
  width: "100%",
  background: "white",
  borderRadius: 14,
  borderCollapse: "collapse",
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
};

const thead = {
  background: "#e0e7ff",
  height:"50px"
};

const row = {
  transition: "background 0.2s",
};

const badge = {
  padding: "4px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};

const select = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  background: "#fff",
  cursor: "pointer",
};
