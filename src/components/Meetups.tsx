import React from "react";
// Removed unused imports: useState, useMemo, useQuery, api, Doc

// Removed SortOption type
// Removed formatDate function
// Removed meetups query, sortBy state, and sortedMeetups memo

const Meetups: React.FC = () => {
  // Removed loading state and empty state handling that depended on the database query

  return (
    <section className="meetups-section" id="meetups">
      <h2 className="meetups-title" style={{ textAlign: "center" }}>
        Upcoming Vibe Coding Meetups
      </h2>
      <div className="meetups-container">
        <div>
          {" "}
          <a className="pb-8 m-8" href="https://lu.ma/vibe-coding" style={{ marginBottom: "10px" }}>
            Subscribe to calendar or submit a meetup.
          </a>
          <div>
            {/* Add Luma Calendar Link Here */}
            <iframe
              src="https://lu.ma/embed/calendar/cal-9TPLMjgir18zbtw/events"
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: "0px solid #ffffff", borderRadius: "4px" }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Meetups;
