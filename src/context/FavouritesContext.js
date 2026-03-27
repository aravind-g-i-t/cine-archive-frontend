import { createContext } from "react";

// ─── FavouritesContext ────────────────────────────────────────────────────────
// Separated into its own file to satisfy React Fast Refresh rules.
// Fast Refresh requires that a file only exports React components —
// a context object is not a component, so it must live separately.

const FavouritesContext = createContext(null);

export default FavouritesContext;