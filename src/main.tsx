import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css"; // Original placeholder import
import "./App.css"; // Corrected import for our CSS file

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
