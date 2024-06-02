import React, { useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const { items, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Debugging to check items state
  useEffect(() => {
    console.log("Cart items:", items);
  }, [items]);

  const total = items.reduce(
    (acc, item) => acc + Number(item.price || 0) * item.quantity,
    0
  );

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      clearCart();
    }
  };

  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${Number(item.price || 0).toFixed(2)} each
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    updateItemQuantity(item.cart_item_id, item.quantity - 1)
                  }
                  className="text-lg px-3 py-1 border rounded-l focus:outline-none focus:ring disabled:bg-gray-200"
                  disabled={item.quantity <= 1}
                >
                  &ndash;
                </button>
                <span className="px-4 border-t border-b flex items-center justify-center w-12">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateItemQuantity(item.cart_item_id, item.quantity + 1)
                  }
                  className="text-lg px-3 py-1 border rounded-r focus:outline-none focus:ring"
                >
                  +
                </button>
              </div>
              <span className="font-semibold">
                ${(Number(item.price || 0) * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item.cart_item_id)}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
        {items.length > 0 && (
          <div className="text-right font-bold mt-4">
            Total: ${total.toFixed(2)}
          </div>
        )}
      </div>
      <div className="mt-8">
        <button
          onClick={handleProceedToPayment}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Proceed to Payment
        </button>
        <button
          onClick={handleClearCart}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Checkout;
