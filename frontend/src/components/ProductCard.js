import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext"; 

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const userId = localStorage.getItem("userId"); 

  const handleAddToCart = () => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }
    addToCart(userId, product._id, 1);
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm d-flex flex-column">
        
       
        <div className="d-flex align-items-center justify-content-center" style={{ height: "180px", padding: "10px" }}>
          <img 
            src={product.image} 
            className="card-img-top" 
            alt={product.name} 
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} 
          />
        </div>

       
        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text flex-grow-1">{product.description}</p>
          <h6 className="text-primary">${product.price}</h6>

          
          <Link to={`/product/${product._id}`} className="btn btn-primary mt-auto">
            View Details
          </Link>

          
          <button className="btn btn-success mt-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
