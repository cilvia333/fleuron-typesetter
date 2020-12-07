import React, { useContext, useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import ListItem from '~/components/sidebar/ListItem';

const IconList: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const onClickItem = (itemId: number) => {
    if (itemId === selectedItemId) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(itemId);
    }
  };

  return (
    <>
      <IconListWrapper
        onClick={(e) => {
          setSelectedItemId(null);
        }}
      >
        <Droppable droppableId="IconListDroppable" isDropDisabled>
          {(provided, snapshot) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId={`${1}`} index={0}>
                {(provided, snapshot) => (
                  <>
                    <ListItem
                      id={1}
                      size={1}
                      rotate={0}
                      selected={selectedItemId === 1}
                      onClickItem={onClickItem}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  </>
                )}
              </Draggable>
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </IconListWrapper>
    </>
  );
};

const IconListWrapper = styled.section`
  ${tw`w-full h-full bg-surface-1 relative`}

  & * {
    box-sizing: border-box;
  }
`;

const List = styled.div`
  ${tw`bg-white px-8 py-8 overflow-scroll`}
  box-sizing: border-box;
`;

export default IconList;
