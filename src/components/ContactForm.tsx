import React from "react";

// TODO: Replace "YOUR_ACCESS_KEY_HERE" with your actual Web3Forms Access Key.
// It's recommended to store this in environment variables.
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const [result, setResult] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    // Basic spam check
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    formData.append("from_name", "Vibe Coding Contact Form");
    formData.append("subject", "New Contact Form Submission from Vibe Coding");
    formData.append("replyto", object.email);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        (event.target as HTMLFormElement).reset();
        setTimeout(() => {
          setResult(""); // Clear message after a delay
          onClose(); // Close modal on success
        }, 3000);
      } else {
        console.error("Error submitting form:", data);
        setResult(data.message || "An error occurred.");
        setTimeout(() => {
          setResult(""); // Clear message after a delay
        }, 5000);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setResult("An error occurred while submitting the form.");
      setTimeout(() => {
        setResult(""); // Clear message after a delay
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h3>Contact Us</h3>
      <form onSubmit={onSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Submit Form"}
        </button>
      </form>
      {result && <span className="form-result">{result}</span>}
    </div>
  );
}
