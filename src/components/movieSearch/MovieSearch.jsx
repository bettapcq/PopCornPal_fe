import { useState, useEffect, useRef } from "react";
import { Form, Spinner } from "react-bootstrap";

function MovieSearch({ onSelect, initialValue = "" }) {
  const [query, setQuery] = useState(initialValue);
  const [movies, setMovies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuery(initialValue || "");
  }, [initialValue]);

  // FETCH MOVIE SEARCH AUTOCOMPILATION:

  const wrapperRef = useRef();

  // debounce for fetch limitation
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length >= 2) {
        fetchMovies(query);
      } else {
        setMovies([]);
        setShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchMovies = async (q) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:7001/movies/search?query=${q}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      setMovies(data);
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (movie) => {
    setQuery(movie.Title || "");
    setShowDropdown(false);

    onSelect(movie);
  };

  return (
    <div className="position-relative" ref={wrapperRef}>
      <Form.Control
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {showDropdown && (
        <div className="movie-dropdown">
          {loading && (
            <div className="p-2 text-center">
              <Spinner size="sm" variant="info" />
            </div>
          )}

          {!loading && movies.length === 0 && (
            <div className="p-2 text-muted">No results</div>
          )}

          {!loading &&
            movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="movie-item"
                onClick={() => handleSelect(movie)}
              >
                <span>
                  {movie.Title} ({movie.Year})
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
