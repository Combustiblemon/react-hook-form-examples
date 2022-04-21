import React, { ReactNode } from 'react';

import { Wrapper } from './Card.styles';

export interface CardPropType {
  id?: string;
  border?: boolean;
  children: ReactNode;
  className?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  shadow?: boolean;
  statusColor?: 'LIGHT_BLUE' | 'LIGHT_GRAY' | 'LIGHT_GREEN';
  statusSize?: 'big' | 'small';
  tooltip?: string;
  kind?: 'primary';
}

const Card = ({
  id,
  kind = 'primary',
  border,
  children,
  className,
  selected,
  disabled,
  onClick,
  shadow,
  statusColor,
  statusSize = 'big',
}: CardPropType) => {
  return (
    <Wrapper
      id={id}
      className={className}
      kind={kind}
      border={border}
      shadow={shadow}
      disabled={disabled}
      selected={selected}
      onClick={onClick}
      statusSize={statusSize}
      statusColor={statusColor}
    >
      {children}
    </Wrapper>
  );
};

export default Card;
