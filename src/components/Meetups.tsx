import React from "react";

// Define the structure for a meetup item
interface Meetup {
  title: string;
  date: string;
  description: string;
  linkText: string; // Text for the link, e.g., "(view)"
  linkUrl: string; // URL for the link
  location: string; // Added location field
}

// Static meetup data - Added times for more accuracy to the image
const meetupsData: Meetup[] = [
  {
    title: "AI & Code Generation Workshop",
    date: "5/15/2025, 4:00:00 PM",
    description:
      "Join us for an interactive workshop exploring the latest AI tools for code generation. Learn how to leverage Claude, GPT-4, and other models to accelerate your development workflow.",
    linkText: "View",
    linkUrl: "#",
    location: "Berlin, Germany",
  },
  {
    title: "Building Full-Stack Apps with Convex",
    date: "5/22/2025, 5:30:00 PM",
    description:
      "Deep dive into Convex.dev and learn how to build reactive full-stack applications. We'll create a real-time collaborative coding environment from scratch.",
    linkText: "View",
    linkUrl: "#",
    location: "Stockholm, Sweden",
  },
  {
    title: "Vibe Coding Design Systems",
    date: "5/29/2025, 2:00:00 PM",
    description:
      "Explore modern design systems and component libraries. Learn how to create beautiful, accessible interfaces with Tailwind, Radix UI, and custom theming.",
    linkText: "View",
    linkUrl: "#",
    location: "Medellín, Colombia",
  },
];

const Meetups: React.FC = () => {
  return (
    <section className="meetups-section" id="meetups">
      <div className="meetups-container">
        <div className="meetups-header">
          <h2 className="meetups-title">Upcoming Vibe Coding Meetups</h2>
        </div>

        {/* New Meetup List Layout */}
        <div className="meetups-list">
          {meetupsData.map((meetup, index) => (
            <div key={index} className="meetup-item">
              <div className="meetup-content">
                <div className="meetup-top-line">
                  {/* Placeholder icon - could be replaced with an actual SVG or img */}
                  <span className="meetup-title-date">
                    {meetup.title} &middot; {meetup.date}
                  </span>
                </div>
                <p className="meetup-description">{meetup.description}</p>
                <p className="meetup-location">{meetup.location}</p>
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
