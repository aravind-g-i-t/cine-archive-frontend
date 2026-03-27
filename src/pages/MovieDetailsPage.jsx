import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieById } from "../services/api.js";
import useFavourites from "../hooks/useFavourites.js";

const FALLBACK_POSTER = "https://via.placeholder.com/300x445?text=No+Poster";

const MovieDetailPage = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdbID) return;
    loadMovie();
  }, [imdbID]);

  const loadMovie = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMovieById(imdbID);
      setMovie(data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load movie details");
    } finally {
      setIsLoading(false);
    }
  };

  const favourited = movie ? isFavourite(movie.imdbID) : false;

  const handleHeartClick = () => {
    if (!movie) return;
    if (favourited) {
      removeFavourite(movie.imdbID);
    } else {
      addFavourite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      });
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="page">
        <div className="detail-skeleton">
          <div className="detail-skeleton-poster" />
          <div className="detail-skeleton-info">
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line skeleton-line--short" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line skeleton-line--short" />
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="page">
        <div className="state-message">
          <span className="state-message-icon">⚠️</span>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  // ── Parse fields ───────────────────────────────────────────────────────────
  const genres = movie.Genre !== "N/A" ? movie.Genre.split(", ") : [];
  const ratings = movie.Ratings || [];

  return (
    <div className="page">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-layout">
        {/* ── Left: Poster ────────────────────────────────────────────────── */}
        <div className="detail-poster-col">
          <div className="detail-poster-wrapper">
            <img
              className="detail-poster"
              src={movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER}
              alt={`${movie.Title} poster`}
            />
          </div>

          {/* Heart button below poster */}
          <button
            className={`detail-heart-btn ${favourited ? "detail-heart-btn--active" : ""}`}
            onClick={handleHeartClick}
          >
            {favourited ? "❤️ Saved" : "🤍 Save to Favourites"}
          </button>
        </div>

        {/* ── Right: Info ──────────────────────────────────────────────────── */}
        <div className="detail-info-col">
          {/* Title + year */}
          <h1 className="detail-title">{movie.Title}</h1>
          <p className="detail-year-runtime">
            {movie.Year}
            {movie.Runtime !== "N/A" && <span> · {movie.Runtime}</span>}
            {movie.Rated !== "N/A" && (
              <span className="detail-rated">{movie.Rated}</span>
            )}
          </p>

          {/* Genres */}
          {genres.length > 0 && (
            <div className="detail-genres">
              {genres.map((g) => (
                <span key={g} className="genre-tag">
                  {g}
                </span>
              ))}
            </div>
          )}

          {/* IMDB Rating */}
          {movie.imdbRating !== "N/A" && (
            <div className="detail-rating">
              <span className="detail-rating-star">★</span>
              <span className="detail-rating-score">{movie.imdbRating}</span>
              <span className="detail-rating-max">/10</span>
              {movie.imdbVotes !== "N/A" && (
                <span className="detail-rating-votes">
                  {movie.imdbVotes} votes
                </span>
              )}
            </div>
          )}

          {/* Plot */}
          {movie.Plot !== "N/A" && (
            <div className="detail-section">
              <h2 className="detail-section-title">Plot</h2>
              <p className="detail-plot">{movie.Plot}</p>
            </div>
          )}

          {/* Details grid */}
          <div className="detail-section">
            <h2 className="detail-section-title">Details</h2>
            <div className="detail-meta-grid">
              {movie.Director !== "N/A" && (
                <div className="detail-meta-row">
                  <span className="detail-meta-label">Director</span>
                  <span className="detail-meta-value">{movie.Director}</span>
                </div>
              )}
              {movie.Actors !== "N/A" && (
                <div className="detail-meta-row">
                  <span className="detail-meta-label">Cast</span>
                  <span className="detail-meta-value">{movie.Actors}</span>
                </div>
              )}
              {movie.Writer !== "N/A" && (
                <div className="detail-meta-row">
                  <span className="detail-meta-label">Writer</span>
                  <span className="detail-meta-value">{movie.Writer}</span>
                </div>
              )}
              {movie.Language !== "N/A" && (
                <div className="detail-meta-row">
                  <span className="detail-meta-label">Language</span>
                  <span className="detail-meta-value">{movie.Language}</span>
                </div>
              )}
              {movie.Country !== "N/A" && (
                <div className="detail-meta-row">
                  <span className="detail-meta-label">Country</span>
                  <span className="detail-meta-value">{movie.Country}</span>
                </div>
              )}
              {movie.BoxOffice !== "N/A" && movie.BoxOffice && (
                <div className="detail-meta-row">
                  <span className="detail-meta-label">Box Office</span>
                  <span className="detail-meta-value">{movie.BoxOffice}</span>
                </div>
              )}
              {movie.Awards !== "N/A" && (
                <div className="detail-meta-row">
                  <span className="detail-meta-label">Awards</span>
                  <span className="detail-meta-value">{movie.Awards}</span>
                </div>
              )}
            </div>
          </div>

          {/* Ratings from other sources */}
          {ratings.length > 0 && (
            <div className="detail-section">
              <h2 className="detail-section-title">Ratings</h2>
              <div className="detail-ratings-list">
                {ratings.map((r) => (
                  <div key={r.Source} className="detail-rating-item">
                    <span className="detail-rating-source">{r.Source}</span>
                    <span className="detail-rating-value">{r.Value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;