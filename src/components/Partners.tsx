import React, { useState } from "react";
import ContactForm from "./ContactForm";

const Partners: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const toggleContactForm = (event?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event?.preventDefault();
    setShowContactForm(!showContactForm);
  };

  return (
    <section className="partners" id="partners">
      <h2 className="partners-title">Partners</h2>
      <div className="partners-grid">
        <a
          href="https://www.convex.dev/?utm_source=vibe-coding-meetups"
          target="_blank"
          rel="noopener noreferrer"
          className="partner-link">
          <div className="partner-card">
            <img src="/convex-black.svg" alt="Convex Logo" className="partner-image" />
          </div>
        </a>
        <div className="partner-card">
          <div className="partner-logo">
            Interested in partnering?{" "}
            <a
              href="#"
              onClick={toggleContactForm}
              style={{ cursor: "pointer", textDecoration: "underline" }}>
              {" "}
              Contact us
            </a>
          </div>
        </div>
        {/* <div className="partner-card">
          <div className="partner-logo">Partner 3</div>
        </div>  */}
      </div>

      {showContactForm && (
        <div className="contact-form-section">
          <button className="contact-form-close-button" onClick={() => toggleContactForm()}>
            &times;
          </button>
          <ContactForm onClose={() => toggleContactForm()} />
        </div>
      )}
    </section>
  );
};

export default Partners;
