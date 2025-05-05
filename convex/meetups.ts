import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Fetches meetups that are approved and visible, sorted by date (ascending).
 */
export const listApprovedMeetups = query({
  args: {}, // No arguments needed for the public list
  handler: async (ctx) => {
    // Fetch meetups that are approved, visible, and sort by dateTime ascending
    const meetups = await ctx.db
      .query("meetups")
      .withIndex("by_status_and_dateTime", (q) => q.eq("status", "approved").eq("isVisible", true))
      // .order("asc") // Order is implicitly ascending by dateTime from the index fields
      .collect();
    return meetups;
  },
});

/**
 * Submits a new meetup for review.
 * Inserts the meetup with 'pending' status and 'isVisible' set to false.
 */
export const submitMeetup = mutation({
  args: {
    // Arguments based on the schema, excluding status and isVisible
    title: v.string(),
    dateTime: v.number(), // Expecting timestamp from the client
    description: v.string(),
    linkText: v.string(),
    linkUrl: v.string(),
    location: v.string(),
    submitterName: v.optional(v.string()),
    submitterEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("meetups", {
      ...args,
      status: "pending", // Set initial status to pending
      isVisible: false, // Submitted meetups are not visible by default
    });
    // We could return the ID, but null is fine based on current plans
    return null;
  },
});
