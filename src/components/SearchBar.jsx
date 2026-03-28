import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce.js";


const SearchBar = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState("");


  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar">
        {/* Search Icon */}
        <span className="searchbar-icon">
          {isLoading ? (
            <span className="searchbar-spinner" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )}
        </span>

        <input
          type="text"
          className="searchbar-input"
          placeholder="Search for a movie..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />

        {/* Clear button — only visible when there is text */}
        {inputValue && (
          <button className="searchbar-clear" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;