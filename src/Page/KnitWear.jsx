

import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dresses.css"; 
import { useNavigate } from "react-router-dom";

const categories = [
  "All"
];

const colors = [
  "Black", "White", "Red", "Green", "Blue", "Pink",
  "Brown", "Grey", "Cream", "Yellow", "Purple","Burgundy", "Navy","Violet"
];

const sizes = ["S", "M", "L", "XL"];


function KnitWear()  {
  const navigate = useNavigate();

  const [tops, setTops] = useState([]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState([0, 5000]);

  useEffect(() => {
    axios.get("http://localhost:5000/knitwear")
      .then(res => setTops(res.data))
      .catch(err => console.error(err));
  }, []);

  let filtered = tops.filter(item =>
    (category === "All" || item.category === category) &&
    (!color || item.color === color) &&
    (!size || item.size.includes(size)) &&
    item.price >= price[0] &&
    item.price <= price[1]
  );

  if (sort === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  }
  if (sort === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="dresses-container">
      <h2 className="text-xl font-semibold">KNITWEAR</h2>

      {/* CATEGORY  */}
      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SORT & FILTER  */}
      <div className="top-bar">
        <select onChange={e => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

        <select onChange={e => setColor(e.target.value)}>
          <option value="">Color</option>
          {colors.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select onChange={e => setSize(e.target.value)}>
          <option value="">Size</option>
          {sizes.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="price-filter">
          <input
            type="number"
            placeholder="Min"
            onChange={e => setPrice([+e.target.value || 0, price[1]])}
          />
          <input
            type="number"
            placeholder="Max"
            onChange={e => setPrice([price[0], +e.target.value || 5000])}
          />
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {filtered.map(item => (
          <div
            key={item.id}
            className="product-card"
            onClick={() => navigate(`/knitwear/${item.id}`)}
          >
            <div className="image-wrapper">
              <img src={item.image} alt={item.name} />
            </div>

            <p className="name">{item.name}</p>
            <p className="price">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KnitWear