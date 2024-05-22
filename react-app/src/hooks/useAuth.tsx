import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  signIn: (email: string, password: string, callback: () => void) => void;
  signOut: () => void;
  signUp: (username: string, name: string, email: string, password: string) => void; // Updated parameter order
  updateUser: (updates: Partial<User>) => void;
  deleteUser: (email: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  users: [],
  signIn: () => {},
  signOut: () => {},
  signUp: () => {}, // Updated default value
  updateUser: () => {},
  deleteUser: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    const storedUserEmail = localStorage.getItem("currentUser");
    if (storedAuth && storedUserEmail) {
      const loggedInUser = users.find((u) => u.email === storedUserEmail);
      setIsAuthenticated(storedAuth);
      setUser(loggedInUser || null);
    }
  }, [users]);

  const signIn = (email: string, password: string, callback: () => void) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setIsAuthenticated(true);
      setUser(foundUser);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", email);
      alert("Login successful!");
      callback();
    } else {
      alert("Invalid credentials");
    }
  };

  const signUp = (username: string, name: string, email: string, password: string) => {
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("Email is already registered. Please use a different email.");
      return;
    }

    const newUser = {
      username,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsAuthenticated(true);
    setUser(newUser);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", email);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const index = users.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      const updatedUser = { ...users[index], ...updates };
      const updatedUsers = [
        ...users.slice(0, index),
        updatedUser,
        ...users.slice(index + 1),
      ];
      setUsers(updatedUsers);

      if (updates.email && user.email !== updates.email) {
        localStorage.setItem("currentUser", updates.email);
      }

      setUser(updatedUser);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const deleteUser = (email: string) => {
    const updatedUsers = users.filter((u) => u.email !== email);
    if (user?.email === email) {
      signOut();
    }
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const signOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        users,
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
