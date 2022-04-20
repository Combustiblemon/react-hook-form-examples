import { ReactNode } from 'react';

const FormElement = ({
  children,
  error,
}: {
  children: ReactNode;
  error?: string;
}) => (
  <div>
    {children}
    {error && <span style={{ color: 'red' }}>{error}</span>}
  </div>
);

export default FormElement;
