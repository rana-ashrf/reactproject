import { useWishlist } from "../Context/WishlistContext";
import "../styles/Wishlist.css";
import { Link } from "react-router-dom";
import { getFinalPrice } from "../utils/price";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <h2 className="empty">Your wishlist is empty 🤍</h2>;
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      <div className="wishlist-grid">
        {wishlist.map(item => {
          const hasDiscount = item.discount && item.discount > 0;
          const finalPrice = getFinalPrice(item.price, item.discount);

          return (
            <div className="wishlist-card" key={item.id}>
              <Link to={`${item.url}/${item.id}`}>
                <div className="wishlist-image-wrapper">
  <img src={item.image} alt={item.name} />
</div>

              </Link>

              <div className="wishlist-info">
                <h4>{item.name}</h4>

                {/* PRICE*/}
                <p className="price">
                  {hasDiscount && (
                    <span className="old-price">₹{item.price}</span>
                  )}
                  <span
                    className={
                      hasDiscount ? "new-price" : "normal-price"
                    }
                  >
                    ₹{finalPrice}
                  </span>
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wishlist;
