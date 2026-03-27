import MovieCard from "./MovieCard.jsx";

// ─── MovieGrid ────────────────────────────────────────────────────────────────
//
// Props:
//   movies      — array of movie objects from OMDB
//   totalPages  — total number of pages for pagination
//   currentPage — current active page
//   onPageChange(page) — called when user clicks a page button

const MovieGrid = ({ movies, totalPages, currentPage, onPageChange }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-grid-wrapper">
      {/* Grid */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          <div className="pagination-pages">
            {/* Show max 5 page buttons at a time */}
            {getPaginationRange(currentPage, totalPages).map((page,index) =>
              page === "..." ? (
                <span key={index} className="pagination-ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`pagination-btn ${
                    page === currentPage ? "pagination-btn--active" : ""
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Pagination Helper ────────────────────────────────────────────────────────

// Returns an array of page numbers with ellipsis for large page counts
// e.g. [1, '...', 4, 5, 6, '...', 20]
const getPaginationRange = (current, total) => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];

  return [1, "...", current - 1, current, current + 1, "...", total];
};

export default MovieGrid;