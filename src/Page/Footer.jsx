import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
    const navigate=useNavigate()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>SHOP</h4>
           <ul>
            <li onClick={() => navigate("/dresses")}>Dresses</li>
            <li onClick={() => navigate("/outerwear")}>Coat</li>
            <li onClick={() => navigate("/tops")}>Blouses</li>
            <li onClick={() => navigate("/bottoms")}>Bottoms</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>HELP</h4>
          <ul>
            <li onClick={()=>navigate("/support")}>Customer Service</li>
            <li onClick={()=>navigate("/shipping")}>Shipping & Returns</li>
            <li>Size Guide</li>
            <li>Track Order</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>ABOUT</h4>
          <ul>
            <li>Our Story</li>
            <li>Sustainability</li>
            <li>Careers</li>
            <li>Stores</li>
          </ul>
        </div>

        <div className="footer-column newsletter">
          <h4>NEWSLETTER</h4>
          <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          <input type="email" placeholder="Enter your email" />
          <button>SUBSCRIBE</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 FASHION STORE. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
