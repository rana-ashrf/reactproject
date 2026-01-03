import { useNavigate } from "react-router-dom";
import "../styles/AddAddress.css";

function AddAddress() {
  const navigate = useNavigate();

  const saveAddress = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    localStorage.setItem("address", JSON.stringify(data));
    navigate("/checkout");
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
      <button>SAVE ADDRESS</button>
    </form>
  );
}

export default AddAddress;

