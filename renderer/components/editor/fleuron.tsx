import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export type FleuronState = {
  id: number;
  position: { x: number; y: number };
  size: number;
  rotate: number;
};

interface Props {
  state: FleuronState;
}

const Fleuron: React.FC<Props> = (props) => {
  const state = props.state;
  const [iconSize, setIconSize] = useState<{ x: number; y: number }>({
    x: 1,
    y: 1,
  });

  return (
    <>
      <Icon
        position={state.position}
        size={state.size}
        rotate={state.rotate}
        iconSize={iconSize}
      ></Icon>
    </>
  );
};

interface IconProps {
  position: { x: number; y: number };
  size: number;
  rotate: number;
  iconSize: { x: number; y: number };
}

const Icon = styled.div<IconProps>`
  ${tw`w-full h-full bg-red-500`}

  ${({ position, size, rotate, iconSize }) => css`
    grid-column-start: ${position.x};
    grid-column-end: ${position.x + size * iconSize.x + 1};
    grid-row-start: ${position.y};
    grid-row-end: ${position.y + size * iconSize.y + 1};

    transform: rotate(${rotate}deg);
  `}
`;

export default Fleuron;
