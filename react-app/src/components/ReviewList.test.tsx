// ReviewList.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReviewList from "./ReviewList";
import { AuthContext } from "../hooks/useAuth";
import axios from "axios";
import { vi } from "vitest";

// Mock the axios module
vi.mock("axios");

const mockReviews = [
  {
    review_id: 1,
    user_id: 1,
    product_id: 1,
    rating: 5,
    comment: "Great product!",
    User: { username: "testuser" },
  },
];

describe("ReviewList component", () => {
  beforeEach(() => {
    // Mock axios GET request to return mockReviews
    (axios.get as vi.Mock).mockResolvedValueOnce({ data: mockReviews });
  });

  it("should delete a review when the delete button is clicked", async () => {
    const mockOnReviewEdited = vi.fn();

    // Mock axios DELETE request to succeed
    (axios.delete as vi.Mock).mockResolvedValueOnce({ status: 200 });

    // Render the ReviewList component with mock AuthContext
    render(
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
        <ReviewList productId={1} onReviewEdited={mockOnReviewEdited} />
      </AuthContext.Provider>
    );

    // Wait for the review to be displayed
    await waitFor(() => screen.getByText("Great product!"));

    // Find and click the "Delete" button
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Wait for the axios delete request to be called
    await waitFor(() =>
      expect(axios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/review/1`
      )
    );

    // Check if the onReviewEdited function was called
    expect(mockOnReviewEdited).toHaveBeenCalled();
  });
});
