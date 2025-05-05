import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Fetches meetups that are approved and visible, sorted by date (ascending).
 */
export const listApprovedMeetups = query({
  args: {}, // No arguments needed for the public list
  handler: async (ctx) => {
    // Fetch meetups that are approved, visible, and sort by dateTime ascending
    // subscribe to calendar: https://lu.ma/vibe-coding
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

/**
 * Fetches ALL meetups regardless of status, intended for admin use.
 * Sorted by creation time descending to show newest first.
 */
export const listAllMeetups = query({
  args: {}, // No args needed for the full list
  handler: async (ctx) => {
    // TODO: Add authentication check here to ensure only admins can call this.
    const meetups = await ctx.db.query("meetups").order("desc").collect();
    return meetups;
  },
});

/**
 * Updates the status of a specific meetup.
 */
export const updateMeetupStatus = mutation({
  args: {
    meetupId: v.id("meetups"),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("hidden")
    ),
  },
  handler: async (ctx, args) => {
    // TODO: Add authentication check here.
    const { meetupId, status } = args;

    // Check if meetup exists
    const existingMeetup = await ctx.db.get(meetupId);
    if (!existingMeetup) {
      throw new Error("Meetup not found");
    }

    // Patch the status
    await ctx.db.patch(meetupId, { status: status });

    // If approving, also set isVisible to true by default
    if (status === "approved") {
      await ctx.db.patch(meetupId, { isVisible: true });
    }
    // If hiding or rejecting, set isVisible to false
    if (status === "hidden" || status === "rejected") {
      await ctx.db.patch(meetupId, { isVisible: false });
    }

    return null;
  },
});

/**
 * Updates the visibility of a specific meetup (admin toggle).
 */
export const updateMeetupVisibility = mutation({
  args: {
    meetupId: v.id("meetups"),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    // TODO: Add authentication check here.
    const { meetupId, isVisible } = args;
    await ctx.db.patch(meetupId, { isVisible });
    return null;
  },
});

/**
 * Deletes a specific meetup.
 */
export const deleteMeetup = mutation({
  args: { meetupId: v.id("meetups") },
  handler: async (ctx, args) => {
    // TODO: Add authentication check here.
    await ctx.db.delete(args.meetupId);
    return null;
  },
});

/**
 * Allows an admin to add a meetup directly with a specific status and visibility.
 */
export const adminAddMeetup = mutation({
  args: {
    title: v.string(),
    dateTime: v.number(),
    description: v.string(),
    linkText: v.string(),
    linkUrl: v.string(),
    location: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("hidden")
    ),
    isVisible: v.boolean(),
    // submitter fields are not relevant for admin additions
  },
  handler: async (ctx, args) => {
    // TODO: Add authentication check here.
    await ctx.db.insert("meetups", args);
    return null;
  },
});
