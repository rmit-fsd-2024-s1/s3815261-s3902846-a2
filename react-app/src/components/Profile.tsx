import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { convertISOToDateTime } from "../hooks/useAuth";
import EditProfileForm from "./EditProfileForm";

const Profile = () => {
  const { isAuthenticated, user, updateUser, deleteUser } = useAuth();
  const [editing, setEditing] = useState(false);

  if (!isAuthenticated) {
    return <div>You must be logged in to view this page.</div>;
  }

  // Edit user details function
  const handleEdit = (newDetails: { name?: string; email?: string }) => {
    if (user) {
      updateUser(newDetails);
      setEditing(false);
      alert("Profile updated successfully.");
    }
  };

  const handleDelete = () => {
    if (
      user &&
      window.confirm("Are you sure you want to delete your profile?")
    ) {
      deleteUser(user.email); // Pass the email to deleteUser
      alert("Profile deleted successfully.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Profile Page</h2>
      {/* Welcome message */}
      <div className="text-xl font-semibold mb-4">
        Welcome, {user?.username}!
      </div>
      {!editing ? (
        <div className="w-full max-w-xl bg-gray-100 p-4 rounded-lg shadow">
          <div className="border-b border-gray-300 pb-4">
            <p className="text-lg font-semibold">Name:</p>
            <p className="pl-4">{user?.name}</p>
          </div>
          <div className="border-b border-gray-300 py-4">
            <p className="text-lg font-semibold">Email:</p>
            <p className="pl-4">{user?.email}</p>
          </div>
          <div className="border-b border-gray-300 py-4">
            <p className="text-lg font-semibold">Account Created:</p>
            <p className="pl-4">
              {user?.createdAt ? convertISOToDateTime(user.createdAt) : "N/A"}
            </p>
          </div>
          {/* Centering the buttons */}
          <div className="flex justify-center pt-4 space-x-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        user && (
          <EditProfileForm
            user={user}
            onSave={handleEdit}
            onCancel={() => setEditing(false)}
          />
        )
      )}
    </div>
  );
};

export default Profile;
