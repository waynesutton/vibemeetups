import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel"; // Import Doc type

// Remove the static Meetup interface and data array
// interface Meetup { ... }
// const meetupsData: Meetup[] = [ ... ];

const Meetups: React.FC = () => {
  // Fetch meetups using the Convex query
  const meetups = useQuery(api.meetups.listApprovedMeetups);

  // Helper to format the timestamp (number) into a date string (MM/DD/YYYY)
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    // Simple date formatting, customize as needed
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  // Optional: Handle loading state
  if (meetups === undefined) {
    return (
      <section className="meetups-section" id="meetups">
        <div className="meetups-container">
          <div className="meetups-header">
            <h2 className="meetups-title">Upcoming Vibe Coding Meetups</h2>
          </div>
          <div className="meetups-list">Loading meetups...</div>
        </div>
      </section>
    );
  }

  // Optional: Handle empty state
  if (meetups.length === 0) {
    return (
      <section className="meetups-section" id="meetups">
        <div className="meetups-container">
          <div className="meetups-header">
            <h2 className="meetups-title">Upcoming Vibe Coding Meetups</h2>
          </div>
          <div className="meetups-list">No upcoming meetups scheduled yet.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="meetups-section" id="meetups">
      <div className="meetups-container">
        <div className="meetups-header">
          <h2 className="meetups-title">Upcoming Vibe Coding Meetups</h2>
        </div>

        {/* New Meetup List Layout */}
        <div className="meetups-list">
          {/* Use the fetched meetups data */}
          {meetups.map((meetup: Doc<"meetups">) => (
            <div key={meetup._id.toString()} className="meetup-item">
              {" "}
              {/* Use meetup._id as key */}
              <div className="meetup-content">
                <div className="meetup-top-line">
                  <span className="meetup-title-date">
                    {/* Use meetup fields and the updated formatDate */}
                    {meetup.title} &middot; {formatDate(meetup.dateTime)} &middot; {meetup.location}
                  </span>
                </div>
                <p className="meetup-description">{meetup.description}</p>
              </div>
              <a href={meetup.linkUrl} className="meetup-view-button">
                {meetup.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Meetups;
