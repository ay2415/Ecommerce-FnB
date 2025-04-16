import express from "express";
import Product from "../models/Product.js"; 

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    console.log("Received category filter:", category);

    const query = category && category !== "All" ? { category } : {};
    console.log("MongoDB Query:", query);

    const products = await Product.find(query);
    console.log("Fetched Products:", products);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
