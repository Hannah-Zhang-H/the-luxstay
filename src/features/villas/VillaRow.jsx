import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateVillaForm from "./CreateVillaForm";
import { useDeleteVilla } from "./useDeleteVilla";
import { MdEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { useCreateVilla } from "./useCreateVilla";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 12rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Villa = styled.div`
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
    <Table.Row>
      <Img src={image} />
      <Villa>{name}</Villa>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(normalPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <HiDocumentDuplicate
          onClick={handleDuplicate}
          disabled={isCreating}
          style={{ marginRight: "5px" }}
          title="Duplicate villa"
        />

        <Modal>
          <Modal.Open opens="edit">
            <MdEdit style={{ marginRight: "5px" }} title="Edit villa" />
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateVillaForm villaToEdit={villa} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <MdOutlineDeleteForever
              style={{ marginRight: "5px" }}
              title="Delete villa"
            />
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="villa"
              disabled={isDeleting}
              onConfirm={() => deleteVilla(villaId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default VillaRow;
