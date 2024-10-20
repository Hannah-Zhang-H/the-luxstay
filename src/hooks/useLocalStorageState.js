// Import necessary hooks from React
import { useState, useEffect } from "react";

// Custom hook for managing state with localStorage persistence
export function useLocalStorageState(initialState, key) {
  // Initialize the state by checking if there is a stored value in localStorage
  const [value, setValue] = useState(function () {
    // Get the stored value from localStorage using the provided key
    const storedValue = localStorage.getItem(key);
    // If a stored value exists, parse it from JSON; otherwise, use the initialState
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // useEffect to update localStorage whenever the state changes
  useEffect(
    function () {
      // Store the updated value in localStorage as a JSON string
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key] // Re-run this effect whenever the value or key changes
  );

  // Return the state value and the function to update the state
  return [value, setValue];
}
