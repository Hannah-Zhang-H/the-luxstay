import Heading from "../ui/Heading";
import Row from "../ui/Row";
import VillaTable from "../features/villas/VillaTable";
import AddVilla from "../features/villas/AddVilla";
import VillaTableOperations from "../features/villas/VillaTableOperations";

function Villas() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Villas</Heading>
        <VillaTableOperations />
      </Row>
      <Row>
        <VillaTable />
        <AddVilla />
      </Row>
    </>
  );
}

export default Villas;
