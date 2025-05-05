import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  meetups: defineTable({
    title: v.string(),
    // Store date/time as a Unix timestamp (milliseconds since epoch) for easier sorting
    dateTime: v.number(),
    description: v.string(),
    linkText: v.string(),
    linkUrl: v.string(),
    location: v.string(),
    // Status for managing submissions and visibility
    status: v.union(
      v.literal("pending"), // Submitted, needs review
      v.literal("approved"), // Visible on the site
      v.literal("rejected") // Submitted but rejected
    ),
    isVisible: v.boolean(), // Controls direct visibility, admin can toggle
    // Optional fields for submitted events
    submitterName: v.optional(v.string()),
    submitterEmail: v.optional(v.string()),
  })
    // Index for querying approved and visible meetups, ordered by date
    .index("by_status_and_dateTime", ["status", "isVisible", "dateTime"]),
});
