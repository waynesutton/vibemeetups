To create a password-protected admin page in Convex without using a full authentication system, you can implement a simple shared secret approach. This is a lightweight solution that works well for admin access without requiring user accounts.

Here's how you can set it up:

## 1. Create a shared secret

Generate a strong random secret and store it as an environment variable in your Convex deployment:

```sh
npx convex env set ADMIN_SECRET your_strong_secret_here
```

## 2. Create an admin access function

In your Convex backend, create a function to verify the admin password:

```ts
// convex/admin.ts
import { mutation } from "./_generated/server";

export const verifyAdminAccess = mutation({
  args: { password: "string" },
  handler: async (ctx, args) => {
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret) {
      throw new Error("Admin secret not configured");
    }

    return args.password === adminSecret;
  },
});
```

## 3. Create your admin page with password protection

In your frontend, create a simple password form that verifies access before showing admin content:

```jsx
// AdminPage.jsx
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const verifyAdmin = useMutation(api.admin.verifyAdminAccess);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await verifyAdmin({ password });
      if (result) {
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Authentication failed");
    }
  };

  if (isAuthenticated) {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        {/* Your admin content here */}
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
```

This approach is simple but effective for basic admin access. The shared secret is checked on the server side, and the admin content is only rendered after successful verification.

## Security considerations

This method is suitable for simple admin access but has limitations:

1. It doesn't provide session persistence - users will need to re-enter the password if they refresh the page
2. It's not as robust as a full authentication system

For a more production-ready solution, you might want to consider using Convex Auth or integrating with an auth provider like Clerk, especially as your application grows. But for a simple admin page, this shared secret approach works well.

[Stack: YOLO: Get to an MVP fast](https://stack.convex.dev/yolo-fast-mvp#cutting-corners-explicit-immaturity) mentions that building without auth initially can help you iterate quickly, and you can "put off building an admin dashboard" while using the Convex dashboard for admin tasks.
