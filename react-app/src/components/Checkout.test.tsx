// Checkout.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // <-- Correct import for jest-dom
import { BrowserRouter as Router } from "react-router-dom";
import Checkout from "./Checkout";
import { useCart } from "../hooks/useCart";
import { vi } from "vitest";

// Mock the useCart hook
vi.mock("../hooks/useCart");

const mockedUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe("Checkout Component", () => {
  beforeEach(() => {
    // Mock return value for useCart hook
    mockedUseCart.mockReturnValue({
      items: [
        {
          cart_item_id: 1,
          product_id: 2,
          name: "Tomatoes",
          image:
            "https://images.unsplash.com/photo-1553395572-0ef353a212bf?q=80&w=3315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          price: 2.5,
          quantity: 1,
        },
      ],
      updateItemQuantity: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn(),
      addToCart: vi.fn(),
    });
  });

  test("renders checkout with items", () => {
    // Render the Checkout component
    render(
      <Router>
        <Checkout />
      </Router>
    );

    // Check that the item name, price, and total are displayed correctly
    expect(screen.getByText("Tomatoes")).toBeInTheDocument();
    expect(screen.getByText("$2.50 each")).toBeInTheDocument();
    expect(screen.getByText("Total: $2.50")).toBeInTheDocument();
  });

  test("increments item quantity", () => {
    // Render the Checkout component
    render(
      <Router>
        <Checkout />
      </Router>
    );

    // Simulate clicking the "+" button to increase quantity
    fireEvent.click(screen.getByText("+"));

    // Check that updateItemQuantity was called with the correct arguments
    expect(mockedUseCart().updateItemQuantity).toHaveBeenCalledWith(1, 2);
  });

  test("removes item from cart", () => {
    // Render the Checkout component
    render(
      <Router>
        <Checkout />
      </Router>
    );

    // Simulate clicking the "Remove" button to remove item from cart
    fireEvent.click(screen.getByText("Remove"));

    // Check that removeFromCart was called with the correct arguments
    expect(mockedUseCart().removeFromCart).toHaveBeenCalledWith(1);
  });
});
