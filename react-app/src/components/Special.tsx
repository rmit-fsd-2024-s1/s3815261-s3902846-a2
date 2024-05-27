import React, { useEffect, useState } from "react";
import axios from "axios";

export interface Product {
  product_id: number;
  name: string;
  image: string;
  price: string;
  discount: string;
  isOnSpecial: boolean;
}

const Special: React.FC = () => {
  const [specialProducts, setSpecialProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSpecialProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product/specials`
        );
        setSpecialProducts(response.data);
      } catch (error) {
        console.error("Error fetching special products:", error);
      }
    };

    fetchSpecialProducts();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : specialProducts.length - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < specialProducts.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="relative flex justify-center items-center my-8">
      <button
        onClick={goToPrevious}
        className="absolute left-4 z-20 bg-gray-800 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        aria-label="Previous"
      >
        {"<"}
      </button>
      <div className="overflow-hidden w-full max-w-6xl mx-auto px-4">
        <div
          className="whitespace-nowrap transition ease-linear duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {specialProducts.map((product, _index) => (
            <div
              key={product.product_id}
              className="inline-flex justify-center w-full"
              style={{ minWidth: "100%" }}
            >
              <div className="p-6 shadow-md rounded-lg bg-white mx-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mx-auto h-48 w-48 object-cover rounded-md"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{`Was $${parseFloat(
                    product.price
                  ).toFixed(2)}`}</p>
                  <p className="text-lg text-green-600 font-semibold">{`Now $${(
                    parseFloat(product.price) - parseFloat(product.discount)
                  ).toFixed(2)}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={goToNext}
        className="absolute right-4 z-20 bg-gray-800 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        aria-label="Next"
      >
        {">"}
      </button>
    </div>
  );
};

export default Special;
