# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive web-based markdown tutorial where users learn markdown syntax through hands-on practice with real-time preview, validation, hints, and gamification features.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Markdown Rendering**: react-markdown + remark-gfm
- **Code Editor**: @uiw/react-textarea-code-editor
- **Lesson Storage**: Markdown files with YAML frontmatter (parsed with gray-matter)
- **State Management**: React Context API
- **Persistence**: localStorage
- **Browser Polyfills**: buffer (required for gray-matter in browser environment)

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── Editor.jsx              # Code editor with syntax highlighting
│   ├── Preview.jsx             # Live markdown preview pane
│   ├── LessonContainer.jsx     # Main split-pane lesson interface
│   ├── LessonNav.jsx           # Lesson navigation with progress indicators
│   ├── HintPanel.jsx           # Progressive hint system
│   ├── ValidationFeedback.jsx  # Success/error feedback with animations
│   ├── DarkModeToggle.jsx      # Animated dark mode toggle switch
│   └── Gamification/
│       ├── PointsDisplay.jsx       # Animated points counter
│       ├── ProgressBar.jsx         # Overall progress visualization
│       └── AchievementToast.jsx    # Achievement notifications
├── lessons/
│   ├── 01-headings.md          # Lesson files (markdown with frontmatter)
│   ├── 02-emphasis.md
│   ├── 03-lists.md
│   ├── 04-links.md
│   ├── 05-images.md
│   └── 06-tables.md
├── hooks/
│   ├── useLocalStorage.js      # LocalStorage persistence hook
│   └── (validation hooks referenced in context)
├── context/
│   ├── TutorialContext.jsx     # Global state (lessons, progress, validation)
│   └── DarkModeContext.jsx     # Dark mode state and persistence
├── utils/
│   ├── lessonParser.js         # Parse markdown frontmatter with gray-matter
│   ├── markdownValidator.js    # Regex-based validation engine
│   └── achievements.js         # Achievement checking logic
├── App.jsx                     # Main app component
├── main.jsx                    # React entry point
└── index.css                   # Tailwind + custom markdown styles
```

## Architecture

### Lesson System
- Lessons are markdown files with YAML frontmatter in `src/lessons/`
- Each lesson defines: id, title, task, expectedPattern (regex), hints, points
- Lessons loaded dynamically via imports in TutorialContext.jsx (see rawLessons array)
- Parsed using gray-matter in lessonParser.js
- **Important**: gray-matter requires Node.js Buffer API - polyfill configured in main.jsx and vite.config.js

### State Management
- TutorialContext.jsx provides global state via Context API
- Progress persisted to localStorage via useLocalStorage hook
- State includes: current lesson, user code, progress, achievements

### Validation Flow
1. User types markdown in Editor.jsx
2. Real-time preview in Preview.jsx using react-markdown
3. User can either:
   - Click "Submit Answer" to validate their solution
   - Click "Skip" to move to next lesson without validation
4. On submit, markdownValidator.js validates against lesson's expectedPattern
5. Success triggers: points award, achievement check, auto-advance after 2 seconds
6. ValidationFeedback.jsx shows animated success/error message

### Gamification
- Points awarded on lesson completion (defined in lesson frontmatter)
- Achievements checked in achievements.js:34 after each completion
- Progress tracked: completed lessons, total points, achievements
- AchievementToast.jsx displays celebration animations

### Dark Mode
- DarkModeContext.jsx manages dark mode state via Context API
- User preference persisted to localStorage via useLocalStorage hook
- Tailwind CSS configured with `darkMode: 'class'` in tailwind.config.js
- Dark mode toggled by adding/removing 'dark' class on document element
- DarkModeToggle.jsx provides animated toggle switch (sun/moon icons) in header
- All components support dark mode with `dark:` Tailwind variants
- Smooth color transitions (300ms) for better UX
- Comprehensive dark mode styles in index.css for markdown preview

## Lesson File Format

Each lesson is a markdown file with YAML frontmatter:

```yaml
---
id: 1
title: "Lesson Title"
description: "Short description"
difficulty: "beginner"
points: 10
task: "What the user needs to do"
starterCode: "Optional starter code"
expectedPattern: "regex pattern for validation"
validationMode: "source"  # or "rendered"
hints:
  - "First hint"
  - "Second hint"
successMessage: "Success message"
---

Lesson content in markdown here...
```

## Adding New Lessons

1. Create markdown file in `src/lessons/` (e.g., `07-code-blocks.md`)
2. Add frontmatter with required fields (id, title, task, expectedPattern, etc.)
3. Import the lesson file with `?raw` suffix in TutorialContext.jsx (e.g., `import lesson07 from '../lessons/07-code-blocks.md?raw'`)
4. Add to the rawLessons array in the useEffect hook
5. Lessons auto-sort by id field

**Important**: Use `?raw` suffix to import markdown files as strings (Vite feature)

## Key Design Decisions

- **Source vs Rendered Validation**: Lessons can validate raw markdown (syntax learning) or rendered HTML (output learning)
- **Progressive Hints**: Hints revealed one at a time to encourage problem-solving
- **LocalStorage Only**: No backend needed; progress saved locally
- **Auto-advance**: Successful lessons auto-advance after 2 seconds
- **Skip Option**: Users can skip lessons they're stuck on using the Skip button (added in LessonContainer.jsx)
- **Dark Mode**: Class-based dark mode toggle with localStorage persistence; all components support both light and dark themes
- **Browser Compatibility**: Buffer polyfill required for gray-matter to work in browser (configured in main.jsx and vite.config.js)

## Common Tasks

### Modify Validation Logic
Edit `src/utils/markdownValidator.js:3` - uses regex pattern matching

### Add Achievement
Add to ACHIEVEMENTS array in `src/utils/achievements.js:1` with check function

### Modify Dark Mode
- Toggle component: `src/components/DarkModeToggle.jsx`
- Context/state: `src/context/DarkModeContext.jsx`
- To change dark mode colors: Update `dark:` variants in component className attributes
- To add dark mode to new components: Use Tailwind `dark:` prefix (e.g., `dark:bg-gray-800`)
- Dark mode detection: Check `isDarkMode` from `useDarkMode()` hook

### Change Styling
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js` (includes `darkMode: 'class'` configuration)
- Markdown preview styles: `src/index.css:11-79` (.markdown-preview class with dark mode support)
- Dark mode: Add `dark:` prefix to Tailwind classes for dark mode variants
- All components use `transition-colors duration-300` for smooth theme switching

### Debug Lesson Loading
Check TutorialContext.jsx for lesson imports (see rawLessons array in useEffect) and lessonParser.js for parsing logic

## Troubleshooting

### "Buffer is not defined" Error
This error occurs because gray-matter uses Node.js's Buffer API which doesn't exist in browsers.

**Solution (already implemented):**
1. Install buffer package: `npm install buffer`
2. Configure Vite in `vite.config.js` with Buffer alias and global polyfill
3. Import and assign Buffer globally in `src/main.jsx`: `window.Buffer = Buffer`

### Lessons Not Loading
1. Check browser console for errors
2. Verify all lesson files are imported with `?raw` suffix in TutorialContext.jsx
3. Verify lesson frontmatter is valid YAML
4. Check that expectedPattern is properly escaped (use double backslashes in YAML)

### Validation Not Working
1. Test regex pattern separately - remember YAML string escaping (`\\` in YAML becomes `\` in JS)
2. Check validationMode in lesson frontmatter (should be "source" or "rendered")
3. Use `^` and `$` anchors for exact matching
4. Add `\\s*` to allow optional whitespace
