import React from "react";
import { useCart } from "../../context/Cartcontext";

const CartSummary = () => {
  const { cart } = useCart();

  return (
    <div className="p-4 bg-white shadow rounded-xl mt-6">
      <h2 className="text-xl font-bold mb-4">🛒 Cart Summary</h2>
      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartSummary;
