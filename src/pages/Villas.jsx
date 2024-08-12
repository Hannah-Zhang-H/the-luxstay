import Heading from "../ui/Heading";
import Row from "../ui/Row";
import VillaTable from "../features/villas/VillaTable";
import { useState } from "react";
import CreateVillaForm from "../features/villas/CreateVillaForm";
import Button from "../ui/Button";

function Villas() {
  const [showForm, setShowFrom] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Villas</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <VillaTable />
        <Button onClick={() => setShowFrom((show) => !show)}>
          Add new villa
        </Button>
        {showForm && <CreateVillaForm />}
      </Row>
    </>
  );
}

export default Villas;
