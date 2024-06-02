import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import StarRating from "./StarRating"; // Import the custom StarRating component

interface ReviewFormProps {
  productId: number;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  onReviewSubmitted,
}) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (comment.split(" ").length > 100) {
      setError("Comment cannot exceed 100 words");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/review`, {
        user_id: user.user_id,
        product_id: productId,
        rating,
        comment,
      });
      setRating(1);
      setComment("");
      setError("");
      onReviewSubmitted();
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Error submitting review");
    }
  };

  if (!user) return null; // Don't render if user is not authenticated

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded shadow-md mb-4"
    >
      <h3 className="text-lg font-semibold mb-4">Add a Review</h3>
      <div className="mb-2">
        <label className="block text-gray-700">Rating</label>
        <StarRating
          count={5}
          value={rating}
          onChange={setRating}
          size={24}
          activeColor="#ffd700"
          inactiveColor="#dcdcdc"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded p-1 w-full break-words whitespace-normal"
          rows={4}
          maxLength={500}
          placeholder="Write your review here..."
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
