import React from "react";
import { useState } from "react";
import { useMutation } from "convex/react";
// Make sure this path matches your generated API file location
import { api } from "../convex/_generated/api"; // Corrected path

export default function AdminLoginPage({ onAuthenticate }) {
  // State for the password input
  const [password, setPassword] = useState("");
  // State for displaying errors
  const [error, setError] = useState("");
  // State to manage loading state during verification
  const [isLoading, setIsLoading] = useState(false);

  // Get the Convex mutation function
  const verifyAdmin = useMutation(api.admin.verifyAdminAccess);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Show loading indicator
    setError(""); // Clear previous errors

    try {
      // Call the backend mutation
      const result = await verifyAdmin({ password });
      if (result) {
        // If verification is successful, call the callback
        onAuthenticate();
      } else {
        // If verification fails
        setError("Invalid password");
        setPassword(""); // Clear the password input for security
      }
    } catch (err) {
      // Handle potential errors during the mutation call
      console.error("Authentication error:", err);
      setError("Authentication failed. Please try again.");
    } finally {
      // Always stop loading indicator
      setIsLoading(false);
    }
  };

  // Render the login form
  return (
    <div
      style={{
        maxWidth: "300px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
      }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            disabled={isLoading} // Disable input during verification
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading} // Disable button during verification
          style={{
            width: "100%",
            padding: "12px",
            cursor: isLoading ? "not-allowed" : "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
          }}>
          {isLoading ? "Verifying..." : "Login"}
        </button>
        {error && <p style={{ color: "red", marginTop: "15px", fontWeight: "bold" }}>{error}</p>}
      </form>
    </div>
  );
}
