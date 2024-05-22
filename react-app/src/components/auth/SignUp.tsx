import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  username: string;
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [validationMessage, setValidationMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Reset validation message
    setValidationMessage("");

    const { username, name, email, password } = formData;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationMessage("Please enter a valid email address.");
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setValidationMessage(
        "Password must be at least 8 characters long, include a mix of upper and lower case letters, numbers, and special characters."
      );
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, email, password }),
      });

        if (!response.ok) {
        // Handle error response from backend
        const errorData = await response.json();
        throw new Error(errorData.message || "Error signing up");
      }

      // Handle successful sign-up
      console.log("User signed up successfully");
      // Optionally, redirect to another page or show a success message to the user
    } catch (error: any) {
      // Handle sign-up error
      console.error("Error signing up:", error.message);
      // Display error message to the user
      setValidationMessage(error.message || "Error signing up");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow bg-white">
      {validationMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
          <p>{validationMessage}</p>
        </div>
      )}
      <div className="flex flex-col justify-center items-center flex-grow bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-2xl rounded-lg px-12 pt-10 pb-12 mb-4 max-w-2xl w-full"
        >
          <div className="mb-6">
            <label className="block text-gray-800 text-lg font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-green-600"
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-lg font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-green-600"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-lg font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-green-600"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-800 text-lg font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-green-600"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
