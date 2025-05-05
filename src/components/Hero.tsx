import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Vibe, Meet, Ship</h1>
        <p>
          Join the Discord to trade prompts, share your favorite tools and tips, and find local
          meetups with people who code like you. Whether you’re working on AI apps, full-stack
          experiments, or weekend builds, this is where real-time creativity meets community.
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
