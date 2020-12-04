import React, { useContext, useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

interface Props {
  id: number;
  size: number;
  rotate: number;
  selected: boolean;
}

const ListItem: React.FC<Props> = (props) => {
  const id = props.id;
  const size = props.size;
  const rotate = props.rotate;
  const selected = props.selected;

  return (
    <>
      <Draggable draggableId={`${id}`} index={id}>
        {(provided, snapshot) => (
          <>
            <Item
              ref={provided.innerRef}
              {...provided.draggableProps}
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
        )}
      </Draggable>
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
