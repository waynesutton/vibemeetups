import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Vibe, Meet, Ship</h1>
        <p>
          Join the Discord to connect with other vibe coders, trade prompts, drop your favorite
          tools, and connect with fellow vibe coders in your city.
        </p>
        <div className="hero-buttons">
          {/* Link directly to Discord */}
          <a
            href="https://discord.gg/fPzDByXXk6"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button">
            {" "}
            {/* Use original button class */}
            Join Community
          </a>
          {/* Remove other buttons if they existed */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
