const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.addProduct = async (req, res) => {
  const { name, category, price, stock, image } = req.body;
  const newProduct = new Product({ name, category, price, stock, image });
  await newProduct.save();
  res.json({ message: "Product added" });
};
