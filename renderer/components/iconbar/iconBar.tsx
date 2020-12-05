import React, { useContext, useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import ListItem from '~/components/iconbar/ListItem';

const IconBar: React.FC = () => {
  return (
    <>
      <IconBarWrapper>
        <Droppable droppableId="iconBarDroppable" isDropDisabled>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId={`${1}`} index={0}>
                {(provided, snapshot) => (
                  <>
                    <ListItem
                      id={1}
                      size={1}
                      rotate={0}
                      selected={false}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  </>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </IconBarWrapper>
    </>
  );
};

const IconBarWrapper = styled.div`
  ${tw`w-full h-full bg-gray-300 px-4`}
`;

const List = styled.div`
  ${tw`w-full h-full bg-gray-300 px-4`}
`;

export default IconBar;
