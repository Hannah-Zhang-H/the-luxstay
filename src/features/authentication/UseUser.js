import { useQuery } from "@tanstack/react-query";
import { getCurrentUser as getCurrentUserApi } from "../../services/apiAuth";

// It will get the current user and store it into cache, so it will not have to redownload
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserApi,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
