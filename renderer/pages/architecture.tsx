import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import AtomList from '~/components/architecture/interface/atomList';
import Gallery from '~/components/architecture/interface/gallery';
import Molecular, {
  molecularList,
} from '~/components/architecture/share/molecular';

const Architecture: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <Head>
        <title>THE ARCHITECTURE OF PRINTES ORNAMENTS</title>
      </Head>
      <Main>
        <Grid>
          <TransitionButtonWrapper
            onClick={() => {
              setCurrentIndex((old) => {
                if (old > 0) {
                  return old - 1;
                }
                return old;
              });
            }}
          >
            <TransitionButton />
          </TransitionButtonWrapper>
          <TransitionButtonWrapper
            onClick={() => {
              setCurrentIndex((old) => {
                if (old < molecularList.length - 1) {
                  return old + 1;
                }
                return old;
              });
            }}
          >
            <TransitionButton />
          </TransitionButtonWrapper>
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
            <Molecular name={molecularList[currentIndex]} />
          </OrnamentWrapper>
          <Gallery />
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
  ${tw`font-header font-semibold italic text-2xl m-0 mb-4 text-darkGray`}
`;

const Reference = styled.p`
  ${tw`font-text italic text-darkGray`}
`;

const OrnamentWrapper = styled.section`
  ${tw`col-start-2 col-end-5 row-span-4`}
`;

const TransitionButtonWrapper = styled.section`
  ${tw`absolute inset-x-0 w-full h-24 hover:bg-primary`}

  &:nth-child(1) {
    ${tw`top-0`}
  }
  &:nth-child(2) {
    ${tw`bottom-0`}
  }
`;

const TransitionButton = styled.button`
  ${tw`absolute`}
`;

const ButtonWrapper = styled.section`
  ${tw`col-start-5 col-end-6 row-span-4`}
`;

export default Architecture;
