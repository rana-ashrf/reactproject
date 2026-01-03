import { useNavigate } from "react-router-dom";
import "../styles/Address.css";

function ChangeAddress() {
  const navigate = useNavigate();

  return (
    <div className="address-container">

      <h3>Select Delivery Address</h3>

      <div className="address-box active">
        <p><b>Rana fathima</b></p>
        <p>120, K P House, Kannur, Kerala</p>
        <button onClick={() => navigate("/checkout")}>
          Deliver Here
        </button>
      </div>

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