import { useWishlist } from "../Context/WishlistContext";
import "../styles/Wishlist.css";
import { Link } from "react-router-dom";
import { getFinalPrice } from "../utils/price";
import Navbar from "./Navbar";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <h2 className="empty">
        Your wishlist is empty 🤍
      </h2>
    );
  }

  return (
    <div className="wishlist-container pt-24">
      <Navbar textColor="black" />
      <h2 className="text-xl font-semibold mt-18">
        My Wishlist
      </h2>

      <div className="wishlist-grid">
        {wishlist.map((item) => {
          // ✅ make this a boolean, not 0/number
          const hasDiscount = Number(item.discount) > 0;
          const finalPrice = getFinalPrice(
            item.price,
            item.discount
          );

          return (
            <div
              className="wishlist-card"
              key={item.id}
            >
              <Link
                to={`${item.url}/${item.productId}`}
              >
                <div className="wishlist-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>
              </Link>

              <div className="wishlist-info">
                <h4>{item.name}</h4>

                {/* PRICE*/}
                <p className="price">
                  {hasDiscount && (
                    <span className="old-price">
                      ₹{item.price}
                    </span>
                  )}
                  <span
                    className={
                      hasDiscount
                        ? "new-price"
                        : "normal-price"
                    }
                  >
                    ₹{finalPrice}
                  </span>
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(
                      item.productId
                    );
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