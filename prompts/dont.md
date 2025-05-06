      1. Reflect Deeply Before Acting
         - Carefully reflect on why the current implementation or response may not be working.
         - Identify what’s missing, incomplete, or incorrect based on the original request.
         - Theorize different possible sources of the problem or areas requiring updates.
         - Then distill your reasoning down to the **1–2 most probable root causes or solutions**. Only proceed after clear understanding.

      2. When Implementing Solutions
         Follow Convex's recommended approaches at all times:

         - Use **direct mutation calls** with plain objects.
         - Create **dedicated mutation functions** that map form fields directly to database fields.
         - Ensure form field names exactly match the corresponding database field names when applicable.

         Use Convex documentation:
         - Mutation Functions: https://docs.convex.dev/functions/mutation-functions
         - Query Functions: https://docs.convex.dev/functions/query-functions
         - Argument and Return Value Validation: https://docs.convex.dev/functions/validation
         - General Function Docs: https://docs.convex.dev/functions

         Understand the following foundational principles:
         - Zen of Convex: https://docs.convex.dev/understanding/zen
         - End-to-End Type Support with TypeScript: https://docs.convex.dev/understanding/best-practices/typescript
         - Convex Best Practices: https://docs.convex.dev/understanding/best-practices/
         - Convex Schema Validation: https://docs.convex.dev/database/schemas

      3. Change Scope and Restrictions
         - Update Convex Schema if needed
         - **Only update files** when it's directly necessary to fix the original request.
         - **Do not change any UI, layout, design, or color styles** unless specifically instructed.
         - **Preserve all current admin dashboard sections and frontend components** unless explicitly told to update, fix, or replace them.
         - **Never remove sections, features, or components** unless directly requested.
