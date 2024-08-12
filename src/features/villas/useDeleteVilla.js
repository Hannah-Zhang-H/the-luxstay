import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteVilla as deleteVillaApi } from "../../services/apiVillas";

export function useDeleteVilla() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteVilla } = useMutation({
    mutationFn: deleteVillaApi,
    onSuccess: () => {
      toast.success("Villa successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["villas"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteVilla };
}
