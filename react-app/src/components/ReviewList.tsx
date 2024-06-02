import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import EditReviewForm from "./EditReviewForm";
import StarRating from "./StarRating"; // Import the custom StarRating component

interface Review {
  review_id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string;
  User: { username: string };
}

interface ReviewListProps {
  productId: number;
  onReviewEdited: () => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  productId,
  onReviewEdited,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useAuth();
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews/${productId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId, onReviewEdited]);

  const handleDelete = async (reviewId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/review/${reviewId}`
      );
      onReviewEdited();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEditCancel = () => {
    setEditingReview(null);
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
      {reviews.map((review) => (
        <div key={review.review_id} className="border-b py-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-lg">{review.User.username}</p>
            <StarRating
              count={5}
              value={review.rating}
              size={20}
              activeColor="#ffd700"
              inactiveColor="#dcdcdc"
            />
          </div>
          {editingReview && editingReview.review_id === review.review_id ? (
            <EditReviewForm
              review={editingReview}
              onReviewEdited={onReviewEdited}
              onEditCancel={handleEditCancel}
            />
          ) : (
            <div>
              <p className="text-gray-700 mb-2 break-words whitespace-normal">
                {review.comment}
              </p>
              {user?.user_id === review.user_id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(review.review_id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setEditingReview(review)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
