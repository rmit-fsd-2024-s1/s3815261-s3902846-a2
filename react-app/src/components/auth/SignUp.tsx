import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationMessage, setValidationMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setValidationMessage("");
    setSuccessMessage("");

    const { username, name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setValidationMessage("Passwords do not match.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationMessage("Please enter a valid email address.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setValidationMessage(
        "Password must be at least 8 characters long, include a mix of upper and lower case letters, numbers, and special characters."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          username,
          name,
          email,
          password,
        }
      );

      if (response.status === 201) {
        console.log("User signed up successfully");
        setSuccessMessage("User signed up successfully!");

        // Display success message for 2 seconds before redirecting
        setTimeout(() => {
          // Redirect to profile page upon successful sign-up
          navigate("/profile");
        }, 1500); // Delay of 1.5 seconds
      } else {
        setValidationMessage("Error signing up, please try again.");
      }
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setValidationMessage(
        error.response?.data?.message ||
          "Account could not be created, please choose a different username or email"
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow bg-white">
      {validationMessage && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full"
          role="alert"
        >
          <p>{validationMessage}</p>
        </div>
      )}
      {successMessage && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 w-full"
          role="alert"
        >
          <p>{successMessage}</p>
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
              htmlFor="username"
            >
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
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a secure password"
              required
            />
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-800 text-lg font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-green-600"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
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
