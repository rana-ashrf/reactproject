import React from "react";
import { Link } from "react-router-dom";
import "../styles/categories.css";

const categories = [
  { title: "OUTERWEAR", image: new URL("../assets/coat.jpg", import.meta.url), path: "/outerwear" },
  { title: "TOPS", image: new URL("../assets/blouse.jpg", import.meta.url), path: "/tops" },
  { title: "DRESSES", image: new URL("../assets/dresses.jpg", import.meta.url), path: "/dresses" },
  { title: "BOTTOMS", image: new URL("../assets/bottoms.jpg", import.meta.url), path: "/bottoms" },
];

const Categories = () => {
  return (
    <section className="categories">
      {categories.map((item, index) => (
        <Link to={item.path} key={index} className="category-card">
          <img src={item.image} alt={item.title} />
          <div className="category-overlay">
            <h3>{item.title}</h3>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default Categories;
