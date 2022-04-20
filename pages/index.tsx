/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm, ValidateResult } from "react-hook-form";

import FormElement from "../components/form-element/FormElement";

const hasUnder20Chars = (value: string): Promise<ValidateResult> => {
  let result: ValidateResult = true;
  if (value?.length > 20) {
    result = "The maximum number of characters is 20.";
  }
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(() => resolve(result), 400));
};

const HookForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    // Validation will trigger on the submit event and invalid inputs will attach onChange event listeners to re-validate them.
    // delayError will delay the error state to be displayed to the end-user in milliseconds.
    // Correcting the error input will remove the error instantly and delay will not be applied.
  } = useForm({ mode: "onSubmit", delayError: 0 });

  console.log(watch("name"));

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 500);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* pass the error to FormControl so it can invalidate the input if error exists */}
      <FormControl isInvalid={errors.name}>
        {/* pass the error to FormElement so it can display the error if it exists */}
        <FormElement error={errors.name?.message}>
          <FormLabel htmlFor="name">First name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            defaultValue=""
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length is 4." },
              validate: hasUnder20Chars,
            })}
          />
        </FormElement>
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default HookForm;
