import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if email and password are not empty strings
    if (!email.trim() || !password.trim()) {
      console.error("Email and password must not be empty");
      // Handle the empty fields error, such as displaying an error message to the user
      return;
    }
    try {
      await signIn(
        email,
        password,
        () => {
          // Set login success state to true
          setLoginSuccess(true);
          // After 1.5 seconds, navigate to the profile page
          setTimeout(() => {
            navigate("/profile");
          }, 1500);
        }
      );
    } catch (error: any) {
      console.error("Error signing in:", error.message);

      setLoginSuccess(false); // Reset login success state on failure
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow bg-white">
      {/* Show login success message if login is successful */}
      {loginSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 w-full" role="alert">
          <p>Login successful!</p>
        </div>
      )}
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
