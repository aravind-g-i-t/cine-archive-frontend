import { useState, useEffect } from "react";
import {
  fetchFavourites,
  addFavourite as addFavouriteAPI,
  removeFavourite as removeFavouriteAPI,
} from "../services/api.js";
import FavouritesContext from "../context/FavouritesContext.js";

// ─── Provider ─────────────────────────────────────────────────────────────────
// This file only exports a single React component (FavouritesProvider),
// which keeps React Fast Refresh happy.

const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      setLoading(true);
      const data = await fetchFavourites();
      setFavourites(data);
    } catch (err) {
      setError("Failed to load favourites");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addFavourite = async (movie) => {
    try {
      setFavourites((prev) => [...prev, movie]);
      const updated = await addFavouriteAPI(movie);
      setFavourites(updated);
    } catch (err) {
      setFavourites((prev) => prev.filter((f) => f.imdbID !== movie.imdbID));
      console.error("Failed to add favourite:", err.message);
    }
  };

  const removeFavourite = async (imdbID) => {
    const previousFavourites = favourites;
    try {
      setFavourites((prev) => prev.filter((f) => f.imdbID !== imdbID));
      const updated = await removeFavouriteAPI(imdbID);
      setFavourites(updated);
    } catch (err) {
      setFavourites(previousFavourites);
      console.error("Failed to remove favourite:", err.message);
    }
  };

  const isFavourite = (imdbID) => {
    return favourites.some((f) => f.imdbID === imdbID);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, loading, error, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;