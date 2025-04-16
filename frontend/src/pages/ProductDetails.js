import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaTruck, FaStar } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading product details...</p>;
  if (!product) return <p className="text-center mt-4 text-danger">Product not found.</p>;

  const handleWishlist = () => {
    setWishlist(!wishlist);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg p-4 rounded border-0">
            <Row className="align-items-center">
              <Col xs={12} md={5} className="text-center">
                <Card.Img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "350px", objectFit: "contain", padding: "10px" }}
                />
              </Col>
              <Col xs={12} md={7}>
                <Card.Body>
                  <Card.Title className="fw-bold fs-3">{product.name}</Card.Title>
                  <Card.Text className="text-muted">{product.description}</Card.Text>
                  
                  <div className="d-flex align-items-center mb-3">
                    <FaStar className="text-warning me-1" />
                    <FaStar className="text-warning me-1" />
                    <FaStar className="text-warning me-1" />
                    <FaStar className="text-warning me-1" />
                    <FaStar className="text-secondary me-2" />
                    <span>(1,234 ratings)</span>
                  </div>

                  <h4 className="text-success fw-bold mb-2">₹{product.price}</h4>
                  <p className="text-muted"><FaTruck /> Free Delivery in 2 Days</p>

                  <Form.Group className="mb-3">
                    <Form.Label>Select Quantity</Form.Label>
                    <Form.Select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="primary" className="w-50"><FaShoppingCart /> Add to Cart</Button>
                    <Button variant="warning" className="w-50">Buy Now</Button>
                  </div>

                  <div className="mt-3 d-flex justify-content-between">
                    <Button variant="outline-danger" onClick={handleWishlist}>
                      <FaHeart className={wishlist ? "text-danger" : "text-secondary"} /> {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                    </Button>
                    <Button variant="outline-secondary" onClick={() => navigate(-1)}>🔙 Back</Button>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
