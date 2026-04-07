# CineArchive — Frontend

React + Vite movie search interface. Search movies via the OMDB API, view details, and manage a session-based favourites list.

---

## Tech Stack

- **React 18 + Vite**
- **React Router** — page navigation
- **Context API** — global favourites state
- **Axios** — HTTP requests

---

## Setup
```bash
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

Run the dev server:
```bash
npm run dev
```

Runs at http://localhost:5173

> Backend must be running for the app to work.

---

## Structure
```
src/
├── components/
│   ├── SearchBar
│   ├── MovieCard
│   ├── MovieGrid
│   └── Navbar
├── context/
│   ├── FavouritesContext
│   └── FavouritesProvider
├── hooks/
│   ├── useDebounce
│   └── useFavourites
├── pages/
│   ├── HomePage
│   ├── FavouritesPage
│   └── MovieDetailPage
├── services/
│   └── api.js          # All axios calls
├── App.jsx
└── index.css
```

---

## Key Decisions

**Debounced search** — 500ms delay via custom `useDebounce` hook to avoid excessive API calls.

**Session ID** — `crypto.randomUUID()` stored in `localStorage` on first visit to separate favourites between users without login.

**Optimistic updates** — favourites update instantly in the UI and roll back if the server call fails.

**Context API** — lightweight global state for favourites; Redux would be overkill for this scale.

**ESM syntax** — consistent modern `import`/`export` throughout.
