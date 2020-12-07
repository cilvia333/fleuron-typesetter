import React, { useContext, useState, useEffect } from 'react';
import {
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
} from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { editorContext } from '~/hooks';

interface Props {
  id: number;
  size: number;
  rotate: number;
  selected: boolean;
  onClickItem: (itemId: number) => void;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const ListItem: React.FC<Props> = (props) => {
  const { id, size, rotate, selected, onClickItem, provided, snapshot } = props;
  const editorCtx = useContext(editorContext);
  const [customProvidedStyle, setCustomProvidedStyle] = useState<
    DraggableProvided['draggableProps']['style']
  >(provided.draggableProps.style);

  useEffect(() => {
    if (snapshot.isDragging) {
      editorCtx.setCurrentDraggingState({
        ...editorCtx.currentDraggingState,
        selectedFleuron: {
          id,
          size,
          rotate,
          selected: false,
          position: { x: 0, y: 0 },
        },
      });
    }
  }, [snapshot.isDragging]);

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
          const screenPosition = {
            x: left + transform[0],
            y: top + transform[1],
          };

          const gridPosition = editorCtx.calcGridPosition(
            screenPosition,
            editorCtx
          );

          const position =
            editorCtx.gridPositions[gridPosition.x][gridPosition.y];

          const newTransform = `translate(${position.x - left}px, ${
            position.y - top
          }px)`;

          setCustomProvidedStyle({ ...style, transform: newTransform });
          editorCtx.setCurrentDraggingState({
            ...editorCtx.currentDraggingState,
            position: gridPosition,
          });
        }
      }
    }
  }, [provided.draggableProps, editorCtx.currentDraggingState.isDroppable]);

  const isDraggingStyle = (style: any): style is DraggingStyle => {
    return style.position !== undefined;
  };

  return (
    <>
      <Item
        ref={provided.innerRef}
        {...{
          ...provided.draggableProps,
          style: editorCtx.currentDraggingState.isDroppable
            ? customProvidedStyle
            : provided.draggableProps.style,
        }}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        size={size}
        rotate={rotate}
        selected={selected}
        onClick={(e) => {
          e.stopPropagation();
          onClickItem(id);
        }}
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
