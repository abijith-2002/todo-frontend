# Todo React SPA (Frontend)

A responsive, accessible, and offline-capable Todo application built with React.  
All state is synchronized with the browser's Local Storage to support offline usage and quick performance.

## Features

- Add, edit (inline), delete tasks
- Toggle tasks completed/active
- Filter views: All, Active, Completed
- Clear all completed tasks
- Keyboard friendly:
  - Enter to add a new task
  - Escape to cancel input or editing
  - Tab/Shift+Tab to navigate controls
- Screen reader friendly:
  - Live regions for action announcements and remaining count
  - Proper roles and accessible names on interactive elements
- Responsive UI that works on mobile and desktop
- Local Storage sync for offline usage
- Data attributes (`data-cy`) prepared for Cypress testing

## Getting Started

In this directory:

- `npm start` - run the app locally (http://localhost:3000)
- `npm test`  - run unit tests
- `npm run build` - create a production build

## Project Structure

- `src/App.js` - App shell with theme toggle and layout
- `src/components/*` - UI components and Todo logic
- `src/hooks/useLocalStorage.js` - Local Storage synchronization hook
- `src/utils/id.js` - Simple ID generator
- `src/App.css`, `src/index.css` - Styles

## Accessibility Notes

- The app uses ARIA live regions to announce updates
- Filter buttons expose `aria-pressed` state
- Buttons and inputs have explicit labels
- Focus states are clearly visible

## Testing with Cypress

The UI exposes stable `data-cy` selectors (e.g., `data-cy="input-new-todo"`, `data-cy="todo-item"`) to enable resilient Cypress tests.

## Offline

No backend is required; all data persists in `localStorage`. Clearing browser storage will reset the app state.
