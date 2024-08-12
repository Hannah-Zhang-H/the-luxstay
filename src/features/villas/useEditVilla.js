import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrEditVilla as createOrEditVillaApi } from "../../services/apiVillas";

export function useEditVilla() {
  const queryClient = useQueryClient();
  const { mutate: editVilla, isLoading: isEditing } = useMutation({
    mutationFn: ({ newVillaData, id }) =>
      createOrEditVillaApi(newVillaData, id),
    onSuccess: () => {
      toast.success("Villa successfully updated");
      queryClient.invalidateQueries({ queryKey: ["villas"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editVilla };
}
