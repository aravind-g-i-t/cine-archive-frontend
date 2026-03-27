import { useState, useEffect } from "react";

// ─── useDebounce ──────────────────────────────────────────────────────────────
//
// Delays updating the returned value until the user stops typing
// for the specified delay period (default: 500ms).
//
// Usage:
//   const debouncedQuery = useDebounce(searchQuery, 500);
//   useEffect(() => { // call API }, [debouncedQuery]);

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel the timer if value changes before delay completes
    // This is what prevents excessive API calls while the user is typing
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;