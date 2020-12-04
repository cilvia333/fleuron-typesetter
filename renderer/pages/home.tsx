import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Editor from '~/components/editor/editor';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <EditorWrapper>
        <Editor />
      </EditorWrapper>
    </>
  );
};

const EditorWrapper = styled.div`
  width: 50%;
`;

export default Home;
