import { useNavigate } from "react-router-dom";
import "../styles/Address.css";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function ChangeAddress() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await axios.get(
        `http://localhost:5000/addresses?userId=${user.id}`
      );
      setAddresses(res.data);
    };
    fetchAddresses();
  }, [user]);

  const handleDeliverHere = (addr) => {
    // optional: set isDefault in backend
    navigate("/checkout");
  };

  return (
    <div className="address-container">
      <h3>Select Delivery Address</h3>

      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="address-box active"
        >
          <p>
            <b>{addr.name}</b>
          </p>
          <p>
            {addr.house}, {addr.area},{" "}
            {addr.city}, {addr.state} -{" "}
            {addr.pincode}
          </p>
          <p>📞 {addr.phone}</p>
          <button
            onClick={() => handleDeliverHere(addr)}
          >
            Deliver Here
          </button>
        </div>
      ))}

      <button
        className="add-address-btn"
        onClick={() => navigate("/add-address")}
      >
        + Add New Address
      </button>
    </div>
  );
}

export default ChangeAddress;