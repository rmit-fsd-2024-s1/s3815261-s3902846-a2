import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../hooks/useCart";

const Payment: React.FC = () => {
  const { items, clearCart } = useCart();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [receiptItems, setReceiptItems] = useState<CartItem[]>([]);
  const [receipt, setReceipt] = useState(false);
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + Number(item.price || 0) * item.quantity,
    0
  );

  const receiptTotal = receiptItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * item.quantity,
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

  const handlePayment = () => {
    if (validateCard()) {
      if (window.confirm("Are you sure you want to confirm the payment?")) {
        alert("Payment successful! Here is your receipt.");
        setReceiptItems([...items]); // Store current items before clearing the cart
        clearCart();
        setReceipt(true);
      }
    } else {
      alert(
        "Invalid Visa card details. Please check your card number and expiry date."
      );
    }
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  if (receipt) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Receipt</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="mb-4 text-lg">
            Thank you for your purchase! Here is your receipt:
          </p>
          <ul className="mb-4">
            {receiptItems.map((item) => (
              <li
                key={item.product_id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{item.name}</span>
                <span>
                  ${Number(item.price || 0).toFixed(2)} x {item.quantity}
                </span>
                <span className="font-bold">
                  ${(Number(item.price || 0) * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-xl">
            Total: ${receiptTotal.toFixed(2)}
          </div>
          <button
            onClick={handleReturnHome}
            className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
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
                <span className="px-4 border-t border-b flex items-center justify-center w-12">
                  {item.quantity}
                </span>
              </div>
              <span className="font-semibold">
                ${(Number(item.price || 0) * item.quantity).toFixed(2)}
              </span>
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
          onClick={handlePayment}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
