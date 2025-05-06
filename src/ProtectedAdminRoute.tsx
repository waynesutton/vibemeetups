import React, { useState } from "react";
import AdminLoginPage from "./AdminLoginPage.jsx"; // Import the login page
import AdminPage from "./pages/AdminPage"; // Import your actual admin page

const ProtectedAdminRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Callback function passed to the login page
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  // Logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    // Optionally clear the password state in AdminLoginPage if needed,
    // but simple state reset here is usually sufficient.
  };

  if (isAuthenticated) {
    // If authenticated, render the actual admin page content
    // AND the logout button
    return (
      <>
        <div style={{ textAlign: "right", padding: "10px" }}>
          <button
            onClick={handleLogout}
            style={{
              /* Basic Button Styling */ padding: "8px 15px",
              cursor: "pointer",
              backgroundColor: "#f44336" /* Red */,
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}>
            Logout
          </button>
        </div>
        <AdminPage />
      </>
    );
  }

  // If not authenticated, render the login page component
  // Pass the callback function as a prop
  return <AdminLoginPage onAuthenticate={handleAuthentication} />;
};

export default ProtectedAdminRoute;
