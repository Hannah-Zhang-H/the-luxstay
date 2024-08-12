import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import CreateVillaFormRow from "../../ui/CreateVillaFormRow";
import { useForm } from "react-hook-form";
import { createOrEditVilla } from "../../services/apiVillas";

function CreateVillaForm({ villaToEdit = {} }) {
  const { id: editId, ...editValues } = villaToEdit;
  const isEditSession = Boolean(editId);

  // getValues is used in discount field, to compare with the normal price
  // formState gets the errors and display it on the screen
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  // Create a new villa
  const queryClient = useQueryClient();

  //======================================== Creat a new villa ==============================
  const { mutate: createVilla, isLoading: isCreating } = useMutation({
    mutationFn: createOrEditVilla,
    onSuccess: () => {
      toast.success("New villa successfully created");
      queryClient.invalidateQueries({ queryKey: ["villas"] });
    },
    onError: (err) => toast.error(err.message),
  });

  //======================================== Edit a villa ==============================
  const { mutate: editVilla, isLoading: isEditing } = useMutation({
    mutationFn: ({ newVillaData, id }) => createOrEditVilla(newVillaData, id),
    onSuccess: () => {
      toast.success("Villa successfully updated");
      queryClient.invalidateQueries({ queryKey: ["villas"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // Check the image type first, if string -> the image which has been uploaded(user did not change image, then just use this image),
    // If not string -> substract it from the array
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // Edit the villa
    if (isEditSession)
      editVilla({ newVillaData: { ...data, image }, id: editId });
    // Create a new villa
    else createVilla({ ...data, image: image });
  }

  // If failed validate
  function onError(errors) {
    // console.log(errors);
  }

  return (
    // If form validation fails, then call the onError function
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* ---------------------------------------- name ----------------------------------------*/}
      <CreateVillaFormRow label="Villa name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required.",
          })}
        />
      </CreateVillaFormRow>
      {/* ---------------------------------------- maxCapacity ----------------------------------------*/}

      <CreateVillaFormRow
        label="maxCapacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required.",
            min: { value: 1, message: "Capacity should be at least 1." },
          })}
        />
      </CreateVillaFormRow>
      {/* ---------------------------------------- normalPrice ----------------------------------------*/}

      <CreateVillaFormRow
        label="normalPrice"
        error={errors?.normalPrice?.message}
      >
        <Input
          type="number"
          id="normalPrice"
          disabled={isWorking}
          {...register("normalPrice", {
            required: "This field is required.",
            min: { value: 1, message: "NormalPrice should be at least 1." },
          })}
        />
      </CreateVillaFormRow>
      {/* ---------------------------------------- discount ----------------------------------------*/}

      <CreateVillaFormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required.",
            validate: (discountValue) => {
              const normalPrice = getValues().normalPrice;
              !normalPrice ||
                discountValue <= normalPrice ||
                "Discount should be less than normal price.";
            },
          })}
        />
      </CreateVillaFormRow>
      {/* ---------------------------------------- description ----------------------------------------*/}

      <CreateVillaFormRow
        label="description"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required." })}
        />
      </CreateVillaFormRow>
      {/* ---------------------------------------- image ----------------------------------------*/}

      <CreateVillaFormRow label="villa photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </CreateVillaFormRow>
      {/* ---------------------------------------- buttons ----------------------------------------*/}

      <CreateVillaFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Reset
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Villa" : "Add villa"}
        </Button>
      </CreateVillaFormRow>
    </Form>
  );
}

export default CreateVillaForm;
