import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditVilla as createOrEditVillaApi } from "../../services/apiVillas";
import toast from "react-hot-toast";

// Create a new villa

export function useCreateVilla() {
  const queryClient = useQueryClient();

  //======================================== Creat a new villa ==============================
  const { mutate: createVilla, isLoading: isCreating } = useMutation({
    mutationFn: createOrEditVillaApi,
    onSuccess: () => {
      toast.success("New villa successfully created");
      queryClient.invalidateQueries({ queryKey: ["villas"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createVilla, isCreating };
}
