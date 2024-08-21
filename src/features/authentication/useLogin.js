import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("Error from useLogin: ", err);
      toast.error("Provied email or password is incorrect");
    },
  });

  return { login, isLoading };
}
