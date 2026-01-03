import "../styles/SaleSection.css";
import sales from "../assets/sales.jpg"
import { useNavigate } from "react-router-dom";

function SaleSection() {
  const navigate =useNavigate();
  return (
    <section className="sale-section"
      style={{ backgroundImage: `url(${sales})` }} >
      <div className="sale-overlay">
        <h1>SALE</h1>
        <p>UP TO 50% OFF</p>
        <button
          onClick={() => navigate("/sale")}
          style={{
            marginTop: "15px",
            padding: "10px 25px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          SHOP NOW
        </button>

      </div>
    </section>
  );
}

export default SaleSection;
