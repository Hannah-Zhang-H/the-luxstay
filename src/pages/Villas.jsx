import Heading from "../ui/Heading";
import Row from "../ui/Row";
import VillaTable from "../features/villas/VillaTable";
import AddVilla from "../features/villas/AddVilla";

function Villas() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Villas</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <VillaTable />
        <AddVilla />
      </Row>
    </>
  );
}

export default Villas;
