# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build (output to `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint over the project

There is no test runner configured in this project.

## Architecture

Despite the directory name `tic-tac-toe`, this is not a tic-tac-toe game — it's a standard Vite + React 19 scaffold currently implementing a filterable product table (the classic "Thinking in React" exercise).

- `src/main.jsx` — entry point, mounts `<App />` into `#root` (see `index.html`) inside `StrictMode`.
- `src/App.jsx` — root component. Owns the single source of truth: `store` state (initialized from `src/data/stores.js`), passed down to `SearchBar` and `ResultTable`. Data flows one-way: `SearchBar` filters `data` and calls `setStore` to update what `ResultTable` renders.
- `src/components/SearchBar.jsx` — text input + "In Stock Only" checkbox; filters the full `stores` list and pushes the filtered result up via `setStore`. Note: filtering by stock and by search text are not currently combined (checking one can override/discard the other's filter).
- `src/components/ResultTable.jsx` — renders `data` as a table; out-of-stock rows are styled red via inline `style`.
- `src/data/stores.js` — static hardcoded product data (name, category, price, stocked).

No routing, no state management library, and no CSS modules — styling is plain CSS (`App.css`, `index.css`) plus one inline style in `ResultTable`.
