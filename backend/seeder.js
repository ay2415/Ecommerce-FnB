import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    importData();
  })
  .catch(err => console.log(err));

const products = [
  { name: "Wireless Earbuds", category: "Hearables", price: 49, image: "https://example.com/earbuds.jpg", description: "High-quality earbuds." },
  { name: "Smartphone", category: "Mobiles", price: 299, image: "https://example.com/smartphone.jpg", description: "Latest smartphone." },
  { name: "Tablet", category: "Tabs", price: 199, image: "https://example.com/tablet.jpg", description: "High-performance tablet." },
  { name: "Laptop", category: "Computers", price: 799, image: "https://example.com/laptop.jpg", description: "Powerful laptop." },
  { name: "Gaming Mouse", category: "Accessories", price: 25, image: "https://example.com/mouse.jpg", description: "Ergonomic gaming mouse." },
  { name: "DSLR Camera", category: "Cameras", price: 599, image: "https://example.com/camera.jpg", description: "Professional DSLR camera." },
  { name: "USB Cable", category: "Cables", price: 10, image: "https://example.com/cable.jpg", description: "Durable USB cable." }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();
