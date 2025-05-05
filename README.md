# Vibe Coding Meetups - VibeMeetups.ai

This is a single-page application built to showcase and manage Vibe Coding community meetups.

## Features

- Displays a list of upcoming community meetups.
- Allows users to submit new meetups for review via a `/submit` page.
- Provides an `/admin` interface to:
  - View all submitted meetups.
  - Approve, reject, or hide meetups.
  - Directly add new meetups.
  - Delete meetups.
- Responsive design for mobile and desktop.

## Tech Stack

- **Frontend:**
  - React
  - Vite
  - TypeScript
  - React Router
  - CSS (using variables for theming)
- **Backend & Database:**
  - Convex (Backend-as-a-Service platform)

## Getting Started (Development)

1.  **Clone the repository.**
2.  **Install dependencies:** `npm install`
3.  **Set up Convex:**
    - Run `npm create convex` if you haven't already.
    - Follow the prompts to log in or create a Convex account and project.
    - Create a `.env.local` file in the root directory.
    - Add your Convex deployment URL to `.env.local`:
      ```
      VITE_CONVEX_URL=your-convex-deployment-url
      ```
      (Replace `your-convex-deployment-url` with the URL from your Convex dashboard).
4.  **Run the Convex development process:** `npx convex dev` (in a separate terminal).
5.  **Run the Vite development server:** `npm run dev`.
6.  Open your browser to the local development URL provided by Vite.
