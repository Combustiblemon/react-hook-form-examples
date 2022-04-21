/* eslint-disable react/jsx-props-no-spreading */
import Card from '@/components/card/Card';
import { CardWrapper, Form, Header, Wrapper } from '@/styles/Index.styles';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { NextPage } from 'next/types';
import { useForm, ValidateResult } from 'react-hook-form';

import FormElement from '../components/form-element/FormElement';

const mockAPIData = [
  {
    name: 'North',
    id: 'north',
  },
  {
    name: 'West',
    id: 'west',
  },
  {
    name: 'East',
    id: 'east',
  },
  {
    name: 'South',
    id: 'south',
  },
];

const hasUnder20Chars = (value: string): ValidateResult => {
  let result: ValidateResult = true;
  if (value?.length > 20) {
    result = 'The maximum number of characters is 20.';
  }
  // eslint-disable-next-line no-promise-executor-return
  return result;
};

const isUsernameAvailable = (value: string): Promise<ValidateResult> => {
  let result: ValidateResult = true;
  if (value.toLowerCase() === 'username') {
    result = 'Username is not available.';
  }
  return new Promise((resolve) => setTimeout(() => resolve(result), 0));
};

const isValidGender = (value: string): ValidateResult => {
  let result: ValidateResult = true;
  if (value === 'dog') {
    result = 'You are not a dog...';
  }
  return result;
};

const initialValues = {
  username: '',
  age: '',
  selectedCardId: '',
  gender: 'male',
};

const HookForm: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm({
    // Validation will trigger on the submit event and invalid inputs will
    // attach 'onChange' event listeners to re-validate them.
    mode: 'onSubmit',
    // delayError will delay the error state to be displayed to the end-user by milliseconds.
    // Correcting the error input will remove the error instantly and delay will not be applied.
    delayError: 0,
    // The default values used for initialization
    defaultValues: initialValues,
  });

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
            <FormLabel htmlFor="username">First name</FormLabel>
            {/* This is a text input */}
            <Input
              colorScheme="blackAlpha"
              variant="filled"
              id="username"
              placeholder="Username"
              // 'register' takes the name of the field (same as the one in 'initialValues')
              // and an object with the validations and various utilities
              // more info: https://react-hook-form.com/api/useform/register
              {...register('username', {
                required: 'This is required.',
                minLength: { value: 4, message: 'Minimum length is 4.' },
                validate: {
                  under20Chars: hasUnder20Chars,
                  available: isUsernameAvailable,
                },
              })}
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
              {...register('age', {
                required: { value: true, message: 'This is required.' },
                min: {
                  value: 18,
                  message: 'You must be over 18 years old to sign up.',
                },
              })}
            />
          </FormElement>
        </FormControl>
        <FormElement error={errors.selectedCardId?.message}>
          <FormLabel htmlFor="direction">Where are you from?</FormLabel>
          {/* This is a collection of cards you can select */}
          <CardWrapper
            id="direction"
            {...register('selectedCardId', {
              required: { value: true, message: 'This is required.' },
            })}
          >
            {mockAPIData.map((value) => {
              return (
                <Card
                  key={value.id}
                  onClick={() =>
                    // We have to use 'setValue' in 'onClick' since this is not an input
                    setValue('selectedCardId', value.id, {
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                  // 'watch' is used to trigger a re-render on the component
                  selected={watch('selectedCardId') === value.id}
                >
                  {value.name}
                </Card>
              );
            })}
          </CardWrapper>
        </FormElement>
        <FormControl isInvalid={Boolean(errors.gender)}>
          <FormElement error={errors.gender?.message}>
            <FormLabel htmlFor="gender">Select your gender</FormLabel>
            <Select
              variant="filled"
              colorScheme="blackAlpha"
              id="gender"
              {...register('gender', {
                validate: isValidGender,
              })}
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

export default HookForm;
