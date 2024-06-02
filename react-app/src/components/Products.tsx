import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import StarRating from "./StarRating"; // Import the custom StarRating component

export interface Product {
  product_id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  isOnSpecial: boolean;
}

interface Review {
  product_id: number;
  rating: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product`
        );
        setProducts(response.data);
        console.log("Products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews`
        ); // Ensure this matches your backend endpoint
        setReviews(response.data);
        console.log("Reviews:", response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const getAverageRating = (productId: number) => {
    const productReviews = reviews.filter(
      (review) => review.product_id === productId
    );
    if (productReviews.length === 0) return 0;
    const totalRating = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / productReviews.length;
  };

  const viewComments = (productId: number) => {
    navigate(`/product/${productId}/comments`);
  };

  return (
    <div className="container mx-auto py-8 mb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="bg-white rounded-lg shadow-md flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-center font-semibold">{product.name}</h3>
                <div className="text-center">
                  <span className="font-bold text-red-500">{`$${(
                    Number(product.price) - Number(product.discount)
                  ).toFixed(2)}`}</span>
                  <span className="block text-sm text-gray-500">{`Was $${Number(
                    product.price
                  ).toFixed(2)}`}</span>
                </div>
                <div className="text-center my-2">
                  <StarRating
                    count={5}
                    value={Math.round(getAverageRating(product.product_id))}
                    size={24}
                    activeColor="#ffd700"
                    inactiveColor="#dcdcdc"
                  />
                  <p className="text-sm text-gray-600">
                    {getAverageRating(product.product_id).toFixed(1)} / 5 stars
                  </p>
                </div>
                {!product.isOnSpecial && <div className="h-6"></div>}
                {isAuthenticated && (
                  <>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </>
                )}
                <button
                  onClick={() => viewComments(product.product_id)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View Comments
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
