import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import useFavourites from "../hooks/useFavourites.js";


const FavouritesPage = () => {
  const { favourites, loading } = useFavourites();
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* Header */}
      <div className="search-header">
        <h1 className="search-title">Your Favourites</h1>
        <p className="search-subtitle">
          {favourites.length > 0
            ? `You have ${favourites.length} saved movie${favourites.length > 1 ? "s" : ""}`
            : "Movies you love will appear here"}
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="movie-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="movie-card movie-card--skeleton" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && favourites.length === 0 && (
        <div className="state-message">
          <span className="state-message-icon">🤍</span>
          <p>No favourites yet</p>
          <button
            className="btn-primary"
            onClick={() => navigate("/")}
          >
            Browse Movies
          </button>
        </div>
      )}

      {/* Favourites grid */}
      {!loading && favourites.length > 0 && (
        <div className="movie-grid">
          {favourites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;