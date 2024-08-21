import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Remove all queries to protect the app
      queryClient.removeQueries();
      toast.success("You have successfully logged out");
      // Do not want users to return to the protected page again through the "Back" button after successfully logged out
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
