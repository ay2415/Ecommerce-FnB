const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const { user, products, totalAmount } = req.body;
  const newOrder = new Order({ user, products, totalAmount });
  await newOrder.save();
  res.json({ message: "Order placed" });
};
