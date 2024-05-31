import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

export interface CartItem {
  product_id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Product {
  product_id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  isOnSpecial: boolean;
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
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  useEffect(() => {
    // Fetch cart items from the API when the component mounts
    const fetchCart = async () => {
      const currentUser = user || getUserFromLocalStorage();
      if (currentUser) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cart/${currentUser.user_id}`
          );
          setItems(response.data.CartItems || []);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCart();
  }, [user]);

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error:",
        error.response?.data?.message || error.message
      );
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } else {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  // Adds product to cart or increments quantity if already present
  const addToCart = async (product: Product) => {
    const currentUser = user || getUserFromLocalStorage();
    if (!currentUser) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
        user_id: currentUser.user_id,
        product_id: product.product_id,
        quantity: 1,
      });
      setItems((prevItems) => {
        if (!prevItems) prevItems = [];
        const itemExists = prevItems.find(
          (item) => item.product_id === product.product_id
        );
        if (itemExists) {
          return prevItems.map((item) =>
            item.product_id === product.product_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
    } catch (error) {
      handleError(error);
    }
  };

  // Removes an item from the cart by product ID
  const removeFromCart = async (productId: number) => {
    const currentUser = user || getUserFromLocalStorage();
    if (!currentUser) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart/remove/${productId}`
      );
      setItems((prevItems) =>
        prevItems
          ? prevItems.filter((item) => item.product_id !== productId)
          : []
      );
    } catch (error) {
      handleError(error);
    }
  };

  // Clears all items from the cart
  const clearCart = () => {
    setItems([]);
    // Optional: Implement API call to clear cart items
  };

  const updateItemQuantity = async (productId: number, quantity: number) => {
    if (quantity > 0) {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.product_id === productId ? { ...item, quantity } : item
        )
      );
      // Optional: Implement API call to update item quantity
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
