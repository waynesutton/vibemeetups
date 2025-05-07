import React from "react";

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <h2>About Vibe Coding Meetups</h2>
        <p>
          Vibe Coders Meetups brings online builders offline. A global network of vibe coders and
          developers sharing prompts, tools, and ideas—and meeting up to build together. Whether
          you’re experimenting with AI, shipping full-stack apps, or coding on the side, this is
          {/* where real builders connect, learn, and ship. Site/Discord maintained by{" "}
          <a href="https://www.convex.dev/?utm_source=vibe-coding-meetups">Convex</a>/
          <a href="https://x.com/waynesutton">@waynesutton</a> */}
        </p>
      </div>
    </section>
  );
};

export default About;
