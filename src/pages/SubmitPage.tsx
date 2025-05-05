import React, { useState, FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "../components/Header"; // Adjust path as needed
import Footer from "../components/Footer"; // Adjust path as needed

const SubmitPage: React.FC = () => {
  const submitMeetup = useMutation(api.meetups.submitMeetup);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); // Keep as string for input type="date"
  const [description, setDescription] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [location, setLocation] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    if (!title || !date || !description || !linkUrl || !location) {
      setSubmitMessage(
        "Please fill in all required fields (Title, Date, Description, Link URL, Location)."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Convert date string (YYYY-MM-DD) to timestamp at midnight UTC
      const dateParts = date.split("-").map(Number);
      const utcDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2])); // Month is 0-indexed
      const dateTime = utcDate.getTime();

      if (isNaN(dateTime)) {
        throw new Error("Invalid date format.");
      }

      await submitMeetup({
        title,
        dateTime, // Use the midnight UTC timestamp
        description,
        linkText: "View", // Default link text for submitted events
        linkUrl,
        location,
        submitterName: submitterName || undefined, // Pass undefined if empty
        submitterEmail: submitterEmail || undefined,
      });

      // Reset form on success
      setTitle("");
      setDate("");
      setDescription("");
      setLinkUrl("");
      setLocation("");
      setSubmitterName("");
      setSubmitterEmail("");
      setSubmitMessage("Meetup submitted successfully for review!");
    } catch (error) {
      console.error("Failed to submit meetup:", error);
      setSubmitMessage("Submission failed. Please check the details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container submit-page">
      {/* <Header /> Render Header if needed globally or manage routing differently */}
      <main className="content-container">
        <h2 className="page-title">Submit a Meetup</h2>
        <div className="form-container white-box">
          {" "}
          {/* Apply white-box styling */}
          <p>Submit your community meetup event to be featured on Vibe Coding Meetups.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              {/* Change input type to date */}
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkUrl">Link URL *</label>
              <input
                type="url"
                id="linkUrl"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location (City, Country) *</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="submitterName">Your Name (Optional)</label>
              <input
                type="text"
                id="submitterName"
                value={submitterName}
                onChange={(e) => setSubmitterName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="submitterEmail">Your Email (Optional)</label>
              <input
                type="email"
                id="submitterEmail"
                value={submitterEmail}
                onChange={(e) => setSubmitterEmail(e.target.value)}
              />
            </div>

            {submitMessage && <p className="submit-message">{submitMessage}</p>}

            <button type="submit" disabled={isSubmitting} className="secondary-button">
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </button>
          </form>
        </div>
      </main>
      {/* <Footer /> Render Footer if needed globally */}
    </div>
  );
};

export default SubmitPage;
