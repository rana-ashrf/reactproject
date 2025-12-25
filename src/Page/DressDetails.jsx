import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "../styles/DressDetails.css";

function DressDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dress, setDress] = useState(null);
  const [allDresses, setAllDresses] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/dresses/${id}`)
      .then(res => setDress(res.data));

    axios.get("http://localhost:5000/dresses")
      .then(res => setAllDresses(res.data));
  }, [id]);

  if (!dress) return <p>Loading...</p>;


  const related = allDresses
    .filter(item => item.category === dress.category && item.id !== dress.id)
    .slice(0, 6);

  return (
    <div className="dress-details">

      {/* PRODUCT IMAGE */}
      <img src={dress.image} alt={dress.name} />

      <h2>{dress.name}</h2>
      <h3>₹{dress.price}</h3>
      <p><b>COLOR:</b> {dress.color}</p>

      {/* SIZE */}
      <div className="sizes">
        <p><b>SIZE</b></p>
        {dress.size.map(s => (
          <button
            key={s}
            className={selectedSize === s ? "active" : ""}
            onClick={() => setSelectedSize(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="action-bar">
        <button className="wishlist"><FaHeart /></button>
        <button className="add-cart">ADD TO BAG</button>
      </div>

      {/*  YOU MAY ALSO LIKE */}
      <h3 className="related-title">Products that you might like</h3>

      <div className="related-products">
        {related.map(item => (
          <div
            key={item.id}
            className="related-card"
            onClick={() => navigate(`/dress/${item.id}`)}
          >
            <img src={item.image} alt={item.name} />
            <p className="name">{item.name}</p>
            <p className="price">₹{item.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default DressDetails;
