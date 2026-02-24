import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/DressDetails.css";
import { useWishlist } from "../Context/WishlistContext";
import Navbar from "./Navbar"
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { category, id } = useParams(); 
  const navigate = useNavigate();

  const { addToCart, isInCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    // SINGLE PRODUCT
    axios
      .get(`http://localhost:5000/${category}/${id}`)
      .then(res => setProduct(res.data));

    // ALL PRODUCTS FROM SAME CATEGORY
    axios
      .get(`http://localhost:5000/${category}`)
      .then(res => setAllProducts(res.data));

    setSelectedSize("");
  }, [category, id]);

  if (!product) return <p>Loading...</p>;

  const related = allProducts
    .filter(item => item.id !== product.id)
    .slice(0, 6);

  const isWishlisted = wishlist.some(
  (item) => item.productId === product.id
);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <div className="dress-details pt-24">
      <Navbar textColor="black" />

      {/* IMAGE */}
      <img src={product.image} alt={product.name} className="mt-19"/>

      <h2>{product.name}</h2>
      <h3>₹{product.price}</h3>
      <p><b>COLOR:</b> {product.color || "Green"}</p>

      {/* SIZE */}
      <div className="sizes">
        <p><b>SIZE</b></p>
        {(product.size || ["S", "M", "L", "XL"]).map(s => (
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
        <button
          onClick={() => toggleWishlist(product)}
          className="wishlist-btn"
        >
          {isWishlisted ? (
            <FaHeart className="heart-icon filled" />
          ) : (
            <FaRegHeart className="heart-icon" />
          )}
        </button>

        {isInCart(product.id, selectedSize) ? (
          <button
            className="go-cart-btn"
            onClick={() => navigate("/cart")}
          >
            Go to Cart
          </button>
        ) : (
          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* RELATED */}
      <h3 className="related-title">Products that you might like</h3>

      <div className="related-products">
        {related.map(item => (
          <div
            key={item.id}
            className="related-card"
            onClick={() => navigate(`/${category}/${item.id}`)}
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

export default ProductDetails;
