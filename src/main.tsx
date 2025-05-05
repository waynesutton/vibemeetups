import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css"; // Original placeholder import
import "./App.css"; // Corrected import for our CSS file
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Check if the environment variable is set
const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  throw new Error("VITE_CONVEX_URL environment variable not set! See README.md for instructions");
}

// Initialize the Convex client
const convex = new ConvexReactClient(convexUrl);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>
);
