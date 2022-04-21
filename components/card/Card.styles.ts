import styled from 'styled-components';

import {
  gray1,
  gray2,
  gray6,
  gray8,
  lightBlue,
  lightGray,
  lightGreen,
  white,
} from '../../modules/colors';

const cardStyle = {
  primary: {
    backgroundColor: white,
    color: gray1,
    hoverColor: gray6,
    activeColor: gray8,
    border: 'none',
  },
};

const statusStyle = {
  size: {
    big: 8,
    small: 5,
  },
  color: {
    LIGHT_BLUE: lightBlue,
    LIGHT_GRAY: lightGray,
    LIGHT_GREEN: lightGreen,
  },
};

export const Wrapper = styled.div<{
  border?: boolean;
  shadow?: boolean;
  disabled?: boolean;
  selected?: boolean;
  statusSize: 'big' | 'small';
  statusColor?: 'LIGHT_BLUE' | 'LIGHT_GRAY' | 'LIGHT_GREEN';
  kind: 'primary';
}>`
  //position here is used for the placement of the shadow animation
  /* position: relative; */
  width: 100%;
  margin: 7px 0px;
  padding: 8px;

  cursor: pointer;

  background-color: ${(props) => cardStyle[props.kind].backgroundColor};
  ${(props) =>
    props.shadow && 'box-shadow: 8px 5px 15px -4px rgba(0,0,0,0.30);'}

  border-radius: 8px;
  border-left: ${(props) =>
    props.statusColor
      ? `${statusStyle.size[props.statusSize]}px solid
      ${statusStyle.color[props.statusColor]}`
      : 'none'};

  /* if disabled=true then disable the pointer events
     and change the background color */
  ${(props) =>
    props.disabled &&
    `pointer-events: none;
     background-color: ${gray2};
     `}

  // selected
${(props) => props.selected && `background-color: lightblue;`}


:hover {
    background-color: ${(props) => cardStyle[props.kind].hoverColor};
  }

  :active {
    background-color: ${(props) => cardStyle[props.kind].activeColor};
  }

  /* this needs more testing */
  /* // prerender the shadow and hide it
  ::after {
    content: '';
    position: absolute;
    left: -8px;
    width: 101%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  // show the shadow
  :hover::after {
    opacity: 1;
  } */
`;
