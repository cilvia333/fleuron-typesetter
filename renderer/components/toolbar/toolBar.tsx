import {
  faMousePointer,
  faPencilAlt,
  faEraser,
} from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Button from '~/components/share/button';
import ToolListWrapper from '~/components/share/toolListWrapper';
import { toolContext } from '~/hooks';

const ToolBar: React.FC = () => {
  const toolCtx = useContext(toolContext);

  return (
    <>
      <Wrapper>
        <AppTitle>Fleuron Typesetter</AppTitle>
        <ToolListWrapper title={'ツール'}>
          <Button
            icon={faMousePointer}
            mode={'toggle'}
            active={toolCtx.currentTool === 'select'}
            onClick={() => {
              toolCtx.setCurrentTool('select');
            }}
          />
          <Button
            icon={faPencilAlt}
            mode={'toggle'}
            active={toolCtx.currentTool === 'pen'}
            onClick={() => {
              toolCtx.setCurrentTool('pen');
            }}
          />
          <Button
            icon={faEraser}
            mode={'toggle'}
            active={toolCtx.currentTool === 'eraser'}
            onClick={() => {
              toolCtx.setCurrentTool('eraser');
            }}
          />
        </ToolListWrapper>
        <ToolListWrapper title={'グリッドサイズ'}>
          <Button
            text={'4×4'}
            mode={'toggle'}
            onClick={() => {
              return;
            }}
          />
          <Button
            text={'8×8'}
            mode={'toggle'}
            onClick={() => {
              return;
            }}
          />
          <Button
            text={'16×16'}
            mode={'toggle'}
            onClick={() => {
              return;
            }}
          />
          <Button
            text={'custom'}
            mode={'toggle'}
            onClick={() => {
              return;
            }}
          />
        </ToolListWrapper>
        <UtilButton>Reset</UtilButton>
        <ExportButton>Export</ExportButton>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`w-full h-full bg-surface-1 relative px-4 flex items-center`}

  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }

  & > * {
    ${tw`mr-8`}
  }
`;

const AppTitle = styled.h1`
  ${tw`font-header text-4xl font-bold`}
`;

const ToolList = styled.div`
  ${tw`relative`}
`;

const ToolListHeader = styled.h2`
  ${tw`w-full relative m-0 p-0 text-darkGray text-base font-header`}

  &::before {
    ${tw`w-full absolute bg-darkGray`}

    content: "";
    bottom: -4px;
    height: 1px;
  }
`;

const ToolButtonList = styled.ul`
  ${tw`w-full relative p-0 flex`}

  & > button {
    ${tw`mr-2`}
  }
`;

const UtilButton = styled.button`
  ${tw`h-8 px-2 text-center cursor-pointer relative text-xl border border-black border-solid bg-white font-text font-medium text-black font-bold`}

  &:hover {
    ${tw`bg-gray text-white`}
  }

  &:active {
    ${tw`bg-black border-transparent text-white`}
    transform: translateY(2px);
  }
`;

const ExportButton = styled(UtilButton)`
  ${tw`border-primary text-primary`}

  &:hover {
    ${tw`bg-primary border-transparent text-white`}
  }

  &:active {
    ${tw`bg-primary border-transparent text-white`}
    transform: translateY(2px);
  }
`;

export default ToolBar;
