import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth"; // Adjust the import path as necessary

const SignUp = () => {
  const [validationMessage, setValidationMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regex for strong password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset validation message
    setValidationMessage("");

    // Validate email
    if (!emailRegex.test(email)) {
      setValidationMessage("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      setValidationMessage(
        "Password must be at least 8 characters long, include a mix of upper and lower case letters, numbers, and special characters."
      );
      return;
    }

    // Sign up the user
    signUp(name, email, password);
    // Assuming signUp function handles the login state
  };

  return (
    // Removed h-screen and added flex-grow to the wrapping div
    <div className="flex flex-col justify-center items-center flex-grow bg-white">
      {validationMessage && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full"
          role="alert"
        >
          <p>{validationMessage}</p>
        </div>
      )}
      <div className="flex flex-col justify-center items-center flex-grow bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-2xl rounded-lg px-12 pt-10 pb-12 mb-4 max-w-2xl w-full"
        >
          <div className="mb-6">
            <label
              className="block text-gray-800 text-lg font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-green-600"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
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
              placeholder="Enter your email"
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
              placeholder="Enter a secure password"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
