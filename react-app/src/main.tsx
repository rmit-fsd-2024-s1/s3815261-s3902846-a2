import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeProducts } from "./utils/Products";
import "./index.css";

// Call the function to initialize products in localStorage
initializeProducts();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
