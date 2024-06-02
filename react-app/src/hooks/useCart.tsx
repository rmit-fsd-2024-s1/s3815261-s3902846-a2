import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

export interface CartItem {
  cart_item_id: number;
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
  updateItemQuantity: (cartItemId: number, quantity: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (cartItemId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    if (user) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cart/${user.user_id}`
        );
        const cartItems = response.data.CartItems.map((item: any) => ({
          cart_item_id: item.cart_item_id,
          product_id: item.product_id,
          name: item.Product.name,
          image: item.Product.image,
          price: item.Product.price,
          quantity: item.quantity,
        }));
        setItems(cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const saveCartToLocalStorage = (cartItems: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    saveCartToLocalStorage(items);
  }, [items]);

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

  const addToCart = async (product: Product) => {
    if (!user) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          user_id: user.user_id,
          product_id: product.product_id,
          quantity: 1,
        }
      );
      const newCartItem = response.data;
      setItems((prevItems) => {
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
        return [
          ...prevItems,
          { ...product, quantity: 1, cart_item_id: newCartItem.cart_item_id },
        ];
      });
    } catch (error) {
      handleError(error);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    if (!user) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart/remove/${cartItemId}`
      );
      setItems((prevItems) =>
        prevItems.filter((item) => item.cart_item_id !== cartItemId)
      );
    } catch (error) {
      handleError(error);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart/clear/${user.user_id}`
      );
      setItems([]);
      saveCartToLocalStorage([]);
    } catch (error) {
      handleError(error);
    }
  };

  const updateItemQuantity = async (cartItemId: number, quantity: number) => {
    if (!user) return;
    if (quantity > 0) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/cart/update`, {
          cartItemId,
          quantity,
        });
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.cart_item_id === cartItemId ? { ...item, quantity } : item
          )
        );
      } catch (error) {
        handleError(error);
      }
    } else {
      removeFromCart(cartItemId);
    }
  };

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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
