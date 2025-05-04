import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Meetups from "./components/Meetups";
import Partners from "./components/Partners";
import About from "./components/About";
import Footer from "./components/Footer";
import "./App.css"; // Import global styles

const App: React.FC = () => {
  return (
    <>
      {/* Background Elements */}
      <div className="background"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      {/* New Header Structure */}
      <header className="app-header">
        <div className="header-title">
          <a href="/">Vibe Coding Meetups</a>
        </div>
        <Header /> {/* Renders the right-aligned links */}
      </header>

      {/* Page Components */}
      <main>
        <Hero />
        <Meetups />
        <Partners />
        <About />
      </main>
      <Footer />
    </>
  );
};

export default App;
