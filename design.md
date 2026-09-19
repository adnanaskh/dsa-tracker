# Design System & UI Specifications: DSA Prep Platform

## 1. Core Design Philosophy
This application is a professional tool for problem-solving and coding. The UI must prioritize readability, focus, and high information density. 
* **Utilitarian & Flat:** The design must look like a robust developer tool, not a trendy landing page. 
* **Strictly Prohibited Styles:** DO NOT use glassmorphism, background blurs, frosted glass effects, large soft drop shadows, floating overlapping cards, neon glows, or multi-color gradients.
* **Component Structure:** Use sharp or very slightly rounded corners (max `4px` to `6px` border-radius). Separate sections using 1px solid borders rather than shadows or varying background elevations.

## 2. Visual Identity
### Color Palette (Dark Mode Default)
Use a monochromatic, desaturated palette (e.g., Tailwind's Zinc or Slate) to reduce eye strain during long coding sessions.
* **Background:** Solid very dark gray/black (e.g., `#09090b`).
* **Surface/Card:** Slightly lighter solid gray (e.g., `#18181b`).
* **Borders:** Subtle but visible solid lines (e.g., `#27272a`).
* **Text Primary:** Off-white (e.g., `#f4f4f5`) for maximum legibility.
* **Text Secondary:** Muted gray (e.g., `#a1a1aa`) for metadata and descriptions.
* **Accent Color:** A single, muted primary color (e.g., a subdued indigo `#6366f1` or standard blue `#2563eb`) used sparingly for primary buttons and active states. 
* **Semantic Colors (Success/Warning/Error):** Use standard, non-neon shades for accepted (green), wrong answer (red), and time limit exceeded (orange/yellow).

### Typography
* **UI/Interface Text:** Use a clean, neutral sans-serif like `Inter`, `Roboto`, or system-ui.
* **Code & Monospace:** Use a highly legible monospace font like `JetBrains Mono`, `Fira Code`, or `SF Mono` for all code editors, terminal outputs, inline code snippets, and data constraints.

## 3. Layout Architecture & Key Screens

### A. Dashboard
* **Structure:** A standard sidebar navigation layout. The main content area should utilize a strict CSS grid.
* **Content:** 
  * Avoid massive hero banners or illustrations.
  * **Metric Cards:** Simple, solid-background rectangles with a 1px border. Display metrics like "Problems Solved", "Current Streak", and "Acceptance Rate" using clear typography.
  * **Activity Graph:** A GitHub-style contribution heat map. Solid square blocks representing daily activity.

### B. Question List (Problem Directory)
* **Structure:** A dense, paginated data table. 
* **Row Design:** 
  * No hover "lift" animations or shadows. Use a simple background color shift on hover (e.g., changing from `#09090b` to `#18181b`).
  * Columns: Status icon (solved/unsolved), Title (link), Difficulty (pill/badge), Acceptance Rate, and Frequency.
* **Badges/Tags:** Difficulty tags should have a transparent background with a 1px solid border matching the difficulty color (e.g., green border for Easy, yellow for Medium, red for Hard) rather than solid filled blocks.

### C. Coding Arena (The Workspace)
* **Structure:** A full-width, full-height split-pane layout with a draggable resize handle in the middle (1px vertical border).
* **Left Pane (Problem Description):**
  * Prose styling for Markdown. Standard font sizes, clear line height (1.6). 
  * Examples/Constraints should be wrapped in simple gray `<pre>` blocks with solid borders, using the monospace font.
* **Right Pane (Code Editor & Terminal):**
  * **Editor:** Must mimic a standard IDE (like Monaco/VS Code). No padding around the text area; line numbers on the far left. Dark syntax highlighting theme (e.g., One Dark or VS Code Dark+).
  * **Terminal/Console (Bottom of Right Pane):** A collapsible tabbed section for "Testcases" and "Test Results". Background should be slightly darker than the editor to visually separate it. Buttons to "Run Code" and "Submit" should be flat, solid rectangles at the bottom right.

## 4. AI Generation Directives
When generating HTML/CSS/React components for this design:
1. Prioritize accessibility (contrast ratios, focus states). Outline active elements with a solid 2px ring.
2. Rely on borders and grid gaps for layout spacing, NOT massive margins.
3. Keep the UI "flat". Depth should only be implied by layering flat elements over each other with distinct borders, never with shadows.
4. If a loading state is required, use simple skeletal wireframes (solid gray rectangles) rather than pulsing, glowing orbs or spinners.