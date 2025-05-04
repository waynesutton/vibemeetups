import React from "react";

const Header: React.FC = () => {
  return (
    <div className="top-links">
      <a href="#community">Community</a>
      <a href="#meetups">Meetups</a>
      {/* <a href="#submit">Submit</a> // Link removed as per original HTML */}
      <a href="#about">About</a>
    </div>
  );
};

export default Header;
