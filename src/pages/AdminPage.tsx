import React, { useState, FormEvent } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";

// Helper to format timestamp
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // More detailed format for admin
};

// Define the possible statuses for the select dropdown
const meetupStatuses: Doc<"meetups">["status"][] = ["pending", "approved", "rejected", "hidden"];

const AdminPage: React.FC = () => {
  // Fetch all meetups
  const allMeetups = useQuery(api.meetups.listAllMeetups);
  const updateStatus = useMutation(api.meetups.updateMeetupStatus);
  const updateVisibility = useMutation(api.meetups.updateMeetupVisibility);
  const deleteMeetup = useMutation(api.meetups.deleteMeetup);
  const adminAddMeetup = useMutation(api.meetups.adminAddMeetup);

  // State for the Admin Add Form
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState(""); // date input
  const [newDescription, setNewDescription] = useState("");
  const [newLinkText, setNewLinkText] = useState("View"); // Default link text
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newStatus, setNewStatus] = useState<Doc<"meetups">["status"]>("approved"); // Default to approved
  const [newIsVisible, setNewIsVisible] = useState(true); // Default to visible
  const [isAdding, setIsAdding] = useState(false);
  const [addMessage, setAddMessage] = useState<string | null>(null);

  const handleStatusChange = (meetupId: Id<"meetups">, status: Doc<"meetups">["status"]) => {
    updateStatus({ meetupId, status });
  };

  const handleVisibilityToggle = (meetupId: Id<"meetups">, currentVisibility: boolean) => {
    updateVisibility({ meetupId, isVisible: !currentVisibility });
  };

  const handleDelete = (meetupId: Id<"meetups">) => {
    if (window.confirm("Are you sure you want to delete this meetup?")) {
      deleteMeetup({ meetupId });
    }
  };

  // Handler for the Admin Add Form submission
  const handleAdminSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setAddMessage(null);

    if (!newTitle || !newDate || !newDescription || !newLinkUrl || !newLocation) {
      setAddMessage("Please fill in all required fields for the new meetup.");
      setIsAdding(false);
      return;
    }

    try {
      const dateParts = newDate.split("-").map(Number);
      const utcDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
      const dateTime = utcDate.getTime();

      if (isNaN(dateTime)) {
        throw new Error("Invalid date format.");
      }

      await adminAddMeetup({
        title: newTitle,
        dateTime,
        description: newDescription,
        linkText: newLinkText || "View", // Ensure default if empty
        linkUrl: newLinkUrl,
        location: newLocation,
        status: newStatus,
        isVisible: newIsVisible,
      });

      // Reset form
      setNewTitle("");
      setNewDate("");
      setNewDescription("");
      setNewLinkText("View");
      setNewLinkUrl("");
      setNewLocation("");
      setNewStatus("approved");
      setNewIsVisible(true);
      setAddMessage("Meetup added successfully!");
    } catch (error) {
      console.error("Failed to add meetup:", error);
      setAddMessage("Failed to add meetup. Please check details.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="page-container admin-page">
      <main className="content-container">
        <h2 className="page-title">Admin - Manage Meetups</h2>
        {/* New Wrapper for Side-by-Side Layout */}
        <div className="admin-layout-container">
          {/* Section to Add New Meetup Directly */}
          <div className="admin-section white-box add-meetup-form">
            <h3>Add New Meetup</h3>
            <form onSubmit={handleAdminSubmit}>
              {/* Title */}
              <div className="form-group">
                <label htmlFor="newTitle">Title *</label>
                <input
                  type="text"
                  id="newTitle"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              {/* Date */}
              <div className="form-group">
                <label htmlFor="newDate">Date *</label>
                <input
                  type="date"
                  id="newDate"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </div>
              {/* Description */}
              <div className="form-group">
                <label htmlFor="newDescription">Description *</label>
                <textarea
                  id="newDescription"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  required
                />
              </div>
              {/* Link Text */}
              <div className="form-group">
                <label htmlFor="newLinkText">Link Text (default: View)</label>
                <input
                  type="text"
                  id="newLinkText"
                  value={newLinkText}
                  onChange={(e) => setNewLinkText(e.target.value)}
                  placeholder="View"
                />
              </div>
              {/* Link URL */}
              <div className="form-group">
                <label htmlFor="newLinkUrl">Link URL *</label>
                <input
                  type="url"
                  id="newLinkUrl"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  placeholder="https://..."
                  required
                />
              </div>
              {/* Location */}
              <div className="form-group">
                <label htmlFor="newLocation">Location (City, Country) *</label>
                <input
                  type="text"
                  id="newLocation"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  required
                />
              </div>
              {/* Status */}
              <div className="form-group">
                <label htmlFor="newStatus">Status *</label>
                <select
                  id="newStatus"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as Doc<"meetups">["status"])}
                  required>
                  {meetupStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {/* Visibility */}
              <div className="form-group">
                <label htmlFor="newIsVisible">Visible? *</label>
                <select
                  id="newIsVisible"
                  value={newIsVisible.toString()}
                  onChange={(e) => setNewIsVisible(e.target.value === "true")}
                  required>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {addMessage && <p className="submit-message">{addMessage}</p>}

              <button type="submit" disabled={isAdding} className="submit-button">
                {" "}
                {/* Use existing submit button style */}
                {isAdding ? "Adding..." : "Add Meetup"}
              </button>
            </form>
          </div>

          {/* Section to Manage Existing Meetups */}
          <div className="admin-section white-box manage-meetups">
            <h3>Manage Existing Meetups</h3>
            {allMeetups === undefined && <p>Loading meetups...</p>}
            {allMeetups && allMeetups.length === 0 && <p>No meetups found.</p>}
            {allMeetups && allMeetups.length > 0 && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Visible</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMeetups.map((meetup) => (
                      <tr key={meetup._id.toString()}>
                        <td>{meetup.title}</td>
                        <td>{formatDate(meetup.dateTime)}</td>
                        <td>{meetup.location}</td>
                        <td>{meetup.status}</td>
                        <td>{meetup.isVisible ? "Yes" : "No"}</td>
                        <td>
                          {/* Status Buttons */}
                          {meetup.status !== "approved" && (
                            <button onClick={() => handleStatusChange(meetup._id, "approved")}>
                              Approve
                            </button>
                          )}
                          {meetup.status !== "rejected" && (
                            <button onClick={() => handleStatusChange(meetup._id, "rejected")}>
                              Reject
                            </button>
                          )}
                          {meetup.status !== "hidden" && (
                            <button onClick={() => handleStatusChange(meetup._id, "hidden")}>
                              Hide
                            </button>
                          )}
                          {/* Visibility Toggle - Show only if approved? */}
                          {meetup.status === "approved" && (
                            <button
                              onClick={() => handleVisibilityToggle(meetup._id, meetup.isVisible)}>
                              {meetup.isVisible ? "Make Hidden" : "Make Visible"}
                            </button>
                          )}
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(meetup._id)}
                            style={{ color: "red", marginLeft: "5px" }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>{" "}
        {/* End admin-layout-container */}
      </main>
    </div>
  );
};

export default AdminPage;
