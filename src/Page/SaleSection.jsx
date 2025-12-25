import "../styles/SaleSection.css";
import sales from "../assets/sales.jpg"

function SaleSection() {
  return (
    <section className="sale-section"
    style={{ backgroundImage: `url(${sales})` }} >
      <div className="sale-overlay">
        <h1>SALE</h1>
        <p>UP TO 50% OFF</p>
        <button>SHOP NOW</button>
      </div>
    </section>
  );
}

export default SaleSection;
