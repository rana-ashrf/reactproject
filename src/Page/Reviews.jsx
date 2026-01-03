import { useState, useEffect } from "react";
import "../styles/MyReviews.css";

function MyReviews() {
  // load reviews and orders from localStorage
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || []
  );
  const [deliveredItems, setDeliveredItems] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Flatten all delivered items
    const items = orders
      .filter(order => order.status === "Delivered")
      .flatMap(order =>
        order.items.map(item => {
          const existingReview = reviews.find(
            r => r.productId === item.id && r.orderId === order.id
          );
          return {
            ...item,
            orderId: order.id,
            reviewed: !!existingReview,
            reviewData: existingReview || null,
            tempText: existingReview?.text || "",
            tempRating: existingReview?.rating || 5
          };
        })
      );

    setDeliveredItems(items);
  }, [reviews]);

  // Submit review
  const submitReview = (item) => {
    const newReview = {
      id: Date.now(),
      productId: item.id,
      orderId: item.orderId,
      productName: item.title,
      image: item.image,
      rating: item.tempRating,
      text: item.tempText
    };

    const updatedReviews = [newReview, ...reviews];
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
  };

  // Delete review
  const deleteReview = (item) => {
    const updatedReviews = reviews.filter(
      r => !(r.productId === item.id && r.orderId === item.orderId)
    );
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
  };

  if (deliveredItems.length === 0) {
    return <h2 className="empty">No delivered products yet ⭐</h2>;
  }

  return (
    <div className="reviews-container">
      <h2>My Reviews</h2>

      {deliveredItems.map(item => (
        <div className="review-card" key={item.orderId + item.id}>
          <img src={item.image} alt={item.title} />
          <div className="review-info">
            <h4>{item.title}</h4>

            {item.reviewed ? (
              <>
                <div className="stars">
                  {"⭐".repeat(item.reviewData.rating)}
                </div>
                <p>{item.reviewData.text}</p>

                <div className="actions">
                  <button onClick={() => deleteReview(item)}>
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <label>Rating</label>
                <select
                  value={item.tempRating}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setDeliveredItems(prev =>
                      prev.map(d =>
                        d.id === item.id && d.orderId === item.orderId
                          ? { ...d, tempRating: value }
                          : d
                      )
                    );
                  }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐</option>
                  <option value={4}>⭐⭐⭐⭐</option>
                  <option value={3}>⭐⭐⭐</option>
                  <option value={2}>⭐⭐</option>
                  <option value={1}>⭐</option>
                </select>

                <label>Review</label>
                <textarea
                  placeholder="Write your review..."
                  value={item.tempText}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDeliveredItems(prev =>
                      prev.map(d =>
                        d.id === item.id && d.orderId === item.orderId
                          ? { ...d, tempText: value }
                          : d
                      )
                    );
                  }}
                />

                <button onClick={() => submitReview(item)}>
                  Submit Review
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyReviews;
