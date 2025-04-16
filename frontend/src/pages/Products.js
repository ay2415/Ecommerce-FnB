import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Hearables", "Mobiles", "Tabs", "Computers", "Accessories", "Cameras", "Cables"];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    try {
      setLoading(true);
      setError(null);

      const url = category === "All" ? "http://localhost:5000/api/products" : `http://localhost:5000/api/products?category=${category}`;
      const { data } = await axios.get(url);

      setProducts(data);
    } catch (error) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Products</h2>

      <div className="d-flex justify-content-center mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn me-2 ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSelectedCategory(category)}  
          >
            {category}
          </button>
        ))}
      </div>

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {!loading && products.length > 0 ? (
          products.map((product) => (
            <div className="col" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="text-center col-12">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
