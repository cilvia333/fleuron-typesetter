import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <p>Electron</p>
        <img src="/images/logo.png" />
      </div>
    </>
  );
};

export default Home;
