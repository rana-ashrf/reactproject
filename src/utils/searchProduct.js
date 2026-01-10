import axios from "axios";

export const searchProducts = async (query) => {
  if (!query) return [];

  const q = query.toLowerCase();
 
  const [
    dressesRes,
    topsRes,
    bottomsRes,
    knitwearRes,
    outerwearRes
  ] = await Promise.all([
    axios.get("http://localhost:3000/dresses"),
    axios.get("http://localhost:3000/Tops"),
    axios.get("http://localhost:3000/bottoms"),
    axios.get("http://localhost:3000/knitwear"),
    axios.get("http://localhost:3000/outerwear"),
  ]);


  const allProducts = [
    ...dressesRes.data,
    ...topsRes.data,
    ...bottomsRes.data,
    ...knitwearRes.data,
    ...outerwearRes.data,
  ];

  // filter 
  return allProducts.filter((item) =>
    item.name.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );
};
