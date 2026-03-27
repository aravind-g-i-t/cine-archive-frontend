import { useContext } from "react";
import FavouritesContext from "../context/FavouritesContext.js";

// ─── useFavourites ────────────────────────────────────────────────────────────
//
// Custom hook to consume FavouritesContext cleanly.
// Throws an error if used outside of FavouritesProvider.
//
// Usage:
//   const { favourites, addFavourite, removeFavourite, isFavourite } = useFavourites();

const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }
  return context;
};

export default useFavourites;