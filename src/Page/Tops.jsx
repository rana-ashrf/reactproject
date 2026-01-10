import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dresses.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import { getFinalPrice } from "../utils/price";

const categories = [
  "All",
  "Tops",
  "Blouses",
  "T-Shirts"
];

const colors = [
  "Black", "White", "Red", "Green", "Blue", "Pink",
  "Brown", "Grey", "Cream", "Yellow", "Purple",
  "Beige", "Violet", "Navy", "Maroon", "Burgundy"
];

const sizes = ["S", "M", "L", "XL"];

function Tops() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tops, setTops] = useState([]);

 
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "";
  const color = searchParams.get("color") || "";
  const size = searchParams.get("size") || "";
  const min = Number(searchParams.get("min")) || 0;
  const max = searchParams.get("max")
    ? Number(searchParams.get("max"))
    : Infinity;

  /* FETCH DATA */
  useEffect(() => {
    axios
      .get("http://localhost:5000/Tops")
      .then(res => setTops(res.data))
      .catch(err => console.error(err));
  }, []);

 
  const updateParam = (key, value) => {
    const params = Object.fromEntries(searchParams.entries());

    if (!value || value === "All") {
      delete params[key];
    } else {
      params[key] = value;
    }

    setSearchParams(params);
  };

  /* FILTER  */
  let filtered = tops.filter(item =>
    (category === "All" || item.category === category) &&
    (!color || item.color === color) &&
    (!size || item.size.includes(size)) &&
    item.price >= min &&
    item.price <= max
  );

 
  if (sort === "low-high") {
    filtered.sort(
      (a, b) =>
        getFinalPrice(a.price, a.discount) -
        getFinalPrice(b.price, b.discount)
    );
  }

  if (sort === "high-low") {
    filtered.sort(
      (a, b) =>
        getFinalPrice(b.price, b.discount) -
        getFinalPrice(a.price, a.discount)
    );
  }

  return (
    <div className="dresses-container pt-24">
      <Navbar textColor="black" />

      <h2 className="text-xl font-semibold mt-18">TOPS</h2>

      {/* CATEGORY  */}
      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => updateParam("category", cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FILTER  */}
      <div className="top-bar">
        <select
          value={sort}
          onChange={e => updateParam("sort", e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

        <select
          value={color}
          onChange={e => updateParam("color", e.target.value)}
        >
          <option value="">Color</option>
          {colors.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={size}
          onChange={e => updateParam("size", e.target.value)}
        >
          <option value="">Size</option>
          {sizes.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* PRICE FILTER */}
        <div className="price-filter">
          <input
            type="number"
            placeholder="Min"
            value={min || ""}
            onChange={e => updateParam("min", e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={max === Infinity ? "" : max}
            onChange={e => updateParam("max", e.target.value)}
          />
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="product-grid">
        {filtered.map(item => {
          const hasDiscount = item.discount && item.discount > 0;
          const finalPrice = getFinalPrice(item.price, item.discount);

          return (
            <div
              key={item.id}
              className="product-card"
              onClick={() =>
                navigate(`/tops/${item.id}?${searchParams.toString()}`)
              }
            >
              <div className="image-wrapper">
                {hasDiscount && (
                  <span className="discount-badge">
                    {item.discount}% OFF
                  </span>
                )}
                <img src={item.image} alt={item.name} />
              </div>

              <p className="name">{item.name}</p>

              {/* PRICE */}
              {hasDiscount ? (
                <p className="price">
                  <span className="old-price">₹{item.price}</span>
                  <span className="new-price">₹{finalPrice}</span>
                </p>
              ) : (
                <p className="price">
                  <span className="normal-price">₹{item.price}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tops;
