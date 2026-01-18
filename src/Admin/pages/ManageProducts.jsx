import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

const CATEGORY_MAP = {
    dresses: "Dresses",
    Tops: "Tops",
    bottoms: "Bottoms",
    knitwear: "Knitwear",
    outerwear: "Outerwear",
};

const EMPTY_FORM = {
    name: "",
    price: "",
    category: "dresses",
    color: "",
    image: "",
};

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editingProduct, setEditingProduct] = useState(null);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    /* PAGINATION */
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        let all = [];
        for (let key of Object.keys(CATEGORY_MAP)) {
            const res = await axios.get(`http://localhost:5000/${key}`);
            all = [
                ...all,
                ...res.data.map((p) => ({
                    ...p,
                    sourceCategory: key,
                    active: p.active !== false,
                })),
            ];
        }
        setProducts(all);
    };

    /* COUNTS */
    const totalCount = products.length;
    const activeCount = products.filter((p) => p.active).length;
    const outOfStockCount = products.filter((p) => !p.active).length;

    /* FILTER */
    const filteredProducts = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory =
            selectedCategory === "all" ||
            p.sourceCategory === selectedCategory;

        return matchSearch && matchCategory;
    });

    /* PAGINATION LOGIC */
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

    /* ---------------- ADD PRODUCT ---------------- */
    const handleAddProduct = async () => {
        if (!form.name || !form.price || !form.image) {
            alert("All fields required");
            return;
        }

        const exists = products.some(
            (p) => p.name.toLowerCase() === form.name.toLowerCase()
        );
        if (exists) {
            alert("Product already exists");
            return;
        }

        await axios.post(`http://localhost:5000/${form.category}`, {
            ...form,
            price: Number(form.price),
            size: ["S", "M", "L", "XL"],
            active: true,
        });

        setShowAdd(false);
        setForm(EMPTY_FORM);
        fetchAllProducts();
    };

    /* ---------------- EDIT PRODUCT ---------------- */
    const openEditModal = (product) => {
        setEditingProduct(product);
        setForm({
            name: product.name,
            price: product.price,
            color: product.color,
            image: product.image,
            category: product.sourceCategory,
        });
        setShowEdit(true);
    };

    const handleEditProduct = async () => {
        await axios.patch(
            `http://localhost:5000/${editingProduct.sourceCategory}/${editingProduct.id}`,
            {
                name: form.name,
                price: Number(form.price),
                color: form.color,
                image: form.image,
            }
        );

        setShowEdit(false);
        setEditingProduct(null);
        setForm(EMPTY_FORM);
        fetchAllProducts();
    };

    /* ---------------- ENABLE / DISABLE ---------------- */
    const toggleStatus = async (product) => {
        await axios.patch(
            `http://localhost:5000/${product.sourceCategory}/${product.id}`,
            { active: !product.active }
        );
        fetchAllProducts();
    };

    /* ---------------- DELETE ---------------- */
    const handleDeleteProduct = async (product) => {
        if (!window.confirm(`Delete "${product.name}"?`)) return;

        await axios.delete(
            `http://localhost:5000/${product.sourceCategory}/${product.id}`
        );
        fetchAllProducts();
    };

    return (
        <div style={{ display: "flex" }}>
            <AdminSidebar />
            <main
                style={{
                    marginLeft: 260,
                    padding: 30,
                    width: "100%",
                    background: "#f1f5f9",
                    minHeight: "100vh",
                }}
            >

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>Manage Products</h2>
                    <button
                        onClick={() => {
                            setForm(EMPTY_FORM);
                            setShowAdd(true);
                        }}
                        style={btnPrimary}
                    >
                        + Add Product
                    </button>
                </div>

                {/* STATS */}
                <div style={statsGrid}>
          <StatCard label="Total Products" value={totalCount} icon="📦" bg="#eef2ff" />
          <StatCard label="Active Products" value={activeCount} icon="✅" bg="#dcfce7" />
          <StatCard label="Out of Stock" value={outOfStockCount} icon="🚫" bg="#fee2e2" />
        </div>

                {/* FILTERS */}
                <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                    <input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        style={inputStyle}
                    />

                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1);
                        }}
                        style={inputStyle}
                    >
                        <option value="all">All Categories</option>
                        {Object.keys(CATEGORY_MAP).map((cat) => (
                            <option key={cat} value={cat}>
                                {CATEGORY_MAP[cat]}
                            </option>
                        ))}
                    </select>
                </div>

                {/* TABLE */}
                <table width="100%" cellPadding="12" style={tableStyle}>
                    <thead style={{ background: "#f3f4f6", height:"50px"  }}>
                        <tr>
                            <th align="left">Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentProducts.map((p) => (
                            <tr
                                key={p.id}
                                style={{ transition: "background 0.2s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >

                                <td style={{ display: "flex", gap: 12 }}>
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        style={{
                                            width: 50,
                                            height: 60,
                                            objectFit: "cover",
                                            borderRadius: 6,
                                        }}
                                    />
                                    {p.name}
                                </td>
                                <td align="center">{CATEGORY_MAP[p.sourceCategory]}</td>
                                <td align="center">₹{p.price}</td>
                                <td align="center">
                                    <span
                                        style={{
                                            padding: "4px 10px",
                                            borderRadius: 999,
                                            background: p.active ? "#dcfce7" : "#fee2e2",
                                            color: p.active ? "#166534" : "#991b1b",
                                            fontSize: 12,
                                        }}
                                    >
                                        {p.active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td align="center">
                                    <button onClick={() => openEditModal(p)}>Edit</button>
                                    <button onClick={() => toggleStatus(p)} style={{ marginLeft: 8 }}>
                                        {p.active ? "Disable" : "Enable"}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(p)}
                                        style={deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* PAGINATION */}
                <div style={pagination}>
                    <button
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1}
                        style={{
                            ...pageNavBtn,
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        }}
                    >
                        Previous
                    </button>

                    <span>
                        Page {currentPage} of {totalPages || 1}
                    </span>

                    <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        style={{
                            ...pageNavBtn,
                            cursor:
                                currentPage === totalPages || totalPages === 0
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                    >
                        Next
                    </button>
                </div>

                {showAdd && (
                    <Modal
                        title="Add Product"
                        form={form}
                        setForm={setForm}
                        onSave={handleAddProduct}
                        onClose={() => setShowAdd(false)}
                    />
                )}

                {showEdit && (
                    <Modal
                        title="Edit Product"
                        form={form}
                        setForm={setForm}
                        onSave={handleEditProduct}
                        onClose={() => setShowEdit(false)}
                    />
                )}
            </main>
        </div>
    );
}

export default ManageProducts;

/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ label, value, icon, bg }) => (
  <div style={{ ...stat, background: bg }}>
    <div style={iconCircle}>{icon}</div>
    <p style={statLabel}>{label}</p>
    <h2>{value}</h2>
  </div>
);

const Modal = ({ title, form, setForm, onSave, onClose }) => (
    <div style={modalOverlay}>
        <div style={modalBox}>
            <h3>{title}</h3>
            <input placeholder="Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="number" placeholder="Price" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input placeholder="Color" value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })} />
            <input placeholder="Image URL" value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <select value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {Object.keys(CATEGORY_MAP).map((cat) => (
                    <option key={cat} value={cat}>
                        {CATEGORY_MAP[cat]}
                    </option>
                ))}
            </select>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button onClick={onSave} style={btnPrimary}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    </div>
);

/* ---------------- STYLES ---------------- */

const btnPrimary = {
    background: "linear-gradient(135deg, #6366f1, #2563eb)",
    color: "#fff",
    padding: "10px 18px",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(37,99,235,0.25)",
};


const deleteBtn = {
    marginLeft: 8,
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(220,38,38,0.25)",
};

const inputStyle = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    width: 250,
    outline: "none",
    background: "#fff",
    fontSize: 14,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
};


const tableStyle = {
    background: "white",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
};


const statsGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 20,
    margin: "30px 0",
    
};


const stat = {
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
    padding: 22,
    borderRadius: 16,
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(99,102,241,0.12)",
    
};

const iconCircle = {
  fontSize: 30,
  width: 52,
  height: 52,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 8px",
};

const statLabel = {
  color: "#475569",
  height:"20px"
};
const pagination = {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
};


const pageNavBtn = {
    padding: "8px 16px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 500,
};


const modalOverlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
};


const modalBox = {
    background: "white",
    padding: 30,
    borderRadius: 18,
    width: 420,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
};

