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
        <p>
          Electron
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
      </div>
    </>
  );
};

export default Home;
