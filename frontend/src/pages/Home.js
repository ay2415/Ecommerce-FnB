import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        console.log("Fetched Products:", res.data);
        setProducts(res.data.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container mt-4">
      <Carousel className="mb-4">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1621488513434/today-electronics-offers.jpg"
            alt="Offers"
            style={{ maxHeight: "500px", width: "100%", objectFit: "contain" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://pbs.twimg.com/media/GGMpKzJW0AApMNQ.jpg:large"
            alt="OnePlus Offer"
            style={{ maxHeight: "500px", width: "100%", objectFit: "contain" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1618571140235/mobile-offers.jpg"
            alt="Samsung Offer"
            style={{ maxHeight: "500px", width: "100%", objectFit: "contain" }}
          />
        </Carousel.Item>
      </Carousel>

      <h2 className="text-center my-4">🔥 Today's Offers 🔥</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center">No offers available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
