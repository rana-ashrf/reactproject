import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretCode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (form.secretCode !== "ADMIN2025") {
      alert("Invalid Admin Secret Code");
      return;
    }

    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    const exists = admins.some((a) => a.email === form.email);
    if (exists) {
      alert("Admin already exists");
      return;
    }

    const newAdmin = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      role: "admin",
      active: true,
    };

    localStorage.setItem("admins", JSON.stringify([...admins, newAdmin]));

    alert("Admin registered successfully");
    navigate("/admin/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f8f8, #eaeaea)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "380px",
          background: "#fff",
          padding: "35px",
          borderRadius: "14px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "5px" }}>
          Admin Registration
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "gray",
            marginBottom: "25px",
          }}
        >
          Authorized personnel only
        </p>

        <input
          type="text"
          name="name"
          placeholder="Admin Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="secretCode"
          placeholder="Admin Secret Code"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "black",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "5px",
          }}
        >
          Register Admin
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            fontSize: "13px",
          }}
        >
          Already an admin?{" "}
          <span
            onClick={() => navigate("/admin/login")}
            style={{
              color: "black",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
};

export default AdminRegister;
