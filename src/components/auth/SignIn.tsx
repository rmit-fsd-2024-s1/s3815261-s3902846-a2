import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Instantiate useNavigate
  const { signIn } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, password, () => navigate("/profile")); // Pass the navigation callback to signIn
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-2xl rounded-lg px-12 pt-10 pb-12 mb-4 max-w-2xl w-full"
      >
        <div className="mb-6">
          <label
            className="block text-gray-800 text-lg font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-green-600"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-8">
          <label
            className="block text-gray-800 text-lg font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-green-600"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******************"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
