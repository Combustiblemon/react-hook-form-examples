import { ReactNode } from 'react';
import { Wrapper, Error } from './FormElement.styles';

const FormElement = ({
  children,
  error,
}: {
  children: ReactNode;
  error?: string | any;
}) => (
  <Wrapper>
    {children}
    {error && <Error>{error}</Error>}
  </Wrapper>
);

export default FormElement;
