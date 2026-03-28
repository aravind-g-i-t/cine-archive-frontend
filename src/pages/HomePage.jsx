import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import { searchMovies } from "../services/api.js";

const ERROR = {
  TOO_MANY: "too_many",
  NOT_FOUND: "not_found",
  GENERIC: "generic",
};

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setHasSearched(false);
      setError(null);
      return;
    }

    fetchMovies(query, currentPage);
  }, [query, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const fetchMovies = async (q, page) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await searchMovies(q, page);
      setMovies(data.movies);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalResults);
      setHasSearched(true);
    } catch (err) {
      const message = err.response?.data?.error || "";

      if (message === "Too many results.") {
        setError(ERROR.TOO_MANY);
      } else if (message === "Movie not found!") {
        setError(ERROR.NOT_FOUND);
      } else {
        setError(ERROR.GENERIC);
      }

      setMovies([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page">
      <div className="search-header">
        <h1 className="search-title">Find your next movie</h1>
        <p className="search-subtitle">
          Search from thousands of movies and save your favourites
        </p>
        <SearchBar onSearch={setQuery} isLoading={isLoading} />
      </div>

      {!isLoading && hasSearched && movies.length > 0 && (
        <p className="results-count">
          Found <strong>{totalResults}</strong> results for{" "}
          <strong>"{query}"</strong>
        </p>
      )}

      {isLoading && (
        <div className="movie-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="movie-card movie-card--skeleton" />
          ))}
        </div>
      )}

      {error === ERROR.TOO_MANY && !isLoading && (
        <div className="state-message">
          <span className="state-message-icon">🔍</span>
          <p>Too many results</p>
          <span>Try a more specific title — add a year, full name, or extra words</span>
        </div>
      )}

      {error === ERROR.NOT_FOUND && !isLoading && (
        <div className="state-message">
          <span className="state-message-icon">🎬</span>
          <p>No movies found for "{query}"</p>
          <span>Try a different title</span>
        </div>
      )}

      {error === ERROR.GENERIC && !isLoading && (
        <div className="state-message">
          <span className="state-message-icon">⚠️</span>
          <p>Something went wrong</p>
          <span>Please try again in a moment</span>
        </div>
      )}

      {!isLoading && hasSearched && movies.length === 0 && !error && (
        <div className="state-message">
          <span className="state-message-icon">🎬</span>
          <p>No movies found for "{query}"</p>
          <span>Try a different title</span>
        </div>
      )}

      {!hasSearched && !isLoading && (
        <div className="state-message">
          <span className="state-message-icon">🎥</span>
          <p>Start typing to search for movies</p>
        </div>
      )}

      {!isLoading && (
        <MovieGrid
          movies={movies}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HomePage;