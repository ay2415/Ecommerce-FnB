import { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";

const Cart = () => {
  const { cart, fetchCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      fetchCart(storedUser._id);
    }
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              {item.product.name} - {item.quantity}
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
