# Gitmaid Setup Guide

This guide explains how to set up the `gitmaid` system, which automatically generates an HTML file (`gitmaid.html`) visualizing your project's Git commit history using https://github.com/bpmn-io/diagram-js?tab=readme-ov-file diagrams. This file is updated automatically every time you push your changes to the remote repository.

## Purpose

The `gitmaid` system helps visualize the commit history of the project. Each commit gets its own block in the `gitmaid.html` file, containing:

- Commit message and hash.
- Date of the commit.
- A Mermaid `gitGraph` diagram showing the commit in the context of the recent history (Note: the current graph generation is basic and shows a linear history).
- A clickable section that reveals the list of files changed in that specific commit.

This is useful for quickly understanding the evolution of the codebase.

## Setup Steps

Follow these steps to set up the system in your local repository:

### 1. Create the HTML File (`gitmaid.html`)

- **Action:** A file named `gitmaid.html` was created in the project root.
- **Content:** This file contains the basic HTML structure, CSS styles for the commit blocks, and JavaScript to:
  - Import the Mermaid.js library from a CDN.
  - Initialize Mermaid to render the diagrams.
  - Handle click events on commit headers to show/hide the list of changed files.
- **Why:** This file is the final output that you will open in a browser to view the Git history visualization.

### 2. Create the Generator Script (`generate-gitmaid.js`)

- **Action:** A Node.js script named `generate-gitmaid.js` was created in the project root.
- **Content:** This script contains the core logic:
  - **Imports:** Uses Node.js built-in modules like `fs` (file system), `child_process` (to run Git commands), and `path`.
  - **Git Commands:**
    - `getGitLog()`: Runs `git log` to fetch commit details (hash, date, message, parent hashes).
    - `getChangedFiles()`: Runs `git show` for a given commit hash to get the list of changed files.
  - **HTML Generation:**
    - `generateMermaidGitGraph()`: Creates the text-based syntax for a Mermaid `gitGraph`.
    - `generateCommitHtmlBlock()`: Creates the HTML structure for a single commit block, embedding the commit info, Mermaid graph syntax, and the list of changed files.
  - **File Operations:**
    - `readOrCreateHtml()`: Reads the existing `gitmaid.html` or creates it from a template if it doesn't exist.
    - `updateHtmlFile()`: Reads the existing HTML, checks which commit blocks are already present (using HTML comments as markers), generates HTML blocks for any new commits, and writes the updated content back to `gitmaid.html`.
  - **Main Execution:** The `main()` function orchestrates these steps.
- **Why:** This script automates the process of getting Git data and translating it into the visual HTML format.

### 3. Make the Script Executable

- **Action:** The following command was run in the terminal:
  ```bash
  chmod +x generate-gitmaid.js
  ```
- **Why:** This gives your operating system permission to execute the file as a script, which is necessary for the Git hook later.

### 4. Initial Run (Optional but Recommended)

- **Action:** The script was run manually once:
  ```bash
  node generate-gitmaid.js
  ```
- **Why:** This populates `gitmaid.html` with the history of commits already present in your repository before the hook is set up.

### 5. Create the Git Pre-Push Hook

- **Action:** A file was created at `.git/hooks/pre-push`.
- **Content:**

  ```bash
  #!/bin/sh

  echo "Running Gitmaid generator before push..."
  # Executes the Node.js script
  node generate-gitmaid.js # Or use the full path if needed

  # Check if the script ran successfully
  if [ $? -ne 0 ]; then
    echo "Gitmaid script failed. Aborting push."
    exit 1 # Abort the push if the script failed
  fi

  # Add the updated gitmaid.html to the index IF it has changed and is tracked
  # This ensures the updated file is included in the push
  if [ -f gitmaid.html ] && git ls-files --error-unmatch gitmaid.html > /dev/null 2>&1; then
      git update-index --add --refresh gitmaid.html
      echo "Checked/updated gitmaid.html index status."
  else
      echo "gitmaid.html not found or not tracked, skipping index update."
  fi

  echo "Gitmaid generation complete."
  exit 0 # Allow the push to proceed
  ```

- **Why:** Git hooks are scripts that Git executes before or after events like `commit`, `push`, etc. The `pre-push` hook runs just before your local repository pushes changes to the remote. This hook ensures the `gitmaid.html` file is updated with the latest commits before they are pushed.
  - It runs the `generate-gitmaid.js` script.
  - It checks if the script ran without errors. If it failed, the push is aborted.
  - It uses `git update-index --add --refresh gitmaid.html` to stage the `gitmaid.html` file _only if it has changed_ and _is already tracked by Git_. This is important so that the latest version of the visualization is included in the push itself.

### 6. Make the Hook Executable

- **Action:** The following command was run:
  ```bash
  chmod +x .git/hooks/pre-push
  ```
- **Why:** Similar to the generator script, the hook file itself needs execution permissions for Git to be able to run it.

## How it Works Now

1.  You make changes, commit them locally.
2.  You run `git push`.
3.  Git triggers the `.git/hooks/pre-push` script.
4.  The hook script executes `node generate-gitmaid.js`.
5.  `generate-gitmaid.js` fetches the latest Git log, compares it with the commit markers in `gitmaid.html`, generates HTML blocks for new commits, and updates `gitmaid.html`.
6.  The hook script stages the potentially modified `gitmaid.html` file (if tracked).
7.  The push proceeds, sending your commits _and_ the updated `gitmaid.html` to the remote repository.

You can view the visualization anytime by opening `gitmaid.html` in your web browser.
