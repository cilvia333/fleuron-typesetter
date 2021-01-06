import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { useMouseWheel, useToggle, useEffectOnce } from 'react-use';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Arrow from '~/assets/svgs/arrow.svg';
import AtomList from '~/components/architecture/interface/atomList';
import Gallery from '~/components/architecture/interface/gallery';
import GridButton from '~/components/architecture/interface/gridButton';
import Molecular, {
  molecularList,
  molecularInfos,
} from '~/components/architecture/share/molecular';

const Architecture: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerId, setTimerId] = useState<number>();
  const scrollRef = useRef<HTMLElement>(null);
  const [scrolling, toggleScrolling] = useToggle(false);
  const [onceScrolling, toggleOnceScrolling] = useToggle(false);
  const [activeGrid, toggleActiveGrid] = useToggle(false);
  const [currentAtom, setCurrentAtom] = useState<number | null>(null);
  const mouseWheel = useMouseWheel();
  const timerLimit = 3 * 60 * 1000; // 3分

  useEffectOnce(() => {
    const timerId = setTimeout(() => {
      Router.push('/architecture');
    }, timerLimit);

    setTimerId(timerId);
  });

  useEffect(() => {
    console.log(mouseWheel);
  }, [mouseWheel]);

  const handleAlive = () => {
    clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      Router.push('/architecture');
    }, timerLimit);

    setTimerId(newTimerId);
  };

  const handleClickAtom = (id: number) => {
    if (molecularInfos[currentIndex].atoms.includes(id)) {
      setCurrentAtom((old) => (old ? (old === id ? null : id) : id));
    } else {
      setCurrentAtom(null);
    }
  };

  return (
    <>
      <Head>
        <title>THE ARCHITECTURE OF PRINTES ORNAMENTS</title>
      </Head>
      <Main
        ref={scrollRef}
        onMouseMove={() => {
          handleAlive();
        }}
        onKeyDown={() => {
          handleAlive();
        }}
      >
        <Grid>
          <TransitionButtonWrapper
            className="group"
            onClick={() => {
              setCurrentAtom(null);
              setCurrentIndex((old) => {
                if (old > 0) {
                  return old - 1;
                }
                return old;
              });
            }}
          >
            <TransitionButton>
              <Arrow />
            </TransitionButton>
            <TransitionBar />
          </TransitionButtonWrapper>
          <TransitionButtonWrapper
            className="group"
            onClick={() => {
              setCurrentAtom(null);
              setCurrentIndex((old) => {
                if (old < molecularList.length - 1) {
                  return old + 1;
                }
                return old;
              });
            }}
          >
            <TransitionButton>
              <Arrow />
            </TransitionButton>
            <TransitionBar />
          </TransitionButtonWrapper>
          <InformationWrapper>
            <BackButton
              onClick={() => {
                Router.push('/');
              }}
            >
              Back to Top
            </BackButton>
            <Information>
              <InformationTitle>Ornaments</InformationTitle>
              <AtomList
                molecularId={currentIndex}
                onClick={handleClickAtom}
                ids={molecularInfos[currentIndex].atoms.filter(
                  (x, i, self) => self.indexOf(x) === i
                )}
              />
            </Information>
            <Information>
              <InformationTitle>Reference from</InformationTitle>
              <Reference>
                p.{molecularInfos[currentIndex].page}, PrintersOrnaments,
                Frederic Warde
              </Reference>
            </Information>
            <Information>
              <InformationTitle>Display Grid</InformationTitle>
              <GridButton
                active={activeGrid}
                handleClick={() => {
                  toggleActiveGrid();
                }}
              />
            </Information>
          </InformationWrapper>
          <OrnamentWrapper>
            <Molecular
              name={molecularList[currentIndex]}
              grid={activeGrid}
              selectAtom={currentAtom}
              onClick={handleClickAtom}
            />
          </OrnamentWrapper>
          <PageWrapper>
            <PageList position={currentIndex} max={molecularInfos.length}>
              {molecularInfos.map((molecular, index) => (
                <Page
                  current={index === currentIndex}
                  key={`page_${index}`}
                >{`${index + 1}`}</Page>
              ))}
            </PageList>
            <MaxPage>/ {molecularInfos.length}</MaxPage>
          </PageWrapper>
          <Gallery
            currentId={currentIndex}
            onChangeId={(id) => {
              setCurrentAtom(null);
              setCurrentIndex(id);
            }}
          />
        </Grid>
      </Main>
    </>
  );
};

const Main = styled.main`
  ${tw`w-screen h-screen relative p-12 overflow-hidden`}
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
  ${tw`col-start-2 col-end-5 row-start-1 row-end-5`}
`;

const PageWrapper = styled.section`
  ${tw`col-start-3 col-end-4 row-start-4 row-end-5 flex justify-center items-center z-10`}
`;

const PageList = styled.div<{ position: number; max: number }>`
  ${tw`flex flex-col mr-2 transition-all duration-300`}
  ${({ position, max }) => css`
    transform: translateY(${(Math.floor(max / 2) - position) * 32}px);
  `}
`;

const Page = styled.div<{ current: boolean }>`
  ${tw`font-bold text-2xl opacity-0 transition-all duration-300`}

  transform: scale(0.4);

  ${({ current }) =>
    current &&
    css`
      ${tw`opacity-100`}
      transform: scale(1);
    `}
`;

const MaxPage = styled.div`
  ${tw`font-bold text-2xl`}
`;

const TransitionButton = styled.div`
  ${tw`absolute inset-0 m-auto h-8 w-8 text-lightGray group-hover:text-primary transition-all duration-300`}

  svg {
    ${tw`fill-current`}
  }
`;

const TransitionBar = styled.div`
  ${tw`absolute inset-x-0 h-2 w-full bg-primary transition-all duration-300`}
`;

const TransitionButtonWrapper = styled.section`
  ${tw`absolute inset-x-0 w-full h-24 cursor-pointer`}

  &:nth-child(1) {
    ${tw`top-0`}

    ${TransitionButton} {
      transform: rotate(180deg);
    }

    ${TransitionBar} {
      ${tw`-top-2`}
    }
  }
  &:nth-child(2) {
    ${tw`bottom-0`}

    ${TransitionBar} {
      ${tw`-bottom-2`}
    }
  }

  &:hover {
    &:nth-child(1) {
      ${TransitionBar} {
        ${tw`top-0`}
      }
    }
    &:nth-child(2) {
      ${TransitionBar} {
        ${tw`bottom-0`}
      }
    }
  }
`;

const BackButton = styled.button``;

export default Architecture;
