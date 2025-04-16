import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin-login");
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      setError("Failed to fetch products.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.description) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        newProduct,
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccess("Product added successfully!");
      fetchProducts();
      setNewProduct({
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
      });
    } catch (error) {
      setError("Failed to add product.");
      console.error("Error adding product:", error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      setError("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        newProduct,  
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccess("Product updated successfully!");
      fetchProducts();
      setEditProduct(null);  
      setNewProduct({
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
      });
    } catch (error) {
      setError("Failed to update product.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="dashboard-heading">Admin Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="product-form" onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}>
        <input
          className="form-input"
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          required
        />
        <input
          className="form-input"
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <textarea
          className="form-input"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          required
        ></textarea>
        <button className="submit-btn" type="submit">
          {editProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      <ul className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <li className="product-item" key={product._id}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>${product.price}</p>
                <p>{product.description}</p>
                <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
              </div>
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;
