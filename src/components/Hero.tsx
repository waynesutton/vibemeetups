import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="hero" id="hero">
      {" "}
      {/* Added id="hero" for potential navigation */}
      <div className="hero-content">
        <h1>vibe, meet, ship</h1>
        <p>
          Join the Discord to connect with other vibe coders, trade prompts, drop your favorite
          tools, and connect with fellow vibe coders in your city.
        </p>
        <div className="hero-buttons" id="community">
          {" "}
          {/* Keep id here as it's specifically targeted */}
          <a href="https://discord.gg/fPzDByXXk6" className="secondary-button">
            Join Community
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
