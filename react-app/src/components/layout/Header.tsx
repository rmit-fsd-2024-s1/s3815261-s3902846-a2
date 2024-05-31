import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart, CartItem } from "../../hooks/useCart";
import { FaShoppingCart } from "react-icons/fa";

const Header: React.FC = () => {
  const { isAuthenticated, signOut } = useAuth();
  const { items } = useCart();

  const itemCount =
    items?.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    ) ?? 0;

  return (
    <header className="bg-green-500 text-white py-3 px-5">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            SOIL Organic Foods
          </Link>
        </h1>
        <nav className="flex items-center gap-2">
          <Link
            to="/products"
            className="bg-white text-green-500 px-3 py-1 rounded-lg shadow font-medium"
          >
            Products
          </Link>
          {isAuthenticated && (
            <Link
              to="/profile"
              className="bg-white text-green-500 px-3 py-1 rounded-lg shadow font-medium"
            >
              Profile
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={signOut}
              className="bg-white text-green-500 px-3 py-1 rounded-lg shadow font-medium"
            >
              Sign Out
            </button>
          )}
          {!isAuthenticated && (
            <>
              <Link
                to="/signup"
                className="bg-white text-green-500 px-3 py-1 rounded-lg shadow font-medium"
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                className="bg-white text-green-500 px-3 py-1 rounded-lg shadow font-medium"
              >
                Sign In
              </Link>
            </>
          )}
          <Link to="/checkout" className="relative ml-auto">
            <FaShoppingCart size={24} className="text-white" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
