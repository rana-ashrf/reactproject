import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import {
  FaSearch,
  FaBars,
  FaUser,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

function Navbar({ textColor }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const colorClass = textColor || (isHome ? "white" : "black");

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${isHome ? "bg-transparent" : "bg-white shadow-sm"}
      `}
    >
      {/* NAVBAR CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 grid grid-cols-3 items-center">

        {/* LEFT – MENU */}
        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2">
          <button
            className={`text-4xl text-${colorClass}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* CENTER – LOGO */}
        <div className="flex justify-start col-start-1 col-end-3 pl-8">
          <h2
            onClick={() => navigate("/")}
            className={`text-4xl md:text-7xl font-['Playfair_Display'] tracking-[0.25em] cursor-pointer text-${colorClass}`}
          >
            SALA
          </h2>
        </div>

        {/* RIGHT – ICONS */}
        <div className={`flex items-center justify-end gap-6 text-${colorClass}`}>
          <button onClick={() => navigate("/account")}><FaUser /></button>
          <button onClick={() => navigate("/wishlist")}><FaHeart /></button>
          <button onClick={() => navigate("/cart")}><FaShoppingCart /></button>
        </div>
      </div>

      {/* MOBILE / SIDE MENU */}
      {menuOpen && (
        <div className="absolute left-0 top-16 md:top-20 w-full md:w-64 bg-black/80 backdrop-blur-md px-6 md:px-8 py-6 space-y-5 text-white">
          {[
            { label: "DRESSES", path: "/dresses" },
            { label: "TOPS", path: "/tops" },
            { label: "BOTTOMS", path: "/bottoms" },
            { label: "OUTERWEAR", path: "/outerwear" },
            { label: "KNITWEAR", path: "/knitwear" },
          ].map(item => (
            <p
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false);
              }}
              className="cursor-pointer hover:opacity-70"
            >
              {item.label}
            </p>
          ))}

          {user && (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
                navigate("/");
              }}
              className="w-full py-2 mt-4 border border-white hover:bg-white hover:text-black transition"
            >
              LOGOUT
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
