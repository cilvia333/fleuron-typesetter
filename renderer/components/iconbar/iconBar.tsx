import React, { useContext, useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import ListItem from '~/components/iconbar/ListItem';

const IconBar: React.FC = () => {
  return (
    <>
      <IconBarWrapper>
        <Droppable droppableId="editorDroppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              <ListItem id={1} size={1} rotate={0} selected={false} />
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
