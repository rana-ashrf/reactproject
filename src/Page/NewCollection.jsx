import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewCollection() {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState(5);
  const navigate = useNavigate();

  // 🔹 Handle responsive columns
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;

      if (width < 480) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(5);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/dresses"),
      axios.get("http://localhost:5000/Tops"),
      axios.get("http://localhost:5000/bottoms"),
      axios.get("http://localhost:5000/knitwear"),
      axios.get("http://localhost:5000/outerwear"),
    ])
      .then((responses) => {
        const categories = [
          "dresses",
          "Tops",
          "bottoms",
          "knitwear",
          "outerwear",
        ];

        const allItems = responses.flatMap((res, index) =>
          res.data.map((item) => ({
            ...item,
            category: categories[index],
          }))
        );

        const latest = allItems
          .sort((a, b) => Number(b.id) - Number(a.id))
          .slice(0, 12);

        setItems(latest);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        NEW COLLECTION
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "16px",
        }}
      >
        {items.map((item) => (
          <div
            key={`${item.category}-${item.id}`}
            style={{ textAlign: "center", cursor: "pointer" }}
            onClick={() =>
              navigate(`/product/${item.category}/${item.id}`)
            }
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: columns <= 2 ? "220px" : "320px",
                objectFit: "cover",
              }}
            />

            <p style={{ fontSize: "13px", marginTop: "8px" }}>
              {item.name}
            </p>

            <p style={{ fontWeight: "bold", fontSize: "14px" }}>
              ₹{item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewCollection;
