import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Fleuron, { FleuronState } from '~/components/editor/fleuron';
import { Point2D, Rectangle, Grid, Angle } from '~/utils/Geometory';

interface Props {
  state: FleuronState;
  select: boolean;
}

const FleuronItem: React.FC<Props> = (props) => {
  const { state, select } = props;

  return (
    <>
      <Wrapper
        position={state.position}
        size={state.size}
        rotate={state.rotate}
        iconSize={state.fleuron.rect}
        select={select}
      >
        <Fleuron state={state} />
      </Wrapper>
    </>
  );
};

interface IconProps {
  position: Point2D<Grid>;
  size: Grid;
  rotate: Angle;
  iconSize: Rectangle<Grid>;
  select: boolean;
}

const Wrapper = styled.div<IconProps>`
  ${tw`w-full h-full relative`}

  ${({ position, size, rotate, iconSize }) => css`
    grid-column-start: ${position.x + 1};
    grid-column-end: ${position.x + 1 + size * iconSize.x};
    grid-row-start: ${position.y + 1};
    grid-row-end: ${position.y + 1 + size * iconSize.y};
  `}

  ${({ select }) =>
    select &&
    css`
      ${tw`bg-primary bg-opacity-50`}
    `}
`;

export default FleuronItem;
