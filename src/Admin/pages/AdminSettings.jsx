import AdminSidebar from "../components/AdminSidebar";
import { useAdminAuth } from "../../Context/AdminAuthContext";

function AdminSettings() {
  const { adminLogout } = useAdminAuth();

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <main style={{ marginLeft: "260px", padding: "30px", width: "100%" }}>
        <h2>Admin Settings</h2>

        <p>Admin Email: admin@gmail.com</p>

        <button
          style={{ background: "red", color: "white", padding: "10px" }}
          onClick={adminLogout}
        >
          Logout Admin
        </button>
      </main>
    </div>
  );
}

export default AdminSettings;
