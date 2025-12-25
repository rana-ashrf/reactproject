import { FaHome, FaBars, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function BottomNav() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3 md:hidden">
      <FaHome onClick={() => navigate("/")} />
      <FaBars onClick={() => navigate("/menu")} />
      <FaShoppingCart
        onClick={() => user ? navigate("/cart") : navigate("/login")}
      />
      <FaUser
        onClick={() => user ? navigate("/account") : navigate("/login")}
      />
    </div>
  );
}

export default BottomNav;
