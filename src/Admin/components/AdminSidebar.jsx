import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../Context/AdminAuthContext";

function AdminSidebar() {
  const navigate = useNavigate();
  const { adminLogout } = useAdminAuth();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside
      style={{
        width: "240px",
        height: "100vh",
        background: "#111",
        color: "#fff",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h2 style={{ marginBottom: "30px", letterSpacing: "2px" }}>
        ADMIN
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/products">Manage Products</NavLink>
        <NavLink to="/admin/users">Manage Users</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
        <NavLink to="/admin/managesale">Manage Sale</NavLink>
        
      </nav>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "40px",
          padding: "10px",
          background: "red",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;
