import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="app-header">
      <div className="header-title">
        <Link to="/">Vibe Coding Meetups</Link>
      </div>
      <nav className="header-nav">
        {isHomePage ? (
          <>
            <a href="#meetups" className="nav-link">
              Meetups
            </a>
            <a href="#partners" className="nav-link">
              Partners
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
          </>
        ) : (
          <Link to="/#meetups" className="nav-link">
            Meetups
          </Link>
        )}
        <Link to="/submit" className="nav-link">
          Submit
        </Link>
        <a
          href="https://discord.gg/fPzDByXXk6"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link discord-link">
          Join Discord
        </a>
      </nav>
    </header>
  );
};

export default Header;
