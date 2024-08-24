import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingB, booking } = useRecentBookings();
  const { isLoading: isLoadingS, confirmedStays, stays } = useRecentStays();
  if (isLoadingB || isLoadingS) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>statistics</div>
      <div>Today's activity</div>
      <div>chart stay durations</div>
      <div>cchart sales </div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
