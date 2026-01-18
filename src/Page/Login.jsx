import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import Navbar from "./Navbar";

function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 🔒 Already logged in protection
  useEffect(() => {
    if (user) {
      navigate("/account", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/users?email=${form.email}&password=${form.password}`
      );

      if (res.data.length > 0) {
        const loggedUser = res.data[0];

        /* 🚫 BLOCKED USER CHECK (NEW) */
        if (loggedUser.blocked) {
          toast.error("Your account has been blocked by admin");
          return;
        }

        toast.success("Login successful ✨");
        login(loggedUser);
        navigate("/account", { replace: true });
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Navbar textColor="black" />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-center text-2xl font-semibold">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            className="border w-full p-2 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            className="border w-full p-2 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition">
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-black font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
