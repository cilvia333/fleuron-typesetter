import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import * as Types from '~/types';

export type FleuronState = {
  fleuron: Types.Fleuron;
  position: { x: number; y: number };
  size: number;
  rotate: number;
};

interface Props {
  state: FleuronState;
  selected: boolean;
}

const Fleuron: React.FC<Props> = (props) => {
  const state = props.state;
  const selected = props.selected;

  return (
    <>
      <Icon
        position={state.position}
        size={state.size}
        rotate={state.rotate}
        iconSize={state.fleuron.rect}
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
    grid-column-start: ${position.x + 1};
    grid-column-end: ${position.x + 1 + size * iconSize.x};
    grid-row-start: ${position.y + 1};
    grid-row-end: ${position.y + 1 + size * iconSize.y};

    transform: rotate(${rotate}deg);
  `}

  ${({ selected }) =>
    selected &&
    css`
      ${tw`bg-blue-500`}
    `}
`;

export default Fleuron;
