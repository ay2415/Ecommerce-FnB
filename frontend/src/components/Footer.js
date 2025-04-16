import React from "react";
import "../styles/Footer.css";


const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
       
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              YourShop is your one-stop destination for amazing deals on
              electronics, fashion, and more. Shop with confidence and enjoy
              great discounts every day!
            </p>
          </div>

         
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/products" className="text-white">Products</a></li>
              <li><a href="/cart" className="text-white">Cart</a></li>
              <li><a href="/contact" className="text-white">Contact Us</a></li>
              <li><a href="/about" className="text-white">About Us</a></li>
            </ul>
          </div>

       
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: support@yourshop.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: 123, Main Street, Bangalore, India</p>
          </div>
        </div>

       
        <div className="text-center mt-3">
          <a href="#" className="text-white mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white mx-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-white mx-2">
            <i className="fab fa-twitter"></i>
          </a>
        </div>

        
        <div className="text-center mt-3">
          <p className="mb-0">© {new Date().getFullYear()} YourShop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
