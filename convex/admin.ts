import { mutation } from "./_generated/server";
import { v } from "convex/values";
// This import is incorrect and unnecessary for backend code
// import ProtectedAdminRoute from "./ProtectedAdminRoute"; // Adjust path if necessary

export const verifyAdminAccess = mutation({
  args: { password: v.string() },
  handler: async (_ctx, args) => {
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret) {
      throw new Error(
        "Admin secret not configured. Please set ADMIN_SECRET environment variable in your Convex dashboard."
      );
    }

    return args.password === adminSecret;
  },
});
