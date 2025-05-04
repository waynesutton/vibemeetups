import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <p>
        &copy; 2025 Vibe Coding Meetups. <span style={{ color: "var(--gray)" }}>| </span>
        <a
          href="https://www.convex.dev/?utm_source=vibe-coding-meetups"
          target="_blank"
          rel="noopener noreferrer">
          Powered by Convex
        </a>
      </p>
    </footer>
  );
};

export default Footer;
