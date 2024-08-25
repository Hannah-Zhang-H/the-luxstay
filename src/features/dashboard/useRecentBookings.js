import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate as getBookingsAfterDateApi } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // 7 days is set to default
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // queryDate is the  date = currentDate - 7/30/90 days
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDateApi(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
