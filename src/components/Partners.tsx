import React from "react";

const Partners: React.FC = () => {
  return (
    <section className="partners" id="partners">
      <h2 className="partners-title">Partners</h2>
      <div className="partners-grid">
        <div className="partner-card">
          <div className="partner-logo">Partner 1</div>
        </div>
        <div className="partner-card">
          <div className="partner-logo">Partner 2</div>
        </div>
        <div className="partner-card">
          <div className="partner-logo">Partner 3</div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
