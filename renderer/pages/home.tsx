import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
import {
  resetServerContext,
  DragDropContext,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Editor from '~/components/editor/editor';
import IconBar from '~/components/iconbar/iconBar';
import ToolBar from '~/components/toolbar/toolBar';
import { editorContext } from '~/hooks';

const Home: React.FC = () => {
  const editorCtx = useContext(editorContext);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === 'editorDroppable') {
      if (editorCtx.currentDraggingState.selectedFleuron) {
        console.log(editorCtx.currentDraggingState.position);
        editorCtx.updateFleuron('key2', {
          ...editorCtx.currentDraggingState.selectedFleuron,
          position: editorCtx.currentDraggingState.position,
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <ToolBarWrapper>
            <ToolBar />
          </ToolBarWrapper>
          <EditorWrapper>
            <Droppable droppableId="editorDroppable">
              {(provided, snapshot) => (
                <Editor provided={provided} snapshot={snapshot} />
              )}
            </Droppable>
          </EditorWrapper>
          <IconBarWrapper>
            <IconBar />
          </IconBarWrapper>
        </Wrapper>
      </DragDropContext>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};

const Wrapper = styled.div`
  ${tw`w-screen h-screen relative flex`}
`;

const ToolBarWrapper = styled.div`
  width: 20%;
`;

const EditorWrapper = styled.div`
  width: 55%;
`;

const IconBarWrapper = styled.div`
  width: 25%;
`;

export default Home;
