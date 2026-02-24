import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import StatCard from "../components/StatCard";
import AdminHeader from "../components/AdminHeader";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [salesView, setSalesView] = useState("monthly");
  const [salesChartData, setSalesChartData] = useState([]);

  const [shipment, setShipment] = useState({
    placed: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    returned: 0,
  });

  const [hoverInfo, setHoverInfo] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, [salesView]);

  const loadDashboardData = async () => {
    // USERS
    const usersRes = await axios.get("http://localhost:5000/users");
    const users = usersRes.data;

    // PRODUCTS
    const categories = ["dresses", "Tops", "bottoms", "knitwear", "outerwear"];
    let allProducts = [];

    for (let cat of categories) {
      const res = await axios.get(`http://localhost:5000/${cat}`);
      allProducts = [...allProducts, ...res.data];
    }

    // ✅ ORDERS FROM JSON-SERVER
    const ordersRes = await axios.get("http://localhost:5000/orders");
    const allOrdersRaw = ordersRes.data;

    // Attach customer name for display
    const allOrders = allOrdersRaw.map((o) => {
      const user = users.find((u) => u.id === o.userId);
      return {
        ...o,
        customerName: user ? user.username : "Unknown",
      };
    });

    // REVENUE – sum only delivered orders
    const revenue = allOrders.reduce(
      (sum, o) => (o.status === "Delivered" ? sum + (o.totalAmount || 0) : sum),
      0
    );

    // SHIPMENT COUNTS
    const ship = {
      placed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      returned: 0,
    };

    allOrders.forEach((o) => {
      if (o.status === "Placed") ship.placed++;
      if (o.status === "Shipped") ship.shipped++;
      if (o.status === "Delivered") ship.delivered++;
      if (o.status === "Cancelled") ship.cancelled++;
      if (o.status === "Returned") ship.returned++;
    });

    setShipment(ship);

    setStats({
      products: allProducts.length,
      users: users.length,
      orders: allOrders.length,
      revenue,
    });

    // RECENT ORDERS (latest 5)
    setRecentOrders(
      [...allOrders]
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, 5)
    );

    setSalesChartData(buildSalesChart(allOrders, salesView));
  };

  const buildSalesChart = (orders, view) => {
    const delivered = orders.filter((o) => o.status === "Delivered");

    if (view === "monthly") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const map = {};
      months.forEach((m) => (map[m] = 0));
      delivered.forEach((o) => {
        const m = months[new Date(o.orderDate).getMonth()];
        map[m] += o.totalAmount || 0;
      });
      return months.map((m) => ({ name: m, sales: map[m] }));
    }

    if (view === "weekly") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const map = {};
      delivered.forEach((o) => {
        const d = days[new Date(o.orderDate).getDay()];
        map[d] = (map[d] || 0) + (o.totalAmount || 0);
      });
      return Object.keys(map).map((d) => ({ name: d, sales: map[d] }));
    }

    // yearly
    const map = {};
    delivered.forEach((o) => {
      const y = new Date(o.orderDate).getFullYear();
      map[y] = (map[y] || 0) + (o.totalAmount || 0);
    });
    return Object.keys(map).map((y) => ({ name: y, sales: map[y] }));
  };

  const totalShipments =
    shipment.placed +
      shipment.shipped +
      shipment.delivered +
      shipment.cancelled +
      shipment.returned || 1;

  const pPlaced = (shipment.placed / totalShipments) * 100;
  const pShipped = (shipment.shipped / totalShipments) * 100;
  const pDelivered = (shipment.delivered / totalShipments) * 100;
  const pCancelled = (shipment.cancelled / totalShipments) * 100;

  const handleDonutHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 80;
    const y = e.clientY - rect.top - 80;
    const angle = (Math.atan2(y, x) * 180) / Math.PI + 180;

    let start = 0;
    const ranges = [
      { label: "Placed", value: shipment.placed, percent: pPlaced },
      { label: "Shipped", value: shipment.shipped, percent: pShipped },
      { label: "Delivered", value: shipment.delivered, percent: pDelivered },
      { label: "Cancelled", value: shipment.cancelled, percent: pCancelled },
    ];

    for (let r of ranges) {
      if (angle >= start && angle < start + r.percent * 3.6) {
        setHoverInfo({ ...r, x: e.clientX, y: e.clientY });
        return;
      }
      start += r.percent * 3.6;
    }
    setHoverInfo(null);
  };

  return (
    <div
      style={{ display: "flex", background: "#f3f4f6", minHeight: "100vh" }}
    >
      <AdminSidebar />

      <main style={{ marginLeft: 260, padding: 30, width: "100%" }}>
        <AdminHeader />

        <div style={{ height: 24 }} />

        <div style={statsGrid}>
          <StatCard
            title="Total Sales"
            value={`₹${stats.revenue}`}
            icon="💰"
          />
          <StatCard title="Total Orders" value={stats.orders} icon="🧾" />
          <StatCard title="Total Products" value={stats.products} icon="📦" />
          <StatCard title="Total Users" value={stats.users} icon="👥" />
        </div>

        <div style={grid2}>
          {/* SALES */}
          <div style={card}>
            <div style={cardHeader}>
              <h3>Sales Report</h3>
              <select
                value={salesView}
                onChange={(e) => setSalesView(e.target.value)}
                style={select}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div style={{ width: "100%", minWidth: 0 }}>
              {salesChartData.length > 0 && (
                <ResponsiveContainer width="100%" aspect={3}>
                  <AreaChart data={salesChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#6366f1"
                      fill="#c7d2fe"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* SHIPMENT */}
          <div style={card}>
            <h3>Shipment Status</h3>

            <div style={donutWrapper}>
              <div
                style={{
                  ...donut,
                  background: `
                    conic-gradient(
                      #facc15 0% ${pPlaced}%,
                      #3b82f6 ${pPlaced}% ${pPlaced + pShipped}%,
                      #22c55e ${pPlaced + pShipped}% ${
                    pPlaced + pShipped + pDelivered
                  }%,
                      #ef4444 ${
                        pPlaced + pShipped + pDelivered
                      }% 100%
                    )
                  `,
                }}
                onMouseMove={handleDonutHover}
                onMouseLeave={() => setHoverInfo(null)}
              />
            </div>

            {hoverInfo && (
              <div
                style={{
                  position: "fixed",
                  top: hoverInfo.y + 10,
                  left: hoverInfo.x + 10,
                  background: "#111",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: 6,
                  fontSize: 12,
                }}
              >
                {hoverInfo.label}: {hoverInfo.percent.toFixed(1)}%
              </div>
            )}

            <div style={legend}>
              <Legend label="Placed" value={shipment.placed} />
              <Legend label="Shipped" value={shipment.shipped} />
              <Legend label="Delivered" value={shipment.delivered} />
              <Legend label="Cancelled" value={shipment.cancelled} />
            </div>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div style={{ ...card, marginTop: 32 }}>
          <h3 style={{ marginBottom: 12 }}>Recent Orders</h3>

          <table style={recentTable}>
            <thead>
              <tr>
                <th style={th}>Order</th>
                <th style={th}>Customer</th>
                <th style={th}>Status</th>
                <th style={th}>Total</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((o) => (
                <tr
                  key={o.id}
                  style={tr}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={td}>#{o.id}</td>
                  <td style={td}>{o.customerName}</td>
                  <td style={td}>
                    <span
                      style={{
                        ...statusBadge,
                        background:
                          o.status === "Delivered"
                            ? "#dcfce7"
                            : o.status === "Shipped"
                            ? "#dbeafe"
                            : o.status === "Cancelled"
                            ? "#fee2e2"
                            : "#fef3c7",
                        color:
                          o.status === "Delivered"
                            ? "#166534"
                            : o.status === "Cancelled"
                            ? "#991b1b"
                            : "#92400e",
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td style={td}>₹{o.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;

/* ===== SMALL COMPONENTS ===== */
const Legend = ({ label, value }) => (
  <p style={{ fontSize: 13 }}>
    {label}: {value}
  </p>
);

/* ===== STYLES ===== */

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 24,
  marginTop: 32,
};

const card = {
  background: "white",
  padding: 20,
  borderRadius: 16,
  minWidth: 0,
  overflow: "hidden",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const select = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
};

const donutWrapper = {
  display: "flex",
  justifyContent: "center",
  margin: 20,
};

const donut = {
  width: 160,
  height: 160,
  borderRadius: "50%",
};

const legend = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
};

/* ===== RECENT ORDERS STYLES ===== */

const recentTable = {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",
};

const th = {
  textAlign: "center",
  padding: "12px",
  fontSize: 13,
  color: "#475569",
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "12px",
  fontSize: 14,
  borderBottom: "1px solid #f1f5f9",
};

const tr = {
  transition: "background 0.2s",
};

const statusBadge = {
  padding: "4px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};