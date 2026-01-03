import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    const urls = [
      "http://localhost:5000/dresses",
      "http://localhost:5000/Tops",
      "http://localhost:5000/bottoms",
      "http://localhost:5000/outerwear",
      "http://localhost:5000/knitwear"
    ];

    const responses = await Promise.all(
      urls.map((url) => axios.get(url))
    );

    const allProducts = responses.flatMap((res) => res.data);

    const filtered = allProducts.filter((item) =>
      [item.name, item.category, item.subCategory]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    setResults(filtered);
  };

  fetchData();
}, [query]);


  return (
    <div className="pt-28 px-6">
      <h2 className="text-xl mb-4">
        Search results for "<b>{query}</b>"
      </h2>

      {results.length === 0 && <p>No products found</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/${item.type}/${item.refId}`)}
            className="cursor-pointer"
          >
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default SearchResults;
