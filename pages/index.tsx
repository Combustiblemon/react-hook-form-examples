/* eslint-disable react/jsx-props-no-spreading */
import Card from '@/components/card/Card';
import { CardWrapper, Form, Wrapper } from '@/styles/Index.styles';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { NextPage } from 'next/types';
import { useState } from 'react';
import { useForm, ValidateResult } from 'react-hook-form';

import FormElement from '../components/form-element/FormElement';

const mockAPIData = [
  {
    name: 'Card 1',
    id: 'card1',
  },
  {
    name: 'Card 2',
    id: 'card2',
  },
  {
    name: 'Card 3',
    id: 'card3',
  },
  {
    name: 'Card 4',
    id: 'card4',
  },
];

const hasUnder20Chars = (value: string): Promise<ValidateResult> => {
  let result: ValidateResult = true;
  if (value?.length > 20) {
    result = 'The maximum number of characters is 20.';
  }
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(() => resolve(result), 0));
};

const initialValues = {
  username: '',
  selectedCardId: '',
};

const HookForm: NextPage = () => {
  // const [selectedCardID, setSelectedCardID] = useState<string>('');

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
    // Validation will trigger on the submit event and invalid inputs will attach onChange event listeners to re-validate them.
    // delayError will delay the error state to be displayed to the end-user in milliseconds.
    // Correcting the error input will remove the error instantly and delay will not be applied.
  } = useForm({
    mode: 'onSubmit',
    delayError: 0,
    defaultValues: initialValues,
  });

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      // values.selectedCardID = selectedCardID;
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 0);
    });
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* pass the error to FormControl so it can invalidate the input if error exists */}
        <FormControl isInvalid={Boolean(errors.username)}>
          {/* pass the error to FormElement so it can display the error if it exists */}
          <FormElement error={errors.username?.message}>
            <FormLabel htmlFor="username">First name</FormLabel>
            <Input
              colorScheme="blackAlpha"
              variant="filled"
              id="username"
              placeholder="Username"
              {...register('username', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length is 4.' },
                validate: hasUnder20Chars,
              })}
            />
          </FormElement>
        </FormControl>
        <FormElement error={errors.selectedCardId?.message}>
          <CardWrapper
            {...register('selectedCardId', {
              required: { value: true, message: 'hello i am error' },
            })}
          >
            {mockAPIData.map((value) => {
              return (
                <Card
                  onClick={() =>
                    setValue('selectedCardId', value.id, { shouldTouch: true })
                  }
                  selected={watch('selectedCardId') === value.id}
                >
                  {value.name}
                </Card>
              );
            })}
          </CardWrapper>
        </FormElement>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Wrapper>
  );
};

export default HookForm;
