// Products.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Products from "../components/Products";
import { CartContext } from "../hooks/useCart";
import { AuthContext } from "../hooks/useAuth";
import axios from "axios";
import { vi } from "vitest";

// Mock the axios module
vi.mock("axios");

const mockProducts = [
  {
    product_id: 1,
    name: "Tomatoes",
    image: "https://images.unsplash.com/photo-1553395572-0ef353a212bf",
    price: 2.5,
    discount: 0.2,
    isOnSpecial: false,
  },
];

describe("Products component", () => {
  beforeEach(() => {
    // Mock axios GET request to return mockProducts
    (axios.get as vi.Mock).mockResolvedValueOnce({ data: mockProducts });
  });

  it('should call addToCart when "Add to Cart" button is clicked', async () => {
    const mockAddToCart = vi.fn();

    // Render the Products component with mock AuthContext and CartContext
    render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            isAuthenticated: true,
            signIn: vi.fn(),
            signOut: vi.fn(),
            signUp: vi.fn(),
            updateUser: vi.fn(),
            deleteUser: vi.fn(),
            user: {
              user_id: 1,
              name: "Test User",
              username: "testuser",
              email: "test@example.com",
              password: "password",
              createdAt: "",
            },
          }}
        >
          <CartContext.Provider
            value={{
              items: [],
              addToCart: mockAddToCart,
              updateItemQuantity: vi.fn(),
              removeFromCart: vi.fn(),
              clearCart: vi.fn(),
            }}
          >
            <Products />
          </CartContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Find and click the "Add to Cart" button
    const addButton = await screen.findByText("Add to Cart");
    fireEvent.click(addButton);

    // Check if the addToCart function was called with the correct product
    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]);
  });
});
