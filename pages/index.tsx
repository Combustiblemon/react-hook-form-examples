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
import { FieldError, useForm, ValidateResult } from 'react-hook-form';

import FormElement from '../components/form-element/FormElement';

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

const hasUnder20Chars = (value: string): ValidateResult => {
  let result: ValidateResult = true;
  if (value?.length > 20) {
    result = 'The maximum number of characters is 20.';
  }
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

const twoSelected = (value: string[]): ValidateResult => {
  let result: ValidateResult = true;
  if (value.length < 2) result = 'Please select at least two cards.';
  return result;
};

interface FormValuesTypes {
  username: string;
  age: string;
  selectedCardsId: string[];
  gender: string;
}

const initialValues: FormValuesTypes = {
  username: '',
  age: '',
  selectedCardsId: [],
  gender: 'male',
};

const HookForm: NextPage = () => {
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
        <FormElement
          // Weird casting to stop typescript from complaining
          error={(errors.selectedCardsId as FieldError | undefined)?.message}
        >
          <FormLabel htmlFor="direction">Where are you from?</FormLabel>
          {/* This is a collection of cards you can select */}
          <CardWrapper
            id="direction"
            {...register('selectedCardsId', {
              required: { value: true, message: 'This is required.' },
              validate: {
                isTwo: twoSelected,
              },
            })}
          >
            {mockAPIData.map((card) => {
              return (
                <Card
                  key={card.id}
                  onClick={() => {
                    const selectedCards = getValues('selectedCardsId');

                    // if card is selected remove it from the 'selectedCards' array
                    // else add it to the selected cards
                    if (selectedCards.includes(card.id)) {
                      selectedCards.splice(selectedCards.indexOf(card.id), 1);
                    } else {
                      selectedCards.push(card.id);
                    }

                    // We have to use 'setValue' in 'onClick' since this is not an input
                    setValue('selectedCardsId', selectedCards, {
                      shouldTouch: true,
                      // Validation on this runs on first submit and onwards
                      shouldValidate: submitCount > 0,
                    });
                  }}
                  // 'watch' is used to trigger a re-render on the component
                  selected={watch('selectedCardsId').includes(card.id)}
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
