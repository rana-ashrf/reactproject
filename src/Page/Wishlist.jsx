import { useWishlist } from "../Context/WishlistContext";
import "../styles/Wishlist.css";
import { Link, useNavigate } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate()

  if (wishlist.length === 0) {
    return <h2 className="empty">Your wishlist is empty 🤍</h2>;
  }

  return (
    <div className="wishlist-container">

      <h2>My Wishlist</h2>


      <div className="wishlist-grid">
        {wishlist.map(item => (
          <div onClick={() => console.log(item)
          } className="wishlist-card" key={item.id}>
            
            <Link to={`${item.url}/${item.id}`}><img src={item.image} alt={item.name} /></Link>

            <div className="wishlist-info">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>


              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(item.id, item.size);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
