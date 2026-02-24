import { useNavigate } from "react-router-dom";
import "../styles/AddAddress.css";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

function AddAddress() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const saveAddress = async (e) => {
    e.preventDefault();
    if (!user) return; // safety

    const data = Object.fromEntries(new FormData(e.target));

    try {
      // 👉 Check if this user already has an address
      const existingRes = await axios.get(
        `http://localhost:5000/addresses?userId=${user.id}`
      );
      const existing = existingRes.data[0]; // assume 1 default per user

      if (existing) {
        // 🔁 UPDATE existing address
        await axios.patch(
          `http://localhost:5000/addresses/${existing.id}`,
          {
            ...existing,
            ...data,
            isDefault: true,
          }
        );
      } else {
        // 🆕 CREATE new address
        await axios.post("http://localhost:5000/addresses", {
          ...data,
          userId: user.id,
          isDefault: true,
        });
      }

      navigate("/checkout");
    } catch (err) {
      console.error("Error saving address:", err);
      alert("Could not save address. Make sure json-server is running.");
    }
  };

  return (
    <form className="address-container" onSubmit={saveAddress}>
      <input name="name" placeholder="Name" required />
      <input name="phone" placeholder="Phone" required />
      <input name="house" placeholder="House / Flat" required />
      <input name="area" placeholder="Area" required />
      <input name="city" placeholder="City" required />
      <input name="state" placeholder="State" required />
      <input name="pincode" placeholder="Pincode" required />
      <button type="submit">SAVE ADDRESS</button>
    </form>
  );
}

export default AddAddress;