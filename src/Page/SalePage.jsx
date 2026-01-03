import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SalePage() {
  const [saleProducts, setSaleProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const urls = [
      "http://localhost:5000/dresses",
      "http://localhost:5000/Tops",
      "http://localhost:5000/bottoms",
      "http://localhost:5000/knitwear",
      "http://localhost:5000/outerwear",
    ];

    Promise.all(
      urls.map((url) =>
        axios.get(url).then((res) =>
          res.data.map((item) => ({
            ...item,
            collection: url.split("/").pop(), // 👈 VERY IMPORTANT
          }))
        )
      )
    )
      .then((responses) => {
        const allProducts = responses.flat();
        const discounted = allProducts.filter(
          (item) => item.discount && item.discount > 0
        );
        setSaleProducts(discounted);
      })
      .catch((err) => console.error(err));
  }, []);

  const discountedPrice = (price, discount) =>
    Math.round(price - (price * discount) / 100);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Sale Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        {saleProducts.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              navigate(`/sale/${item.collection}/${item.id}`)
            }
            style={{
              cursor: "pointer",
              position: "relative",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: "red",
                color: "white",
                padding: "4px 8px",
                fontSize: "12px",
              }}
            >
              {item.discount}% OFF
            </span>

            <h4 style={{ marginTop: "10px" }}>{item.name}</h4>

            <p>
              <span
                style={{
                  textDecoration: "line-through",
                  marginRight: "8px",
                  color: "gray",
                }}
              >
                ₹{item.price}
              </span>
              <span style={{ color: "red", fontWeight: "bold" }}>
                ₹{discountedPrice(item.price, item.discount)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalePage;
