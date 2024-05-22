import React, { useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  isOnSpecial: boolean;
}

const Special: React.FC = () => {
  const [specialProducts, setSpecialProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch and filter products on special from localStorage when component mounts
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const onSpecialProducts = products.filter(
      (product: Product) => product.isOnSpecial
    );
    setSpecialProducts(onSpecialProducts);
  }, []);

  // Function to navigate to the previous special product
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : specialProducts.length - 1
    );
  };

  // Function to navigate to the next special product
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < specialProducts.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Render the carousel of special products with navigation buttons
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
              key={product.id}
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
                  <p className="text-gray-600">{`Was $${product.price.toFixed(
                    2
                  )}`}</p>
                  <p className="text-lg text-green-600 font-semibold">{`Now $${(
                    product.price - product.discount
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
