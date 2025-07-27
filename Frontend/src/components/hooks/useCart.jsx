// useCart.js
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return {
    cartItems: context.cartItems || [],   // ✅ fallback to empty array
    addToCart: context.addToCart,
    removeFromCart: context.removeFromCart,
  };
};
