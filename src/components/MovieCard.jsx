import { useNavigate } from "react-router-dom";
import useFavourites from "../hooks/useFavourites.js";

const FALLBACK_POSTER = "https://via.placeholder.com/300x445?text=No+Poster";

const MovieCard = ({ movie }) => {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const navigate = useNavigate();

  const favourited = isFavourite(movie.imdbID);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (favourited) {
      removeFavourite(movie.imdbID);
    } else {
      addFavourite(movie);
    }
  };

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.imdbID}`)}>
      {/* Poster */}
      <div className="movie-card-poster-wrapper">
        <img
          className="movie-card-poster"
          src={movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER}
          alt={`${movie.Title} poster`}
          loading="lazy"
        />

        {/* Heart button overlaid on poster */}
        <button
          className={`heart-btn ${favourited ? "heart-btn--active" : ""}`}
          onClick={handleHeartClick}
          aria-label={favourited ? "Remove from favourites" : "Add to favourites"}
          title={favourited ? "Remove from favourites" : "Add to favourites"}
        >
          {favourited ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Info */}
      <div className="movie-card-info">
        <h3 className="movie-card-title" title={movie.Title}>
          {movie.Title}
        </h3>
        <span className="movie-card-year">{movie.Year}</span>
      </div>
    </div>
  );
};

export default MovieCard;