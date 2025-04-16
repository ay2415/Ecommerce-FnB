import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "products",
  initialState: { items: [] },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    dispatch(setProducts(response.data));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
