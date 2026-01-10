import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import {
  FaChevronRight,
  FaBox,
  FaUndo,
  FaTicketAlt,
  FaHeart,
  FaStar,
  FaUser,
  FaCog,
  FaHeadset,
} from "react-icons/fa";
import Navbar from "./Navbar"

function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
        <Navbar textColor="black" />
      {/* USER INFO */}
      <div className="bg-white mx-4 p-4 rounded-xl flex items-center gap-4">
        <div className="w-15 h-13 rounded-full bg-yellow-50 flex items-center justify-center font-bold text-lg font-['Playfair_Display']">
          {user.name ? user.name[0] : "SALA"}
        </div>
        <div>
          
          <p className="text-sm text-gray-600">{user.phone || "No Phone"}</p>
          <p className="text-sm text-gray-600">{user.email || "No Email"}</p>
        </div>

      </div>

      {/* ORDERS SECTION */}
      <Section>
        <Item icon={<FaBox />} text="My Orders" onClick={() => navigate("/orders")} />
        <Item icon={<FaUndo />} text="Returns" onClick={()=>navigate("/returns")}/>
        <Item icon={<FaTicketAlt />} text="Coupons" onClick={()=>navigate("/coupons")}/>
      </Section>

      {/* ACCOUNT SECTION */}
      <Section title="My Account">
        <Item icon={<FaHeart />} text="Wishlist" onClick={() => navigate("/wishlist")} />
        <Item icon={<FaStar />} text="My Reviews" onClick={()=>navigate("/review")}/>
        <Item icon={<FaUser />} text="My Profile" onClick={()=>navigate("/profile")} />
        <Item icon={<FaCog />} text="Settings" onClick={()=>navigate("/settings")} />
      </Section>

      {/* HELP SECTION */}
      <Section title="Help Center">
        <Item icon={<FaHeadset />} text="Customer Service" onClick={()=>navigate("/support")} />
        <Item text="Return Policy" onClick={()=>navigate("/return-policy")} />
        <Item text="Shipping & Delivery" onClick={()=>navigate("/shipping")}/>
      </Section>

      {/* ABOUT */}
      <Section title="About Us" >
        <Item text="Social Responsibility"  onClick={()=>navigate("/aboutus")}/>
      </Section>

      {/* LOGOUT */}
      <div className="mx-4 mt-6">
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full py-3 rounded-xl bg-black text-white"
        >
          LOGOUT
        </button>

      </div>
    </div>
  );
}

export default Account;

/* ---------- REUSABLE COMPONENTS ---------- */

const Section = ({ title, children }) => (
  <div className="mx-4 mt-4 bg-white rounded-xl overflow-hidden">
    {title && (
      <p className="px-4 py-3 text-sm font-semibold text-gray-500">
        {title}
      </p>
    )}
    {children}
  </div>
);

const Item = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between px-4 py-4 border-t cursor-pointer hover:bg-gray-50"
  >
    <div className="flex items-center gap-3">
      {icon && <span className="text-gray-500">{icon}</span>}
      <span>{text}</span>
    </div>
    <FaChevronRight className="text-gray-400 text-sm" />
  </div>
);
