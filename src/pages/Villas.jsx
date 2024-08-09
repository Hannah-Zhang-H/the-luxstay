import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getVillas } from "../services/apiVillas";

function Villas() {
  useEffect(() => {
    getVillas().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All Villas</Heading>
      <p>TEST</p>
      <img
        src="https://dgutpaazmciinuuwqtwt.supabase.co/storage/v1/object/public/villa-images/villa-001.jpeg"
        alt=""
      />
    </Row>
  );
}

export default Villas;
