import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useVillas } from "../villas/useVillas";
import SalesChart from "./SalesChart";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingB, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingS,
    confirmedStays,
    stays,
    numDays,
  } = useRecentStays();
  const { villas, isLoading: isLoadingV } = useVillas();
  if (isLoadingB || isLoadingS || isLoadingV) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        villaCount={villas.length}
      />
      <div>Today's activity</div>
      <div>chart stay durations</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
