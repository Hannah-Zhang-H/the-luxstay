// Import necessary hooks and services
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditVilla as createOrEditVillaApi } from "../../services/apiVillas";
import toast from "react-hot-toast"; // Import toast for notifications

// Custom hook to create a new villa
export function useCreateVilla() {
  const queryClient = useQueryClient(); // Get the query client to interact with the query cache

  //======================================== Create a new villa ==============================
  const { mutate: createVilla, isLoading: isCreating } = useMutation({
    mutationFn: createOrEditVillaApi, // Function that creates or edits a villa
    onSuccess: () => {
      // If the mutation succeeds:
      toast.success("New villa successfully created"); // Show a success toast
      queryClient.invalidateQueries({ queryKey: ["villas"] }); // Invalidate the "villas" query to refetch updated data
    },
    onError: (err) => toast.error(err.message), // Show an error toast if the mutation fails
  });

  return { createVilla, isCreating }; // Return the mutation function and loading state
}
