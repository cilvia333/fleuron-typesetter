import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
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

const Home: React.FC = () => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    // if (source.droppableId === destination.droppableId) {
    // } else {
    // }
  };

  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <ToolBarWrapper></ToolBarWrapper>
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
  ${tw`px-4`}

  width: 25%;
`;

const EditorWrapper = styled.div`
  ${tw`px-4`}

  width: 40%;
`;

const IconBarWrapper = styled.div`
  ${tw`px-4`}

  width: 35%;
`;

export default Home;
