import {
  faMousePointer,
  faPencilAlt,
  faEraser,
} from '@fortawesome/free-solid-svg-icons';
import { Letterboxd } from '@icons-pack/react-simple-icons';
import React, { useContext, useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Button from '~/components/share/button';
import InputNum from '~/components/share/inputNum';
import ToolListWrapper from '~/components/share/toolListWrapper';
import { editorContext } from '~/hooks';
import { Angle } from '~/utils/Geometory';

const ToolList: React.FC = () => {
  const [iconSize, setIconSize] = useState(1);
  const editorCtx = useContext(editorContext);

  const rotateRight = () => {
    let angle = editorCtx.currentAngle + 90;

    if (angle >= 360) {
      angle = 0;
    }

    editorCtx.setCurrentAngle(angle as Angle);
  };

  const rotateLeft = () => {
    let angle = editorCtx.currentAngle - 90;

    if (angle < 0) {
      angle = 270;
    }

    editorCtx.setCurrentAngle(angle as Angle);
  };

  return (
    <>
      <Wrapper>
        <ToolListWrapper title={'回転'}>
          <Button
            icon={faMousePointer}
            mode={'action'}
            onClick={() => {
              rotateRight();
            }}
          />
          <Button
            icon={faMousePointer}
            mode={'action'}
            onClick={() => {
              rotateLeft();
            }}
          />
          <Button
            icon={faMousePointer}
            mode={'action'}
            onClick={() => {
              return;
            }}
          />
        </ToolListWrapper>
        <ToolListWrapper title={'サイズ'}>
          <Button
            icon={faMousePointer}
            mode={'action'}
            onClick={() => {
              return;
            }}
          />
          <Button
            icon={faMousePointer}
            mode={'action'}
            onClick={() => {
              return;
            }}
          />
          <InputNum
            value={iconSize}
            onChangeNumber={(num) => {
              if (0 < num && num <= editorCtx.gridSize) {
                setIconSize(num);
              }
            }}
          />
        </ToolListWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`w-full flex relative border-0 border-b border-black border-solid px-4 py-2`}

  box-sizing: border-box;

  & > * {
    ${tw`mr-4`}
  }
`;

export default ToolList;
