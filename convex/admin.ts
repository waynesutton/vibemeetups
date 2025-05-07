import { mutation, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
// This import is incorrect and unnecessary for backend code
// import ProtectedAdminRoute from "./ProtectedAdminRoute"; // Adjust path if necessary

const verifyAdminAccessArgs = { password: v.string() };

// Mutation to verify the provided password against the stored secret
export const verifyAdminAccess = mutation({
  args: verifyAdminAccessArgs,
  returns: v.boolean(), // Returns true if the password is correct, false otherwise
  handler: async (ctx: MutationCtx, args) => {
    // Retrieve the secret from Convex environment variables
    // Use type assertion to bypass TS error, as ctx.environment is available at runtime
    const adminSecret = await (ctx as any).environment.get("ADMIN_SECRET");

    // Check if the environment variable is set (important for security)
    if (adminSecret === undefined || adminSecret === null) {
      // Check for undefined or null
      console.error("ADMIN_SECRET environment variable is not set in Convex dashboard.");
      // Throw an error to prevent unauthorized access attempts if setup is incomplete
      throw new Error("Server configuration error: Admin secret not configured.");
    }

    // Compare the submitted password with the stored secret
    const isAuthenticated = args.password === adminSecret;
    return isAuthenticated;
  },
});
