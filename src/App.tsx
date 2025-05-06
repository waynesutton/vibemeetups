// import React from "react"; // Removed unused import
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Meetups from "./components/Meetups";
import Partners from "./components/Partners";
import About from "./components/About";
import Footer from "./components/Footer";
import SubmitPage from "./pages/SubmitPage"; // Placeholder for SubmitPage
import ProtectedAdminRoute from "./ProtectedAdminRoute"; // Import the wrapper
import "./App.css"; // Import global styles

function HomePage() {
  return (
    <>
      {/* Background elements moved to App component */}
      <Hero />
      <Meetups />
      <Partners />
      <About />
    </>
  );
}

function AppContent() {
  // const location = useLocation(); // Removed unused variable
  // const isHomePage = location.pathname === "/"; // Already commented out/removed

  return (
    <div className="app-container">
      {/* Render Header on all pages */}
      <Header />

      {/* Gradient Orbs - Now positioned relative to body */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
