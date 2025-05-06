1. Implement a system to update the `gitmaid.html` file automatically upon every `git push`. If `gitmaid.html` does not exist, create it in a style consistent with the main app design.
2. Integrate Mermaid (https://mermaid.js.org/) for diagram generation. For each new commit, add a new diagram block to `gitmaid.html`.
3. Name each diagram block after the corresponding commit to ensure easy identification.
4. Implement interactivity for each diagram block: On click, reveal the list of files changed in that specific commit.
5. Ensure that `gitmaid.html` is consistently updated with each git commit or when the user requests an update.
6. Add diagram blocks to `gitmaid.html` for previous GitHub commits if they were not created initially.
7. Use a combination of state diagrams (https://mermaid.js.org/syntax/stateDiagram.html) and git graphs (https://mermaid.js.org/syntax/gitgraph.html) to represent the commit history visually in `gitmaid.html`.
