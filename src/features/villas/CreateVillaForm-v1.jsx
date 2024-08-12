import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import CreateVillaFormRow from "../../ui/CreateVillaFormRow";
import { useForm } from "react-hook-form";
import { createVilla } from "../../services/apiVillas";

function CreateVillaForm() {
  // getValues is used in discount field, to compare with the normal price
  // formState gets the errors and display it on the screen
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  // Create a new villa
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createVilla,
    onSuccess: () => {
      toast.success("New villa successfully created");
      queryClient.invalidateQueries({ queryKey: ["villas"] });
      // // Reset the form, hovever the system will wait for sometime, incase the image has not been uploaded
      // setTimeout(() => {
      //   reset();
      // }, 1000);
    },
    onError: (err) => toast.error(err.message),
  });

  // Generates the villa object
  function onSubmit(data) {
    // Upload the image src
    mutate({ ...data, image: data.image[0] });
    // console.log(data);
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
            validate: (discountValue) =>
              discountValue <= getValues().normalPrice ||
              "Discount should be less than normal price.",
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
          disabled={isCreating}
          defaultValue=""
          {...register("description", { required: "This field is required." })}
        />
      </CreateVillaFormRow>
      {/* ---------------------------------------- image ----------------------------------------*/}

      <CreateVillaFormRow label="villa photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
      </CreateVillaFormRow>
      {/* ---------------------------------------- buttons ----------------------------------------*/}

      <CreateVillaFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Reset
        </Button>
        <Button disabled={isCreating}>Add villa</Button>
      </CreateVillaFormRow>
    </Form>
  );
}

export default CreateVillaForm;
