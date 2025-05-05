import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";

// Helper to format timestamp
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // More detailed format for admin
};

const AdminPage: React.FC = () => {
  // Fetch all meetups
  const allMeetups = useQuery(api.meetups.listAllMeetups);
  const updateStatus = useMutation(api.meetups.updateMeetupStatus);
  const updateVisibility = useMutation(api.meetups.updateMeetupVisibility);
  const deleteMeetup = useMutation(api.meetups.deleteMeetup);
  const adminAddMeetup = useMutation(api.meetups.adminAddMeetup);

  // TODO: Add state and form handling for the "Add New Meetup" form

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

  // TODO: Implement the form submission logic for adminAddMeetup

  return (
    <div className="page-container admin-page">
      <main className="content-container">
        <h2 className="page-title">Admin - Manage Meetups</h2>

        {/* Section to Add New Meetup Directly (Form Needed) */}
        <div className="admin-section white-box add-meetup-form">
          <h3>Add New Meetup</h3>
          {/* TODO: Implement Admin Add Meetup Form here */}
          <p>Admin add form placeholder...</p>
        </div>

        {/* Section to Manage Existing Meetups */}
        <div className="admin-section white-box manage-meetups">
          <h3>Manage Existing Meetups</h3>
          {allMeetups === undefined && <p>Loading meetups...</p>}
          {allMeetups && allMeetups.length === 0 && <p>No meetups found.</p>}
          {allMeetups && allMeetups.length > 0 && (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
