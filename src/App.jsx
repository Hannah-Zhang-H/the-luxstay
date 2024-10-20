// Import necessary libraries and components
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Villas from "./pages/Villas";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

// Create a new QueryClient for react-query with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set staleTime to 0, meaning cached data is always refetched on mount
      staleTime: 0,
    },
  },
});

function App() {
  return (
    // Provide dark mode context to the entire application
    <DarkModeProvider>
      {/* Wrap the app with the QueryClientProvider to use react-query */}
      <QueryClientProvider client={queryClient}>
        {/* Enable devtools for react-query debugging */}
        <ReactQueryDevtools initialIsOpen={false} />

        {/* Apply global styles */}
        <GlobalStyles />

        {/* Set up the routing for the app */}
        <BrowserRouter>
          <Routes>
            <Route
              // ProtectedRoute wraps AppLayout to enforce authentication for all nested routes
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* Redirect root to the dashboard */}
              <Route index element={<Navigate replace to="dashboard" />} />

              {/* Define main routes under AppLayout */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="villas" element={<Villas />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            {/* Login and 404 pages are outside of the protected routes and layout */}
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Set up the toast notifications with custom styling */}
        <Toaster
          position="top-center"
          gutter={12} // Space between multiple toasts
          containerStyle={{ margin: "8px" }} // Customize margin for the container
          toastOptions={{
            success: {
              duration: 3200, // Duration for success messages
            },
            error: {
              duration: 5100, // Duration for error messages
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px", // Set maximum width for toasts
              padding: "16px 24px", // Add padding inside the toasts
              backgroundColor: "var(--color-grey-0)", // Use CSS variable for background color
              color: "var(--color-grey-700)", // Use CSS variable for text color
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
