import Spinner from "../../ui/Spinner";
import VillaRow from "./VillaRow";
import { useVillas } from "./useVillas";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function VillaTable() {
  const { isLoading, villas, error } = useVillas();
  const [searchParams] = useSearchParams(); // ?discount=all, no-discount, with-discount
  // If the loading state is isLoading, then the spinner get displayed
  if (isLoading) return <Spinner />;
  if (!villas.length) return <Empty resource="villas" />;

  // ==================================================  Filter =======================================================
  const filterValue = searchParams.get("discount") || "all";

  // Use filterValue to filter the data
  let filteredVillas;
  if (filterValue === "all") filteredVillas = villas;
  if (filterValue === "no-discount")
    filteredVillas = villas.filter((v) => v.discount === 0);
  if (filterValue === "with-discount")
    filteredVillas = villas.filter((v) => v.discount > 0);

  // ===================================================  Sort =======================================================
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, asc_desc] = sortBy.split("-");
  const modifier = asc_desc === "asc" ? 1 : -1;
  const sortedVillas = filteredVillas.sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      return (a[field] - b[field]) * modifier;
    }
  });

  // ==================================================  Return ===========================================
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Villa</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body
          data={sortedVillas}
          render={(villa) => <VillaRow villa={villa} key={villa.id} />}
        />
      </Table>
    </Menus>
  );
}

export default VillaTable;
