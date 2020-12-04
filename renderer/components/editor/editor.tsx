import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { toolButtonContext } from '~/hooks';

const Editor: React.FC = () => {
  const ctx = useContext(toolButtonContext);
  const [gridSize, setGridSize] = useState(4);
  const fleurons = new Map<string, number>();
  const fleuronsMap: number[][] = Array(gridSize);
  for (let y = 0; y < 3; y++) {
    fleuronsMap[y] = new Array(gridSize).fill(0);
  }

  const changeGridSize = (size: number) => {
    if (size > 0) {
      setGridSize(size);
    }
  };

  return (
    <>
      <Wrapper>
        {/* 花形装飾描画 */}
        <Grid gridSize={gridSize}>
          {[...fleurons.values()].map((v, i) => {
            <></>;
          })}
        </Grid>
        {/* グリッドライン描画 */}
        <Grid gridSize={gridSize}>
          {[...Array(gridSize ** 2).keys()].map((v, i) => (
            <GridLine key={`grid_${i}`} />
          ))}
        </Grid>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`w-full bg-white overflow-hidden relative`};

  &::before {
    ${tw`block`};
    content: '';
    padding-top: 100%;
  }
`;

const Grid = styled.div<{ gridSize: number }>`
  ${tw`w-full h-full grid absolute inset-0`};

  ${({ gridSize }) => css`
    grid-template-columns: repeat(${gridSize}, 1fr);
    grid-template-rows: repeat(${gridSize}, 1fr);
    gap: 1px;
  `}
`;

const GridLine = styled.div`
  ${tw`w-full h-full border-black border border-solid border-opacity-70`};

  box-sizing: content-box;
`;

export default Editor;
