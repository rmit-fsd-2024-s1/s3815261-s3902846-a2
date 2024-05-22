import { useState, useContext } from "react";
import { AuthContext, AuthContextType, User } from "../hooks/useAuth";

interface EditProfileFormProps {
  user: {
    name: string;
    email: string;
    createdAt: string;
  };
  onSave: (formData: {
    name?: string;
    email?: string;
    createdAt?: string;
  }) => void;
  onCancel: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState(user);
  const [emailError, setEmailError] = useState("");
  const { users } = useContext(AuthContext) as AuthContextType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmailError(""); // Reset email error when the user starts typing
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Check if email already exists in the users array, excluding the current user's email
    const emailExists = users.some(
      (u: User) => u.email === formData.email && u.email !== user.email
    );
    if (emailExists) {
      setEmailError("This email is already in use by another account.");
      return;
    }

    onSave(formData);
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