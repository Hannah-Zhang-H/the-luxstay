// Import necessary components and libraries
import { Outlet } from "react-router-dom"; // Outlet is used to render child routes
import Sidebar from "./Sidebar"; // Sidebar component for navigation
import Header from "./Header"; // Header component for the top section
import styled from "styled-components"; // Styled-components library for styling

// Create a styled Main component that defines the main content area
const Main = styled.main`
  background-color: var(
    --color-grey-100
  ); // Uses a CSS variable for the background color
  padding: 4rem 4.8rem 6.4rem; // Adds padding around the content
  overflow: scroll; // Ensures the content is scrollable if it exceeds the height
`;

// Create a styled AppLayout that defines the layout structure
const StyledAppLayout = styled.div`
  display: grid; // Use CSS grid layout
  grid-template-columns: 26rem 1fr; // Define two columns: sidebar (26rem) and content (1fr, which takes remaining space)
  grid-template-rows: auto 1fr; // Header auto height, and content takes the remaining space
  height: 100vh; // Full viewport height
`;

// Container for wrapping content inside the Main area
const Container = styled.div`
  max-width: 200em; // Limits the width of the content to a large value (200em)
  margin: 0 auto; // Center the content horizontally
  display: flex; // Use flexbox for layout
  flex-direction: column; // Stack children in a column
  gap: 3.2rem; // Adds space between elements inside the container
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header /> {/* Top navigation or branding section */}
      <Sidebar /> {/* Sidebar for navigation */}
      {/* Main content area with Outlet to render nested routes */}
      <Main>
        <Container>
          <Outlet /> {/* Renders the currently selected child route */}
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
