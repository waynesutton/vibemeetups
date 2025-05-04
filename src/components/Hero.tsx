import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="hero" id="hero">
      {" "}
      {/* Added id="hero" for potential navigation */}
      <div className="hero-content">
        <h1>vibe coding meetups</h1>
        <p>
          A modern development environment that enhances your coding experience with intelligent
          tools and beautiful interfaces.
        </p>
        <div className="hero-buttons" id="community">
          {" "}
          {/* Keep id here as it's specifically targeted */}
          <a href="#" className="secondary-button">
            Join Community
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
