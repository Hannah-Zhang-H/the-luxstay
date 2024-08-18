import { useQuery } from "@tanstack/react-query";
import { getVillas as getVillasApi } from "../../services/apiVillas";

export function useVillas() {
  // data: villas ===> just rename the data to villas
  const {
    isLoading,
    data: villas,
    error,
  } = useQuery({
    queryKey: ["villas"],
    queryFn: getVillasApi,
  });

  return { isLoading, error, villas };
}
