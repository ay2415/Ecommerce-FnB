import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext"; // Import Cart Provider

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser).name);
    }

    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(false);
    window.location.href = "/admin-login";
  };

  return (
    <CartProvider> {/* Wrap with CartProvider */}
      <div className="app-wrapper">
        <Navbar user={user} admin={admin } handleLogout={handleLogout} handleAdminLogout={handleAdminLogout} />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin setAdmin={setAdmin} />} />
            <Route path="/admin-dashboard" element={admin ? <AdminDashboard /> : <AdminLogin setAdmin={setAdmin} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
