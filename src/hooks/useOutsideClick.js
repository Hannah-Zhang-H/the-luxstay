// Import necessary hooks from React
import { useEffect, useRef } from "react";

// Custom hook for handling clicks outside a specified element
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(); // Create a reference to the DOM element

  useEffect(() => {
    // Function to handle the click event
    function handleClick(e) {
      // If ref is assigned and the clicked element is outside of the ref element
      if (ref.current && !ref.current.contains(e.target)) {
        handler(); // Call the handler function passed in as a prop
      }
    }

    // Add a click event listener to the document with the specified capture phase
    document.addEventListener("click", handleClick, listenCapturing);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]); // Re-run the effect if handler or listenCapturing changes

  return ref; // Return the ref to be attached to the target element
}
