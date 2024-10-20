// Import useNavigate hook from react-router-dom
import { useNavigate } from "react-router-dom";

// Custom hook for navigating back to the previous page
export function useMoveBack() {
  const navigate = useNavigate(); // Get the navigate function from react-router

  // Return a function that, when called, navigates the user back one step in the browser history
  return () => navigate(-1);
}
