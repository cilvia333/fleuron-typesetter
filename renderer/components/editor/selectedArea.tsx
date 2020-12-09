import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export type FleuronState = {
  id: number;
  position: { x: number; y: number };
  size: number;
  rotate: number;
  selected: boolean;
};

interface Props {
  state: FleuronState;
  selected: boolean;
}

const SelectedArea: React.FC<Props> = (props) => {
  const state = props.state;
  const selected = props.selected;
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
        selected={selected}
      ></Icon>
    </>
  );
};

interface IconProps {
  position: { x: number; y: number };
  size: number;
  rotate: number;
  iconSize: { x: number; y: number };
  selected: boolean;
}

const Icon = styled.div<IconProps>`
  ${tw`w-full h-full bg-red-500`}

  ${({ position, size, rotate, iconSize }) => css`
    grid-column-start: ${position.x};
    grid-column-end: ${position.x + size * iconSize.x};
    grid-row-start: ${position.y};
    grid-row-end: ${position.y + size * iconSize.y};

    transform: rotate(${rotate}deg);
  `}

  ${({ selected }) =>
    selected &&
    css`
      ${tw`bg-blue-500`}
    `}
`;

export default SelectedArea;
