import React, { useContext, useState, useEffect } from 'react';
import {
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { editorContext } from '~/hooks';

interface Props {
  id: number;
  size: number;
  rotate: number;
  selected: boolean;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const ListItem: React.FC<Props> = (props) => {
  const { id, size, rotate, selected, provided, snapshot } = props;
  const editorCtx = useContext(editorContext);
  const [customProvidedStyle, setCustomProvidedStyle] = useState<
    DraggableProvided['draggableProps']['style']
  >(provided.draggableProps.style);

  useEffect(() => {
    const style = provided.draggableProps.style;

    if (style) {
      if (
        editorCtx.currentDraggingState.isDroppable &&
        isDraggingStyle(style)
      ) {
        const top = style.top;
        const left = style.left;
        const transform = style.transform
          ?.replaceAll(/[a-z(); ]*/g, '')
          .split(',')
          .map((str) => parseInt(str, 10));
        if (transform !== undefined) {
          const position = {
            x: top + transform[0],
            y: left + transform[1],
          };
          editorCtx.setCurrentDraggingState({
            ...editorCtx.currentDraggingState,
            position,
          });
        }
      }
    }
  }, [provided.draggableProps, editorCtx.currentDraggingState.isDroppable]);

  useEffect(() => {
    const style = provided.draggableProps.style;

    if (editorCtx.currentDraggingState.isDroppable && isDraggingStyle(style)) {
      const position = editorCtx.currentDraggingState.editorPosition;
      const x = position.x - style.top;
      const y = position.y - style.left;
      const transform = `translate(${x}px, ${y}px)`;

      setCustomProvidedStyle({ ...style, transform });
    } else {
      setCustomProvidedStyle(style);
    }
  }, [
    editorCtx.currentDraggingState.isDroppable,
    editorCtx.currentDraggingState.editorPosition,
  ]);

  const isDraggingStyle = (style: any): style is DraggingStyle => {
    return style.position !== undefined;
  };

  return (
    <>
      <Item
        ref={provided.innerRef}
        {...{ ...provided.draggableProps, style: customProvidedStyle }}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        size={size}
        rotate={rotate}
        selected={selected}
      ></Item>
      {snapshot.isDragging && (
        <Clone
          isDragging={false}
          size={size}
          rotate={rotate}
          selected={selected}
        />
      )}
    </>
  );
};

interface ItemState {
  size: number;
  rotate: number;
  selected: boolean;
  isDragging: boolean;
}

const Item = styled.div<ItemState>`
  ${tw`bg-red-500 opacity-100`}

  ${({ size, rotate }) => css`
    width: ${24 * size}px;
    height: ${24 * size}px;
    transform: rotate(${rotate}deg);
  `}

  ${({ selected }) =>
    selected &&
    css`
      ${tw`bg-blue-500`}
    `}

  ${({ isDragging }) =>
    isDragging &&
    css`
      ${tw`opacity-50`}
    `}
`;

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`;

export default ListItem;
