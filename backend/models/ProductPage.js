import mongoose from "mongoose";

const productPageSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String
}, { collection: "productpage" });  

const ProductPage = mongoose.model("ProductPage", productPageSchema);

export default ProductPage;
