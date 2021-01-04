import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import AtomList from '~/components/architecture/interface/atomList';
import GarallyButton from '~/components/architecture/interface/garallyButton';
import P21B from '~/components/architecture/moleculars/p21b';

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
          <OrnamentWrapper>
            <P21B />
          </OrnamentWrapper>
          <GarallyButton />
        </Grid>
      </Main>
    </>
  );
};

const Main = styled.main`
  ${tw`w-screen h-screen relative p-12`}
`;

const Grid = styled.div`
  ${tw`w-full h-full grid grid-rows-4 grid-cols-5 gap-12 items-center`}
`;

const InformationWrapper = styled.section`
  ${tw`col-span-1 row-span-4 `}
`;

const Information = styled.section`
  ${tw`mb-6`}
`;

const InformationTitle = styled.h1`
  ${tw`font-header font-semibold italic text-2xl m-0 mb-4`}
`;

const Reference = styled.p`
  ${tw`font-text italic`}
`;

const OrnamentWrapper = styled.section`
  ${tw`col-start-2 col-end-5 row-span-4`}
`;

const ButtonWrapper = styled.section`
  ${tw`col-start-5 col-end-6 row-span-4`}
`;

export default Architecture;
