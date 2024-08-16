import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { useCreateVilla } from "./useCreateVilla";
import { useEditVilla } from "./useEditVilla";

function CreateVillaForm({ villaToEdit = {}, onCloseModal = {} }) {
  const { id: editId, ...editValues } = villaToEdit;
  const isEditSession = Boolean(editId);

  // getValues is used in discount field, to compare with the normal price
  // formState gets the errors and display it on the screen
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  //======================================== Creat a new villa ==============================
  const { isCreating, createVilla } = useCreateVilla();
  //======================================== Edit a villa ==============================
  const { isEditing, editVilla } = useEditVilla();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // Check the image type first, if string -> the image which has been uploaded(user did not change image, then just use this image),
    // If not string -> substract it from the array
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // Edit the villa
    if (isEditSession) {
      editVilla(
        { newVillaData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal;
          },
        }
      );
    }
    // Create a new villa
    else {
      createVilla(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal;
          },
        }
      );
    }
  }

  // If failed validate
  function onError(errors) {
    // console.log(errors);
  }

  return (
    // If form validation fails, then call the onError function
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* ---------------------------------------- name ----------------------------------------*/}
      <FormRow label="Villa name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required.",
          })}
        />
      </FormRow>
      {/* ---------------------------------------- maxCapacity ----------------------------------------*/}

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required.",
            min: { value: 1, message: "Capacity should be at least 1." },
          })}
        />
      </FormRow>
      {/* ---------------------------------------- normalPrice ----------------------------------------*/}

      <FormRow label="normalPrice" error={errors?.normalPrice?.message}>
        <Input
          type="number"
          id="normalPrice"
          disabled={isWorking}
          {...register("normalPrice", {
            required: "This field is required.",
            min: { value: 1, message: "NormalPrice should be at least 1." },
          })}
        />
      </FormRow>
      {/* ---------------------------------------- discount ----------------------------------------*/}

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required.",
            validate: (discountValue) => {
              const normalPrice = getValues().normalPrice;
              if (normalPrice)
                return (
                  discountValue < normalPrice ||
                  "Discount should be less than normal price."
                );
              return true;
            },
          })}
        />
      </FormRow>
      {/* ---------------------------------------- description ----------------------------------------*/}

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required." })}
        />
      </FormRow>
      {/* ---------------------------------------- image ----------------------------------------*/}

      <FormRow label="villa photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>
      {/* ---------------------------------------- buttons ----------------------------------------*/}

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          {isEditSession ? "Reset" : "Cancel"}
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Villa" : "Add villa"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateVillaForm;
