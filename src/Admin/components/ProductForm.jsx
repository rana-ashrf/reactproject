import { useState, useEffect } from "react";

function ProductForm({ onSave, editingProduct, onCancel }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    discount: 0,
    active: true,
  });

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
    setProduct({
      name: "",
      price: "",
      category: "",
      image: "",
      discount: 0,
      active: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
      }}
    >
      <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>

      <input
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        required
      />

      <input
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
      />

      <input
        name="discount"
        type="number"
        placeholder="Discount %"
        value={product.discount}
        onChange={handleChange}
      />

      <div style={{ marginTop: "10px" }}>
        <button type="submit">
          {editingProduct ? "Update" : "Add"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
