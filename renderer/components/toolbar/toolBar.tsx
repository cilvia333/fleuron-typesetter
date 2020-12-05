import {
  faToolbox,
  faBorderAll,
  faPaperPlane,
  faMousePointer,
  faPencilAlt,
  faEraser,
  faTrashAlt,
  faPrint,
  faSquare,
  faTh,
  faThLarge,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import ToolButton from '~/components/toolbar/toolButton';
import { toolButtonContext } from '~/hooks';

const ToolBar: React.FC = () => {
  const toolButtonCtx = useContext(toolButtonContext);

  return (
    <>
      <ToolBarWrapper>
        <ToolList>
          <ToolListHeader>
            <HeaderIcon icon={faToolbox} />
            Tools
          </ToolListHeader>
          <ToolButtonList>
            <ToolButton
              icon={faMousePointer}
              text={'選択'}
              onClick={() => {
                toolButtonCtx.setCurrentTool('select');
              }}
            />
            <ToolButton
              icon={faPencilAlt}
              text={'ペンツール'}
              onClick={() => {
                toolButtonCtx.setCurrentTool('pen');
              }}
            />
            <ToolButton
              icon={faEraser}
              text={'けしごむ'}
              onClick={() => {
                toolButtonCtx.setCurrentTool('eraser');
              }}
            />
          </ToolButtonList>
        </ToolList>
        <ToolList>
          <ToolListHeader>
            <HeaderIcon icon={faPaperPlane} />
            Utils
          </ToolListHeader>
          <ToolButtonList>
            <ToolButton
              icon={faTrashAlt}
              text={'リセット'}
              onClick={() => {
                toolButtonCtx.setCurrentTool('select');
              }}
            />
            <ToolButton
              icon={faPrint}
              text={'印刷'}
              onClick={() => {
                toolButtonCtx.setCurrentTool('pen');
              }}
            />
          </ToolButtonList>
        </ToolList>
        <ToolList>
          <ToolListHeader>
            <HeaderIcon icon={faBorderAll} />
            GridSetting
          </ToolListHeader>
          <ToolButtonList>
            <ToolButton
              icon={faSquare}
              text={'4x4'}
              onClick={() => {
                toolButtonCtx.setCurrentTool('select');
              }}
            />
            <ToolButton
              icon={faThLarge}
              text={'8x8'}
              onClick={() => {
                toolButtonCtx.setCurrentTool('pen');
              }}
            />
            <ToolButton
              icon={faTh}
              text={'16x16'}
              onClick={() => {
                toolButtonCtx.setCurrentTool('eraser');
              }}
            />
          </ToolButtonList>
        </ToolList>
      </ToolBarWrapper>
    </>
  );
};

const ToolBarWrapper = styled.section`
  ${tw`w-full h-full bg-gray-300 relative px-4`}

  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }
`;

const ToolList = styled.div`
  ${tw`w-full relative`}
`;

const ToolListHeader = styled.h2`
  ${tw`w-full relative m-0 p-0 text-base`}
`;

const HeaderIcon = styled(FontAwesomeIcon)`
  ${tw`mr-4`}
`;

const ToolButtonList = styled.ul`
  ${tw`w-full relative p-0`}

  & > button {
    ${tw`mb-2`}
  }
`;

export default ToolBar;
