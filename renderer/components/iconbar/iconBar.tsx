import React, { useContext, useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import ListItem from '~/components/iconbar/ListItem';

const IconBar: React.FC = () => {
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
      <IconBarWrapper
        onClick={(e) => {
          setSelectedItemId(null);
        }}
      >
        <IconBarHeader>
          <HeaderTitle>Fleuron Icons</HeaderTitle>
        </IconBarHeader>
        <Droppable droppableId="iconBarDroppable" isDropDisabled>
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
      </IconBarWrapper>
    </>
  );
};

const IconBarWrapper = styled.section`
  ${tw`w-full h-full bg-gray-300 relative`}

  & * {
    box-sizing: border-box;
  }
`;

const IconBarHeader = styled.header`
  ${tw`w-full h-16 p-2`}
`;

const HeaderTitle = styled.h1`
  ${tw`text-xl font-bold m-0`}
`;

const List = styled.div`
  ${tw`bg-white mx-4 overflow-scroll`}
  box-sizing: border-box;
`;

export default IconBar;
