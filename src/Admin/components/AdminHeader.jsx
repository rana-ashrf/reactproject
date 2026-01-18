function AdminHeader() {
  return (
    <div style={header}>
      {/* LEFT */}
      <div>
        <h2 style={{ margin: 0 }}>Hello, Admin 👋</h2>
        
      </div>

     

      {/* RIGHT */}
      <div style={rightSection}>
       

        <div style={profile}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4159/4159471.png"
            alt="admin"
            style={avatar}
          />
          <span style={{ fontSize: 14 }}>Admin</span>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;

/* ---------------- STYLES ---------------- */

const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  background: "white",
  padding: "16px 24px",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
  flexWrap: "wrap",
};

const searchWrap = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
};

const searchInput = {
  width: "100%",
  maxWidth: "320px",
  padding: "10px 14px",
  borderRadius: "999px",
  border: "1px solid #e5e7eb",
  outline: "none",
};

const rightSection = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const iconBtn = {
  background: "#f3f4f6",
  border: "none",
  borderRadius: "10px",
  padding: "10px",
  cursor: "pointer",
  fontSize: "18px",
};

const profile = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "#f9fafb",
  padding: "6px 12px",
  borderRadius: "999px",
};

const avatar = {
  width: 36,
  height: 36,
  borderRadius: "50%",
};
