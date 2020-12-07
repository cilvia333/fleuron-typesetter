import React, { useContext, useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import IconItem from '~/components/sidebar/iconItem';

const mockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
            <>
              <List ref={provided.innerRef} {...provided.droppableProps}>
                {mockList.map((v, i) => (
                  <>
                    <Draggable draggableId={`${i}`} index={i}>
                      {(provided, snapshot) => (
                        <IconItem
                          id={i}
                          size={1}
                          rotate={0}
                          selected={selectedItemId === i}
                          onClickItem={onClickItem}
                          provided={provided}
                          snapshot={snapshot}
                        />
                      )}
                    </Draggable>
                  </>
                ))}
              </List>
              {provided.placeholder}
            </>
          )}
        </Droppable>
      </IconListWrapper>
    </>
  );
};

const IconListWrapper = styled.section`
  ${tw`w-full h-full bg-surface-1 relative overflow-y-scroll`}

  & * {
    box-sizing: border-box;
  }
`;

const List = styled.div`
  ${tw`bg-white px-8 py-8 overflow-scroll flex justify-between flex-wrap`}
  box-sizing: border-box;
`;

export default IconList;
