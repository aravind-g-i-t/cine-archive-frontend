import axios from "axios";

// ─── Base URL ─────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: BASE_URL,
});


export const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

export const searchMovies = async (query, page = 1) => {
  const response = await api.get("/movies/search", {
    params: { q: query, page },
  });
  return response.data;
};

export const fetchFavourites = async () => {
  const sessionId = getSessionId();
  const response = await api.get("/movies/favorites", {
    params: { sessionId },
  });
  return response.data.favourites;
};

export const addFavourite = async (movie) => {
  const sessionId = getSessionId();
  const response = await api.post("/movies/favorites", { sessionId, movie });
  return response.data.favourites;
};

export const removeFavourite = async (imdbID) => {
  const sessionId = getSessionId();
  const response = await api.delete(`/movies/favorites/${imdbID}`, {
    params: { sessionId },
  });
  return response.data.favourites;
};

export const fetchMovieById = async (imdbID) => {
  const response = await api.get("/movies/details", {
    params: { imdbID },
  });
  return response.data;
};