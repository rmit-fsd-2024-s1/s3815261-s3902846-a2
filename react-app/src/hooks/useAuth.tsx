import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

export interface User {
  name: string;
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
  updateUser: (updates: Partial<User>) => void;
  deleteUser: (email: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
  updateUser: () => {},
  deleteUser: () => {},
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

  const signIn = async (email: string, password: string, callback: () => void) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, { email, password });
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

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${user.email}`, updates);
      setUser(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteUser = async (email: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${email}`);
      if (user?.email === email) {
        signOut();
      }
    } catch (error) {
      handleError(error);
    }
  };

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

export const convertISOToDateTime = (isoString: string | number | Date) => {
  const date = new Date(isoString);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
