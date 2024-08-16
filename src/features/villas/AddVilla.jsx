import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateVillaForm from "./CreateVillaForm";

function AddVilla() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="villa-form">
          <Button>Add new villa</Button>
        </Modal.Open>
        <Modal.Window name="villa-form">
          <CreateVillaForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default AddVilla;
