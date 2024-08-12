import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateVillaForm from "./CreateVillaForm";
import { useDeleteVilla } from "./UseDeleteVilla";
import { MdEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { useCreateVilla } from "./useCreateVilla";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function VillaRow({ villa }) {
  const {
    id: villaId,
    name,
    maxCapacity,
    normalPrice,
    discount,
    image,
    description,
  } = villa;
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteVilla } = useDeleteVilla();
  const { isCreating, createVilla } = useCreateVilla();

  function handleDuplicate() {
    createVilla({
      name: `Copy of ${name}`,
      maxCapacity,
      normalPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(normalPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiDocumentDuplicate />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <MdEdit />
          </button>
          <button onClick={() => deleteVilla(villaId)} disabled={isDeleting}>
            <MdOutlineDeleteForever />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateVillaForm villaToEdit={villa} />}
    </>
  );
}

export default VillaRow;
