import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dresses.css";
import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Mini Dresses",
  "Midi Dresses",
  "A-Line Dresses"
];

const colors = ["Black", "Red", "Brown", "White", "Green", "Rose", "Blue", "Yellow", "Purple", "Orange", "Pink", "Biege", "Grey", "Maroon", "Violet", "Cream"];
const sizes = ["S", "M", "L", "XL"];

function Dresses() {
  const navigate=useNavigate();
  
  const [dresses, setDresses] = useState([]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState([0, 5000]);


  useEffect(() => {
    axios.get("http://localhost:5000/dresses")
      .then(res => setDresses(res.data));
  }, []);

  let filtered = dresses.filter(item =>
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
      <h1>DRESSES</h1>

      {/* SUB CATEGORIES */}
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

      {/* SORT & FILTER BAR */}
      <div className="top-bar">
        <select onChange={e => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

        <select onChange={e => setColor(e.target.value)}>
          <option value="">Color</option>
          {colors.map(c => <option key={c}>{c}</option>)}
        </select>

        <select onChange={e => setSize(e.target.value)}>
          <option value="">Size</option>
          {sizes.map(s => <option key={s}>{s}</option>)}
        </select>

        <div className="price-filter">
          <input
            type="number"
            placeholder="Min"
            onChange={e => setPrice([+e.target.value, price[1]])}
          />
          <input
            type="number"
            placeholder="Max"
            onChange={e => setPrice([price[0], +e.target.value])}
          />
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="product-grid">
        {filtered.map(item => (
          <div
            key={item.id}
            className="product-card"
            onClick={() => navigate(`/dress/${item.id}`)}
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

export default Dresses;
