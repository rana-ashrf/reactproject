import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dresses.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import { getFinalPrice } from "../utils/price";

const categories = ["All", "Coats", "Jackets", "Blazers"];

const colors = [
  "Black", "White", "Red", "Green", "Blue", "Pink",
  "Brown", "Grey", "Cream", "Yellow", "Purple",
  "Burgundy", "Navy", "Violet"
];

const sizes = ["S", "M", "L", "XL"];

function OuterWear() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tops, setTops] = useState([]);

  /* FILTERS FROM URL */
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "";
  const color = searchParams.get("color") || "";
  const size = searchParams.get("size") || "";
  const minParam = searchParams.get("min");
  const maxParam = searchParams.get("max");

  const minPrice = minParam ? Number(minParam) : 0;
  const maxPrice = maxParam ? Number(maxParam) : Infinity;


  useEffect(() => {
    axios
      .get("http://localhost:5000/outerwear")
      .then(res => setTops(res.data))
      .catch(err => console.error(err));
  }, []);

 
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    setSearchParams(params);
  };

  /* FILTER LOGIC */
  let filtered = tops.filter(item =>
    (category === "All" || item.category === category) &&
    (!color || item.color === color) &&
    (!size || item.size.includes(size)) &&
    item.price >= minPrice &&
    item.price <= maxPrice
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

      <h2 className="text-xl font-semibold mt-18">OUTERWEAR</h2>

      {/* CATEGORY BAR */}
      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() =>
              updateFilter("category", cat === "All" ? "" : cat)
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SORT & FILTER BAR */}
      <div className="top-bar">
        <select
          value={sort}
          onChange={e => updateFilter("sort", e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

        <select
          value={color}
          onChange={e => updateFilter("color", e.target.value)}
        >
          <option value="">Color</option>
          {colors.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={size}
          onChange={e => updateFilter("size", e.target.value)}
        >
          <option value="">Size</option>
          {sizes.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="price-filter">
          <input
            type="number"
            placeholder="Min"
            value={minParam || ""}
            onChange={e => updateFilter("min", e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={maxParam || ""}
            onChange={e => updateFilter("max", e.target.value)}
          />
        </div>
      </div>

      {/* PRODUCT GRID */}
        <div className="product-grid">
              {filtered.map(item => {
        const hasDiscount = item.discount && item.discount > 0;
        const finalPrice = getFinalPrice(item.price, item.discount);
      
        return (
          <div
            key={item.id}
            className="product-card"
            onClick={() =>
              navigate(`/outerwear/${item.id}?${searchParams.toString()}`)
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
      
            {/*  PRICE  */}
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

export default OuterWear;
