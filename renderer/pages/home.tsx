import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import Editor from '~/components/editor/editor';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <Editor />
      </div>
    </>
  );
};

export default Home;
