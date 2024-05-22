import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../utils/Products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  updateItemQuantity: (productId: number, quantity: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    // Save cart items to local storage whenever they change
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Adds product to cart or increments quantity if already present
  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Removes an item from the cart by product ID
  const removeFromCart = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Clears all items from the cart
  const clearCart = () => {
    setItems([]);
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    if (quantity > 0) {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    } else {
      removeFromCart(productId);
    }
  };

  // Cart context provider that passes down the cart state and handlers
  return (
    <CartContext.Provider
      value={{
        items,
        updateItemQuantity,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
