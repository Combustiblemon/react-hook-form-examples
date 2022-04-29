import Card from '@/components/card/Card';
import FormElement from '@/components/form-element/FormElement';
import { Wrapper } from '@/components/form-element/FormElement.styles';
import { CardWrapper, Form, Header } from '@/styles/Index.styles';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { OptionalObjectSchema } from 'yup/lib/object';

const mockAPIData = [
  {
    name: 'America',
    id: 'america',
  },
  {
    name: 'Europe',
    id: 'europe',
  },
  {
    name: 'Asia',
    id: 'asia',
  },
  {
    name: 'Africa',
    id: 'africa',
  },
];

// Grabbed this from the example.
const useYupValidationResolver = (
  validationSchema: OptionalObjectSchema<any>
) =>
  useCallback(
    async (data: FormValuesTypes) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Required')
    .min(4, 'Must be more than 3 characters'),
  age: yup.number().required('Required').min(18, 'Must be over 18.'),
  selectedCardsId: yup.string().required('Required'),
  gender: yup
    .string()
    .required('Required')
    .notOneOf(['dog'], 'You are not a dog...'),
});

interface FormValuesTypes {
  username: string;
  age: number;
  selectedCardIds: string;
  gender: string;
}

const initialValues: FormValuesTypes = {
  username: '',
  age: 0,
  selectedCardIds: '',
  gender: 'male',
};

const HookFormYup: NextPage = () => {
  const resolver = useYupValidationResolver(validationSchema);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, submitCount },
    setValue,
    getValues,
    watch,
  } = useForm<FormValuesTypes>({
    // Validation will trigger on the submit event and invalid inputs will
    // attach 'onChange' event listeners to re-validate them.
    mode: 'onSubmit',
    // delayError will delay the error state to be displayed to the end-user by milliseconds.
    // Correcting the error input will remove the error instantly and delay will not be applied.
    delayError: 0,
    // The default values used for initialization
    defaultValues: initialValues,
    resolver,
  });

  // this function is called on the form's 'onSubmit'
  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 0);
    });
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header>React-hook-form with Chakra</Header>
        {/* Pass the error to 'FormControl' so it can invalidate the input if error exists */}
        <FormControl isInvalid={Boolean(errors.username)}>
          {/* Pass the error to 'FormElement' so it can display the error if it exists */}
          <FormElement error={errors.username?.message}>
            <FormLabel htmlFor="username">Username</FormLabel>
            {/* This is a text input */}
            <Input
              colorScheme="blackAlpha"
              variant="filled"
              id="username"
              // 'register' takes the name of the field (same as the one in 'initialValues')
              // and an object with the validations and various utilities
              // more info: https://react-hook-form.com/api/useform/register
              {...register('username')}
            />
          </FormElement>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.age)}>
          <FormElement error={errors.age?.message}>
            <FormLabel htmlFor="age">What is your age?</FormLabel>
            {/* This is a number input */}
            <Input
              variant="filled"
              colorScheme="blackAlpha"
              id="age"
              type="number"
              placeholder="Age"
              {...register('age')}
            />
          </FormElement>
        </FormControl>
        <FormElement error={errors.selectedCardIds?.message}>
          <FormLabel htmlFor="direction">Where are you from?</FormLabel>
          {/* This is a collection of cards you can select */}
          <CardWrapper id="direction" {...register('selectedCardIds')}>
            {mockAPIData.map((card) => {
              return (
                <Card
                  key={card.id}
                  onClick={() => {
                    let value = card.id;

                    // If card is selected, deselect it
                    if (card.id === getValues('selectedCardIds')) {
                      value = '';
                    }

                    // We have to use 'setValue' in 'onClick' since this is not an input
                    setValue('selectedCardIds', value, {
                      shouldTouch: true,
                      // Validation on this runs on first submit and onwards
                      shouldValidate: submitCount > 0,
                    });
                  }}
                  // 'watch' is used to trigger a re-render on the component
                  selected={watch('selectedCardIds') === card.id}
                >
                  {card.name}
                </Card>
              );
            })}
          </CardWrapper>
        </FormElement>
        <FormControl isInvalid={Boolean(errors.gender)}>
          <FormElement error={errors.gender?.message}>
            <FormLabel htmlFor="gender">Select your gender</FormLabel>
            {/* This is a select input */}
            <Select
              variant="filled"
              colorScheme="blackAlpha"
              id="gender"
              {...register('gender')}
            >
              <option value="male">Male</option>
              <option value="Female">Female</option>
              <option value="dog">Dog</option>
            </Select>
          </FormElement>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Sign Up
        </Button>
      </Form>
    </Wrapper>
  );
};

export default HookFormYup;
