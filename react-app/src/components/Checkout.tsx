import React, { useState } from "react";
import { useCart } from "../hooks/useCart";

const Checkout: React.FC = () => {
  const { items, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const validateCard = () => {
    const regexCardNumber = /^4[0-9]{15}$/;
    const regexExpiryDate = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

    const isCardNumberValid = regexCardNumber.test(
      cardNumber.replace(/\s+/g, "")
    );
    const isExpiryDateValid = regexExpiryDate.test(expiryDate);

    return isCardNumberValid && isExpiryDateValid;
  };

  const handleCheckout = () => {
    if (validateCard()) {
      alert(`Payment successful! Total: $${total.toFixed(2)}`);
      clearCart();
      setCardNumber("");
      setExpiryDate("");
    } else {
      alert(
        "Invalid Visa card details. Please check your card number and expiry date."
      );
    }
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
                    ${Number(item.price).toFixed(2)} each
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    updateItemQuantity(item.product_id, item.quantity - 1)
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
                    updateItemQuantity(item.product_id, item.quantity + 1)
                  }
                  className="text-lg px-3 py-1 border rounded-r focus:outline-none focus:ring"
                >
                  +
                </button>
              </div>
              <span className="font-semibold">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item.product_id)}
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
        <div className="flex space-x-3 mb-4">
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="flex-1 px-2 py-1 border rounded"
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="px-2 py-1 border rounded"
          />
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
