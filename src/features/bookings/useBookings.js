import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient(); // For pre-fetching
  // ======================= Filter =======================
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // ======================================= Sort =====================================
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, asc_desc] = sortByRaw.split("-");
  const sortBy = { field, asc_desc };

  // ======================================= Pagination =================================
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // ========================================= Query =====================================
  //  data: {data:bookings, count} is because in api, we returned a obj, instead of only data
  const {
    isLoading,
    data: { data: bookings, count } = {}, // Ensure data is an object with default values
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // ========================================= Pre - fetching =====================================
  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 0;
  // If the page is already on the last page, then there is no need to pre-fetching an additional page
  if (page < pageCount && pageCount > 0)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1 && pageCount > 0)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  // ========================================= Return =====================================
  return { isLoading, bookings, error, count };
}
