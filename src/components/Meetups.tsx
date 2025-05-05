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
            <h2 className="meetups-title">Upcoming Vibe Coding Meetups</h2>
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
        <div className="meetups-container">
          <div className="meetups-header">
            <h2 className="meetups-title">Upcoming Vibe Coding Meetups</h2>
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
            </div>
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
          </div>
        </div>

        {/* New Meetup List Layout */}
        <div className="meetups-list">
          {/* Use the memoized and sorted meetups list */}
          {sortedMeetups.map((meetup: Doc<"meetups">) => (
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
