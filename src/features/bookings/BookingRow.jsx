import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import { MdEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { deleteBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import { TbReportSearch } from "react-icons/tb";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteBooking } from "./useDeleteBooking";

const Villa = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalFee,
    status,
    guests: { fullName: guestName, email },
    villas: { name: villaName },
  },
}) {
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Villa>{villaName}</Villa>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalFee)}</Amount>
      <Modal>
        <div>
          {/* -------------------------- booking Details---------------------------- */}
          <TbReportSearch onClick={() => navigate(`/bookings/${bookingId}`)} />

          {/* -------------------------- Check In---------------------------- */}
          {status === "unconfirmed" && (
            <HiArrowDownOnSquare
              onClick={() => navigate(`/checkin/${bookingId}`)}
            />
          )}

          {/* -------------------------- Check Out---------------------------- */}
          {status === "checked-in" && (
            <HiArrowUpOnSquare
              onClick={() => checkOut(bookingId)}
              disabled={isCheckingOut}
            />
          )}
          {/* -------------------------- Delete Booking---------------------------- */}
          <Modal.Open opens="delete">
            <MdDeleteForever />
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deleteBooking(bookingId)}
            />
          </Modal.Window>
        </div>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
