import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();
const BASE_URL = "http://localhost:5000/api/cart"; 

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, please log in.");
        return;
      }

      const response = await axios.get(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched Cart:", response.data); 
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add products to cart");
        return;
      }

      const response = await axios.post(
        BASE_URL,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Added to Cart:", response.data); 
      setCart(response.data.items);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, please log in.");
        return;
      }

      await axios.delete(`${BASE_URL}/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(cart.filter((item) => item._id !== cartItemId));
    } catch (error) {
      console.error("Error removing from cart:", error.response?.data || error.message);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
