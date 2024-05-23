import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

export interface User {
  user_id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string, callback: () => void) => void;
  signOut: () => void;
  signUp: (username: string, name: string, email: string, password: string) => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
  updateUser: async () => {},
  deleteUser: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "An error occurred. Please try again.");
    } else {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };


  //sign in by calling login api in user controller which handles argon2 verify()
  const signIn = async (email: string, password: string, callback: () => void) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password });
      setUser(response.data);
      setIsAuthenticated(true);
      callback();
    } catch (error) {
      handleError(error);
    }
  };

  const signUp = async (username: string, name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, { username, name, email, password });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      handleError(error);
    }
  };

  // Update user by id defined in user controller
  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${user.user_id}`, updates);
      setUser(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  // Delete user by id defined in user controller
  const deleteUser= async (id: number): Promise<void> => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
      signOut();
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  // Function for signing out once user deletion is successful
  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signOut,
        signUp,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
