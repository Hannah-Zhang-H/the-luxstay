import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

// ================================== getBooking(id) ================================
export async function getBookings({ filter, sortBy, page }) {
  //  { count: "exact" } calculate the query length
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalFee, villas(name), guests(fullName,email)",
      { count: "exact" }
    );

  // --------------------------------- Filter ----------------------------
  if (filter) query = query.eq(filter.field, filter.value);
  // --------------------------------- Sort ------------------------------
  if (sortBy)
    query = query.order(sortBy.field, { ascending: sortBy.asc_desc === "asc" });
  // --------------------------------- Pagination ------------------------------
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    // make sure the pagination is valid
    const { count } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true });

    if (from >= count) {
      throw new Error("Page out of bounds");
    }

    query = query.range(from, Math.min(to, count - 1)); // make sure  "to" is inside the boundary
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings not found");
  }

  return { data, count };
}

// ================================== getBooking(id) ================================
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, villas(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// ================================== getBookingsAfterDate(date) ================================
// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalFee, extraFee")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// ================================== getStaysAfterDate(date) ================================
// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// ================================== getStaysTodayActivity() ================================
// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}
// ================================== updateBooking(id, obj) ================================

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}
// ================================== deleteBooking(id)================================

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
