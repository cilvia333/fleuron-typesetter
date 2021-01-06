import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import MVSvg from '~/assets/svgs/mv.svg';
import TitleSvg from '~/assets/svgs/title.svg';

const Architecture: React.FC = () => {
  return (
    <>
      <Head>
        <title>THE ARCHITECTURE OF PRINTES ORNAMENTS</title>
      </Head>
      <Main>
        <MVWrapper>
          <StyledMVSvg />
          <StyledTitleSvg />
          <DirectedText>Directed By Kairi Shiomi</DirectedText>
          <ExhText>Design Informatics Seminar Exhibition 2020</ExhText>
        </MVWrapper>
        <StartButtonWrapper>
          <StartButton
            onClick={() => {
              Router.push('/architecture');
            }}
          >
            Play!
          </StartButton>
        </StartButtonWrapper>
      </Main>
    </>
  );
};

const Main = styled.main`
  ${tw`w-screen h-screen relative overflow-hidden grid grid-rows-1`}
  grid-template-columns: 38.2% 61.8%;
`;

const MVWrapper = styled.section`
  ${tw`w-full h-full flex flex-col justify-center items-center`}
`;

const StyledMVSvg = styled(MVSvg)`
  ${tw`w-1/2`}
`;

const StyledTitleSvg = styled(TitleSvg)`
  ${tw`w-1/2 mt-12`}
`;

const DirectedText = styled.p`
  ${tw`leading-none text-base font-header font-semibold mt-24 mb-0`}
`;

const ExhText = styled.p`
  ${tw`leading-none text-base font-header font-normal mt-4 mb-0`}
`;

const StartButtonWrapper = styled.section`
  ${tw`w-full h-full p-4 relative`}

  &::before {
    ${tw`w-px h-2/3 absolute inset-y-0 my-auto left-0 bg-black`}
    content: "";
  }
`;

const StartButton = styled.button`
  ${tw`w-56 h-56 border border-black border-solid font-text font-semibold text-black text-4xl absolute inset-0 m-auto hover:bg-primary hover:border-none hover:text-white transition-all duration-300`}

  &::after {
    ${tw`text-xl font-normal absolute -bottom-12 inset-x-0 mx-auto text-black`}
    content: "↑  Click me to play!  ↑";
  }
`;

export default Architecture;
