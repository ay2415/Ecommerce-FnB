const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { products, totalAmount } = req.body;
  const order = new Order({ user: req.user.id, products, totalAmount });
  await order.save();
  res.json({ message: "Order Placed Successfully" });
});

router.get("/", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate("products.product");
  res.json(orders);
});

module.exports = router;
