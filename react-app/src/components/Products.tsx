import React, { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  isOnSpecial: boolean;
}

const ProductsComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart(); // Use the addToCart function from the hook
  const { isAuthenticated } = useAuth(); // Use isAuthenticated to determine if the user is logged in

  useEffect(() => {
    // Fetch all products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  return (
    <div className="container mx-auto py-8 mb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-center font-semibold">{product.name}</h3>
                <div>
                  <p className="text-center">
                    {product.isOnSpecial ? (
                      <>
                        <span className="font-bold text-red-500">{`$${(
                          product.price - product.discount
                        ).toFixed(2)}`}</span>
                        <span className="block text-sm text-gray-500">{`Was $${product.price.toFixed(
                          2
                        )}`}</span>
                      </>
                    ) : (
                      <span className="font-bold">{`$${product.price.toFixed(
                        2
                      )}`}</span>
                    )}
                  </p>
                  {/* Add an empty space if the product is not on special to align the buttons */}
                  {!product.isOnSpecial && <div className="h-6"></div>}
                </div>
                {isAuthenticated && (
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsComponent;
