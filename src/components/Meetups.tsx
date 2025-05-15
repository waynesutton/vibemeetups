import React, { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel"; // Import Doc type

// Remove the static Meetup interface and data array
// interface Meetup { ... }
// const meetupsData: Meetup[] = [ ... ];

// Define possible sort options
type SortOption = "date" | "location";

const Meetups: React.FC = () => {
  // Fetch meetups using the Convex query
  const meetups = useQuery(api.meetups.listApprovedMeetups);
  // State for sorting
  const [sortBy, setSortBy] = useState<SortOption>("date"); // Default sort by date

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

  // Memoized sorted meetups list
  const sortedMeetups = useMemo(() => {
    if (!meetups) return []; // Return empty array if data is not loaded

    // Create a mutable copy for sorting
    const meetupsToSort = [...meetups];

    if (sortBy === "location") {
      // Client-side sort by location (case-insensitive)
      meetupsToSort.sort((a, b) =>
        a.location.toLowerCase().localeCompare(b.location.toLowerCase())
      );
    }
    // No need for explicit date sort here, as the query already handles it.
    // The `meetups` data from useQuery is already sorted by dateTime.

    return meetupsToSort;
  }, [meetups, sortBy]); // Recalculate when meetups data or sortBy changes

  // Optional: Handle loading state
  if (meetups === undefined) {
    return (
      <section className="meetups-section" id="meetups">
        <div className="meetups-container">
          <div className="meetups-header">
            <h2 className="meetups-title" style={{ textAlign: "center" }}>
              Upcoming Vibe Coding Meetups
            </h2>
            {/* Sort Dropdown */}
            <div className="sort-dropdown-container">
              <label htmlFor="sort-meetups">Sort by: </label>
              <select
                id="sort-meetups"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="sort-dropdown">
                <option value="date">Date</option>
                <option value="location">Location</option>
              </select>
              {/* Add Luma Calendar Link Here */}
              <iframe
                src="https://lu.ma/embed/calendar/cal-9TPLMjgir18zbtw/events"
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: "1px solid #bfcbda88", borderRadius: "4px" }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}></iframe>
            </div>
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
        <div className="meetups-header">
          <h2 className="meetups-title" style={{ textAlign: "center" }}>
            Upcoming Vibe Coding Meetups
          </h2>
        </div>
        <div className="meetups-container">
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
      </section>
    );
  }

  return (
    <section className="meetups-section" id="meetups">
      <div className="meetups-container">
        <div className="meetups-header">
          <h2 className="meetups-title" style={{ textAlign: "center" }}>
            Upcoming Vibe Coding Meetups
          </h2>
          {/* Sort Dropdown */}
          <div className="sort-dropdown-container">
            <label htmlFor="sort-meetups">Sort by: </label>
            <select
              id="sort-meetups"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="sort-dropdown">
              <option value="date">Date</option>
              <option value="location">Location</option>
            </select>
            {/* Add Luma Calendar Link Here */}
            <iframe
              src="https://lu.ma/embed/calendar/cal-9TPLMjgir18zbtw/events"
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: "1px solid #bfcbda88", borderRadius: "4px" }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}></iframe>
          </div>
        </div>
        <div className="meetups-list">
          {sortedMeetups.map(
            (
              meetup: Doc<"meetups"> // Explicitly type meetup
            ) => (
              <div key={meetup._id} className="meetup-item">
                {/* Meetup details rendering code */}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Meetups;
