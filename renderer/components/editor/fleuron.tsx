import { faBlender } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import * as fleuron from '~/utils/fleuron';
import { Point2D, Rectangle, Grid, Angle } from '~/utils/Geometory';

export type FleuronState = {
  fleuron: fleuron.Fleuron;
  position: Point2D<Grid>;
  size: Grid;
  rotate: Angle;
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
      >
        <StyledIcon icon={faBlender} />
      </Icon>
    </>
  );
};

interface IconProps {
  position: Point2D<Grid>;
  size: Grid;
  rotate: Angle;
  iconSize: Rectangle<Grid>;
  selected: boolean;
}

const Icon = styled.div<IconProps>`
  ${tw`w-full h-full relative`}

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
      ${tw`bg-primary bg-opacity-50`}
    `}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  ${tw`w-full h-full`}
`;

export default Fleuron;
