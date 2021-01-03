import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import AtomList from '~/components/architecture/interface/atomList';

const Architecture: React.FC = () => {
  return (
    <>
      <Head>
        <title>THE ARCHITECTURE OF PRINTES ORNAMENTS</title>
      </Head>
      <Main>
        <Grid>
          <InformationWrapper>
            <Information>
              <InformationTitle>Ornament Atoms</InformationTitle>
              <AtomList ids={[268, 466]} />
            </Information>
            <Information>
              <InformationTitle>Reference from</InformationTitle>
              <Reference>p.{128}, PrintersOrnaments, Frederic Warde</Reference>
            </Information>
          </InformationWrapper>
        </Grid>
      </Main>
    </>
  );
};

const Main = styled.main`
  ${tw`w-screen h-screen relative p-12`}
`;

const Grid = styled.div`
  ${tw`w-full h-full grid grid-rows-5 grid-rows-4 grid-cols-5 gap-12 items-center`}
`;

const InformationWrapper = styled.section`
  ${tw`col-span-1 row-span-4 `}
`;

const Information = styled.section`
  ${tw`mb-6`}
`;

const InformationTitle = styled.h1`
  ${tw`font-header font-semibold italic text-3xl m-0 mb-4`}
`;

const Reference = styled.p`
  ${tw`font-text italic`}
`;

export default Architecture;
