import Spinner from "../../ui/Spinner";
import VillaRow from "./VillaRow";
import { useVillas } from "./useVillas";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function VillaTable() {
  const { isLoading, villas, error } = useVillas();
  const [searchParams] = useSearchParams(); // ?discount=all, no-discount, with-discount
  // If the loading state is isLoading, then the spinner get displayed
  if (isLoading) return <Spinner />;
  const filterValue = searchParams.get("discount") || "all";

  // Use filterValue to filter the data
  let filteredVillas;
  if (filterValue === "all") filteredVillas = villas;
  if (filterValue === "no-discount")
    filteredVillas = villas.filter((v) => v.discount === 0);
  if (filterValue === "with-discount")
    filteredVillas = villas.filter((v) => v.discount > 0);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Villa</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredVillas}
          render={(villa) => <VillaRow villa={villa} key={villa.id} />}
        />
      </Table>
    </Menus>
  );
}

export default VillaTable;
