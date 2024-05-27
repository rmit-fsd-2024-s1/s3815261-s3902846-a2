import axios from "axios";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth"; // Ensure correct path

interface EditProfileFormProps {
  user: {
    name: string;
    email: string;
    createdAt: string;
  };
  onSave: (
    formData: { name?: string; email?: string },
    callback: () => void
  ) => void;
  onCancel: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState(user);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmailError(""); // Reset email error when the user starts typing
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser(formData); // Use updateUser from the AuthContext
      onSave(formData, () => {
        setFormData({ ...user, ...formData }); // Update form data with saved data
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === "Email is already taken") {
          setEmailError("Email is already taken");
        } else {
          alert(
            error.response?.data?.message ||
              "An error occurred. Please try again."
          );
        }
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="flex flex-col">
        <label className="font-semibold">Name:</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        {emailError && <p className="text-red-500">{emailError}</p>}
        <label className="font-semibold">Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
