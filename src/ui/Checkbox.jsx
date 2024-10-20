// Import the styled-components library for styling
import styled from "styled-components";

// Create a styled div for the checkbox component
const StyledCheckbox = styled.div`
  display: flex; // Use flexbox to align checkbox and label
  gap: 1.6rem; // Space between the checkbox and the label

  // Styles for the checkbox input element
  & input[type="checkbox"] {
    height: 2.4rem; // Set the height of the checkbox
    width: 2.4rem; // Set the width of the checkbox
    outline-offset: 2px; // Create an offset for the outline when focused
    transform-origin: 0; // Set the transformation origin
    accent-color: var(
      --color-brand-600
    ); // Set the accent color (checkbox color) using a CSS variable
  }

  // Styles for the checkbox when it is disabled
  & input[type="checkbox"]:disabled {
    accent-color: var(
      --color-brand-600
    ); // Keep the same accent color even when disabled
  }

  // Styles for the label associated with the checkbox
  & label {
    flex: 1; // Allow the label to take up the remaining space
    display: flex; // Use flexbox for aligning the content inside the label
    align-items: center; // Vertically center the content
    gap: 0.8rem; // Space between the label text and the checkbox
  }
`;

// Checkbox component definition
function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <StyledCheckbox>
      {/* Input checkbox element */}
      <input
        type="checkbox"
        id={id} // Associate input with a label using the id
        checked={checked} // Checkbox state (checked or unchecked)
        onChange={onChange} // Handler function for change events
        disabled={disabled} // Disable the checkbox if needed
      />
      {/* Label for the checkbox */}
      <label htmlFor={!disabled ? id : ""}>{children}</label>{" "}
      {/* Only set htmlFor if not disabled */}
    </StyledCheckbox>
  );
}

export default Checkbox;
