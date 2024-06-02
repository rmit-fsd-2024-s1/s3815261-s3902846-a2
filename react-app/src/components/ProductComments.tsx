import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

interface Product {
  product_id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  isOnSpecial: boolean;
}

const ProductComments: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product/${productId}`
        );
        setProduct(response.data);
        console.log("Product:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews/${productId}`
        );
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId, reviewSubmitted]);

  const handleReviewSubmitted = () => {
    setReviewSubmitted(!reviewSubmitted);
  };

  return (
    <div className="container mx-auto py-8 mb-20">
      <div className="max-w-4xl mx-auto">
        {product && (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center">
              {product.name}
            </h1>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover rounded-t-lg mb-4"
            />
            <div className="text-center mb-4">
              <span className="font-bold text-red-500">{`$${(
                Number(product.price) - Number(product.discount)
              ).toFixed(2)}`}</span>
              <span className="block text-sm text-gray-500">{`Was $${Number(
                product.price
              ).toFixed(2)}`}</span>
            </div>
            <ReviewForm
              productId={product.product_id}
              onReviewSubmitted={handleReviewSubmitted}
            />
            <ReviewList
              productId={product.product_id}
              onReviewEdited={handleReviewSubmitted}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
