import React, { useState } from "react";
import axios from "axios";
import StarRating from "./StarRating"; // Import the custom StarRating component

interface EditReviewFormProps {
  review: { review_id: number; rating: number; comment: string };
  onReviewEdited: () => void;
  onEditCancel: () => void; // New callback to handle canceling edit
}

const EditReviewForm: React.FC<EditReviewFormProps> = ({
  review,
  onReviewEdited,
  onEditCancel,
}) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.split(" ").length > 100) {
      setError("Comment cannot exceed 100 words");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/review/${review.review_id}`,
        {
          rating,
          comment,
        }
      );
      onReviewEdited();
      onEditCancel(); // Hide the form after saving changes
    } catch (error) {
      console.error("Error updating review:", error);
      setError("Error updating review");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded shadow-md mb-4"
    >
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
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          onClick={onEditCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditReviewForm;
