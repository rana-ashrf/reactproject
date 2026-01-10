import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import {
  FaSearch,
  FaBars,
  FaUser,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [color, setColor] = useState()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') setColor(true)
    else setColor(false)
  }, [location])


  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${query}`);
  };

 
  const handleAuthNavigate = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 grid grid-cols-3 items-center">

         
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2">
            <button
              className={`text-4xl md:text-4xl ${color ? 'text-black' : 'text-white'} leading-none`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaBars />
            </button>
          </div>

          {/*  Logo */}
          <div className="flex justify-start col-start-1 col-end-3 pl-8">
            <h2
              onClick={() => navigate("/")}
              className={`text-4xl md:text-7xl font-['Playfair_Display'] ${color ? 'text-black' : 'text-white'} tracking-[0.25em] leading-none cursor-pointer select-none`}
            >
              SALA
            </h2>
          </div>

          {/* Icons */}
          <div className={`flex items-center justify-end gap-4 md:gap-6 ${color ? 'text-black' : 'text-white'} text-lg`}>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="relative flex items-center w-full max-w-35 md:max-w-45"
            >
              <FaSearch
                className={`absolute left-0 top-1/2 -translate-y-1/2 ${color ? "text-black" : "text-white"
                  } text-sm`}
              />

              <input
                type="text"
                placeholder="SEARCH"
                className={`w-full bg-transparent border-b ${color
                    ? "border-black text-black placeholder-black"
                    : "border-white text-white placeholder-white"
                  } focus:outline-none pl-6 py-1 text-sm`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>


            {/* Account */}
            <button onClick={() => handleAuthNavigate("/account")}>
              <FaUser />
            </button>

            {/* Wishlist */}
            <button onClick={() => handleAuthNavigate("/wishlist")}>
              <FaHeart />
            </button>

            {/* Cart */}
            <button onClick={() => handleAuthNavigate("/cart")}>
              <FaShoppingCart />
            </button>
          </div>
        </div>

        {/* DROPDOWN MENU */}
        {menuOpen && (
          <div className="absolute left-0 top-16 md:top-20 w-full md:w-64 bg-black/80 backdrop-blur-md text-white px-6 md:px-8 py-6 md:py-8 space-y-5 md:space-y-6">

            <p onClick={() => { navigate("/dresses"); setMenuOpen(false); }} className="cursor-pointer hover:opacity-70">
              DRESSES
            </p>
            <p onClick={() => { navigate("/tops"); setMenuOpen(false); }} className="cursor-pointer hover:opacity-70">
              TOPS
            </p>
            <p onClick={() => { navigate("/bottoms"); setMenuOpen(false); }} className="cursor-pointer hover:opacity-70">
              BOTTOMS
            </p>
            <p onClick={() => { navigate("/outerwear"); setMenuOpen(false); }} className="cursor-pointer hover:opacity-70">
              OUTERWEAR
            </p>
            <p onClick={() => { navigate("/knitwear"); setMenuOpen(false); }} className="cursor-pointer hover:opacity-70">
              KNITWEAR
            </p>

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
    </>
  );
}

export default Navbar;
